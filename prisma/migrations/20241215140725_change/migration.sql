-- AlterTable
ALTER TABLE "user" ALTER COLUMN "btc" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "eth" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "matic" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "total_in_usdt" DROP NOT NULL,
ALTER COLUMN "total_in_usdt" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "usdt" SET DATA TYPE DECIMAL(65,30);
