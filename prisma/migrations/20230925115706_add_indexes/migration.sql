/*
  Warnings:

  - A unique constraint covering the columns `[linkedinId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[facebookId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_linkedinId_key" ON "User"("linkedinId" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "User_facebookId_key" ON "User"("facebookId" DESC);

-- CreateIndex
CREATE INDEX "User_linkedinId_idx" ON "User" USING HASH ("linkedinId");

-- CreateIndex
CREATE INDEX "User_googleId_idx" ON "User" USING HASH ("googleId");

-- CreateIndex
CREATE INDEX "User_facebookId_idx" ON "User" USING HASH ("facebookId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User" USING HASH ("email");
