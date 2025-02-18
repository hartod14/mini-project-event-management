import { Prisma } from "@prisma/client";

//all password = user123

export const transactionTicketSeed: Prisma.TransactionTicketCreateManyInput[] = [
  {
    id: 1,
    ticket_type_id: 1,
    transaction_id: 1
  },
  {
    id: 2,
    ticket_type_id: 3,
    transaction_id: 1
  },
  {
    id: 3,
    ticket_type_id: 5,
    transaction_id: 2
  },
];
