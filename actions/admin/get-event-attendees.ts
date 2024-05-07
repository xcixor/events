import { db } from "@/lib/db";

export const getEventAttendees = async (id: string) => {
  try {
    const attendances = await db.attendance.findMany({
      where: {
        eventId: id,
      },
    });

    
    const attendees = [];
    for (const attendance of attendances) {
      const attendee = await db.attendee.findFirst({
        where: {
          id: attendance.attendeeId,
        },
      });
      if (attendee) {
        attendees.push(attendee);
      }
    }

    return attendees;
  } catch (error) {
    console.log("[EVENT_ERROR]", error);
    return null;
  }
};
