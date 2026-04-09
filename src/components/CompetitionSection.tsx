"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, X, Sparkles, LayoutDashboard } from "lucide-react";

type Competition = {
  id: string;
  title: string;
  description: string | null;
};

const cornerColors = ["bg-festika-orange", "bg-festika-teal", "bg-festika-navy"];

export default function CompetitionSection({ competitions }: { competitions: Competition[] }) {
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);

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
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm lg:text-base">
            Tunjukkan bakatmu, berinovasi di bawah tekanan, dan berkompetisi dengan pikiran-pikiran cerdas di bidang teknologi.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competitions.map((comp, i) => (
            <div
              key={comp.id}
              onClick={() => setSelectedComp(comp)}
              className="relative border-2 border-gray-100 rounded-none p-7 pt-9 flex flex-col group hover:border-festika-navy hover:shadow-[8px_8px_0_0_#0F2A36] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Corner Accent - Top Right */}
              <div className={`absolute top-0 right-0 w-6 h-6 ${cornerColors[i % cornerColors.length]}`} />
              
              {/* Icon */}
              <div className="w-14 h-14 border-2 border-festika-teal bg-festika-teal/5 flex items-center justify-center text-festika-teal mb-6 transition-colors group-hover:bg-festika-teal group-hover:text-white">
                <Trophy size={28} />
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-extrabold text-festika-navy mb-3 group-hover:text-festika-teal transition-colors uppercase tracking-tight">
                {comp.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">
                {comp.description || "Klik untuk melihat detail lomba dan persyaratan pendaftaran."}
              </p>

              {/* Interaction Hint */}
              <div className="flex items-center gap-2 mt-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-festika-orange">
                  Lihat Detail
                </span>
                <div className="w-6 h-6 bg-festika-navy flex items-center justify-center group-hover:bg-festika-orange transition-colors">
                  <ArrowRight size={14} className="text-white" />
                </div>
              </div>
            </div>
          ))}
          
          {competitions.length === 0 && (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 text-gray-400 font-bold uppercase tracking-widest">
              Lomba akan segera hadir!
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedComp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-festika-navy/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white border-4 border-festika-navy w-full max-w-2xl shadow-[16px_16px_0_0_#F5A623] relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Close */}
            <button 
              onClick={() => setSelectedComp(null)}
              className="absolute top-4 right-4 p-2 text-festika-navy hover:bg-gray-100 transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-festika-teal flex items-center justify-center text-white border-4 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]">
                  <Trophy size={32} />
                </div>
                <div>
                   <span className="text-[10px] font-black text-festika-orange uppercase tracking-[0.3em]">Competition Details</span>
                   <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-black text-festika-navy uppercase leading-none">
                    {selectedComp.title}
                  </h2>
                </div>
              </div>

              <div className="prose prose-festika max-w-none">
                <p className="text-gray-600 leading-relaxed lg:text-lg">
                  {selectedComp.description || "Mari bergabung dan tunjukkan kemampuan terbaikmu di ajang ini! Detail syarat dan ketentuan akan diinformasikan lebih lanjut oleh panitia."}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                <Link href={`/register?id=${selectedComp.id}`} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-festika-orange hover:bg-festika-navy text-white px-8 py-4 font-black uppercase tracking-widest text-sm border-4 border-festika-navy shadow-[6px_6px_0_0_#0F2A36] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                    Daftar Sekarang
                    <Sparkles size={18} />
                  </button>
                </Link>
                <button 
                  onClick={() => setSelectedComp(null)}
                  className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-festika-navy transition-colors"
                >
                  Mungkin Nanti
                </button>
              </div>
            </div>
            
            {/* Decorative bottom bar */}
            <div className="h-4 bg-festika-teal w-full border-t-4 border-festika-navy" />
          </div>
        </div>
      )}
    </section>
  );
}
