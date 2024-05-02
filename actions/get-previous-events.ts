import { db } from "@/lib/db";

export const getPreviousEvents = async () => {
  try {
    const today = new Date();
    const previousEvents = await db.event.findMany({
      where: {
        endDate: {
          lt: today,
        },
      },
    });
    return previousEvents;
  } catch (error) {
    console.log("[EVENT_ERROR]", error);
    return [];
  }
};
