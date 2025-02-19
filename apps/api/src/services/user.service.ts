import prisma from "@/prisma";
import { Request } from "express";

class UserService {
    async getById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id,
            }
        });
    }
}

export default new UserService();