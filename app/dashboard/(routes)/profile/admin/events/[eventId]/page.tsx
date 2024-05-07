import { getEventById } from "@/actions/admin/get-event-by-id";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import CreateEventForm from "@/components/admin/events/CreateEventForm";
import EventPosterForm from "@/components/admin/events/EventPosterForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    eventId: string;
  };
};

const page = async (props: Props) => {
  const resource = await getEventById(props.params.eventId);
  if (!resource) return notFound();
  const gcpData = await getLatestFileMetaData(resource.id);
  return (
    <div className="h-full p-6">
      <Link href={`/dashboard/profile/admin/events/${resource.id}/attendees`} className="bg-primary text-white p-2 inline-block rounded-sm">
        Attendees
      </Link>
      <p>Event ID: {resource.slug}</p>
      <CreateEventForm
        title={resource.title}
        description={resource.description}
        isActive={resource.isActive}
        url={`/api/admin/events/${resource.id}`}
        method="PATCH"
        startDate={resource.startDate}
        endDate={resource.endDate}
      />
      <EventPosterForm
        initialData={resource}
        isDeleting={false}
        gcpData={gcpData}
      />
    </div>
  );
};

export default page;
