/** @format */

import { PaymentStatus, Prisma } from "@prisma/client";
import { Request } from "express";
// import { slugGenerator } from "../helpers/slug.generator";
import { prisma } from "../../config";
import { pagination } from "../../helpers/pagination";
import { cloudinaryUpload } from "@/helpers/cloudinary";
import { slugGenerator } from "@/helpers/slug.generator";

class PanelTransactionService {
    async getList(req: Request) {
        const { page, limit, status } = req.query;
        const paymentStatusEnum = PaymentStatus[status as keyof typeof PaymentStatus];

        return await prisma.transaction.findMany({
            where: {
                payment_status: paymentStatusEnum
            },
            include: {
                transaction_tickets: true,
                event: true,
                user: true,
            },
            orderBy: {
                created_at: 'desc',
            },

            ...pagination(Number(page), Number(limit)),
        });
    }

    async getById(req: Request) {
        const id = Number(req.params.id)
        return await prisma.transaction.findUnique({
            where: {
                id,
            },
            include: {
                transaction_tickets: {
                    include: {
                        ticket_type: true
                    }
                },
                event: {
                    include: {
                        city: true

                    }
                },
                payment_method :true,
                user: true,
            }
        });
    }

    async countTotal(req: Request) {
        const { status } = req.query
        const paymentStatusEnum = PaymentStatus[status as keyof typeof PaymentStatus];

        return await prisma.transaction.count({
            where: {
                payment_status: paymentStatusEnum
            },
        })
    }

    // async create(req: Request) {
    //     const result = await prisma.$transaction(async (tx) => {
    //         const {
    //             name,
    //             host_name,
    //             address,
    //             description,
    //             term_condition,
    //             date,
    //             start_time,
    //             end_time,
    //             status,
    //             image,
    //             event_category_id,
    //             city_id,
    //             ticket_types
    //         } = req.body;

    //         const event = await tx.event.create({
    //             data: {
    //                 name,
    //                 host_name,
    //                 address,
    //                 description,
    //                 term_condition,
    //                 date: new Date(date),
    //                 start_time: new Date(`1970-01-01T${start_time}`),
    //                 end_time: new Date(`1970-01-01T${end_time}`),
    //                 status,
    //                 image,
    //                 slug: slugGenerator(name),
    //                 event_category: {
    //                     connect: { id: Number(event_category_id) },
    //                 },
    //                 city: {
    //                     connect: { id: Number(city_id) },
    //                 },
    //             },
    //         });

    //         if (ticket_types.length > 0) {
    //             await tx.ticketType.createMany({
    //                 data: ticket_types.map((ticket_type: { name: string; price: number; quota: number }) => ({
    //                     name: ticket_type.name,
    //                     price: Number(ticket_type.price),
    //                     quota: Number(ticket_type.quota),
    //                     purchaseable_limit_time: new Date(date + "T" + end_time),
    //                     event_id: event.id,
    //                 })),
    //             });
    //         }

    //         return tx.event.findUnique({
    //             where: { id: event.id },
    //             include: { ticket_types: true },
    //         });
    //     });

    //     return result;
    // }

    // async update(req: Request) {
    //     const { id } = req.params;
    //     const {
    //         name,
    //         host_name,
    //         address,
    //         description,
    //         term_condition,
    //         date,
    //         start_time,
    //         end_time,
    //         status,
    //         image,
    //         event_category_id,
    //         city_id,
    //         ticket_types,
    //     } = req.body;

    //     const result = await prisma.$transaction(async (tx) => {
    //         const event = await tx.event.update({
    //             where: { id: Number(id) },
    //             data: {
    //                 name,
    //                 host_name,
    //                 address,
    //                 description,
    //                 term_condition,
    //                 date: new Date(date),
    //                 start_time: new Date(`1970-01-01T${start_time}`),
    //                 end_time: new Date(`1970-01-01T${end_time}`),
    //                 status,
    //                 image,
    //                 slug: slugGenerator(name),
    //                 event_category: {
    //                     connect: { id: Number(event_category_id) },
    //                 },
    //                 city: {
    //                     connect: { id: Number(city_id) },
    //                 },
    //             },
    //         });

    //         for (const ticket of ticket_types) {
    //             await tx.ticketType.update({
    //                 where: { id: Number(ticket.id) },
    //                 data: {
    //                     name: ticket.name,
    //                     price: Number(ticket.price),
    //                     quota: Number(ticket.quota),
    //                     purchaseable_limit_time: new Date(date + "T" + end_time),
    //                 },
    //             });
    //         }

    //         return tx.event.findUnique({
    //             where: { id: event.id },
    //             include: { ticket_types: true },
    //         });
    //     });

    //     return result;
    // }

    // async delete(req: Request) {
    //     const id = Number(req.params.id);
    //     await prisma.transaction.update({
    //         data: {
    //             isDeleted: new Date(),
    //         },
    //         where: {
    //             id,
    //         },
    //     });
    // }

}

export default new PanelTransactionService();
