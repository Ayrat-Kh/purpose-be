/*
  Warnings:

  - You are about to drop the column `response` on the `UserPrompts` table. All the data in the column will be lost.
  - Added the required column `responseMessage` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPrompts" DROP COLUMN "response",
ADD COLUMN     "responseMessage" VARCHAR(4000) NOT NULL;

-- CreateIndex
CREATE INDEX "UserPrompts_createdAt_idx" ON "UserPrompts"("createdAt");
