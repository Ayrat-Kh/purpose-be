-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" CHAR(50) NOT NULL,
    "givenName" CHAR(50) NOT NULL,
    "familyName" CHAR(50) NOT NULL,
    "phoneNumber" CHAR(20) NOT NULL,
    "dreamDescription" CHAR(300) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPrompts" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" CHAR(200) NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPrompts" ADD CONSTRAINT "UserPrompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
