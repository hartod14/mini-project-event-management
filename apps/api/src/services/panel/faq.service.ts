import { pagination } from '@/helpers/pagination';
import prisma from '@/prisma';
import { Request } from 'express';
class PanelFaqService {
  async getList(req: Request) {
    const { page, limit, search } = req.query;
    return await prisma.faq.findMany({
      where:{
        question: {
          contains: String(search || ''),
          mode: 'insensitive',
        },
        isDeleted: null,
      },
      orderBy: {
        created_at: 'desc',
      },
      ...pagination(Number(page), Number(limit)),
    });
  }

  async getById(req: Request) {
    const id = Number(req.params.id);
    return await prisma.faq.findUnique({
      where: {
        id,
        isDeleted: null,
      },
    });
  }

  async countTotal(req: Request) {
    const { search } = req.query;
    return await prisma.faq.count({
      where: {
       question: {
          contains: String(search || ''),
          mode: 'insensitive',
        },
      },
    });
  }

  async create(req: Request) {
    const { question, answer, is_active } = req.body;
    return await prisma.faq.create({
      data: {
        question,
        answer,
        is_active,
      },
    });
  }

  async update(req: Request) {
    const { id } = req.params;
    const { question, answer, is_active } = req.body;
    return await prisma.faq.update({
      where: { id: Number(id) },
      data: {
        question,
        answer,
        is_active,
      },
    });
  }
  async delete(req: Request) {
    const id = Number(req.params.id);
    await prisma.faq.update({
      data: {
        isDeleted: new Date(),
      },
      where: {
        id,
      },
    });
  }
}

export default new PanelFaqService();
