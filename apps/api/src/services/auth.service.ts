
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
import { transporter } from "../helpers/nodemailer";
import { hbs } from "../helpers/handlebars";
import { generateRandomString } from '@/helpers/random-string';
import { log } from 'console';

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
    const { password, name, phone, profile_photo, email } = req.body;
    const id = Number((req as any).user?.id);
    const data: Prisma.UserUpdateInput = {};
    if (profile_photo) data.profile_photo = profile_photo;
    if (password) data.password = password;
    if (name) data.name = name;
    if (phone) data.phone = phone;
    if (email) data.email = email;

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
        phone: true,
      },
      where: {
        id,
      },
    });
  }

  async changePassword(req: Request) {
    const { password, new_password, confirm_new_password } = req.body;

    const email = (req as any).user?.email;
    const user = (await getUserByEmail(email)) as IUserLogin
    if (new_password != confirm_new_password)
      throw new ErrorHandler(
        'new password and confirm new passwod not same',
        401,
      );

    if (!(await compare(password, user.password as string)))
      throw new ErrorHandler(
        'wrong password',
        401
      );

    await prisma.user.update({
      data: {
        password: await hashedPassword(new_password),
      },
      where: {
        id: user.id,
      },
    });
  }

  async refreshToken(req: AuthenticatedRequest) {
    if (!req.user?.email) throw new ErrorHandler("invalid token");

    return await generateAuthToken(undefined, req.user?.email);
  }

  async forgetPassword(req: Request) {
    const { email } = req.body
    return await prisma.user.update({
      where: { email },
      data: {
        forget_password_token: generateRandomString(30)
      }
    })
  }

  async resetPasswordCheck(req: Request) {
    const { token } = req.query

    if (!token || typeof token !== "string") {
      throw new Error("Token is required and must be a string.");
    }

    return await prisma.user.findFirstOrThrow({
      where: { forget_password_token: token },
      select: {
        id: true
      }
    })
  }

  async resetPassword(req: Request) {
    const { id } = req.params
    const { password, token } = req.body

    const userID = Number(id)

    // if (!id) {
    //   throw new Error("Token is required and must be a string.");
    // }

    return await prisma.user.update({
      where: {
        id: userID,
        forget_password_token: token
      },
      data: {
        password: await hashedPassword(password)
      }
    })
  }

  async sendEmailForgetPassword(email: string, token: string) {
    try {
      const compiledTemplate = hbs("forget-password.hbs");
      const html = compiledTemplate({
        email,
        token,
      });

      transporter.sendMail({
        to: email,
        subject: "Forget Password Request",
        html,
      });
      return "Success send email";
    } catch (error) {
      throw new ErrorHandler("Failed send email")

    }
  }
}

export default new AuthService();
