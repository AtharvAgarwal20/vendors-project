/*
  Warnings:

  - Made the column `addressLine1` on table `Vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vendor" ALTER COLUMN "addressLine1" SET NOT NULL,
ALTER COLUMN "addressLine2" DROP NOT NULL;
