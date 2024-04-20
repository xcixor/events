import type { Metadata } from "next";
import CookieConsent from "@/components/index/CookieBanner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentEvent } from "@/actions/get-current-event";
import Event from "@/components/events/Event";
import Registration from "@/components/registration/Registration";

export async function generateMetadata() {
  const event = await getCurrentEvent();
  return {
    title: {
      default: "PES Events",
      template: `%s | ${event?.title}`,
    },
    description: event?.description || "PES Events",
    alternates: {
      canonical: "/",
    },
  };
}

export default async function Index() {
  const event = await getCurrentEvent();

  return (
    <MaxWidthWrapper>
      <main className="flex flex-col ">
        <div className="space-y-4 bg-slate-100 p-4">
          <h1 className="text-2xl md:text-3xl">{event?.title}</h1>
          <p className="text-[0.9rem] md:text-lg">{event?.description}</p>
        </div>
        <div className="items-center justify-between gap-8 md:flex">
          <div className="flex-1">
            <Event />
          </div>
          <div className="flex-1 p-8 md:p-4">
            <Registration eventId={event?.id} />
          </div>
        </div>
        <CookieConsent />
      </main>
    </MaxWidthWrapper>
  );
}
