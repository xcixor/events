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
      default: event?.title ?? "PES Events",
      template: `%s | ${event?.title ?? "PES Events"}`,
    },
    description: event?.description || "PES Events",
    alternates: {
      canonical: "/",
    },
    socialBanner: "https://storage.googleapis.com/pes_public/poster.jpeg",
    // twitter: "https://twitter.com/PrivateEquityAF",
    // facebook: "https://www.facebook.com/privateequityea/",
    // youtube: "https://www.youtube.com/@PrivateEquitySupport/",
    // linkedin: "https://linkedin.com/company/privateequityaf",
    // instagram: "https://www.instagram.com/privateequityaf/",
    siteUrl: "https://events.privateequity-support.com",
    siteLogo: "https://storage.googleapis.com/pes_public/events-logo.png",
    openGraph: {
      type: "website",
      description: event?.description || "PES Events",
      images: ["https://storage.googleapis.com/pes_public/poster.jpeg"],
      title: event?.title ?? "PES Events",
      siteName: event.title ?? "PES Events",
      locale: "en_US",
      url: "https://events.privateequity-support.com/",
    },
    twitter: {
      title: event?.title ?? "PES Events",
      description: event?.description || "PES Events",
      image: "https://storage.googleapis.com/pes_public/poster.jpeg",
      handle: "@PrivateEquityAF",
      card: "summary_large_image",
      site: "@PrivateEquityAF",
      creator: "@PrivateEquityAF",
    },
    facebook: {
      publisher: "privateequityea",
      app_id: "privateequityea",
      images: ["https://storage.googleapis.com/pes_public/poster.jpeg"],
      title: event?.title ?? "PES Events",
      description: event?.description || "PES Events",
      url: "https://events.privateequity-support.com/",
      type: "website",
      locale: "en_US",
    },
    author: "Private Equity support",
    robots: "index, follow",
    keywords: [
      "PES",
      "Events",
      "Private Equity",
      event?.title ?? "PES Events",
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
