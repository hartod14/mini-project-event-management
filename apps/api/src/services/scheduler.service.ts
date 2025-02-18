
import { prisma } from '../config';
import { appendFileSync } from "fs";
import path from "path";

export const resetExpiredPoints = async () => {
    try {
        const result = await prisma.user.updateMany({
            where: {
                point_expire: {
                    lt: new Date(),
                },
            },
            data: {
                point: 0,
            },
        });
        let logMessage = `Updated ${result.count} users with expired points.`

        appendFileSync(path.resolve(__dirname, "../../log.txt"), logMessage);
    } catch (error) {
        let logMessage = `Error updating expired points:, ${error}`

        appendFileSync(path.resolve(__dirname, "../../log.txt"), logMessage);
    }
};

export const resetCouponExpired = async () => {
    try {
        const result = await prisma.couponUser.updateMany({
            where: {
                created_at: {
                    lt: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                },
                deleted_at: null, 
            },
            data: {
                deleted_at: new Date(),
            },
        });

        let logMessage = `[${new Date().toISOString()}] ✅ Updated ${result.count} expired coupons.\n`;
        appendFileSync(path.resolve(__dirname, "../../log.txt"), logMessage);
    } catch (error) {
        let logMessage = `[${new Date().toISOString()}] ❌ Error updating expired coupons: ${error}\n`;
        appendFileSync(path.resolve(__dirname, "../../log.txt"), logMessage);
    }
};