"use client";

import { useMemo } from "react";
import { Sponsor } from "@/lib/repositories/sponsor.repository";
import { Handshake } from "lucide-react";

function seededShuffle(arr: Sponsor[]): Sponsor[] {
  const a = [...arr].sort((a, b) => a.id.localeCompare(b.id));
  for (let i = a.length - 1; i > 0; i--) {
    const j = (i * 7 + 13) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SponsorSection({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  const row1Items = useMemo(() => Array(8).fill(seededShuffle(sponsors)).flat(), [sponsors]);
  const row2Items = useMemo(() => Array(8).fill(seededShuffle(sponsors)).flat(), [sponsors]);

  return (
    <section
      id="sponsors"
      className="py-12 lg:py-16 bg-gray-50 relative overflow-hidden"
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left {
          animation: marquee-left 40s linear infinite;
        }
        .marquee-right {
          animation: marquee-right 40s linear infinite;
        }
        .marquee-mask {
          mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%);
        }
        .shimmer {
          position: relative;
          overflow: hidden;
        }
        .shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.4) 45%,
            rgba(255,255,255,0.05) 50%,
            transparent 60%
          );
          transform: translateX(-100%);
          animation: shimmer 5s ease-in-out infinite;
          animation-delay: var(--shimmer-delay, 0s);
          pointer-events: none;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Background decoration */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-festika-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-festika-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-3 bg-festika-navy/5 border border-festika-navy/10 px-4 py-2 rounded-full">
            <Handshake size={18} className="text-festika-orange" />
            <span className="text-[10px] font-black text-festika-navy uppercase tracking-[0.3em]">Our Sponsors</span>
          </div>
        </div>

        {/* Marquee tracks */}
        <div className="overflow-hidden marquee-mask py-3 sm:py-4">
          <div className="marquee-left flex gap-10 sm:gap-16 w-max">
            {row1Items.map((spn, i) => (
              <div
                key={`r1-${spn.id}-${i}`}
                className="shimmer flex items-center justify-center h-16 sm:h-24 w-auto shrink-0"
                style={{ '--shimmer-delay': `${((i * 1.3) % 4).toFixed(1)}s` } as React.CSSProperties}
              >
                <img
                  src={spn.imageUrl || "/Logo_Festika-04.webp"}
                  alt={spn.name}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden marquee-mask py-3 sm:py-4">
          <div className="marquee-right flex gap-10 sm:gap-16 w-max">
            {row2Items.map((spn, i) => (
              <div
                key={`r2-${spn.id}-${i}`}
                className="shimmer flex items-center justify-center h-16 sm:h-24 w-auto shrink-0"
                style={{ '--shimmer-delay': `${((i * 1.3) % 4).toFixed(1)}s` } as React.CSSProperties}
              >
                <img
                  src={spn.imageUrl || "/Logo_Festika-04.webp"}
                  alt={spn.name}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
