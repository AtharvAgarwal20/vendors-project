/*
  Warnings:

  - You are about to drop the column `creatorEmail` on the `Vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "creatorEmail",
ADD COLUMN     "email" TEXT NOT NULL DEFAULT 'samurai.atharv@gmail.com';
