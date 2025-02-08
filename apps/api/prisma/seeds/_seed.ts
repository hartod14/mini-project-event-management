import { PrismaClient } from '@prisma/client';
import { eventSeed } from './event.seed';
import { userSeed } from './user.seed';
import { eventCategorySeed } from './event-category.seed';
import { citySeed } from './city.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({ data: citySeed });
  await prisma.eventCategory.createMany({ data: eventCategorySeed });
  await prisma.event.createMany({ data: eventSeed });
  await prisma.user.createMany({ data: userSeed });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
