// bookingService.ts
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { prisma } from '../config';
import { pagination } from '../helpers/pagination';
import { create } from 'ts-node';

class bookingService {
  async create(req: Request) {
    const {
      event_id,
      user_id,
      payment_method_id,
      total_price,
      point_used,
      coupon_id,
    } = req.body;
    const data: Prisma.TransactionCreateInput = {
      transaction_number: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      total_price: parseFloat(total_price),
      point_used: parseInt(point_used) || null,
      event: {
        connect: {
          id: event_id,
        },
      },
      user: {
        connect: {
          id: user_id,
        },
      },
      payment_method: {
        connect: {
          id: payment_method_id,
        },
      },
      coupon_user: coupon_id
        ? {
            connect: {
              id: coupon_id,
            },
          }
        : undefined,
      payment_status: 'WAITING_FOR_PAYMENT',
    };
    return await prisma.transaction.create({ data });
  }

  async getList(req: Request) {
    const { page, limit } = req.query;
    return await prisma.transaction.findMany({
      ...pagination(Number(page), Number(limit)),
    });
  }
}

export default new bookingService();
