/** @format */

import { PaymentStatus, Prisma } from "@prisma/client";
import { Request } from "express";
// import { slugGenerator } from "../helpers/slug.generator";
import { prisma } from "../../config";
import { pagination } from "../../helpers/pagination";
import { cloudinaryUpload } from "@/helpers/cloudinary";
import { slugGenerator } from "@/helpers/slug.generator";

import { transporter } from "../../helpers/nodemailer";
import { hbs } from "../../helpers/handlebars";
import { ErrorHandler } from "@/helpers/response.handler";
import { convertEnumToString } from "@/helpers/format.text";

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
                coupon_user: {
                    include: {
                        coupon: true
                    }
                },
                voucher_event: {
                    include: {
                        voucher: true
                    }
                },
                payment_method: true,
                user: true,
            }
        });
    }

    async update(req: Request) {
        const result = await prisma.$transaction(async (tx) => {
            const { status, updateTransaction } = req.body;
            const id = Number(req.params.id)

            let enumStatus: PaymentStatus;
            if (status == 'approved') {
                enumStatus = PaymentStatus.DONE
            } else {
                enumStatus = PaymentStatus.REJECTED

                if (updateTransaction.point_used) {
                    await tx.user.update({
                        where: { id: updateTransaction.user_id },
                        data: {
                            point: { increment: 10000 }
                        }
                    })
                }
            }

            return await tx.transaction.update({
                where: {
                    id: updateTransaction.id
                },
                data: {
                    payment_status: enumStatus
                }
            })
        });

        return result;
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


    async sendEmailTransactionStatus(name: string, email: string, status: string) {
        const convertStatus = convertEnumToString(status)
        try {
            const compiledTemplate = hbs("transaction-status.hbs");
            const html = compiledTemplate({
                name,
                email,
                status: convertStatus
            });

            transporter.sendMail({
                to: email,
                subject: "Transaction Status",
                html,
            });
            return "Success send email";
        } catch (error) {
            throw new ErrorHandler("Failed send email")

        }
    }

}

export default new PanelTransactionService();
