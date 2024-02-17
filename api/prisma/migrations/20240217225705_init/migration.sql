-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailLog" (
    "id" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emailsSent" INTEGER NOT NULL,
    "newsletterId" TEXT NOT NULL,

    CONSTRAINT "EmailLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnsubscribeLog" (
    "id" TEXT NOT NULL,
    "newsletterId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UnsubscribeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsletterToRecipient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_email_key" ON "Recipient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsletterToRecipient_AB_unique" ON "_NewsletterToRecipient"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsletterToRecipient_B_index" ON "_NewsletterToRecipient"("B");

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsubscribeLog" ADD CONSTRAINT "UnsubscribeLog_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsubscribeLog" ADD CONSTRAINT "UnsubscribeLog_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterToRecipient" ADD CONSTRAINT "_NewsletterToRecipient_A_fkey" FOREIGN KEY ("A") REFERENCES "Newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterToRecipient" ADD CONSTRAINT "_NewsletterToRecipient_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
