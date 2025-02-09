import { Prisma } from "@prisma/client";

//all password = user123

export const eventCategorySeed: Prisma.EventCategoryCreateManyInput[] = [
  {
    id: 1,
    name: 'Sport',
  },
  {
    id: 2,
    name: 'Music',
  },
  {
    id: 3,
    name: 'Game',
  },
  {
    id: 4,
    name: 'Technologies',
  },
  {
    id: 5,
    name: 'Art',
  },
];
