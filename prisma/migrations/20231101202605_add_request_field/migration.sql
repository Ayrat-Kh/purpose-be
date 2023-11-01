/*
  Warnings:

  - You are about to drop the column `dreamJob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fearInLife` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hobby` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `professionSkills` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `prompt` on the `UserPrompts` table. All the data in the column will be lost.
  - Added the required column `request` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
  - Made the column `ambition` on table `UserPrompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fear` on table `UserPrompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `love` on table `UserPrompts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `talent` on table `UserPrompts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dreamJob",
DROP COLUMN "fearInLife",
DROP COLUMN "hobby",
DROP COLUMN "professionSkills";

-- AlterTable
ALTER TABLE "UserPrompts" DROP COLUMN "prompt",
ALTER COLUMN "ambition" SET NOT NULL,
ALTER COLUMN "ambition" DROP DEFAULT,
ALTER COLUMN "fear" SET NOT NULL,
ALTER COLUMN "fear" DROP DEFAULT,
ALTER COLUMN "love" SET NOT NULL,
ALTER COLUMN "love" DROP DEFAULT,
ALTER COLUMN "talent" SET NOT NULL,
ALTER COLUMN "talent" DROP DEFAULT;


ALTER TABLE "UserPrompts" ADD COLUMN "request" JSONB;
UPDATE "UserPrompts" SET "request" = '{}'::jsonb;
ALTER TABLE "UserPrompts" ALTER COLUMN "request" SET NOT NULL;