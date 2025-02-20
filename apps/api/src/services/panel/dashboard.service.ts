import prisma from '@/prisma';
import { Request } from 'express';

class PanelDashboardService {
  async getData(req: Request) {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        total_price: true,
        created_at: true,
      },
    });

    const events = await prisma.event.findMany({
      select: {
        id: true,
        created_at: true,
      },
    });

    return {
      transactions: transactions.map((t) => ({
        id: t.id,
        total_price: Number(t.total_price),
        created_at: t.created_at.toISOString().split('T')[0],
      })),
      events: events.map((e) => ({
        id: e.id,
        name: e.created_at,
      })),
    };
  }
}

export default new PanelDashboardService();
