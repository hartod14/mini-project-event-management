
import { Request } from 'express';
import { jwt_secret, prisma } from '../config';
import { Prisma } from '@prisma/client';
import { hashedPassword } from '../helpers/bcrypt';
import { compare } from 'bcrypt';
import { getUserByEmail } from '../helpers/user.prisma';
import { ErrorHandler } from '../helpers/response.handler';
import { IUserLogin } from '../interfaces/user.interface';
import { sign } from 'jsonwebtoken';
import { generateReferralCode } from '../helpers/referral-code-generator';
import { generateAuthToken } from '../helpers/token';

interface AuthenticatedRequest extends Request {
  user?: IUserLogin;
}

class AuthService {
  async signIn(req: Request) {
    const { email, password } = req.body;

    const user = (await getUserByEmail(email)) as IUserLogin;
    if (!user) throw new ErrorHandler('wrong email', 401);
    else if (!(await compare(password, user.password as string)))
      throw new ErrorHandler('wrong password', 401);

    return await generateAuthToken(user);
  }

  async signUp(req: Request) {
    const { email, password, phone, name, referral_code } = req.body;

    const result = await prisma.$transaction(async (tx) => {
      let referrerId: number | null = null;

      if (referral_code) {
        const referrer = await tx.user.findFirst({
          where: { referral_code },
        });

        if (!referrer) {
          throw new Error('No referral code registered');
        }

        referrerId = referrer.id;

        await tx.user.update({
          where: {
            id: referrer.id
          },
          data: {
            point: { increment: 10000 },
            point_expire: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          },
        });
      }

      const newReferralCode = generateReferralCode();

      const newUser = await tx.user.create({
        data: {
          email,
          password: await hashedPassword(password),
          phone,
          name,
          referral_code: newReferralCode,
        },
      });

      if (referrerId) {
        await tx.referralLog.create({
          data: {
            user_id: newUser.id,
            referrer_id: referrerId,
          },
        });

        await tx.couponUser.create({
          data: {
            coupon_id: 1,
            user_id: newUser.id
          },
        });
      }

      return newUser;
    });

    return result;
  }


  async updateUser(req: Request) {
    const { password, name, phone, img_src } = req.body;
    const id = Number((req as any).user?.id);
    const data: Prisma.UserUpdateInput = {};
    if (img_src) data.profile_photo = img_src;
    if (password) data.password = password;
    if (name) data.name = name;
    if (phone) data.phone = phone;

    await prisma.user.update({
      data,
      where: {
        id,
      },
    });
    return await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        role: true,
        profile_photo: true,
      },
      where: {
        id,
      },
    });
  }

  async refreshToken(req: AuthenticatedRequest) {
    if (!req.user?.email) throw new ErrorHandler("invalid token");

    return await generateAuthToken(undefined, req.user?.email);
  }
}

export default new AuthService();
