-- DropForeignKey
ALTER TABLE "EmailLog" DROP CONSTRAINT "EmailLog_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "UnsubscribeLog" DROP CONSTRAINT "UnsubscribeLog_newsletterId_fkey";

-- AlterTable
ALTER TABLE "EmailLog" ALTER COLUMN "newsletterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UnsubscribeLog" ALTER COLUMN "newsletterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EmailLog" ADD CONSTRAINT "EmailLog_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnsubscribeLog" ADD CONSTRAINT "UnsubscribeLog_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
