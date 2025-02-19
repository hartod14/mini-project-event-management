import { pagination } from '@/helpers/pagination';
import prisma from '@/prisma';
import { Request } from 'express';
class PanelBannerService {
  async getList(req: Request) {
    const { page, limit, search } = req.query;
    return await prisma.banner.findMany({
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
    return await prisma.banner.findUnique({
      where: {
        id,
      },
    });
  }

  async countTotal(req: Request) {
    const { search } = req.query;
    return await prisma.banner.count({
      where: {
        name: {
          contains: String(search || ''),
          mode: 'insensitive',
        },
      },
    });
  }

  async create(req: Request) {
    const { name, image, is_active } = req.body;
    return await prisma.banner.create({
      data: {
        name,
        image,
        is_active,
      },
    });
  }

  async update(req: Request) {
    const { id } = req.params;
    const { name, image, is_active } = req.body;
    return await prisma.banner.update({
      where: { id: Number(id) },
      data: {
        name,
        image,
        is_active,
      },
    });
  }
  async delete(req: Request) {
    const id = Number(req.params.id);
    await prisma.banner.delete({
      where: {
        id,
      },
    });
  }
}

export default new PanelBannerService();
