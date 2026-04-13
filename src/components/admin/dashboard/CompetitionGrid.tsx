"use client";

import { useState } from "react";
import { Plus, Trophy, Trash2, ArrowLeft, Users, CheckSquare, X } from "lucide-react";
import { Competition } from "@/types/admin";

type CompetitionGridProps = {
  competitions: Competition[];
  onSelect: (comp: Competition) => void;
  onAddRequest: () => void;
  /**
   * Dipanggil dengan daftar ID lomba yang dipilih untuk dihapus.
   * AdminDashboard yang bertanggung jawab menampilkan modal konfirmasi.
   */
  onDeleteMode: (selectedIds: string[]) => void;
};

export default function CompetitionGrid({
  competitions,
  onSelect,
  onAddRequest,
  onDeleteMode,
}: CompetitionGridProps) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const exitDeleteMode = () => {
    setIsDeleteMode(false);
    setSelectedIds(new Set());
  };

  const handleRequestDelete = () => {
    if (selectedIds.size === 0) return;
    onDeleteMode(Array.from(selectedIds));
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
            Manajemen Lomba
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isDeleteMode
              ? <span className="text-red-500 font-bold">Mode pilih aktif — klik kartu untuk memilih</span>
              : "Pilih lomba untuk melihat daftar peserta"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          {!isDeleteMode ? (
            <>
              <button
                onClick={() => setIsDeleteMode(true)}
                className="flex items-center justify-center gap-2 border-2 border-festika-navy text-festika-navy px-4 py-2.5 font-bold hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all"
              >
                <Trash2 size={16} />
                Hapus Lomba
              </button>
              <button
                onClick={onAddRequest}
                className="flex items-center justify-center gap-2 bg-festika-orange hover:bg-festika-orange-light text-white px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]"
              >
                <Plus size={18} />
                Tambah Lomba
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleRequestDelete}
                disabled={selectedIds.size === 0}
                className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2.5 font-bold transition-all border-2 border-red-700 shadow-[4px_4px_0_0_#7f1d1d] hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Trash2 size={16} />
                Hapus {selectedIds.size > 0 ? `${selectedIds.size} Lomba` : "Lomba"}
              </button>
              <button
                onClick={exitDeleteMode}
                className="flex items-center justify-center gap-2 border-2 border-gray-400 text-gray-600 px-4 py-2.5 font-bold hover:bg-gray-100 transition-all"
              >
                <X size={16} />
                Batal
              </button>
            </>
          )}
        </div>
      </div>

      {/* Banner mode pilih */}
      {isDeleteMode && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 px-4 py-3 flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
          <CheckSquare className="text-red-500 shrink-0" size={18} />
          <p className="text-red-700 text-sm font-bold">
            Mode Pilih Hapus aktif. Klik kartu lomba untuk memilih/membatalkan pilihan.
            {selectedIds.size > 0 && ` — ${selectedIds.size} lomba dipilih.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((comp) => {
          const isSelected = selectedIds.has(comp.id);
          return (
            <div
              key={comp.id}
              onClick={() => {
                if (isDeleteMode) {
                  toggleSelect(comp.id);
                } else {
                  onSelect(comp);
                }
              }}
              className={`
                relative flex flex-col transition-all min-h-[200px] cursor-pointer group
                border-2 p-6
                ${isDeleteMode
                  ? isSelected
                    ? "bg-red-50 border-red-500 shadow-[4px_4px_0_0_#dc2626] ring-2 ring-red-500 ring-offset-1"
                    : "bg-white border-festika-navy hover:border-red-400 hover:bg-red-50/50 shadow-[6px_6px_0_0_#0F2A36]"
                  : "bg-white border-festika-navy shadow-[6px_6px_0_0_#0F2A36] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                }
              `}
            >
              {/* Checklist indicator saat delete mode */}
              {isDeleteMode && (
                <div className={`absolute top-3 right-3 w-6 h-6 border-2 flex items-center justify-center transition-all ${isSelected ? "bg-red-500 border-red-600" : "bg-white border-gray-300"}`}>
                  {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
              )}

              <div className={`w-12 h-12 flex items-center justify-center mb-4 border-2 transition-colors ${isSelected ? "bg-red-100 border-red-400" : "bg-festika-teal/10 border-festika-teal"}`}>
                <Trophy className={isSelected ? "text-red-500" : "text-festika-teal"} size={24} />
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
                {!isDeleteMode && (
                  <div className="flex items-center gap-1 text-festika-teal text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Detail</span> <ArrowLeft className="rotate-180" size={14} />
                  </div>
                )}
                {isDeleteMode && isSelected && (
                  <span className="text-red-500 text-xs font-bold">Dipilih</span>
                )}
              </div>
            </div>
          );
        })}

        {competitions.length === 0 && (
          <div className="col-span-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200">
            <Trophy className="mx-auto mb-3 opacity-30" size={40} />
            <p>Belum ada lomba yang terdaftar.</p>
          </div>
        )}
      </div>
    </div>
  );
}
