/*
  Warnings:

  - You are about to drop the column `delivery_time` on the `Order` table. All the data in the column will be lost.
  - Added the required column `delivery_time_minutes` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "delivery_time",
ADD COLUMN     "delivery_time_minutes" INTEGER NOT NULL;
