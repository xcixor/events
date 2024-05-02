import { db } from "@/lib/db";

export const getEventBySlug = async (slug: string) => {
  try {
    const event = await db.event.findFirst({
      where: {
        slug,
      },
    });
    return event;
  } catch (error) {
    console.log("[EVENT_ERROR]", error);
    return null;
  }
};
