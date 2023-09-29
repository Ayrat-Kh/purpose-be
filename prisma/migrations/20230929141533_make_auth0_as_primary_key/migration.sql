
/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `auth0Id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserPrompts" DROP CONSTRAINT "UserPrompts_userId_fkey";

-- DropIndex
DROP INDEX "User_auth0Id_idx";

-- DropIndex
DROP INDEX "User_auth0Id_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey";
ALTER TABLE "User" DROP COLUMN "id";

ALTER TABLE "User" ALTER COLUMN "auth0Id" DROP NOT NULL;
ALTER TABLE "User" RENAME COLUMN "auth0Id" TO "id";
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserPrompts" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(70);

-- AddForeignKey
ALTER TABLE "UserPrompts" ADD CONSTRAINT "UserPrompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
