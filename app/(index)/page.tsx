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
      default: event?.title ?? "Default Title",
      template: `%s | ${event?.title ?? "Default Title"}`,
    },
    description: event?.description || "PES Events",
    alternates: {
      canonical: "/",
    },
    socialBanner: "/poster.jpeg",
    // twitter: "https://twitter.com/PrivateEquityAF",
    // facebook: "https://www.facebook.com/privateequityea/",
    // youtube: "https://www.youtube.com/@PrivateEquitySupport/",
    // linkedin: "https://linkedin.com/company/privateequityaf",
    // instagram: "https://www.instagram.com/privateequityaf/",
    siteUrl: "https://events.privateequity-support.com",
    siteLogo: "/events-logo.png",
    ogImage: "/poster.jpeg",
    ogUrl: "https://events.privateequity-support.com/",
    author: "Private Equity support",
    robots: "index, follow",
    ogTitle: event?.title ?? "Default Title",
    keywords: [
      "PES",
      "Events",
      "Private Equity",
      event?.title ?? "Default Title",
      "#CyberHygiene",
      "#CyberHygiene4SMEs",
    ],
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
