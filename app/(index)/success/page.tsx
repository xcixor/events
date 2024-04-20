import { getCurrentEvent } from "@/actions/get-current-event";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { CheckCircle } from "lucide-react";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const event = await getCurrentEvent();
  return (
    <MaxWidthWrapper className="flex h-full flex-col items-center justify-center px-4 py-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <h1 className="text-lg text-zinc-700 md:text-2xl">
          Thank you for registering for {event?.title}
        </h1>
        <p className="md:text-xl text-[0.9rem] text-zinc-600">We will get back to you soon</p>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
