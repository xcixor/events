import CreateEventForm from "@/components/admin/events/CreateEventForm";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="p-6">
      <CreateEventForm
        title={""}
        description={""}
        isActive={false}
        url="/api/admin/events"
        method="POST"
      />
    </div>
  );
};

export default page;
