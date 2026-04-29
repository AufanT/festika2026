"use client";

import Link from "next/link";
import { ArrowRight, Trophy, Sparkles } from "lucide-react";

type Competition = {
  id: string;
  title: string;
  theme?: string | null;
  description: string | null;
  imageUrl?: string | null;
};

export default function CompetitionSection({ competitions }: { competitions: Competition[] }) {
  return (
    <section id="competitions" className="py-20 lg:py-28 bg-white border-b border-gray-100 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Heading Area - Matching Timeline Section Style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-16">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold tracking-wider uppercase">
              <span className="text-festika-teal">OUR </span>
              <span className="text-festika-orange">COMPETITIONS</span>
            </h2>
            <div className="w-16 h-1 bg-festika-teal mt-3" />
          </div>
          <p className="text-gray-500 text-sm lg:text-base max-w-sm lg:text-right">
            Tunjukkan bakatmu, berinovasi di bawah tekanan, dan berkompetisi dengan pikiran-pikiran cerdas di bidang teknologi.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {competitions.map((comp) => (
            <Link
              key={comp.id}
              href={`/competitions/${comp.id}`}
              className="group bg-white border-2 border-gray-200 p-6 flex flex-col transition-all duration-300 hover:border-festika-navy hover:shadow-[8px_8px_0_0_#0F2A36] hover:-translate-y-1 hover:-translate-x-1"
            >
              {/* Image or Icon */}
              {comp.imageUrl ? (
                <div className="relative mb-6 w-full h-48 border-2 border-gray-100 overflow-hidden bg-gray-50">
                  <img 
                    src={comp.imageUrl} 
                    alt={comp.title} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              ) : (
                <div className="w-14 h-14 border-2 border-festika-teal flex items-center justify-center mb-6 bg-festika-teal/5 text-festika-teal group-hover:bg-festika-teal group-hover:text-white transition-colors">
                  <Trophy size={28} />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                {comp.theme && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 border border-festika-orange text-festika-orange text-[10px] font-bold uppercase tracking-widest rounded-full bg-festika-peach/20">
                      {comp.theme}
                    </span>
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-3 group-hover:text-festika-teal transition-colors leading-tight">
                  {comp.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                  {comp.description || "Klik untuk melihat detail lomba, persyaratan, dan melakukan pendaftaran melalui form."}
                </p>
              </div>

              {/* Interaction Hint - Matching Hero Button Style lightly */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-festika-navy uppercase tracking-wider group-hover:text-festika-orange transition-colors">
                  Daftar Sekarang
                </span>
                <div className="w-8 h-8 border-2 border-transparent group-hover:border-festika-navy flex items-center justify-center bg-gray-50 group-hover:bg-festika-orange group-hover:shadow-[2px_2px_0_0_#0F2A36] transition-all">
                  <ArrowRight size={16} className="text-gray-400 group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
          
          {competitions.length === 0 && (
            <div className="col-span-full py-20 text-center bg-gray-50 border-2 border-dashed border-gray-300">
              <Trophy size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">
                Lomba akan segera hadir!
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
