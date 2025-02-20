/** @format */

import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { slugGenerator } from '../helpers/slug.generator';
import { prisma } from '../config';
import { pagination } from '../helpers/pagination';

class eventService {
  // async create(req: Request) {
  //   const {
  //     name,
  //     host_name,
  //     address,
  //     description,
  //     term_condition,
  //     date,
  //     start_time,
  //     end_time,
  //     status,
  //     image,
  //     map_image,
  //     event_category_id,
  //     city_id,
  //   } = req.body;
  //   const data: Prisma.EventCreateInput = {
  //     name,
  //     host_name,
  //     address,
  //     description,
  //     term_condition,
  //     date: new Date(date),
  //     start_time: new Date(start_time),
  //     end_time: new Date(end_time),
  //     status,
  //     image,
  //     map_image,
  //     slug: slugGenerator(name),
  //     event_category: {
  //       connect: { id: event_category_id },
  //     },
  //     city: city_id ? { connect: { id: city_id } } : undefined,
  //   };

  //   await prisma.event.create({
  //     data,
  //   });
  // }
  async update(req: Request) {
    const id = Number(req.params.id);
    const { event_name, profile_photo, price } = req.body;
    const data: Prisma.EventUpdateInput = {};
    if (event_name) data.name = event_name;
    if (profile_photo) data.image = profile_photo;

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
    const { page, limit, name } = req.query;
    return await prisma.event.findMany({
      where: {
        name: {
          contains: String(name || ''),
        },
        isDeleted: null,
      },

      ...pagination(Number(page), Number(limit)),
    });
  }
}

export default new eventService();
