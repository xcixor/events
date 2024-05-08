import { getEventAttendees } from "@/actions/admin/get-event-attendees";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  params: {
    eventId: string;
  };
};

const page = async (props: Props) => {
  const attendees = await getEventAttendees(props.params.eventId);
  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl">Attendees</h1>
      {attendees.map((attendee) => (
        <div
          key={attendee.id}
          className={cn("flex gap-2 bg-slate-100 p-4", {
            "bg-slate-300": attendees.indexOf(attendee) % 2 !== 0,
          })}
        >
          <p>{attendee.name}</p>
          <p>{attendee.email}</p>
          <p>{attendee.phoneNumber}</p>
          <p>{attendee.company}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
