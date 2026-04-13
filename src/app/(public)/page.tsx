import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  Sparkles,
  Trophy,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompetitionRepository } from "@/lib/repositories/competition.repository";
import { SettingRepository } from "@/lib/repositories/setting.repository";
import CompetitionSection from "@/components/CompetitionSection";

// force-dynamic: Next.js tidak melakukan pre-render saat build.
// Halaman di-render saat ada request nyata (SSR), bukan di build time.
// Ini menghindari kebutuhan koneksi DB saat proses build di Hostinger,
// sekaligus memastikan data selalu fresh.
export const dynamic = "force-dynamic";

/* ── Data ─────────────────────────────────────────── */

const milestones = [
  {
    icon: ClipboardList,
    date: "SEPT 15, 2026",
    title: "Registration Opens",
    description: "Early bird registration and team formation begins.",
  },
  {
    icon: Sparkles,
    date: "OCT 05, 2026",
    title: "Opening Ceremony",
    description: "Kickoff event featuring keynote speakers.",
  },
  {
    icon: Trophy,
    date: "OCT 15-20, 2026",
    title: "Main Competitions",
    description: "Intense week of coding, designing, and hacking.",
  },
  {
    icon: Award,
    date: "OCT 25, 2026",
    title: "Awarding Night",
    description: "Closing ceremony and winner announcements.",
  },
];

/* ── Page ─────────────────────────────────────────── */

export default async function Home() {
  const competitions = await CompetitionRepository.findAll();
  const settings = await SettingRepository.findAll();

  const heroImage = settings.hero_image || null;
  const aboutImage = settings.about_image || null;
  const aboutDesc = settings.about_description || "Festika (Festival Informatika) adalah ajang tahunan bergengsi yang mewadahi kreativitas, inovasi, dan keahlian di bidang teknologi informasi. Kami hadir untuk menantang generasi muda dalam menciptakan solusi digital yang berdampak nyata bagi masyarakat. Bergabunglah dalam perayaan teknologi terbesar dan jadilah bagian dari revolusi masa depan.";

  return (
    <>
      <main className="flex-1">
        {/* ═══════════ HERO ═══════════ */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center overflow-hidden pt-16"
          style={{
            background:
              "linear-gradient(135deg, #FFF8F0 0%, #FDE8CF 40%, #F8C88C 100%)",
          }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badge */}
                <span className="inline-block border border-festika-teal rounded-full px-5 py-1.5 text-xs font-semibold text-festika-teal tracking-wider uppercase">
                  IT Festival 2026
                </span>

                {/* Logo + Title */}
                <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
                  {/* Logo Icon */}
                  <div className="w-28 h-28 lg:w-36 lg:h-36 xl:w-44 xl:h-44 bg-festika-orange rounded-2xl flex items-center justify-center shadow-lg overflow-hidden flex-shrink-0 p-4 lg:p-5 xl:p-6">
                    <Image
                      src="/Logo_Festika-04.webp"
                      alt="Festika Logo"
                      width={176}
                      height={176}
                      priority
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl lg:text-7xl xl:text-8xl font-extrabold text-festika-teal leading-[0.9] tracking-tight">
                      FES
                    </h1>
                    <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl lg:text-7xl xl:text-8xl font-extrabold text-festika-orange leading-[0.9] tracking-tight">
                      TIKA
                    </h1>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-festika-orange italic text-lg lg:text-xl mt-6">
                  Unleashing Innovation through
                </p>
                <p className="text-festika-teal font-bold text-lg lg:text-xl">
                  Digital Creativity
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
                  <Link href="/register">
                    <Button
                      className="bg-festika-orange hover:bg-festika-orange-light text-white rounded-none px-8 h-12 text-base font-bold border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.6)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer gap-2"
                    >
                      Join the Festival
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <a href="#competitions">
                    <Button
                      variant="outline"
                      className="bg-white border-2 border-festika-navy text-festika-navy hover:bg-gray-50 hover:text-festika-navy rounded-none px-8 h-12 text-base font-bold shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
                    >
                      Learn More
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right - Photo Frame */}
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  {/* Arch behind photo */}
                  <div className="absolute -top-8 -right-4 w-28 h-40 bg-festika-teal rounded-t-full z-0 hidden lg:block" />

                  {/* Photo with teal frame */}
                  <div className="relative border-[3px] border-festika-teal z-10">
                    <div className="w-[280px] h-[340px] sm:w-[340px] sm:h-[400px] lg:w-[380px] lg:h-[440px] bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 flex items-center justify-center relative overflow-hidden">
                      {heroImage ? (
                        <Image src={heroImage} alt="Hero Festika" fill className="object-cover" />
                      ) : (
                        <span className="text-gray-500 text-sm font-medium">
                          Photo Placeholder
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 26 Badge */}
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-festika-orange flex items-center justify-center z-20 shadow-lg">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-white text-2xl font-bold">
                      26
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT ═══════════ */}
        <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
          {/* Subtle radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(253,232,207,0.5) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left - Photo Frame */}
              <div className="flex-1 flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Arch behind photo */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-32 bg-festika-teal rounded-t-full z-0" />

                  {/* Photo with teal frame */}
                  <div className="relative border-[3px] border-festika-teal z-10">
                    <div className="w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] lg:w-[360px] lg:h-[420px] bg-gradient-to-br from-gray-300 via-gray-200 to-gray-400 flex items-center justify-center relative overflow-hidden">
                      {aboutImage ? (
                        <Image src={aboutImage} alt="About Festika" fill className="object-cover" />
                      ) : (
                        <span className="text-gray-500 text-sm font-medium">
                          Photo Placeholder
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 26 Badge */}
                  <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-festika-orange flex items-center justify-center z-20 shadow-lg">
                    <span className="font-[family-name:var(--font-space-grotesk)] text-white text-2xl font-bold">
                      26
                    </span>
                  </div>
                </div>
              </div>

              {/* Right - About Card */}
              <div className="flex-1">
                <div className="bg-festika-teal border border-festika-orange/30 rounded-2xl p-8 lg:p-10 shadow-xl">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-bold text-festika-orange">
                    About Festika!
                  </h2>
                  <p className="text-gray-300 mt-5 leading-relaxed text-sm lg:text-base">
                    {aboutDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ COMPETITIONS ═══════════ */}
        <CompetitionSection competitions={competitions} />

        {/* ═══════════ TIMELINE / ROADMAP ═══════════ */}
        <section id="timeline" className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Heading Row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold tracking-wider">
                  <span className="text-festika-teal">ROADMAP </span>
                  <span className="text-festika-orange">2026</span>
                </h2>
                <div className="w-16 h-1 bg-festika-teal mt-3" />
              </div>
              <p className="text-gray-500 text-sm lg:text-base max-w-xs lg:text-right">
                Mark your calendars and prepare for a month of innovation.
              </p>
            </div>

            {/* Timeline - Desktop */}
            <div className="hidden md:block mt-20 relative">
              {/* Horizontal line */}
              <div className="absolute top-8 left-[8%] right-[8%] h-[2px] bg-gray-300" />

              {/* Milestones */}
              <div className="flex justify-between">
                {milestones.map((m) => (
                  <div
                    key={m.title}
                    className="flex flex-col items-center text-center max-w-[200px]"
                  >
                    {/* Icon box */}
                    <div className="w-16 h-16 border-2 border-festika-teal bg-white flex items-center justify-center relative z-10">
                      <m.icon size={22} className="text-festika-teal" />
                    </div>
                    <p className="text-festika-orange font-semibold text-xs uppercase tracking-wider mt-5">
                      {m.date}
                    </p>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-festika-teal text-sm mt-1">
                      {m.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline - Mobile (vertical) */}
            <div className="md:hidden mt-12">
              <div className="relative pl-8 border-l-2 border-gray-200 space-y-10">
                {milestones.map((m) => (
                  <div key={m.title} className="relative">
                    {/* Dot on the line */}
                    <div className="absolute -left-[25px] top-0 w-12 h-12 border-2 border-festika-teal bg-white flex items-center justify-center">
                      <m.icon size={18} className="text-festika-teal" />
                    </div>
                    <div className="pl-8">
                      <p className="text-festika-orange font-semibold text-xs uppercase tracking-wider">
                        {m.date}
                      </p>
                      <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-festika-teal mt-1">
                        {m.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
