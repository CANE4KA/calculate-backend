/*
  Warnings:

  - You are about to drop the column `balance` on the `user` table. All the data in the column will be lost.
  - Added the required column `total_in_usdt` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "balance",
ADD COLUMN     "btc" INTEGER,
ADD COLUMN     "eth" INTEGER,
ADD COLUMN     "matic" INTEGER,
ADD COLUMN     "total_in_usdt" INTEGER NOT NULL,
ADD COLUMN     "usdt" INTEGER;
