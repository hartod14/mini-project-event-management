import { Prisma } from "@prisma/client";

//all password = user123

export const eventCategorySeed: Prisma.EventCategoryCreateManyInput[] = [
  {
    id: 1,
    name: 'Olahraga',
  },
  {
    id: 2,
    name: 'Musik',
  },
  {
    id: 3,
    name: 'Game',
  },
  {
    id: 4,
    name: 'Teknologi',
  },
  {
    id: 5,
    name: 'Seni',
  },
];
