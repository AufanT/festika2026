type TimelineEvent = {
  label: string;
  date: string;
  description?: string | null;
};

type TimelineProps = {
  events: TimelineEvent[];
  color?: {
    dot: string;
    line: string;
  };
};

function TimelineDot({ color = "bg-festika-teal" }: { color?: string }) {
  return (
    <div className={`w-3 h-3 rounded-full border-2 border-festika-navy ${color}`} />
  );
}

export function TimelineBar({ events, color }: TimelineProps) {
  const dotColor = color?.dot || "bg-festika-teal";
  const lineColor = color?.line || "bg-festika-teal/40";

  return (
    <div className="hidden md:block relative">
      <div className="relative flex items-center py-6">
        <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] rounded-full ${lineColor}`} />
        {events.map((event, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="h-14 flex flex-col items-center justify-end pb-2 w-full">
              <p className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-sm leading-tight text-center px-1">
                {event.label}
              </p>
            </div>
            <div className="relative z-10 flex items-center justify-center">
              <TimelineDot color={dotColor} />
            </div>
            <div className="h-14 flex flex-col items-center justify-start pt-2 w-full">
              <p className="text-[11px] text-festika-navy/70 font-semibold text-center leading-snug px-1">
                {event.date}
              </p>
              {event.description && (
                <p className="text-[10px] text-festika-navy/50 text-center leading-tight mt-0.5 px-1">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimelineList({ events, color }: TimelineProps) {
  const dotColor = color?.dot || "bg-festika-teal";

  return (
    <div className="md:hidden">
      <div className="relative pl-8 border-l-2 border-festika-navy space-y-6 ml-2">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className={`absolute -left-[38px] top-1 w-3 h-3 rounded-full border-2 border-festika-navy z-10 ${dotColor}`} />
            <div className="pl-2">
              <p className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-festika-navy text-sm leading-tight">
                {event.label}
              </p>
              <p className="text-xs text-festika-navy/70 font-semibold mt-0.5">
                {event.date}
              </p>
              {event.description && (
                <p className="text-[11px] text-festika-navy/50 mt-0.5">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Timeline(props: TimelineProps) {
  return (
    <>
      <TimelineBar {...props} />
      <TimelineList {...props} />
    </>
  );
}
