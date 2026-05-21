"use client";

import { useState } from "react";
import { Handshake, Trash2, Plus, X, CheckSquare } from "lucide-react";
import { Sponsor } from "@/types/admin";

type SponsorGridProps = {
  sponsors: Sponsor[];
  onAddRequest: () => void;
  onDeleteMode: (selectedIds: string[]) => void;
  isLoading: boolean;
};

export default function SponsorGrid({
  sponsors, onAddRequest, onDeleteMode, isLoading,
}: SponsorGridProps) {
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
            Daftar <span className="text-festika-orange">Sponsor</span>
          </h1>
          {isDeleteMode && (
            <p className="text-red-500 text-sm font-bold mt-1">Mode pilih aktif — klik kartu untuk memilih</p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          {!isDeleteMode ? (
            <>
              <button
                onClick={() => setIsDeleteMode(true)}
                className="flex items-center justify-center gap-2 border-2 border-festika-navy text-festika-navy px-4 py-2.5 font-bold hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all"
              >
                <Trash2 size={16} />
                Hapus Sponsor
              </button>
              <button
                onClick={onAddRequest}
                className="flex items-center justify-center gap-2 px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] text-white bg-festika-orange hover:bg-festika-orange-light"
              >
                <Plus size={18} />
                Tambah Sponsor
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
                Hapus {selectedIds.size > 0 ? `${selectedIds.size} Sponsor` : "Sponsor"}
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
            Klik logo sponsor untuk memilih yang akan dihapus.
            {selectedIds.size > 0 && ` — ${selectedIds.size} sponsor dipilih.`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {sponsors.map((spn) => {
          const isSelected = selectedIds.has(spn.id);
          return (
            <div
              key={spn.id}
              onClick={() => {
                if (isDeleteMode) toggleSelect(spn.id);
              }}
              className={`
                relative flex flex-col pt-4 transition-all
                border-2
                ${isDeleteMode
                  ? `cursor-pointer ${isSelected
                    ? "bg-red-50 border-red-500 shadow-[4px_4px_0_0_#dc2626] ring-2 ring-red-500 ring-offset-1"
                    : "bg-white border-festika-navy hover:border-red-400 hover:bg-red-50/50 shadow-[4px_4px_0_0_#0F2A36]"}`
                  : "bg-white border-festika-navy shadow-[4px_4px_0_0_#0F2A36] cursor-default"
                }
              `}
            >
              {/* Checklist indicator */}
              {isDeleteMode && (
                <div className={`absolute top-2 left-2 w-5 h-5 border-2 flex items-center justify-center transition-all z-20 ${isSelected ? "bg-red-500 border-red-600" : "bg-white border-gray-300"}`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}

              <div className="px-4 mx-auto w-full aspect-video bg-white overflow-hidden mb-4 p-4 flex items-center justify-center relative">
                {spn.imageUrl
                  ? <img src={spn.imageUrl} alt={spn.name} loading="lazy" className="w-full h-full object-contain" />
                  : <Handshake className="w-12 h-12 text-gray-200" />
                }

              </div>

              <div className="text-center pb-3 px-4 flex-1">
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-festika-navy text-sm leading-tight truncate">{spn.name}</h4>
              </div>
            </div>
          );
        })}

        {sponsors.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200">
            Belum ada sponsor ditambahkan.
          </div>
        )}
      </div>
    </div>
  );
}
