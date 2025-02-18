import { Prisma } from "@prisma/client";

//all password = user123

export const userSeed: Prisma.UserCreateManyInput[] = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '1234567890',
    password: '$2a$12$s04QDF9eMHocZ92VCRdwEOUpR6QrkLzU6JCwyae9JyWonQPkAHoXG',
    profile_photo: 'https://example.com/images/alice.jpg',
    referral_code: 'REF12345',
    point: 10000,
    is_verified: 'YES',
    role: 'EVENT_ORGANIZER',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    phone: '0987654321',
    password: '$2a$12$s04QDF9eMHocZ92VCRdwEOUpR6QrkLzU6JCwyae9JyWonQPkAHoXG',
    profile_photo: 'https://example.com/images/bob.jpg',
    referral_code: 'REF67890',
    point: 25000,
    is_verified: 'YES',
    role: 'CUSTOMER',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    phone: '1122334455',
    password: '$2a$12$s04QDF9eMHocZ92VCRdwEOUpR6QrkLzU6JCwyae9JyWonQPkAHoXG',
    profile_photo: 'https://example.com/images/charlie.jpg',
    referral_code: 'REF13579',
    point: 75000,
    is_verified: 'YES',
    role: 'EVENT_ORGANIZER',
  },
];
