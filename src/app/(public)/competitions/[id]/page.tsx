import type { Metadata } from "next";
import { CompetitionService } from "@/lib/services/competition.service";
import { MessageSquare, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatWhatsAppLink } from "@/lib/utils";
import GuidebookCalloutCard from "@/components/GuidebookCalloutCard";
import RegistrationCard from "@/components/RegistrationCard";
import FloatingRegisterButton from "@/components/FloatingRegisterButton";
import Reveal from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const competition = await CompetitionService.getCompetitionById(id);
    return {
      title: `${competition.title} — FESTIKA UA 2026`,
      description: competition.description?.slice(0, 160) || `Detail lomba ${competition.title} di FESTIKA UA 2026.`,
      openGraph: {
        title: competition.title,
        description: competition.theme || competition.description?.slice(0, 160),
      },
    };
  } catch {
    return { title: "Lomba Tidak Ditemukan — FESTIKA UA 2026" };
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
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-black text-festika-navy leading-none uppercase">
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
                <img
                  src={competition.imageUrl}
                  alt={competition.title}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          )}

          {/* Card 1: Description */}
          <Reveal delay={300}>
            <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623] mb-8">
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                Deskripsi Lomba
              </h3>
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
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                  Timeline Lomba
                </h3>
                <div className="relative pl-8 border-l-[3px] border-festika-navy space-y-8 ml-2">
                  {competition.timeline.map((event: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[25px] top-1 w-5 h-5 rounded-full border-[3px] border-festika-navy bg-festika-teal z-10" />
                      <div className="pl-2">
                        <p className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-base leading-tight">
                          {event.label}
                        </p>
                        <p className="text-sm text-festika-navy/70 font-semibold mt-0.5">
                          {event.date}
                        </p>
                        {event.description && (
                          <p className="text-sm text-gray-500 mt-1">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Card 1c: Prize List */}
          {competition.prizeList && competition.prizeList.length > 0 && (
            <Reveal delay={400}>
              <div className="bg-white border-2 border-festika-navy p-8 lg:p-10 shadow-[8px_8px_0_0_#F5A623] mb-8">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy mb-6 uppercase border-b-4 border-festika-orange inline-block">
                  Prize List
                </h3>
                <div className="space-y-4">
                  {competition.prizeList.map((prize: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-festika-orange/10 border-2 border-festika-orange flex items-center justify-center text-festika-navy font-black text-sm shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-bold text-festika-navy text-sm">
                            {prize.position}
                          </p>
                          {prize.description && (
                            <p className="text-xs text-gray-500">{prize.description}</p>
                          )}
                        </div>
                      </div>
                      <p className="font-extrabold text-festika-teal text-sm text-right">
                        {prize.prize}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* Card 2: Guidebook */}
          <div className="mb-8">
            <GuidebookCalloutCard />
          </div>

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
                  <h4 className="font-black uppercase tracking-widest text-xs text-festika-navy mb-6 border-b-2 border-festika-teal inline-block">
                    Contact Person
                  </h4>
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
