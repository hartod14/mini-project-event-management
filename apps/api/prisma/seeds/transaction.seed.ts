import { Prisma } from "@prisma/client";

//all password = user123

export const transactionSeed: Prisma.TransactionCreateManyInput[] = [
  {
    id: 1,
    event_id: 1,
    payment_method_id: 1,
    user_id: 1,
    payment_status: "WAITING_FOR_PAYMENT",
    total_price: 180000,
    transaction_number: "trx-123456",
    payment_date: null,
    payment_proof: null,
    point_used: null,
    coupon_user_id: null,
    voucher_event_id: null,
  },
  {
    id: 2,
    event_id: 2,
    payment_method_id: 2,
    user_id: 1,
    payment_status: "WAITING_FOR_ADMIN_CONFIRMATION",
    total_price: 109000,
    transaction_number: "trx-789010",
    payment_date: new Date(),
    payment_proof: "https://res.cloudinary.com/dv1ehfskz/image/upload/v1739882453/ttfeiwytaz9gll6w8mzy.jpg",
    point_used: null,
    coupon_user_id: null,
    voucher_event_id: null,
  },
];
