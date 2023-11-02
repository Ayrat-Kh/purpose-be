/*
  Warnings:

  - Added the required column `status` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PromptStatus" AS ENUM ('CREATED', 'EXECUTED');

-- AlterTable
ALTER TABLE "UserPrompts" ADD COLUMN "status" "PromptStatus";
UPDATE "UserPrompts" SET "status" = 'EXECUTED';
ALTER TABLE "UserPrompts" ALTER COLUMN "status" SET NOT NULL;
