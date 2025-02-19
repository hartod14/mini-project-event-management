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
import { voucherSeed } from './voucher.seed';
import { voucherEventSeed } from './voucher-event.seed';
import { couponUserSeed } from './coupon-user.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.city.createMany({ data: citySeed });
  await prisma.companyInformation.create({ data: companyInformationSeed });
  await prisma.faq.createMany({ data: faqSeed });
  await prisma.banner.createMany({ data: bannerSeed });
  await prisma.user.createMany({ data: userSeed });
  await prisma.paymentMethod.createMany({ data: paymentMethodSeed });

  await prisma.eventCategory.createMany({ data: eventCategorySeed });
  await prisma.event.createMany({ data: eventSeed });
  ;
  await prisma.coupon.createMany({ data: couponSeed });
  await prisma.couponUser.createMany({ data: couponUserSeed });
  await prisma.ticketType.createMany({ data: ticketTypeSeed })
  await prisma.voucher.createMany({ data: voucherSeed });
  await prisma.voucherEvent.createMany({ data: voucherEventSeed });

  await prisma.transaction.createMany({ data: transactionSeed });
  await prisma.transactionTicket.createMany({ data: transactionTicketSeed });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
