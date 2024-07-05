import { getEventsWithImageData } from "@/actions/get-events-with-image-data";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const events = await getEventsWithImageData();

  // Ensure TypeScript knows createdAt is a date
  events.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA; // sort in descending order
  });

  return (
    <MaxWidthWrapper>
      <h1 className="py-4 text-3xl font-bold">PES Events</h1>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <Link href={`/pes-events/${event.slug}`} key={event.id}>
            <div className="flex flex-col md:flex-row gap-2 p-4 md:p-8 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              <div className="flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={200}
                  height={200}
                  className="w-full h-auto md:w-[200px] md:h-[200px]"
                />
              </div>
              <div className="flex flex-col gap-2 mt-4 md:mt-0">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default page;