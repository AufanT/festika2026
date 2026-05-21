import type { Metadata } from "next";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import CompetitionSection from "@/components/CompetitionSection";
import FaqSection from "@/components/FaqSection";
import SponsorSection from "@/components/SponsorSection";
import { SponsorRepository } from "@/lib/repositories/sponsor.repository";
import HeroButtons from "@/components/HeroButtons";
import TimelineSection from "@/components/TimelineSection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "FESTIKA UA 2026 — IT Festival",
  description:
    "Unleashing Innovation through Digital Creativity. Festival Teknologi Informasi terbesar di Universitas Andalas — kompetisi CTF, Web Design, dan KTI.",
  openGraph: {
    title: "FESTIKA UA 2026",
    description:
      "TechSpark: Unleashing and Modern Creativity in the Technological World.",
    type: "website",
  },
};


// force-dynamic: Next.js tidak melakukan pre-render saat build.
// Halaman di-render saat ada request nyata (SSR), bukan di build time.
// Ini menghindari kebutuhan koneksi DB saat proses build di Hostinger,
// sekaligus memastikan data selalu fresh.
export const dynamic = "force-dynamic";

/* ── Page ─────────────────────────────────────────── */

const ABOUT_DESCRIPTION =
  "FESTIKA 2026 merupakan festival tahunan yang menjadi ajang kompetisi serta pengembangan potensi di bidang teknologi digital. Pada tahun ini, FESTIKA 2026 menghadirkan tiga kategori utama, yaitu ";

const ABOUT_COMPETITIONS = [
  "Capture The Flag (CTF) Competition",
  "Web Design Competition",
  "Lomba Karya Tulis Ilmiah (KTI)",
] as const;

const ABOUT_DESCRIPTION_2 =
  ". Ketiga komptesi ini dirancang untuk menunjukan bakat, kreativitas, dan kemampuan dalam memanfaatkan teknologi secara optimal. Festika ini bertemakan \"TechSpark: Unleashing and Modern Creativity in the Technological World\". Kegiatan Festika ini bertemakan \"NextGen Tech : Creating the Future Today\".";

export default async function Home() {
  const competitions = await CompetitionRepository.findAll();
  const sponsors = await SponsorRepository.findAll();

  return (
    <>
      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section
          id="hero"
          className="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden pt-16"
          style={{
            background:
              "linear-gradient(135deg, #FFF8F0 0%, #FDE8CF 40%, #F8C88C 100%)",
          }}
        >
          {/* Background gradient orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-festika-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-festika-orange/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0F2A36]/[0.02] rounded-full blur-3xl pointer-events-none" />

          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #0F2A36 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="mx-auto max-w-4xl px-6 lg:px-8 w-full py-8 sm:py-12 lg:py-16 relative z-10">
            <div className="flex flex-col items-center text-center">
              <Reveal delay={0}>
                <span className="inline-block border border-festika-teal rounded-full px-4 sm:px-5 py-1 text-xs font-semibold text-festika-teal tracking-wider uppercase">
                  IT Festival 2026
                </span>
              </Reveal>

              <Reveal delay={100}>
                <div className="mt-5 sm:mt-8 mb-2 sm:mb-4 flex justify-center overflow-visible">
                  <h1 className="font-[family-name:var(--font-space-grotesk)] text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter flex items-center leading-none">
                    <span className="text-festika-teal">FEST</span>
                    <span className="bg-festika-teal text-[#FF9500] px-2 sm:px-5 py-1 sm:py-2 ml-1 sm:ml-3 rounded-none inline-flex items-center justify-center">
                      IKA
                    </span>
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-2 sm:mt-6">
                  <p className="text-festika-navy/80 text-sm sm:text-base lg:text-lg font-bold italic leading-relaxed max-w-2xl mx-auto">
                    "TechSpark: Unleashing and Modern Creativity in the Technological World"
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <HeroButtons />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-16 lg:py-24 bg-[#FFF8F0] overflow-hidden">

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="space-y-8">
              <Reveal delay={150}>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-6xl font-black text-festika-navy uppercase tracking-tighter">
                  Festika <span className="text-festika-orange">2026</span>
                </h2>
                <div className="w-16 h-1 bg-festika-teal mt-3" />
              </Reveal>

              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-1">
                  <Reveal delay={250}>
                  <p className="text-festika-navy text-base lg:text-lg leading-relaxed text-justify">
                    {ABOUT_DESCRIPTION}
                    <strong>{ABOUT_COMPETITIONS[0]}</strong>,{" "}
                    <strong>{ABOUT_COMPETITIONS[1]}</strong>, dan{" "}
                    <strong>{ABOUT_COMPETITIONS[2]}</strong>
                    {ABOUT_DESCRIPTION_2}
                  </p>
                  </Reveal>
                </div>

                <div className="flex-1 w-full">
                  <Reveal delay={350}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                    {[
                      { icon: "🏆", label: "Kompetisi Bergengsi" },
                      { icon: "💡", label: "Inovasi Digital" },
                      { icon: "🤝", label: "Networking" },
                      { icon: "🚀", label: "Teknologi Masa Depan" },
                    ].map((item, i) => (
                      <Reveal key={item.label} delay={400 + i * 100}>
                      <div className="flex items-center gap-3 sm:gap-4 bg-white border-2 border-festika-navy px-3 sm:px-4 py-5 sm:py-6 shadow-[4px_4px_0_0_#0F2A36] transition-all">
                        <div className="text-2xl sm:text-3xl shrink-0">{item.icon}</div>
                        <span className="text-festika-navy text-xs sm:text-sm font-black uppercase tracking-tight leading-none font-[family-name:var(--font-space-grotesk)]">{item.label}</span>
                      </div>
                      </Reveal>
                    ))}
                  </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ COMPETITIONS ═══════════ */}
        <Reveal><CompetitionSection competitions={competitions} /></Reveal>

        {/* ═══════════ TIMELINE ═══════════ */}
        <Reveal><TimelineSection competitions={competitions} /></Reveal>

        {/* ═══════════ SPONSORS ═══════════ */}
        <SponsorSection sponsors={sponsors} />

        {/* ═══════════ FAQ ═══════════ */}
        <Reveal><FaqSection /></Reveal>
      </main>
    </>
  );
}
