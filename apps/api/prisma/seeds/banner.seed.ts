import { Prisma } from "@prisma/client";

const bannerImageUrl = "https://example.com/banner-image.jpg";

export const bannerSeed: Prisma.BannerCreateManyInput[] = [
    {
        name: "Summer Music Festival Banner",
        image: bannerImageUrl,
    },
    {
        name: "Tech Conference Early Bird Offer",
        image: bannerImageUrl,
    },
    {
        name: "Comedy Show Discount Tickets",
        image: bannerImageUrl,
    },
]