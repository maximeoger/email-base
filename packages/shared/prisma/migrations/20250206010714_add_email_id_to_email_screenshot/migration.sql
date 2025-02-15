/*
  Warnings:

  - A unique constraint covering the columns `[emailId]` on the table `EmailScreenshot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailId` to the `EmailScreenshot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailScreenshot" ADD COLUMN     "emailId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailScreenshot_emailId_key" ON "EmailScreenshot"("emailId");
