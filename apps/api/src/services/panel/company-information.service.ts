import prisma from '@/prisma';
import { Request } from 'express';
class PanelCompanyInformationService {
  async getById(req: Request) {
    const id = Number(req.params.id);
    return await prisma.companyInformation.findUnique({
      where: {
        id,
      },
    });
  }
  async update(req: Request) {
    const { id } = req.params;
    const { about_us, address, email, phone, social_media } = req.body;
    return await prisma.companyInformation.update({
      where: { id: Number(id) },
      data: {
        about_us,
        address,
        email,
        phone,
        social_media,
      },
    });
  }
}

export default new PanelCompanyInformationService ();