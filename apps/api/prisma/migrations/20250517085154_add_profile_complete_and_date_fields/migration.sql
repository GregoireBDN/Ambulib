/*
  Warnings:

  - The values [EDITOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SpecialRequirements" AS ENUM ('NEEDS_OXYGEN', 'NEEDS_LYING_TRANSPORT', 'ALLERGIES', 'MEDICATIONS');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'DRIVER', 'USER');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "medicalCondition" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "specialRequirements" "SpecialRequirements"[];

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT,
    "relationship" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependent" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER,
    "notes" TEXT,
    "medicalCondition" TEXT,
    "specialRequirements" "SpecialRequirements"[],
    "userId" INTEGER,

    CONSTRAINT "Dependent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyContact_userId_key" ON "EmergencyContact"("userId");

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dependent" ADD CONSTRAINT "Dependent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
