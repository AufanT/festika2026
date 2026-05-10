/**
 * TimelineSection
 * ──────────────────────────────────────────────────────────────────────────────
 * Untuk menambah/mengubah milestone, cukup edit array `milestones` di bawah.
 */

import { ClipboardList, Swords, Trophy, Flag } from "lucide-react";

interface MilestoneDetail { label: string; date: string; }
interface Milestone {
  icon: React.ElementType;
  title: string;
  position: "top" | "bottom";
  accent: string;
  details: MilestoneDetail[];
}

const milestones: Milestone[] = [
  {
    icon: ClipboardList,
    title: "Pendaftaran",
    position: "top",
    accent: "bg-festika-teal",
    details: [
      { label: "CTF",    date: "27 Apr – 21 Mei" },
      { label: "KTI",    date: "27 Apr – 15 Mei" },
      { label: "DesWeb", date: "27 Apr – 12 Mei" },
    ],
  },
  {
    icon: Swords,
    title: "Babak Penyisihan",
    position: "bottom",
    accent: "bg-festika-orange",
    details: [{ label: "CTF & DesWeb", date: "23 Mei" }],
  },
  {
    icon: Trophy,
    title: "Final Lomba",
    position: "top",
    accent: "bg-festika-teal",
    details: [
      { label: "CTF",    date: "24 Mei" },
      { label: "KTI",    date: "24 Mei" },
      { label: "DesWeb", date: "24 Mei" },
    ],
  },
  {
    icon: Flag,
    title: "Penutupan Acara",
    position: "bottom",
    accent: "bg-festika-orange",
    details: [{ label: "", date: "24 Mei" }],
  },
];

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-16 lg:py-24 bg-[#FFF8F0] border-y-4 border-festika-navy relative overflow-hidden"
    >
      {/* Decorative accents */}
      <div className="absolute top-8 left-8 w-28 h-28 border-4 border-festika-orange/20 rounded-full hidden lg:block pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 bg-festika-teal/10 rotate-45 hidden lg:block pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">

        {/* ── Heading ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              <span className="text-festika-teal">TIMELINE</span>
              <span className="text-festika-orange ml-3">2026</span>
            </h2>
            <div className="w-20 h-[3px] bg-festika-navy mt-3 rounded-full" />
          </div>
          <p className="text-festika-navy font-bold text-sm max-w-xs lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-festika-orange pl-4 lg:pl-0 lg:pr-4">
            Catat tanggalnya dan bersiaplah untuk kompetisi paling mendebarkan tahun ini.
          </p>
        </div>

        {/* ── Desktop ── */}
        <div className="hidden md:block">
          {/*
           * 3-row grid per kolom:
           *   row 1 (top card zone)  : h-[120px]
           *   row 2 (node + line)    : h-auto  ← garis horizontal ada di sini via absolute
           *   row 3 (bottom card)    : h-[120px]
           * Garis horisontal absolut di tengah row 2.
           */}
          <div className="relative flex items-center" style={{ minHeight: "280px" }}>
            {/* Horizontal line */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] bg-festika-navy rounded-full z-0" />

            {milestones.map((m) => {
              const isTop = m.position === "top";
              return (
                <div key={m.title} className="flex-1 flex flex-col items-center">
                  {/* Top zone */}
                  <div className="h-[120px] flex flex-col items-center justify-end pb-3 w-full">
                    {isTop && <DesktopCard milestone={m} />}
                  </div>

                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`absolute left-1/2 -translate-x-1/2 w-[3px] bg-festika-navy/50 ${isTop ? "bottom-full h-3" : "top-full h-3"}`} />
                    <div className={`w-11 h-11 rounded-full border-[3px] border-festika-navy flex items-center justify-center shadow-[3px_3px_0_0_#0F2A36] ${m.accent}`}>
                      <m.icon size={20} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom zone */}
                  <div className="h-[120px] flex flex-col items-center justify-start pt-3 w-full">
                    {!isTop && <DesktopCard milestone={m} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden">
          <div className="relative pl-10 border-l-[4px] border-festika-navy space-y-10 ml-4">
            {milestones.map((m) => (
              <div key={m.title} className="relative">
                <div className={`absolute -left-[54px] top-0 w-11 h-11 rounded-full border-[3px] border-festika-navy flex items-center justify-center shadow-[3px_3px_0_0_#0F2A36] z-10 ${m.accent}`}>
                  <m.icon size={18} className="text-white" />
                </div>
                <div className="pl-3 pt-0.5">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-base leading-tight mb-1.5">
                    {m.title}
                  </h3>
                  <div className="space-y-0.5">
                    {m.details.map((d) => (
                      <p key={d.label + d.date} className="text-festika-navy/80 text-xs font-semibold">
                        {d.label
                          ? <><span className="inline-block min-w-[52px] font-black text-festika-navy">{d.label}</span><span className="mx-0.5 text-festika-navy/50">:</span>{d.date}</>
                          : d.date}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function DesktopCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-white border-[2.5px] border-festika-navy shadow-[4px_4px_0_0_#0F2A36] rounded-xl px-4 py-3 w-[88%] max-w-[210px] text-left hover:shadow-[6px_6px_0_0_#0F2A36] hover:-translate-y-0.5 transition-all duration-150">
      <p className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-sm leading-tight mb-2">
        {milestone.title}
      </p>
      <div className="space-y-0.5">
        {milestone.details.map((d) => (
          <p key={d.label + d.date} className="text-[11px] text-festika-navy/75 font-semibold leading-snug">
            {d.label
              ? <><span className="font-black text-festika-navy inline-block min-w-[40px]">{d.label}</span><span className="mx-0.5 text-festika-navy/40">:</span>{d.date}</>
              : d.date}
          </p>
        ))}
      </div>
    </div>
  );
}
