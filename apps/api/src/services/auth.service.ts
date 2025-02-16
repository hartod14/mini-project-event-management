
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
    const { email, password, phone, name } = req.body;
    const referralCode = generateReferralCode();

    await prisma.user.create({
      data: {
        email,
        password: await hashedPassword(password),
        phone,
        name,
        referral_code: referralCode,
      },
    });
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
}

export default new AuthService();
