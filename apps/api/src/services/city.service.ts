import prisma from "@/prisma";

class CityService {
    async getList() {
        return await prisma.city.findMany()
    }
}

export default new CityService();