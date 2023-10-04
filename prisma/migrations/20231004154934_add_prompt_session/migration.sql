/*
  Warnings:

  - Added the required column `response` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPrompts" ADD COLUMN     "response" VARCHAR(4000) NOT NULL,
ADD COLUMN     "sessionId" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE INDEX "UserPrompts_sessionId_idx" ON "UserPrompts" USING HASH ("sessionId");
