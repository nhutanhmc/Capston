/*
  Warnings:

  - You are about to drop the column `runnerId` on the `Recommendation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recommendation" DROP CONSTRAINT "Recommendation_runnerId_fkey";

-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "runnerId",
ADD COLUMN     "alertId" TEXT,
ADD COLUMN     "expertId" TEXT;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "Expert"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recommendation" ADD CONSTRAINT "Recommendation_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "HealthAlert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
