/*
  Warnings:

  - You are about to drop the column `facebookId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth0Id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_facebookId_idx";

-- DropIndex
DROP INDEX "User_facebookId_key";

-- DropIndex
DROP INDEX "User_googleId_idx";

-- DropIndex
DROP INDEX "User_googleId_key";

-- DropIndex
DROP INDEX "User_linkedinId_idx";

-- DropIndex
DROP INDEX "User_linkedinId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "facebookId",
DROP COLUMN "googleId",
DROP COLUMN "linkedinId",
ADD COLUMN     "auth0Id" VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id" DESC);

-- CreateIndex
CREATE INDEX "User_auth0Id_idx" ON "User" USING HASH ("auth0Id");
