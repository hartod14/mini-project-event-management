import { PrismaClient } from '@prisma/client';
import { eventSeed } from './event.seed';
import { userSeed } from './user.seed';
import { eventCategorySeed } from './event-category.seed';
import { citySeed } from './city.seed';
import { couponSeed } from './coupon.seed';
import { ticketTypeSeed } from './ticket-level.seed';
import { paymentMethodSeed } from './payment-method.seed';
import { transactionSeed } from './transaction.seed';
import { transactionTicketSeed } from './transaction-ticket.seed';
import { companyInformationSeed } from './company-information.seed';
import { faqSeed } from './faq.seed';
import { bannerSeed } from './banner.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({ data: citySeed });
  await prisma.eventCategory.createMany({ data: eventCategorySeed });
  await prisma.event.createMany({ data: eventSeed });
  await prisma.ticketType.createMany({ data: ticketTypeSeed });
  await prisma.user.createMany({ data: userSeed });
  await prisma.coupon.createMany({ data: couponSeed });
  await prisma.paymentMethod.createMany({ data: paymentMethodSeed });
  await prisma.transaction.createMany({ data: transactionSeed });
  await prisma.transactionTicket.createMany({ data: transactionTicketSeed });
  await prisma.companyInformation.create({ data: companyInformationSeed });
  await prisma.faq.createMany({ data: faqSeed });
  await prisma.banner.createMany({ data: bannerSeed });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
