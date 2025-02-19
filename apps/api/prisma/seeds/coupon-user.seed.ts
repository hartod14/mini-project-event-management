import { Prisma } from "@prisma/client";

//all password = user123

export const couponUserSeed: Prisma.CouponUserCreateManyInput[] = [
  {
    id: 1,
    coupon_id: 1,
    user_id: 1
  },
  {
    id: 2,
    coupon_id: 1,
    user_id: 2
  },
];
