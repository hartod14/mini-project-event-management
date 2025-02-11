/** @format */

import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { prisma } from '../config';
import { pagination } from '../helpers/pagination';
import { create } from 'ts-node';

class reviewService {
    async create(req: Request) {
      const { event_id, user_id, description, rating_score } = req.body;
      const data: Prisma.ReviewCreateInput = {
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
        description,
        rating_score,
      };
      return await prisma.review.create({ data });
    }
    async getList(req: Request) {
      const { page, limit } = req.query;
      return await prisma.review.findMany({
        ...pagination(Number(page), Number(limit)),
      });
    }
  }



export default new reviewService();
