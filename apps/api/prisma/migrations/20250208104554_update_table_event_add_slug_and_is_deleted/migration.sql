/*
  Warnings:

  - The values [EVENT_ORGANIZER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deleted_at` on the `transaction_tickets` table. All the data in the column will be lost.
  - You are about to drop the column `email_sent` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `banners` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('CUSTOMER', 'EVENT_ORGRANIZER');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';
COMMIT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "isDeleted" TIMESTAMP(3),
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction_tickets" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "email_sent",
ALTER COLUMN "point_used" DROP DEFAULT;

-- DropTable
DROP TABLE "banners";

-- DropEnum
DROP TYPE "EmailSent";

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");
