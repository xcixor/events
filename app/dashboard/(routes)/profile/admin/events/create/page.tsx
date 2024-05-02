import CreateEventForm from "@/components/admin/events/CreateEventForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-6">
      <CreateEventForm />
    </div>
  );
};

export default page;
