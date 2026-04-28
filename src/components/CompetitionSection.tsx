"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, X, Sparkles, LayoutDashboard } from "lucide-react";

type Competition = {
  id: string;
  title: string;
  theme?: string | null;
  description: string | null;
  imageUrl?: string | null;
};

const cornerColors = ["bg-festika-orange", "bg-festika-teal", "bg-festika-navy"];

export default function CompetitionSection({ competitions }: { competitions: Competition[] }) {
  return (
    <section id="competitions" className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-4">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl lg:text-5xl font-extrabold text-festika-teal uppercase tracking-wider">
              Competitions
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-400" />
              <div className="w-5 h-5 bg-festika-orange" />
              <div className="w-5 h-5 bg-festika-teal rotate-12 skew-x-6" />
            </div>
          </div>
          <div className="w-12 h-1 bg-festika-orange mx-auto mt-3" />
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm lg:text-base font-medium">
            Tunjukkan bakatmu, berinovasi di bawah tekanan, dan berkompetisi dengan pikiran-pikiran cerdas di bidang teknologi.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competitions.map((comp, i) => (
            <Link
              key={comp.id}
              href={`/competitions/${comp.id}`}
              className="relative border-2 border-gray-100 rounded-none p-7 pt-9 flex flex-col group hover:border-festika-navy hover:shadow-[12px_12px_0_0_#0F2A36] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Corner Accent - Top Right */}
              <div className={`absolute top-0 right-0 w-8 h-8 ${cornerColors[i % cornerColors.length]} flex items-center justify-center`}>
                <Sparkles size={14} className="text-white opacity-50" />
              </div>
              
              {/* Image Preview if exists */}
              {comp.imageUrl && (
                <div className="mb-6 w-full h-40 overflow-hidden border-2 border-festika-navy grayscale group-hover:grayscale-0 transition-all">
                  <img src={comp.imageUrl} alt={comp.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              )}

              {/* Icon (if no image) */}
              {!comp.imageUrl && (
                <div className="w-14 h-14 border-2 border-festika-teal bg-festika-teal/5 flex items-center justify-center text-festika-teal mb-6 transition-colors group-hover:bg-festika-teal group-hover:text-white">
                  <Trophy size={28} />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-extrabold text-festika-navy mb-1 group-hover:text-festika-teal transition-colors uppercase tracking-tight leading-tight">
                  {comp.title}
                </h3>
                {comp.theme && (
                  <p className="text-festika-orange text-[10px] font-black uppercase tracking-widest mb-3">
                    "{comp.theme}"
                  </p>
                )}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-medium">
                  {comp.description || "Klik untuk melihat detail lomba, persyaratan, dan melakukan pendaftaran melalui Google Form."}
                </p>
              </div>

              {/* Interaction Hint */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-festika-navy group-hover:text-festika-orange transition-colors">
                    Daftar Sekarang
                  </span>
                  <div className="w-6 h-6 bg-festika-navy flex items-center justify-center group-hover:bg-festika-orange transition-colors">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
                <Trophy size={16} className="text-gray-200 group-hover:text-festika-teal transition-colors" />
              </div>
            </Link>
          ))}
          
          {competitions.length === 0 && (
            <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-200 text-gray-300 font-black uppercase tracking-[0.5em]">
              Lomba akan segera hadir!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
