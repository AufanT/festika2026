import type { Metadata } from "next";
import { PastEventRepository } from "@/lib/repositories/past-event.repository";
import PastEventsClient from "@/components/PastEventsClient";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://festika2026.ifportofolio.com";

export const metadata: Metadata = {
  title: "Past Events — FESTIKA UA 2026",
  description:
    "Lihat kesuksesan acara-acara FESTIKA dari tahun-tahun sebelumnya.",
  openGraph: {
    title: "Past Events — FESTIKA UA 2026",
    description:
      "Lihat kesuksesan acara-acara FESTIKA dari tahun-tahun sebelumnya.",
    url: `${baseUrl}/past-events`,
  },
  alternates: {
    canonical: `${baseUrl}/past-events`,
  },
};

export default async function PastEventsPage() {
  const allEvents = await PastEventRepository.findAll();

  const groupedEvents: Record<number, typeof allEvents> = {};
  for (const event of allEvents) {
    const year = event.year || new Date().getFullYear() - 1;
    if (!groupedEvents[year]) groupedEvents[year] = [];
    groupedEvents[year].push(event);
  }

  const years = Object.keys(groupedEvents)
    .map(Number)
    .sort((a, b) => b - a);

  return <PastEventsClient groupedEvents={groupedEvents} years={years} />;
}
