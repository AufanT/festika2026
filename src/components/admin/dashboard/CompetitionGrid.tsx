import { Plus, Trophy, Trash2, ArrowLeft, Users } from "lucide-react";
import { Competition } from "@/types/admin";

type CompetitionGridProps = {
  competitions: Competition[];
  onSelect: (comp: Competition) => void;
  onDeleteRequest: (comp: Competition) => void;
  onAddRequest: () => void;
};

export default function CompetitionGrid({ 
  competitions, 
  onSelect, 
  onDeleteRequest, 
  onAddRequest 
}: CompetitionGridProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
            Manajemen Lomba
          </h1>
          <p className="text-gray-500 text-sm mt-1">Pilih lomba untuk melihat daftar peserta</p>
        </div>
        <button
          onClick={onAddRequest}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-festika-orange hover:bg-festika-orange-light text-white px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]"
        >
          <Plus size={18} />
          Tambah Lomba
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((comp) => (
          <div
            key={comp.id}
            onClick={() => onSelect(comp)}
            className="bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36] hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer group relative flex flex-col transition-all min-h-[200px]"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRequest(comp);
              }}
              className="absolute top-4 right-4 p-2 bg-white border-2 border-festika-navy text-festika-navy hover:bg-red-500 hover:text-white transition-colors z-10"
            >
              <Trash2 size={16} />
            </button>
            <div className="w-12 h-12 bg-festika-teal/10 flex items-center justify-center mb-4 border-2 border-festika-teal">
              <Trophy className="text-festika-teal" size={24} />
            </div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-2">
              {comp.title}
            </h3>
            <p className="text-gray-600 text-xs flex-1 line-clamp-2">
              {comp.description || "Tidak ada rincian."}
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 w-full flex justify-between items-center group-hover:border-festika-teal/30 transition-colors">
              <div className="flex items-center gap-1.5 text-festika-navy font-bold text-xs bg-gray-100 px-2 py-1 rounded-sm border border-gray-200">
                <Users size={14} className="text-festika-teal" />
                <span>{comp.registrant_count || 0} Pendaftar</span>
              </div>
              <div className="flex items-center gap-1 text-festika-teal text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Detail</span> <ArrowLeft className="rotate-180" size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
