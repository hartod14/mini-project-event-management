import { UserLogin } from "@/interfaces/user.interface";
import { jwt_secret, prisma } from "../config";
import { Prisma } from "@prisma/client";
import { Request } from "express";
import { getUserByEmail } from "@/helpers/user.prisma";
import { ErrorHandler } from "@/helpers/response.handler";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

class AuthService {
    async signIn(req: Request) {
        const { email, password } = req.body

        const user = (await getUserByEmail(email)) as UserLogin
        if (!user) throw new ErrorHandler("wrong email", 401);
        else if (!(await compare(password, user.password as string)))
            throw new ErrorHandler("wrong password", 401)

        delete user.password
        const token = sign(user, jwt_secret, {
            expiresIn: "20m"
        })

        return {
            token
        }

    }
}

export default new AuthService()