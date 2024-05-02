import { getEventById } from "@/actions/admin/get-event-by-id";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import CreateEventForm from "@/components/admin/events/CreateEventForm";
import EventPosterForm from "@/components/admin/events/EventPosterForm";
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
      <CreateEventForm
        title={resource.title}
        description={resource.description}
        isActive={resource.isActive}
        url={`/api/admin/events/${resource.id}`}
        method="PATCH"
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
