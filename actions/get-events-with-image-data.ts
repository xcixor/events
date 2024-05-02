import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { getLatestFileMetaData } from "./get-latest-file-metadata";

export const getEventsWithImageData = async () => {
  try {
    const events = await db.event.findMany({});
    const eventsWithImages = await Promise.all(
      events.map(async (event) => {
        const gcpData = await getLatestFileMetaData(event.id);
        return {
          ...event,
          image: gcpData?.downloadUrl,
        };
      }),
    );

    return eventsWithImages;
  } catch (error) {
    console.log("[GET_COACHES_WITH_PROFILES]", error);
    return [];
  }
};
