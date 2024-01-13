/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AccountV2` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BillingAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blob` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Checkout` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CheckoutItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShippingAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StripePaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TokenAudit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AccountToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EmailVerificationStatus" AS ENUM ('VERIFIED', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "PaymentProcessor" AS ENUM ('STRIPE', 'PAYPAL');

-- DropForeignKey
ALTER TABLE "public"."Cart" DROP CONSTRAINT "Cart_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Checkout" DROP CONSTRAINT "Checkout_cartId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Checkout" DROP CONSTRAINT "Checkout_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Checkout" DROP CONSTRAINT "Checkout_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_payerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PaymentMethod" DROP CONSTRAINT "PaymentMethod_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Session" DROP CONSTRAINT "Session_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."StripePaymentMethod" DROP CONSTRAINT "StripePaymentMethod_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TokenAudit" DROP CONSTRAINT "TokenAudit_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserMetadata" DROP CONSTRAINT "UserMetadata_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."VerificationRequest" DROP CONSTRAINT "VerificationRequest_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AccountToGroup" DROP CONSTRAINT "_AccountToGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AccountToGroup" DROP CONSTRAINT "_AccountToGroup_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AccountToRole" DROP CONSTRAINT "_AccountToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AccountToRole" DROP CONSTRAINT "_AccountToRole_B_fkey";

-- DropTable
DROP TABLE "public"."Account";

-- DropTable
DROP TABLE "public"."AccountV2";

-- DropTable
DROP TABLE "public"."BillingAddress";

-- DropTable
DROP TABLE "public"."Blob";

-- DropTable
DROP TABLE "public"."Cart";

-- DropTable
DROP TABLE "public"."CartItem";

-- DropTable
DROP TABLE "public"."Checkout";

-- DropTable
DROP TABLE "public"."CheckoutItem";

-- DropTable
DROP TABLE "public"."Group";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."PaymentMethod";

-- DropTable
DROP TABLE "public"."Product";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."Session";

-- DropTable
DROP TABLE "public"."ShippingAddress";

-- DropTable
DROP TABLE "public"."StripePaymentMethod";

-- DropTable
DROP TABLE "public"."TokenAudit";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserMetadata";

-- DropTable
DROP TABLE "public"."VerificationRequest";

-- DropTable
DROP TABLE "public"."_AccountToGroup";

-- DropTable
DROP TABLE "public"."_AccountToRole";

-- DropEnum
DROP TYPE "public"."EmailVerificationStatus";

-- DropEnum
DROP TYPE "public"."PaymentProcessor";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerificationStatus" "EmailVerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountV2Id" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "VerificationRequest" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountV2Id" TEXT,

    CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "avatar" TEXT,
    "billingAddress" JSONB,
    "shippingAddress" JSONB,
    "about" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "UserMetadata" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Checkout" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Checkout_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Account_username_key" ON "Account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_key" ON "Group"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AccountV2_email_key" ON "AccountV2"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountV2_username_key" ON "AccountV2"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_accountId_key" ON "User"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_profileId_key" ON "Cart"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Checkout_cartId_key" ON "Checkout"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "Checkout_paymentId_key" ON "Checkout"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToGroup_AB_unique" ON "_AccountToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToGroup_B_index" ON "_AccountToGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AccountToRole_AB_unique" ON "_AccountToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_AccountToRole_B_index" ON "_AccountToRole"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenAudit" ADD CONSTRAINT "TokenAudit_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationRequest" ADD CONSTRAINT "VerificationRequest_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetadata" ADD CONSTRAINT "UserMetadata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentMethod" ADD CONSTRAINT "PaymentMethod_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentMethod" ADD CONSTRAINT "StripePaymentMethod_id_fkey" FOREIGN KEY ("id") REFERENCES "PaymentMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkout" ADD CONSTRAINT "Checkout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckoutItem" ADD CONSTRAINT "CheckoutItem_checkoutId_fkey" FOREIGN KEY ("checkoutId") REFERENCES "Checkout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGroup" ADD CONSTRAINT "_AccountToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToGroup" ADD CONSTRAINT "_AccountToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountToRole" ADD CONSTRAINT "_AccountToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
