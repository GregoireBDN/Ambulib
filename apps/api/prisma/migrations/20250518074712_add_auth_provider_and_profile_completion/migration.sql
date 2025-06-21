/*
  Warnings:

  - You are about to drop the column `medicalCondition` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequirements` on the `Dependent` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCondition` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `specialRequirements` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIALS', 'GOOGLE');

-- AlterTable
ALTER TABLE "Dependent" DROP COLUMN "medicalCondition",
DROP COLUMN "notes",
DROP COLUMN "specialRequirements",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'France',
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postalCode" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "medicalCondition",
DROP COLUMN "notes",
DROP COLUMN "specialRequirements",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "authProvider" "AuthProvider" NOT NULL DEFAULT 'CREDENTIALS',
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'France',
ADD COLUMN     "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postalCode" TEXT;
