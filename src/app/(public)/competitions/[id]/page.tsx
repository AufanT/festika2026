import type { Metadata } from "next";
import { CompetitionService } from "@/lib/services/competition.service";
import { MessageSquare, ArrowLeft, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatWhatsAppLink } from "@/lib/utils";
import RegistrationCard from "@/components/RegistrationCard";
import FloatingRegisterButton from "@/components/FloatingRegisterButton";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import JsonLd from "@/components/JsonLd";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://festika2026.ifportofolio.com";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const competition = await CompetitionService.getCompetitionById(id);
    return {
      title: competition.title,
      description: competition.description?.slice(0, 160) || `Detail lomba ${competition.title} di FESTIKA UA 2026.`,
      openGraph: {
        title: competition.title,
        description: competition.theme || competition.description?.slice(0, 160),
        url: `${baseUrl}/competitions/${id}`,
      },
      alternates: {
        canonical: `${baseUrl}/competitions/${id}`,
      },
    };
  } catch {
    return {
      title: "Lomba Tidak Ditemukan — FESTIKA UA 2026",
      description: "Kompetisi yang Anda cari tidak tersedia.",
      robots: { index: false },
      alternates: { canonical: `${baseUrl}/competitions/${id}` },
    };
  }
}

export default async function CompetitionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let competition;
  try {
    competition = await CompetitionService.getCompetitionById(id);
  } catch {
    return notFound();
  }

  const startDate = competition.registrationStartDate
    ? new Date(competition.registrationStartDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const endDate = competition.registrationEndDate
    ? new Date(competition.registrationEndDate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: competition.title,
          description: competition.description?.slice(0, 200) || `Lomba ${competition.title} di FESTIKA UA 2026.`,
          startDate: competition.registrationStartDate || "",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: {
            "@type": "Place",
            name: "Universitas Andalas",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Padang",
              addressRegion: "Sumatera Barat",
              addressCountry: "ID",
            },
          },
          image: competition.imageUrl || `${baseUrl}/icon.png`,
          organizer: {
            "@type": "Organization",
            name: "FESTIKA UA 2026",
            url: baseUrl,
          },
        }}
      />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal delay={0}>
            <Link
              href="/#competitions"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-festika-navy mb-8 transition-colors group"
            >
              <div className="w-8 h-8 border-2 border-gray-200 flex items-center justify-center group-hover:border-festika-navy transition-colors">
                <ArrowLeft size={16} />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                Kembali ke Daftar Lomba
              </span>
            </Link>
          </Reveal>

          {/* Title Header */}
          <Reveal delay={100}>
            <div className="space-y-4 mb-10">
              <div className="inline-flex items-center gap-2 bg-festika-orange/10 px-3 py-1 border border-festika-orange/20">
                <Sparkles size={14} className="text-festika-orange" />
                <span className="text-[10px] font-black text-festika-orange uppercase tracking-widest">
                  Competition 2026
                </span>
              </div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-black text-festika-navy leading-none uppercase tracking-tighter">
                {competition.title}
              </h1>
              {competition.theme && (
                <p className="text-festika-teal text-lg lg:text-xl font-bold italic">
                  &ldquo;{competition.theme}&rdquo;
                </p>
              )}
            </div>
          </Reveal>

          {/* Poster Image */}
          {competition.imageUrl && (
            <Reveal delay={200}>
              <div className="border-4 border-festika-navy shadow-[12px_12px_0_0_#0F2A36] overflow-hidden bg-white mb-10">
                <Image
                  src={competition.imageUrl}
                  alt={competition.title}
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          )}

          {/* Card 1: Description */}
          <Reveal delay={300}>
            <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623] mb-8">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                Deskripsi Lomba
              </h2>
              <div className="prose prose-festika max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {competition.description || "Detail lomba belum tersedia."}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 1b: Timeline */}
          {competition.timeline && competition.timeline.length > 0 && (
            <Reveal delay={350}>
              <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623] mb-8">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                  Timeline Lomba
                </h2>
                <Timeline events={competition.timeline} />
              </div>
            </Reveal>
          )}

          {/* Card 1c: Prize List */}
          {competition.prizeList && competition.prizeList.length > 0 && (
            <Reveal delay={400}>
              <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623] mb-8">
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                  Prize List
                </h2>
                <div className="space-y-4">
                  {competition.prizeList.map((prize: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-bold text-festika-navy text-sm">
                          {prize.position}
                        </p>
                        {prize.description && (
                          <p className="text-xs text-gray-500">{prize.description}</p>
                        )}
                      </div>
                      <p className="font-extrabold text-festika-teal text-sm text-right shrink-0 ml-4">
                        {prize.prize}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Card 3: Registration */}
          <RegistrationCard
            registrationLink={competition.registrationLink}
            startDate={startDate}
            endDate={endDate}
            delay={100}
          />

          {/* Card 4: Contact Persons */}
          {competition.contacts &&
            Array.isArray(competition.contacts) &&
            competition.contacts.length > 0 && (
              <Reveal delay={200}>
                <div className="bg-white border-2 border-festika-navy p-8 mt-8">
                  <h3 className="font-black uppercase tracking-widest text-xs text-festika-navy mb-6 border-b-2 border-festika-teal inline-block">
                    Contact Person
                  </h3>
                  <div className="space-y-4">
                    {competition.contacts.map((cp: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between group"
                      >
                        <div>
                          <p className="font-bold text-festika-navy text-sm">
                            {cp.name}
                          </p>
                          <p className="text-xs text-gray-500">{cp.phone}</p>
                        </div>
                        <a
                          href={formatWhatsAppLink(
                            cp.phone,
                            `Halo, saya ingin bertanya tentang lomba ${competition.title} di Festika 2026.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-gray-100 flex items-center justify-center text-festika-navy hover:bg-festika-teal hover:text-white transition-colors border border-gray-200"
                        >
                          <MessageSquare size={18} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

          {/* Tags */}
          {competition.tags && (
            <Reveal delay={300}>
              <div className="flex flex-wrap gap-2 mt-8">
                {competition.tags
                  .split(/[ ,#]+/)
                  .filter((t: string) => t)
                  .map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 border border-gray-200 uppercase tracking-tighter"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>
            </Reveal>
          )}
        </div>
      </main>

      <FloatingRegisterButton />
    </div>
  );
}
