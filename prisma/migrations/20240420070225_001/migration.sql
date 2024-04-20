/*
  Warnings:

  - A unique constraint covering the columns `[eventId,attendeeId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_attendeeId_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_eventId_fkey";

-- DropIndex
DROP INDEX "Attendance_attendeeId_key";

-- DropIndex
DROP INDEX "Attendance_eventId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_eventId_attendeeId_key" ON "Attendance"("eventId", "attendeeId");
