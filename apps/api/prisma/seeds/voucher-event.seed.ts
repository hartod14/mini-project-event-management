import { Prisma } from "@prisma/client";

//all password = user123

export const voucherEventSeed: Prisma.VoucherEventCreateManyInput[] = [
  {
    id: 1,
    event_id: 1,
    voucher_id: 1
  },
  {
    id: 2,
    event_id: 1,
    voucher_id: 2
  },
  {
    id: 3,
    event_id: 2,
    voucher_id: 1
  },
];
