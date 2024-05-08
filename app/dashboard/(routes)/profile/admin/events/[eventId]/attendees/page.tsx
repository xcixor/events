import { getEventAttendees } from "@/actions/admin/get-event-attendees";
import ExportToExcel from "@/components/admin/events/ExportToExcel";
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
      <ExportToExcel data={attendees} />
      {attendees.map((attendee) => (
        <div
          key={attendee.id}
          className={cn("flex justify-between bg-slate-100 p-4", {
            "bg-slate-300": attendees.indexOf(attendee) % 2 !== 0,
          })}
        >
          <p className="flex-1">{attendee.name}</p>
          <p className="flex-1">{attendee.email}</p>
          <p className="flex-1">{attendee.phoneNumber}</p>
          <p className="flex-1">{attendee.company}</p>
        </div>
      ))}
      <h3 className="text-xl font-semibold">Total: {attendees.length}</h3>
    </div>
  );
};

export default page;
