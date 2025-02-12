import prisma from "@/prisma"

class CategoryService {
    async getList() {
        return await prisma.eventCategory.findMany()
    }
}

export default new CategoryService()