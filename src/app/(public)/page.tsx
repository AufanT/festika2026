import type { Metadata } from "next";
import Image from "next/image";
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
  "FESTIKA 2026 merupakan festival tahunan yang menjadi ajang kompetisi serta pengembangan potensi di bidang teknologi digital. Pada tahun ini, FESTIKA 2026 menghadirkan tiga kategori utama, yaitu Capture The Flag (CTF) Competition, Web Design Competition, dan Lomba Karya Tulis Ilmiah (KTI). Ketiga komptesi ini dirancang untuk menunjukan bakat, kreativitas, dan kemampuan dalam memanfaatkan teknologi secara optimal. Festika ini bertemakan \"TechSpark: Unleashing and Modern Creativity in the Technological World\". Kegiatan Festika ini bertemakan \"NextGen Tech : Creating the Future Today\".";

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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 text-center lg:text-left z-10">
                <Reveal delay={0}>
                  <span className="inline-block border border-festika-teal rounded-full px-5 py-1.5 text-xs font-semibold text-festika-teal tracking-wider uppercase">
                    IT Festival 2026
                  </span>
                </Reveal>

                <Reveal delay={100}>
                  <div className="mt-8 mb-6 flex justify-center lg:justify-start overflow-visible">
                    <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter flex items-center leading-none">
                      <span className="text-festika-teal">FEST</span>
                      <span className="bg-festika-teal text-[#FF9500] px-2 md:px-4 py-1 ml-1 md:ml-3 rounded-none inline-flex items-center justify-center">
                        IKA
                      </span>
                    </h1>
                  </div>
                </Reveal>

                <Reveal delay={200}>
                  <div className="mt-10">
                    <p className="text-festika-navy/80 text-base lg:text-lg font-bold italic leading-relaxed max-w-xl">
                      "TechSpark: Unleashing and Modern Creativity in the Technological World"
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={300}>
                  <HeroButtons />
                </Reveal>
              </div>

              <Reveal delay={400} className="absolute inset-0 lg:static flex-[1.6] flex justify-center lg:justify-end items-center overflow-visible z-0 opacity-[0.08] lg:opacity-100 pointer-events-none lg:pointer-events-auto">
                {/* Background Glow behind SVG (Desktop only) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-festika-orange/10 blur-[100px] rounded-full z-[-1] hidden lg:block" />
                
                <div className="relative w-full max-w-[600px] sm:max-w-[700px] lg:max-w-[1100px] xl:max-w-[1300px] lg:-mr-8 xl:-mr-12 transform scale-110 sm:scale-125 lg:scale-140 xl:scale-150 transition-all duration-700 animate-float">
                  <Image
                    src="/1.svg"
                    alt="Hero Festika Illustration"
                    width={1300}
                    height={1000}
                    priority
                    className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] lg:drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-20 lg:py-32 bg-[#FFF8F0] border-y-4 border-festika-navy overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0F2A36 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
          
          {/* Decorative brutalist shapes */}
          <div className="absolute top-20 -left-20 w-64 h-64 bg-festika-teal/10 border-4 border-festika-navy rotate-12 hidden lg:block" />
          <div className="absolute bottom-10 -right-10 w-40 h-40 bg-festika-orange/10 border-4 border-festika-navy -rotate-6 hidden lg:block" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Left - Illustration in a Brutalist Frame */}
              <Reveal delay={0}>
              <div className="flex-1 w-full max-w-[550px]">
                <div className="relative group">
                  <div className="absolute inset-0 bg-festika-teal translate-x-3 translate-y-3 border-4 border-festika-navy group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300" />
                  <div className="relative bg-white border-4 border-festika-navy p-4 sm:p-8">
                    <Image
                      src="/2.svg"
                      alt="About Festika Illustration"
                      width={600}
                      height={500}
                      className="w-full h-auto object-contain"
                    />
                    <div className="absolute -top-6 -right-6 bg-festika-orange border-4 border-festika-navy px-6 py-4 shadow-[6px_6px_0_0_#0F2A36] -rotate-3 hover:rotate-0 transition-transform">
                      <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none mb-1">Since</p>
                      <p className="text-white text-4xl font-black font-[family-name:var(--font-space-grotesk)] leading-none">2024</p>
                    </div>
                  </div>
                </div>
              </div>
              </Reveal>

              {/* Right - Text Content */}
              <div className="flex-1 space-y-8">
                <Reveal delay={150}>
                <div className="space-y-4">
                  <div className="inline-block bg-festika-teal border-2 border-festika-navy px-4 py-1 shadow-[3px_3px_0_0_#0F2A36]">
                    <span className="text-white text-xs font-black uppercase tracking-widest">Tentang Kami</span>
                  </div>
                  
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-7xl font-black text-festika-navy leading-[0.9] uppercase italic tracking-tighter">
                    Festika <br />
                    <span className="text-festika-orange">2026</span>
                  </h2>
                </div>
                </Reveal>

                <Reveal delay={250}>
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-2 bg-festika-orange border-l-2 border-r-2 border-festika-navy" />
                  <p className="text-festika-navy font-bold text-lg lg:text-xl leading-relaxed pl-2">
                    {ABOUT_DESCRIPTION}
                  </p>
                </div>
                </Reveal>

                <Reveal delay={350}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🏆", label: "Kompetisi Bergengsi", color: "bg-white" },
                    { icon: "💡", label: "Inovasi Digital", color: "bg-white" },
                    { icon: "🤝", label: "Networking", color: "bg-white" },
                    { icon: "🚀", label: "Teknologi Masa Depan", color: "bg-white" },
                  ].map((item, i) => (
                    <Reveal key={item.label} delay={400 + i * 100}>
                    <div
                      className={`flex items-center gap-4 ${item.color} border-2 border-festika-navy p-4 shadow-[4px_4px_0_0_#0F2A36] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all`}
                    >
                      <div className="text-3xl filter drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">{item.icon}</div>
                      <span className="text-festika-navy text-sm font-black uppercase tracking-tight leading-none">{item.label}</span>
                    </div>
                    </Reveal>
                  ))}
                </div>
                </Reveal>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════ COMPETITIONS ═══════════ */}
        <Reveal><CompetitionSection competitions={competitions} /></Reveal>

        {/* ═══════════ TIMELINE ═══════════ */}
        <Reveal><TimelineSection competitions={competitions} /></Reveal>

        {/* ═══════════ SPONSORS ═══════════ */}
        <Reveal><SponsorSection sponsors={sponsors} /></Reveal>

        {/* ═══════════ FAQ ═══════════ */}
        <Reveal><FaqSection /></Reveal>
      </main>
    </>
  );
}
