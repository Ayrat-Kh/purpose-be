-- CreateIndex
CREATE INDEX "UserPrompts_status_idx" ON "UserPrompts" USING HASH ("status");
