/*
  Warnings:

  - Added the required column `dreamJob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fearInLife` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefessionSkills` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dreamJob" VARCHAR(300) NOT NULL,
ADD COLUMN     "fearInLife" VARCHAR(300) NOT NULL,
ADD COLUMN     "professionSkills" VARCHAR(300) NOT NULL;
