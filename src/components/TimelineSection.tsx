/**
 * TimelineSection
 * ──────────────────────────────────────────────────────────────────────────────
 * Menampilkan timeline acara FESTIKA 2026 dengan layout horizontal (desktop)
 * dan vertikal (mobile). Menggunakan pola alternating atas/bawah sesuai
 * desain guidebook.
 *
 * Untuk menambah/mengubah milestone, cukup edit array `milestones` di bawah.
 */

import { ClipboardList, Swords, Trophy, Flag } from "lucide-react";

/* ── Types ──────────────────────────────────────────────── */
interface MilestoneDetail {
  label: string;
  date: string;
}

interface Milestone {
  icon: React.ElementType;
  title: string;
  /** "top" = label muncul di ATAS garis (desktop), "bottom" = di BAWAH garis */
  position: "top" | "bottom";
  details: MilestoneDetail[];
}

/* ── Data ───────────────────────────────────────────────── */
const milestones: Milestone[] = [
  {
    icon: ClipboardList,
    title: "Pendaftaran",
    position: "top",
    details: [
      { label: "CTF", date: "27 Apr – 21 Mei" },
      { label: "KTI", date: "27 Apr – 15 Mei" },
      { label: "DesWeb", date: "27 Apr – 12 Mei" },
    ],
  },
  {
    icon: Swords,
    title: "Babak Penyisihan",
    position: "bottom",
    details: [{ label: "CTF & DesWeb", date: "23 Mei" }],
  },
  {
    icon: Trophy,
    title: "Final Lomba",
    position: "top",
    details: [
      { label: "CTF", date: "24 Mei" },
      { label: "KTI", date: "24 Mei" },
      { label: "DesWeb", date: "24 Mei" },
    ],
  },
  {
    icon: Flag,
    title: "Penutupan Acara",
    position: "bottom",
    details: [{ label: "", date: "24 Mei" }],
  },
];

/* ── Component ──────────────────────────────────────────── */
export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-20 lg:py-28 bg-[#FFF8F0] border-y-4 border-festika-navy relative overflow-hidden"
    >
      {/* Decorative bg accents */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-festika-orange/20 rounded-full opacity-50 hidden lg:block pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-festika-teal/10 rotate-45 hidden lg:block pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* ── Heading ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              <span className="text-festika-teal">TIMELINE</span>
              <span className="text-festika-orange ml-3 lg:ml-4">2026</span>
            </h2>
            <div className="w-24 h-2 bg-festika-navy mt-4 rounded-full" />
          </div>
          <p className="text-festika-navy font-bold text-sm lg:text-base max-w-sm lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-festika-orange pl-4 lg:pl-0 lg:pr-4 py-1">
            Catat tanggalnya dan bersiaplah untuk kompetisi paling mendebarkan
            tahun ini.
          </p>
        </div>

        {/* ── Desktop: horizontal alternating ── */}
        <div className="hidden md:block relative">
          {/*
           * Struktur tinggi:
           *   - "top" label area  : 160px
           *   - garis + node      : 32px  (top = 160px dari atas kontainer ini)
           *   - "bottom" label    : 160px
           */}
          <div className="relative" style={{ minHeight: "360px" }}>
            {/* Garis horizontal di tengah (top: 160px) */}
            <div
              className="absolute left-0 right-0 h-[4px] bg-festika-navy rounded-full z-0"
              style={{ top: "160px" }}
            />

            {/* Milestones */}
            <div className="flex justify-between items-stretch h-full">
              {milestones.map((m, i) => {
                const isTop = m.position === "top";
                return (
                  <div
                    key={m.title}
                    className="flex flex-col items-center"
                    style={{ width: `${100 / milestones.length}%` }}
                  >
                    {/* ── Label atas (jika top) ── */}
                    <div
                      className="flex flex-col items-center justify-end pb-4"
                      style={{ height: "148px" }}
                    >
                      {isTop && <MilestoneCard milestone={m} />}
                    </div>

                    {/* ── Node on the line ── */}
                    <div className="relative z-10 flex-shrink-0">
                      {/* Vertical connector line */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 w-[3px] bg-festika-navy/40 ${
                          isTop
                            ? "bottom-full mb-0 h-4"
                            : "top-full mt-0 h-4"
                        }`}
                      />
                      {/* Circle node */}
                      <div
                        className={`w-10 h-10 rounded-full border-[3px] border-festika-navy flex items-center justify-center shadow-[3px_3px_0_0_#0F2A36] transition-transform hover:-translate-y-0.5 ${
                          i % 2 === 0
                            ? "bg-festika-teal"
                            : "bg-festika-orange"
                        }`}
                      >
                        <m.icon size={18} className="text-white" />
                      </div>
                    </div>

                    {/* ── Label bawah (jika bottom) ── */}
                    <div
                      className="flex flex-col items-center justify-start pt-4"
                      style={{ height: "148px" }}
                    >
                      {!isTop && <MilestoneCard milestone={m} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Mobile: vertical ── */}
        <div className="md:hidden">
          <div className="relative pl-10 border-l-[4px] border-festika-navy space-y-12 ml-4">
            {milestones.map((m, i) => (
              <div key={m.title} className="relative">
                {/* Node */}
                <div
                  className={`absolute -left-[54px] top-0 w-12 h-12 rounded-full border-[3px] border-festika-navy flex items-center justify-center shadow-[3px_3px_0_0_#0F2A36] z-10 ${
                    i % 2 === 0 ? "bg-festika-teal" : "bg-festika-orange"
                  }`}
                >
                  <m.icon size={20} className="text-white" />
                </div>

                {/* Content */}
                <div className="pl-4 pt-1">
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-lg leading-tight mb-2">
                    {m.title}
                  </h3>
                  <div className="space-y-1">
                    {m.details.map((d) => (
                      <p
                        key={d.label + d.date}
                        className="text-festika-navy/80 text-sm font-semibold"
                      >
                        {d.label ? (
                          <>
                            <span className="inline-block min-w-[56px] font-black text-festika-navy">
                              {d.label}
                            </span>
                            <span className="text-festika-navy/60 mx-1">:</span>
                            {d.date}
                          </>
                        ) : (
                          d.date
                        )}
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

/* ── Sub-component: Card label ── */
function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="text-center max-w-[180px]">
      <h3 className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-base leading-tight mb-2">
        {milestone.title}:
      </h3>
      <div className="space-y-0.5">
        {milestone.details.map((d) => (
          <p
            key={d.label + d.date}
            className="text-festika-navy/75 text-xs font-semibold leading-snug"
          >
            {d.label ? (
              <>
                <span className="inline-block min-w-[44px] font-black text-festika-navy text-left">
                  {d.label}
                </span>
                <span className="mx-0.5">:</span>
                {d.date}
              </>
            ) : (
              d.date
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
