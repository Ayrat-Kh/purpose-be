/*
  Warnings:

  - Made the column `hobby` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hobby" SET NOT NULL,
ALTER COLUMN "hobby" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserPrompts" ALTER COLUMN "prompt" SET DATA TYPE VARCHAR(16000),
ALTER COLUMN "responseMessage" SET DATA TYPE VARCHAR(16000);
