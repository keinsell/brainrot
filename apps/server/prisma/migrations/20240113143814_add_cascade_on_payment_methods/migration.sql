-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_accountId_fkey";

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
