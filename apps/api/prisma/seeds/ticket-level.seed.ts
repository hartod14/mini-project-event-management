import { Prisma } from "@prisma/client";

export const ticketTypeSeed: Prisma.TicketTypeCreateManyInput[] = [
  { event_id: 1, name: "Early Bird", price: 40000, quota: 100, purchaseable_limit_time: new Date('2025-04-01T23:59:59Z') },
  { event_id: 1, name: "Regular", price: 70000, quota: 200, purchaseable_limit_time: new Date('2025-05-09T23:59:59Z') },
  { event_id: 1, name: "VIP", price: 140000, quota: 50, purchaseable_limit_time: new Date('2025-05-09T23:59:59Z') },

  { event_id: 2, name: "General Admission", price: 50000, quota: 500, purchaseable_limit_time: new Date('2025-06-10T23:59:59Z') },
  { event_id: 2, name: "VIP Pass", price: 109000, quota: 100, purchaseable_limit_time: new Date('2025-06-10T23:59:59Z') },

  { event_id: 3, name: "Standard", price: 30000, quota: 300, purchaseable_limit_time: new Date('2025-07-01T23:59:59Z') },
  { event_id: 3, name: "Premium", price: 80000, quota: 150, purchaseable_limit_time: new Date('2025-07-01T23:59:59Z') },
  { event_id: 3, name: "VIP Lounge", price: 109000, quota: 50, purchaseable_limit_time: new Date('2025-07-01T23:59:59Z') },
  { event_id: 3, name: "Backstage Pass", price: 209000, quota: 20, purchaseable_limit_time: new Date('2025-07-01T23:59:59Z') },
];