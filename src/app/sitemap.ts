import type { MetadataRoute } from "next";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://festika2026.ifportofolio.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const competitions: any[] = await CompetitionRepository.findAll();

  const competitionUrls = competitions.map((c: any) => ({
    url: `${baseUrl}/competitions/${c.id}`,
    lastModified: c.updatedAt || c.createdAt || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...competitionUrls,
    {
      url: `${baseUrl}/past-events`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/staff`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];
}
