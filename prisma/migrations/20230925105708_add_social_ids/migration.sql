/*
  Warnings:

  - Added the required column `facebookId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedinId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "facebookId" CHAR(30) NOT NULL,
ADD COLUMN     "googleId" CHAR(30) NOT NULL,
ADD COLUMN     "linkedinId" CHAR(30) NOT NULL;
