import { Prisma } from "@prisma/client";

//all password = user123

export const paymentMethodSeed: Prisma.PaymentMethodCreateManyInput[] = [
  {
    id: 1,
    account_name: 'PT EVENT TIC JAYA',
    account_number: "45456457897",
    logo: 'bca'
  },
  {
    id: 2,
    account_name: 'PT EVENT TIC JAYA',
    account_number: "1234804567",
    logo: 'bri'
  },
  {
    id: 3,
    account_name: 'PT EVENT TIC JAYA',
    account_number: "032465456445",
    logo: 'mandiri'
  },
];
