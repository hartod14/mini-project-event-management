import { Prisma } from "@prisma/client";

//all password = user123

export const citySeed: Prisma.CityCreateManyInput[] = [
  {
    id: 1,
    name: 'Jakarta',
  },
  {
    id: 2,
    name: 'Bandung',
  },
  {
    id: 3,
    name: 'Bali',
  },
  {
    id: 4,
    name: 'Surabaya',
  },
  {
    id: 5,
    name: 'Medan',
  },
];
