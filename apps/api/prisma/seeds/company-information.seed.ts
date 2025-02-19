import { Prisma } from "@prisma/client";

export const companyInformationSeed: Prisma.CompanyInformationCreateInput = {
    about_us: "Eventic is your go-to platform for discovering and purchasing tickets to a wide range of events. We strive to provide a seamless and enjoyable experience for event-goers.",
    address: "123 Main Street, Cityville, State 12345",
    email: "info@eventic.com",
    phone: "+15551234567",
    social_media: `[
        { "name": "instagram", "link": "instagram/eventic" },
        { "name": "facebook", "link": "facebook/eventic" },
        { "name": "twitter", "link": "twitter/eventic" }
      ]`,
};