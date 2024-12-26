/*
  Warnings:

  - You are about to alter the column `btc` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `eth` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `matic` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `total_in_usdt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `usdt` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "btc" SET DATA TYPE INTEGER,
ALTER COLUMN "eth" SET DATA TYPE INTEGER,
ALTER COLUMN "matic" SET DATA TYPE INTEGER,
ALTER COLUMN "total_in_usdt" SET DATA TYPE INTEGER,
ALTER COLUMN "usdt" SET DATA TYPE INTEGER;
