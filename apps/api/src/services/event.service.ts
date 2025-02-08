/** @format */

import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { slugGenerator } from '../helpers/slug.generator';
import { prisma } from '../config';
import { pagination } from '../helpers/pagination';

class eventService {
  async create(req: Request) {
    const {
      name,
      host_name,
      address,
      description,
      term_condition,
      start_date,
      end_date,
      status,
      image,
      map_image,
      event_category_id,
      city_id,
    } = req.body;
    const data: Prisma.EventCreateInput = {
      name,
      host_name,
      address,
      description,
      term_condition,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      status,
      image,
      map_image,
      slug: slugGenerator(name),
      event_category: {
        connect: { id: event_category_id },
      },
      city: city_id ? { connect: { id: city_id } } : undefined,
    };

    await prisma.event.create({
      data,
    });
  }
  async update(req: Request) {
    const id = Number(req.params.id);
    const { event_name, img_src, price } = req.body;
    const data: Prisma.EventUpdateInput = {};
    if (event_name) data.name = event_name;
    if (img_src) data.image = img_src;

    await prisma.event.update({
      data,
      where: { id },
    });
  }
  async delete(req: Request) {
    const id = Number(req.params.id);
    await prisma.event.update({
      data: {
        isDeleted: new Date(),
      },
      where: {
        id,
      },
    });
  }
  async getBySlug(req: Request) {
    const { slug } = req.params;
    return await prisma.event.findUnique({
      where: {
        slug,
        isDeleted: null,
      },
    });
  }
  async getList(req: Request) {
    const { page, name } = req.query;
    return await prisma.event.findMany({
      where: {
        name: {
          contains: String(name || ''),
        },
        isDeleted: null,
      },
      ...pagination(Number(page)),
    });
  }
}

export default new eventService();
