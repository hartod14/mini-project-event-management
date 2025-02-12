/** @format */

import { Prisma } from "@prisma/client";
import { Request } from "express";
// import { slugGenerator } from "../helpers/slug.generator";
import { prisma } from "../config";
import { pagination } from "../helpers/pagination";
import { cloudinaryUpload } from "@/helpers/cloudinary";

class UploadImageService {
    async uploadImage(req: Request) {
        // const id = Number(req.user?.id);
        const { file } = req;
        if (!file) throw new Error("No File Uploaded");
        const { secure_url } = await cloudinaryUpload(file);
        return secure_url
        // await prisma.user.update({
        //     data: {
        //         img_src: secure_url,
        //     },
        //     where: {
        //         id,
        //     },
        // });
    }
}

export default new UploadImageService();
