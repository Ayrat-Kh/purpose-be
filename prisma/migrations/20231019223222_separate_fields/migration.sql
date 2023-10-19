/*
 Warnings:
 
 - You are about to drop the column `responseMessage` on the `UserPrompts` table. All the data in the column will be lost.
 - Added the required column `ambition` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
 - Added the required column `fear` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
 - Added the required column `love` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
 - Added the required column `statement` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
 - Added the required column `talent` to the `UserPrompts` table without a default value. This is not possible if the table is not empty.
 
 */
-- AlterTable
ALTER TABLE
  "UserPrompts" RENAME COLUMN "responseMessage" TO "statement";

ALTER TABLE
  "UserPrompts"
ADD
  COLUMN "ambition" VARCHAR(8000) DEFAULT '',
ADD
  COLUMN "fear" VARCHAR(8000) DEFAULT '',
ADD
  COLUMN "love" VARCHAR(8000) DEFAULT '',
ADD
  COLUMN "talent" VARCHAR(8000) DEFAULT '';