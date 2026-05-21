import { ClipboardList, Swords, Trophy, Flag } from "lucide-react";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";

interface MilestoneDetail { label: string; date: string; }
interface Milestone {
  icon: React.ElementType;
  title: string;
  position: "top" | "bottom";
  accent: string;
  details: MilestoneDetail[];
}

const defaultMilestones: Milestone[] = [
  {
    icon: ClipboardList,
    title: "Pendaftaran",
    position: "top",
    accent: "bg-festika-teal",
    details: [
      { label: "CTF",    date: "27 Apr – 21 Mei (EXTEND)" },
      { label: "KTI",    date: "27 Apr – 19 Mei (EXTEND)" },
      { label: "DesWeb", date: "27 Apr – 19 Mei (EXTEND)" },
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

const compColors = [
  { dot: "bg-festika-teal", line: "bg-festika-teal/40" },
  { dot: "bg-festika-orange", line: "bg-festika-orange/40" },
  { dot: "bg-festika-navy", line: "bg-festika-navy/40" },
  { dot: "bg-rose-600", line: "bg-rose-600/40" },
  { dot: "bg-purple-600", line: "bg-purple-600/40" },
];

interface CompTimeline {
  id: string;
  title: string;
  timeline: { label: string; date: string; description?: string | null }[];
}

export default function TimelineSection({ competitions }: { competitions?: CompTimeline[] }) {
  const hasTimelines = competitions && competitions.some((c) => c.timeline && c.timeline.length > 0);

  return (
    <section
      id="timeline"
      className="py-16 lg:py-24 bg-[#FFF8F0] relative overflow-hidden"
    >

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-12 lg:mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl lg:text-6xl font-black tracking-tighter uppercase">
              <span className="text-festika-teal">TIMELINE</span>
              <span className="text-festika-orange ml-3">2026</span>
            </h2>
            <div className="w-16 h-1 bg-festika-teal mt-3" />
          </div>
          <p className="text-gray-500 text-sm lg:text-base max-w-sm lg:text-right">
            Catat tanggalnya dan bersiaplah untuk kompetisi paling mendebarkan tahun ini.
          </p>
        </div>
        </Reveal>

        {hasTimelines ? (
          <DynamicTimelines competitions={competitions!} />
        ) : (
          <DefaultTimeline />
        )}
      </div>
    </section>
  );
}

function DynamicTimelines({ competitions }: { competitions: CompTimeline[] }) {
  const filtered = competitions.filter((c) => c.timeline && c.timeline.length > 0);

  return (
    <div className="space-y-10">
      {filtered.map((comp, ci) => {
        const color = compColors[ci % compColors.length];
        return (
          <Reveal key={comp.id} delay={ci * 100}>
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-lg mb-4 uppercase tracking-tight">
                {comp.title}
              </h3>
              <Timeline events={comp.timeline} color={color} />
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function DefaultTimeline() {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative flex items-center" style={{ minHeight: "280px" }}>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-festika-navy rounded-full z-0" />
          {defaultMilestones.map((m, i) => {
            const isTop = m.position === "top";
            return (
              <Reveal key={m.title} delay={i * 100} className="flex-1 flex flex-col items-center">
                <div className="h-[120px] flex flex-col items-center justify-end pb-3 w-full">
                  {isTop && <DefaultCard milestone={m} />}
                </div>
                <div className="relative z-10 flex-shrink-0">
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[3px] bg-festika-navy/50 ${isTop ? "bottom-full h-3" : "top-full h-3"}`} />
                  <div className={`w-9 h-9 rounded-full border-[3px] border-festika-navy flex items-center justify-center ${m.accent}`}>
                    <m.icon size={16} className="text-white" />
                  </div>
                </div>
                <div className="h-[120px] flex flex-col items-center justify-start pt-3 w-full">
                  {!isTop && <DefaultCard milestone={m} />}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="relative pl-10 border-l-2 border-festika-navy space-y-10 ml-4">
          {defaultMilestones.map((m, i) => (
            <Reveal key={m.title} delay={i * 100} className="relative">
              <div className={`absolute -left-[58px] top-0 w-9 h-9 rounded-full border-[3px] border-festika-navy flex items-center justify-center z-10 ${m.accent}`}>
                <m.icon size={16} className="text-white" />
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
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

function DefaultCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="bg-white border-2 border-festika-navy rounded-xl px-4 py-3 w-[88%] max-w-[210px] text-left hover:shadow-[4px_4px_0_0_#0F2A36] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-150">
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
