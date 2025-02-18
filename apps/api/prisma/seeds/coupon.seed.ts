import { Prisma } from "@prisma/client";

//all password = user123

export const couponSeed: Prisma.CouponCreateManyInput[] = [
    {
        id: 1,
        name: 'Coupon Referral',
        price: 10000
    },
];
