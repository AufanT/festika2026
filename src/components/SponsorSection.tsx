"use client";

import { Sponsor } from "@/lib/repositories/sponsor.repository";
import { Handshake, ExternalLink } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function SponsorSection({ sponsors }: { sponsors: Sponsor[] }) {
  // Group sponsors by tier
  const tiers = [
    { name: "Platinum", className: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto", itemClass: "h-80 sm:h-96" },
    { name: "Gold", className: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 max-w-5xl mx-auto", itemClass: "h-60 sm:h-72" },
    { name: "Silver", className: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 max-w-6xl mx-auto", itemClass: "h-44 sm:h-56" },
    { name: "Bronze", className: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 max-w-7xl mx-auto", itemClass: "h-36 sm:h-44" },
    { name: "Media Partner", className: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 max-w-7xl mx-auto", itemClass: "h-36 sm:h-44" },
    { name: "Supported By", className: "grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 max-w-7xl mx-auto", itemClass: "h-36 sm:h-44" },
  ];

  const sponsorsByTier = (tierName: string) => 
    sponsors.filter(s => s.tier === tierName || (tierName === "General" && !s.tier));

  if (sponsors.length === 0) return null;

  return (
    <section id="sponsors" className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-festika-orange via-festika-teal to-festika-navy opacity-20" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-festika-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-festika-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <Reveal>
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-festika-navy/5 border border-festika-navy/10 px-4 py-2 rounded-full mb-4">
            <Handshake size={18} className="text-festika-orange" />
            <span className="text-[10px] font-black text-festika-navy uppercase tracking-[0.3em]">Our Partners</span>
          </div>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-6xl font-black text-festika-navy uppercase tracking-tighter mb-4">
            Official <span className="text-festika-orange">Sponsors</span>
          </h2>
          <div className="w-24 h-1.5 bg-festika-teal mx-auto" />
        </div>
        </Reveal>

        {/* Tiered Grid */}
        <div className="space-y-24">
          {tiers.map((tier, ti) => {
            const tierSponsors = sponsorsByTier(tier.name);
            if (tierSponsors.length === 0) return null;

            return (
              <Reveal key={tier.name} delay={ti * 100} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-4 mb-10 justify-center">
                   <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-gray-200" />
                   <h3 className="font-[family-name:var(--font-space-grotesk)] text-sm lg:text-base font-black text-gray-400 uppercase tracking-[0.4em] px-4">
                    {tier.name}
                   </h3>
                   <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-gray-200" />
                </div>
                
                <div className={`grid ${tier.className} gap-6 sm:gap-10`}>
                  {tierSponsors.map((spn) => (
                    <a
                      key={spn.id}
                      href={spn.link || "#"}
                      target={spn.link ? "_blank" : undefined}
                      rel={spn.link ? "noopener noreferrer" : undefined}
                      className={`
                        group relative flex items-center justify-center bg-white p-6 sm:p-10 transition-all duration-500
                        border-2 border-transparent hover:border-festika-navy/10 hover:shadow-[12px_12px_0_0_rgba(15,42,54,0.05)]
                        ${tier.itemClass}
                        ${!spn.link ? "cursor-default" : "cursor-pointer"}
                      `}
                    >
                      {/* Logo */}
                      <img
                        src={spn.imageUrl || "/Logo_Festika-04.webp"}
                        alt={spn.name}
                        className="w-full h-full object-contain transition-all duration-500 scale-100 group-hover:scale-110"
                      />
                      
                      {/* Hover Effect Details */}
                      {spn.link && (
                        <div className="absolute inset-0 bg-festika-navy/0 group-hover:bg-festika-navy/5 transition-colors flex items-end justify-end p-2 opacity-0 group-hover:opacity-100">
                          <ExternalLink size={14} className="text-festika-teal" />
                        </div>
                      )}

                      {/* Label on Hover */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                        <span className="text-[10px] font-bold text-festika-navy bg-white border border-festika-navy/10 px-3 py-1 shadow-sm uppercase tracking-widest">
                          {spn.name}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
