import { Prisma } from "@prisma/client";

//all password = user123

export const voucherSeed: Prisma.VoucherCreateManyInput[] = [
  {
    id: 1,
    name: "Voucher Mania",
    price: 20000,
    start_date: new Date('2025-01-01T00:00:00Z'),
    end_date: new Date('2026-01-01T00:00:00Z'),
  },
  {
    id: 2,
    name: "Special For you",
    price: 10000,
    start_date: new Date('2025-01-01T00:00:00Z'),
    end_date: new Date('2025-06-01T00:00:00Z'),
  },
];
