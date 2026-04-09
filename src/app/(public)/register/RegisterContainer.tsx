"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RegisterForm from "@/components/RegisterForm";
import { ArrowLeft, Trophy, ArrowRight } from "lucide-react";

export default function RegisterContainer({ competitions }: { competitions: any[] }) {
  const [selectedCompetition, setSelectedCompetition] = useState<any>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const compId = searchParams.get("id");
    if (compId && competitions.length > 0) {
      const match = competitions.find(c => c.id === compId);
      if (match) {
        setSelectedCompetition(match);
      }
    }
  }, [searchParams, competitions]);

  if (selectedCompetition) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => setSelectedCompetition(null)}
          className="mb-6 flex items-center gap-2 text-festika-navy hover:text-festika-orange font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Kembali ke Pilihan Lomba</span>
        </button>
        
        <div className="mb-6 bg-festika-teal/10 border-l-4 border-festika-teal p-4">
          <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Mendaftar untuk lomba:</p>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">
            {selectedCompetition.title}
          </h3>
        </div>

        <RegisterForm competitionId={selectedCompetition.id} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
      {competitions.map((comp) => (
        <button
          key={comp.id}
          onClick={() => setSelectedCompetition(comp)}
          className="flex flex-col items-start text-left bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36] hover:shadow-[2px_2px_0_0_#0F2A36] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer relative overflow-hidden group"
        >
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 w-20 h-20 bg-festika-orange/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
          
          <div className="w-12 h-12 bg-festika-teal/10 flex items-center justify-center rounded-none border border-festika-teal/20 mb-4 z-10">
            <Trophy className="text-festika-teal" size={24} />
          </div>
          
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-2 z-10 w-full">
            {comp.title}
          </h3>
          <p className="text-gray-600 text-sm z-10 min-h-[40px] line-clamp-2">
            {comp.description || "Tunjukkan kemampuanmu dan jadilah juara!"}
          </p>
          
          <div className="mt-6 flex items-center text-festika-orange font-bold text-sm z-10 uppercase tracking-widest bg-festika-orange/5 px-3 py-1 border border-dashed border-festika-orange/30">
            Pilih Lomba
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      ))}
      
      {competitions.length === 0 && (
        <div className="col-span-full bg-white border-2 border-dashed border-gray-300 p-12 text-center text-gray-500">
          Belum ada lomba yang tersedia saat ini.
        </div>
      )}
    </div>
  );
}
