/** @format */

import { Prisma } from "@prisma/client";
import { Request } from "express";
// import { slugGenerator } from "../helpers/slug.generator";
import { prisma } from "../../config";
import { pagination } from "../../helpers/pagination";
import { cloudinaryUpload } from "@/helpers/cloudinary";
import { slugGenerator } from "@/helpers/slug.generator";

class PanelEventService {
    // async create(req: Request) {
    //     const { product_name, img_src, price, userId } = req.body;
    //     const data: Prisma.ProductCreateInput = {
    //         product_name,
    //         img_src,
    //         price,
    //         slug: slugGenerator(product_name),
    //         User: {
    //             connect: {
    //                 id: userId,
    //             },
    //         },
    //     };

    //     await prisma.product.create({
    //         data,
    //     });
    // }
    // async update(req: Request) {
    //     const id = Number(req.params.id);
    //     const { product_name, img_src, price } = req.body;
    //     const data: Prisma.ProductUpdateInput = {};
    //     if (product_name) data.product_name = product_name;
    //     if (img_src) data.img_src = img_src;
    //     if (price) data.price = price;

    //     await prisma.product.update({
    //         data,
    //         where: { id, isDeleted: null },
    //     });
    // }
    // async delete(req: Request) {
    //     const id = Number(req.params.id);
    //     await prisma.product.update({
    //         data: {
    //             isDeleted: new Date(),
    //         },
    //         where: {
    //             id,
    //         },
    //     });
    // }
    // async getBySlug(req: Request) {
    //     const { slug } = req.params;
    //     return await prisma.product.findUnique({
    //         where: {
    //             slug,
    //             isDeleted: null,
    //         },
    //     });
    // }

    async getList(req: Request) {
        const { page, limit, search } = req.query;
        return await prisma.event.findMany({
            where: {
                name: {
                    contains: String(search || ""),
                    mode: "insensitive"
                },
                // deleted_at: null,
            },
            include: {
                city: true,
                event_category: true
            },
            orderBy: {
                created_at: 'desc',
            },

            ...pagination(Number(page), Number(limit)),
        });
    }

    async countTotal(req: Request) {
        const { search } = req.query
        return await prisma.event.count({
            where: {
                name: {
                    contains: String(search || ""),
                    mode: "insensitive"
                }
            }
        })
    }

    async create(req: Request) {
        const {
            name,
            host_name,
            address,
            description,
            term_condition,
            date,
            start_time,
            end_time,
            status,
            image,
            event_category_id,
            city_id,
        } = req.body;

        const data: Prisma.EventCreateInput = {
            name,
            host_name,
            address,
            description,
            term_condition,
            date: new Date(date),
            start_time: new Date('1970-01-01T' + start_time),
            end_time: new Date('1970-01-01T' + end_time),
            status,
            image,
            slug: slugGenerator(name),
            event_category: {
                connect: { id: Number(event_category_id) },
            },
            city: {
                connect: { id: Number(city_id) },
            },
        };

        await prisma.event.create({
            data,
        });

        return data
    }
}

export default new PanelEventService();
