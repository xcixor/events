import { getEventById } from "@/actions/admin/get-event-by-id";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
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
      <EventPosterForm
        initialData={resource}
        isDeleting={false}
        gcpData={gcpData}
      />
    </div>
  );
};

export default page;
