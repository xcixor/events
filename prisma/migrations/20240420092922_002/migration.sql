/*
  Warnings:

  - Added the required column `company` to the `Attendee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendee" ADD COLUMN     "company" TEXT NOT NULL;
