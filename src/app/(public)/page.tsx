import Image from "next/image";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import CompetitionSection from "@/components/CompetitionSection";
import FaqSection from "@/components/FaqSection";
import SponsorSection from "@/components/SponsorSection";
import { SponsorRepository } from "@/lib/repositories/sponsor.repository";
import HeroButtons from "@/components/HeroButtons";
import TimelineSection from "@/components/TimelineSection";


// force-dynamic: Next.js tidak melakukan pre-render saat build.
// Halaman di-render saat ada request nyata (SSR), bukan di build time.
// Ini menghindari kebutuhan koneksi DB saat proses build di Hostinger,
// sekaligus memastikan data selalu fresh.
export const dynamic = "force-dynamic";

/* ── Page ─────────────────────────────────────────── */

const ABOUT_DESCRIPTION =
  "Festika (Festival Informatika) adalah ajang tahunan bergengsi yang mewadahi kreativitas, inovasi, dan keahlian di bidang teknologi informasi. Kami hadir untuk menantang generasi muda dalam menciptakan solusi digital yang berdampak nyata bagi masyarakat. Bergabunglah dalam perayaan teknologi terbesar dan jadilah bagian dari revolusi masa depan.";

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
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left z-10">
                {/* Badge */}
                <span className="inline-block border border-festika-teal rounded-full px-5 py-1.5 text-xs font-semibold text-festika-teal tracking-wider uppercase">
                  IT Festival 2026
                </span>

                {/* New Styled Title */}
                <div className="mt-8 mb-6 flex justify-center lg:justify-start overflow-visible">
                  <h1 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter flex items-center leading-none">
                    <span className="text-festika-teal">FEST</span>
                    <span className="bg-festika-teal text-[#FF9500] px-2 md:px-4 py-1 ml-1 md:ml-3 rounded-none inline-flex items-center justify-center">
                      IKA
                    </span>
                  </h1>
                </div>

                {/* Tagline */}
                <p className="text-festika-orange italic text-lg lg:text-xl mt-6 drop-shadow-sm">
                  Unleashing Innovation through
                </p>
                <p className="text-festika-teal font-bold text-lg lg:text-xl drop-shadow-sm">
                  Digital Creativity
                </p>

                {/* Buttons */}
                <HeroButtons />
              </div>

              {/* Right - Hero Illustration (MEGA SIZE / Mobile Watermark) */}
              <div className="absolute inset-0 lg:static flex-[1.6] flex justify-center lg:justify-end items-center overflow-visible z-0 opacity-[0.08] lg:opacity-100 pointer-events-none lg:pointer-events-auto">
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
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
          {/* Rich dark background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0F2A36 0%, #1B3A4B 55%, #0F2A36 100%)" }} />

          {/* Decorative blobs */}
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #F5A623, transparent 70%)" }} />
          <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FDE8CF, transparent 70%)" }} />
          <div className="absolute top-8 right-8 w-48 h-48 opacity-[0.08]" style={{
            backgroundImage: "radial-gradient(circle, #FDE8CF 1.5px, transparent 1.5px)",
            backgroundSize: "14px 14px",
          }} />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

              {/* Left - Illustration + floating badges */}
              <div className="flex-1 flex justify-center lg:justify-start items-center">
                <div className="relative w-[300px] sm:w-[450px] lg:w-full lg:max-w-[650px] transform lg:scale-110 xl:scale-115 lg:-ml-12 xl:-ml-20">
                  <Image
                    src="/2.svg"
                    alt="About Festika Illustration"
                    width={650}
                    height={550}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Floating badge: Since */}
                  <div className="absolute -bottom-6 -right-6 bg-festika-orange rounded-2xl px-5 py-4 shadow-[5px_5px_0_0_#0F2A36] border-2 border-festika-navy z-20">
                    <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Since</p>
                    <p className="text-white text-3xl font-extrabold font-[family-name:var(--font-space-grotesk)] leading-none">2024</p>
                  </div>
                  {/* Accent dot */}
                  <div className="absolute top-1/2 -right-10 w-6 h-6 rounded-full bg-festika-orange/30 border-2 border-festika-orange/60 hidden lg:block" />
                </div>
              </div>

              {/* Right - Premium text block */}
              <div className="flex-1">
                <div className="relative pl-7">
                  {/* Orange vertical accent line */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-festika-orange via-festika-orange/50 to-transparent rounded-full" />

                  <p className="text-festika-orange text-xs font-bold uppercase tracking-[0.3em] mb-3">Tentang Kami</p>
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.05]">
                    About <span className="text-festika-orange">Festika!</span>
                  </h2>
                  <div className="w-14 h-[3px] bg-festika-orange mt-5 mb-6 rounded-full" />

                  <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                    {ABOUT_DESCRIPTION}
                  </p>

                  {/* Feature grid */}
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { icon: "🏆", label: "Kompetisi Bergengsi" },
                      { icon: "💡", label: "Inovasi Digital" },
                      { icon: "🤝", label: "Networking" },
                      { icon: "🚀", label: "Teknologi Masa Depan" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 hover:bg-white/10 hover:border-festika-orange/40 transition-all cursor-default"
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-gray-200 text-sm font-medium leading-tight">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════ COMPETITIONS ═══════════ */}
        <CompetitionSection competitions={competitions} />

        {/* ═══════════ TIMELINE ═══════════ */}
        <TimelineSection />

        {/* ═══════════ FAQ ═══════════ */}
        <FaqSection />

        {/* ═══════════ SPONSORS ═══════════ */}
        <SponsorSection sponsors={sponsors} />
      </main>
    </>
  );
}
