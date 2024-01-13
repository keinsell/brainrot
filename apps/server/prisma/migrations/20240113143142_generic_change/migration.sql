-- CreateEnum
CREATE TYPE "PaymentProcessor" AS ENUM ('STRIPE', 'PAYPAL');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "accountV2Id" TEXT;

-- AlterTable
ALTER TABLE "VerificationRequest" ADD COLUMN     "accountV2Id" TEXT;

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountV2" (
    "id" TEXT NOT NULL,
    "app_metadata" JSONB NOT NULL DEFAULT '{}',
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "blocked_for" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "family_name" TEXT,
    "given_name" TEXT,
    "locale" TEXT DEFAULT 'en',
    "username" TEXT NOT NULL,
    "picture" TEXT,
    "name" TEXT,
    "nickname" TEXT,
    "phone_number" TEXT,
    "phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "user_metadata" JSONB NOT NULL DEFAULT '{}',
    "last_ip" TEXT,
    "last_login" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "AccountV2_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenAudit" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "tokenId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isRevoked" BOOLEAN NOT NULL,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "TokenAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingAddress" (
    "id" TEXT NOT NULL,

    CONSTRAINT "BillingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "processor" "PaymentProcessor" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePaymentMethod" (
    "id" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "stripePaymentMethodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StripePaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckoutItem" (
    "id" TEXT NOT NULL,
    "checkoutId" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "subtotal" INTEGER NOT NULL,
    "tax" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL,

    CONSTRAINT "CheckoutItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blob" (
    "id" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AccountToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AccountV2_email_key" ON "AccountV2"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountV2_username_key" ON "AccountV2"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToGroup_AB_unique" ON "_AccountToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToGroup_B_index" ON "_AccountToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToRole_AB_unique" ON "_AccountToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToRole_B_index" ON "_AccountToRole"("B");

-- AddForeignKey
ALTER TABLE "TokenAudit" ADD CONSTRAINT "TokenAudit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentMethod" ADD CONSTRAINT "StripePaymentMethod_id_fkey" FOREIGN KEY ("id") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGroup" ADD CONSTRAINT "_AccountToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGroup" ADD CONSTRAINT "_AccountToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
