import { pagination } from '@/helpers/pagination';
import prisma from '@/prisma';
import { Request } from 'express';
class PanelVoucherService {
  async getList(req: Request) {
    const { page, limit, search } = req.query;
    return await prisma.voucher.findMany({
      where: {
        name: {
          contains: String(search || ''),
          mode: 'insensitive',
        },
      },

      orderBy: {
        created_at: 'desc',
      },

      ...pagination(Number(page), Number(limit)),
    });
  }
  async getById(req: Request) {
    const id = Number(req.params.id);
    return await prisma.voucher.findUnique({
      where: {
        id,
      },
      include: {
        voucher_events: true,
      },
    });
  }
  async countTotal(req: Request) {
    const { search } = req.query;
    return await prisma.voucher.count({
      where: {
        name: {
          contains: String(search || ''),
          mode: 'insensitive',
        },
      },
    });
  }

  async create(req: Request) {
    const result = await prisma.$transaction(async (tx) => {
      const { name, price, start_date, end_date, events } = req.body;
      const voucher = await tx.voucher.create({
        data: {
          name,
          price,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });

      if (events.length > 0) {
        await tx.voucherEvent.createMany({
          data: events.map((row: number) => ({
            event_id: row,
            voucher_id: voucher.id,
          })),
        });
      }

      return tx.voucher.findUnique({
        where: { id: voucher.id },
        include: {
          voucher_events: true,
        },
      });
    });
    return result;
  }
  async update(req: Request) {
    const { id } = req.params;
    const { name, price, start_date, end_date, events } = req.body;
    const result = await prisma.$transaction(async (tx) => {
      const voucher = await tx.voucher.update({
        where: { id: Number(id) },
        data: {
          name,
          price,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
        },
      });

      await tx.voucherEvent.deleteMany({
        where: {
          voucher_id: Number(id),
        },
      });

      if (events.length > 0) {
        await tx.voucherEvent.createMany({
          data: events.map((row: number) => ({
            event_id: row,
            voucher_id: voucher.id,
          })),
        });
      }

      return tx.voucher.findUnique({
        where: { id: voucher.id },
        include: {
          voucher_events: true,
        },
      });
    });
    return result;
  }
  async delete(req: Request) {
    const id = Number(req.params.id);
    await prisma.voucherEvent.deleteMany({
      where: {
        voucher_id: id,
      },
    });
    await prisma.voucher.delete({
      where: {
        id,
      },
    });
  }
}

export default new PanelVoucherService();
