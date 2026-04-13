"use client";

import { useState } from "react";
import { Plus, ShieldCheck, Image as ImageIcon, Trash2, X, CheckSquare } from "lucide-react";
import { Division } from "@/types/admin";

type DivisionGridProps = {
  divisions: Division[];
  onSelect: (div: Division) => void;
  onAddRequest: () => void;
  /**
   * Dipanggil dengan array ID divisi yang dipilih untuk dihapus.
   * StaffPanel yang bertanggung jawab menampilkan modal konfirmasi.
   * BPH INTI (id === "core") tidak akan pernah masuk ke sini.
   */
  onDeleteMode: (selectedIds: string[]) => void;
  isLoading: boolean;
};

export default function DivisionGrid({
  divisions,
  onSelect,
  onAddRequest,
  onDeleteMode,
  isLoading,
}: DivisionGridProps) {
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
            Manajemen Kepanitiaan
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isDeleteMode
              ? <span className="text-red-500 font-bold">Mode pilih aktif — klik kartu divisi untuk memilih (BPH INTI tidak dapat dihapus)</span>
              : "Kelola pimpinan inti dan divisi panitia"}
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
                Hapus Divisi
              </button>
              <button
                onClick={onAddRequest}
                className="flex items-center justify-center gap-2 bg-festika-teal hover:bg-festika-navy text-white px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]"
              >
                <Plus size={18} />
                Tambah Divisi
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
                Hapus {selectedIds.size > 0 ? `${selectedIds.size} Divisi` : "Divisi"}
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
            Hanya divisi yang bisa dipilih. BPH INTI tidak dapat dihapus dari sini.
            {selectedIds.size > 0 && ` — ${selectedIds.size} divisi dipilih.`}
          </p>
        </div>
      )}

      {/* ── BPH INTI — tidak bisa diseleksi saat delete mode ── */}
      <div className="mb-10">
        <h2 className="font-bold text-festika-navy/40 uppercase tracking-widest text-xs mb-4">Pimpinan Utama</h2>
        <div
          onClick={() => {
            // Klik BPH saat delete mode diblokir — hanya bisa masuk untuk lihat
            if (!isDeleteMode) {
              onSelect({ id: "core", name: "BPH INTI", imageUrl: null, isCore: true });
            }
          }}
          className={`
            bg-festika-orange border-2 border-festika-navy p-6 w-full max-w-sm
            shadow-[8px_8px_0_0_#0F2A36] transition-all group relative
            ${isDeleteMode
              ? "opacity-50 cursor-not-allowed"
              : "hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#0F2A36] cursor-pointer"}
          `}
        >
          {isDeleteMode && (
            <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 uppercase">
              Terkunci
            </div>
          )}
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 p-3 rounded-none border-2 border-white/40 group-hover:bg-white/30 transition-colors">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black italic">BPH INTI</h3>
              <p className="text-white/80 text-xs font-bold uppercase tracking-tighter">Ketua, Sekretaris, Bendahara</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Daftar Divisi ── */}
      <h2 className="font-bold text-festika-navy/40 uppercase tracking-widest text-xs mb-4">Daftar Divisi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisions.map((div) => {
          const isSelected = selectedIds.has(div.id);
          return (
            <div
              key={div.id}
              onClick={() => {
                if (isDeleteMode) toggleSelect(div.id);
                else onSelect(div);
              }}
              className={`
                relative border-2 p-5 transition-all cursor-pointer
                ${isDeleteMode
                  ? isSelected
                    ? "bg-red-50 border-red-500 shadow-[4px_4px_0_0_#dc2626] ring-2 ring-red-500 ring-offset-1"
                    : "bg-white border-festika-navy hover:border-red-400 hover:bg-red-50/50 shadow-[4px_4px_0_0_#F5A623]"
                  : "bg-white border-festika-navy shadow-[4px_4px_0_0_#F5A623] hover:shadow-[2px_2px_0_0_#F5A623] hover:translate-x-[2px] hover:translate-y-[2px]"
                }
              `}
            >
              {/* Checklist indicator */}
              {isDeleteMode && (
                <div className={`absolute top-2 right-2 w-5 h-5 border-2 flex items-center justify-center transition-all z-10 ${isSelected ? "bg-red-500 border-red-600" : "bg-white border-gray-300"}`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              )}

              {div.imageUrl ? (
                <div className="w-full h-32 mb-3 bg-gray-100 overflow-hidden border-2 border-festika-navy">
                  <img src={div.imageUrl} alt={div.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-full h-32 mb-3 bg-festika-orange/10 border-2 border-dashed border-festika-orange flex flex-col items-center justify-center text-festika-orange">
                  <ImageIcon size={32} />
                  <span className="text-xs font-bold mt-2">No Image</span>
                </div>
              )}

              <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">{div.name}</h3>
              {isDeleteMode && isSelected && (
                <span className="text-red-500 text-xs font-bold block mt-1">Dipilih untuk dihapus</span>
              )}
            </div>
          );
        })}
        {divisions.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200">
            Belum ada divisi yang terdaftar.
          </div>
        )}
      </div>
    </div>
  );
}
