import type { Metadata } from "next";
import CookieConsent from "@/components/index/CookieBanner";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentEvent } from "@/actions/get-current-event";
import Event from "@/components/events/Event";
import Registration from "@/components/registration/Registration";
import { getEventBySlug } from "@/actions/get-event-by-slug";

interface Props {
  params: {
    slug: string;
  };
}

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
    siteUrl: "https://events.privateequity-support.com",
    siteLogo: "https://storage.googleapis.com/pes_public/events-logo.png",
    other: {
      "twitter:image": "https://storage.googleapis.com/pes_public/poster.jpeg",
      "twitter:handle": "@PrivateEquityAF",
      "twitter:card": "summary_large_image",
      "og:url": "https://events.privateequity-support.com/",
      "og:image": "https://storage.googleapis.com/pes_public/poster.jpeg",
      "og:type": "website",
      "og:title": event?.title ?? "PES Events",
      "og:description": event?.description || "PES Events",
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

export default async function EventPage({ params }: Props) {
  const { slug } = params;
  const event = await getEventBySlug(slug);

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
