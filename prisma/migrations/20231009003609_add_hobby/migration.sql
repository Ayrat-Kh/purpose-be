/*
  Warnings:

  - You are about to drop the column `dreamDescription` on the `User` table. All the data in the column will be lost.
  - Added the required column `hobby` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dreamDescription",
ADD COLUMN     "hobby" VARCHAR(300) NOT NULL;
