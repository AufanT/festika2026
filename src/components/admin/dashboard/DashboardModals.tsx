"use client";

import { useState, useEffect } from "react";
import { Loader2, AlertTriangle, X, CheckCircle2, Trash2 } from "lucide-react";
import { Competition } from "@/types/admin";

// ---------------------------------------------------------------------------
// AddCompetitionModal
// ---------------------------------------------------------------------------
type AddModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onTitleChange: (val: string) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  isLoading: boolean;
};

export function AddCompetitionModal({
  isOpen, onClose, onSubmit, title, onTitleChange, description, onDescriptionChange, isLoading
}: AddModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-md shadow-[12px_12px_0_0_#F5A623]">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-4">Tambah Lomba Baru</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input required value={title} onChange={e => onTitleChange(e.target.value)} placeholder="Nama Lomba" className="w-full px-4 py-3 border-2 border-festika-navy outline-none focus:border-festika-orange transition-colors" />
          <textarea value={description} onChange={e => onDescriptionChange(e.target.value)} placeholder="Deskripsi" className="w-full px-4 py-3 border-2 border-festika-navy outline-none focus:border-festika-orange transition-colors h-32" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">Batal</button>
            <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623] disabled:opacity-50">
              {isLoading && <Loader2 size={16} className="animate-spin" />} Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeleteCompetitionModal (single — legacy, dipertahankan jika masih dipakai)
// ---------------------------------------------------------------------------
type DeleteModalProps = {
  competition: Competition | null;
  step: number;
  input: string;
  onInputChange: (val: string) => void;
  onNextStep: () => void;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export function DeleteCompetitionModal({
  competition, step, input, onInputChange, onNextStep, onConfirm, onClose, isLoading
}: DeleteModalProps) {
  if (!competition) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-4 border-festika-navy p-0 w-full max-w-md shadow-[12px_12px_0_0_#0F2A36]">
        <div className="bg-festika-navy p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2"><AlertTriangle size={20} className="text-festika-orange" /><h2 className="font-bold">Konfirmasi Hapus</h2></div>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        <div className="p-6">
          {step === 1 ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">Ketik nama lomba <strong className="text-festika-navy">"{competition.title}"</strong> untuk konfirmasi.</p>
              <input autoFocus type="text" value={input} onChange={(e) => onInputChange(e.target.value)} placeholder="Ketik nama lomba..." className="w-full px-4 py-3 border-2 border-gray-200 outline-none mb-4 font-bold focus:border-red-400 transition-colors" />
              <button disabled={input !== competition.title} onClick={onNextStep} className="w-full py-3 bg-festika-navy text-white font-bold disabled:opacity-30 transition-opacity">Lanjut</button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300 text-center">
              <div className="bg-red-50 border-2 border-red-100 p-4 mb-6">
                <p className="text-red-600 text-xs leading-relaxed font-bold">PERINGATAN: Menghapus lomba akan menghapus SEMUA data pendaftar terkait secara permanen!</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { onInputChange(""); onNextStep(); }} className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">Batal (Reset)</button>
                <button onClick={onConfirm} disabled={isLoading} className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50">
                   {isLoading && <Loader2 size={16} className="animate-spin" />} Ya, Hapus!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeleteMultipleModal — Modal Konfirmasi Hapus Massal dengan Verifikasi Input
//
// Desain: 2 langkah (step)
//   Step 1: Tampilkan daftar item yang akan dihapus + dampak, user harus mengetik
//           teks verifikasi persis untuk melanjutkan.
//   Step 2: Konfirmasi akhir sebelum aksi tidak dapat dibatalkan.
//
// Prinsip:
//   - Fail-safe default: tombol hapus disabled hingga kondisi terpenuhi
//   - Least privilege: hanya berjalan setelah sesi aktif (divalidasi di backend)
//   - UX: teks verifikasi unik per aksi, bukan password statis
// ---------------------------------------------------------------------------
export type DeleteMultipleTarget = {
  id: string;
  label: string;         // nama item yang ditampilkan di daftar
  subCount?: number;     // jumlah data turunan (misal: pendaftar / anggota)
  subLabel?: string;     // label turunannya (misal: "pendaftar", "anggota")
};

type DeleteMultipleModalProps = {
  isOpen: boolean;
  title: string;               // Judul modal: "Hapus Lomba", "Hapus Divisi", dst.
  entityLabel: string;         // Label untuk teks verifikasi, huruf kapital (misal: "LOMBA")
  targets: DeleteMultipleTarget[];
  cascadeWarning: string;      // Deskripsi dampak penghapusan cascade
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export function DeleteMultipleModal({
  isOpen, title, entityLabel, targets, cascadeWarning, onConfirm, onClose, isLoading
}: DeleteMultipleModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [input, setInput] = useState("");

  // Reset internal state setiap kali modal dibuka ulang
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setInput("");
    }
  }, [isOpen]);

  if (!isOpen || targets.length === 0) return null;

  const count = targets.length;
  // Teks verifikasi unik berdasarkan jumlah dan jenis item — menghindari klik tidak sengaja
  const expectedInput = `HAPUS ${count} ${entityLabel}`;
  const isInputValid = input === expectedInput;
  const totalSubItems = targets.reduce((acc, t) => acc + (t.subCount ?? 0), 0);

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      // Tidak bisa tutup dengan klik overlay — tindakan kritis harus eksplisit
    >
      <div className="bg-white border-4 border-festika-navy w-full max-w-lg shadow-[16px_16px_0_0_#0F2A36] animate-in zoom-in-95 duration-200">

        {/* ── Header ── */}
        <div className="bg-red-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <Trash2 size={18} />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-lg">{title}</h2>
              <p className="text-red-200 text-xs">Tindakan ini tidak dapat dibatalkan</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 hover:bg-white/20 rounded-sm transition-colors disabled:opacity-50"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">

          {/* ── STEP 1: Review & Verifikasi ── */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300 space-y-5">

              {/* Daftar item yang akan dihapus */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {count} Item yang akan dihapus
                </p>
                <div className="border-2 border-gray-200 max-h-40 overflow-y-auto">
                  {targets.map((t, i) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm ${i < targets.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <span className="font-bold text-festika-navy">{t.label}</span>
                      {t.subCount !== undefined && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 border border-gray-200">
                          {t.subCount} {t.subLabel ?? "item"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Peringatan cascade / dampak */}
              <div className="bg-amber-50 border-2 border-amber-300 p-4 flex gap-3">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="text-amber-800 font-black text-xs uppercase tracking-wide">Dampak Penghapusan</p>
                  <p className="text-amber-700 text-sm leading-relaxed">{cascadeWarning}</p>
                  {totalSubItems > 0 && (
                    <p className="text-amber-600 text-xs font-bold mt-1">
                      ⚠ Total {totalSubItems} data turunan akan ikut terhapus secara permanen.
                    </p>
                  )}
                </div>
              </div>

              {/* Input verifikasi */}
              <div>
                <label className="block text-sm font-bold text-festika-navy mb-2">
                  Ketik <span className="font-black text-red-600 tracking-wide font-mono bg-red-50 px-1 py-0.5 border border-red-200">{expectedInput}</span> untuk melanjutkan:
                </label>
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={expectedInput}
                  className={`w-full px-4 py-3 border-2 font-mono text-sm outline-none transition-colors ${
                    input.length > 0
                      ? isInputValid
                        ? "border-green-400 bg-green-50"
                        : "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {input.length > 0 && !isInputValid && (
                  <p className="text-red-500 text-xs mt-1 font-bold">Teks verifikasi tidak cocok</p>
                )}
                {isInputValid && (
                  <p className="text-green-600 text-xs mt-1 font-bold flex items-center gap-1"><CheckCircle2 size={12}/> Verifikasi berhasil</p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 border-2 border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!isInputValid}
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Lanjut →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Konfirmasi Akhir ── */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300 space-y-5">
              <div className="text-center py-2">
                <div className="w-16 h-16 bg-red-100 border-4 border-red-300 mx-auto flex items-center justify-center mb-4">
                  <AlertTriangle className="text-red-600" size={32} />
                </div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy">Anda Yakin?</p>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Anda akan menghapus <strong className="text-red-600">{count} {entityLabel.toLowerCase()}</strong>. Data yang sudah dihapus <strong>tidak bisa dikembalikan</strong>.
                </p>
              </div>

              <div className="bg-festika-navy/5 border-2 border-festika-navy/20 p-3 text-center">
                <p className="text-festika-navy/70 text-xs font-bold">Ini adalah langkah terakhir. Pastikan Anda sudah yakin.</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="flex-1 py-3 border-2 border-festika-navy font-bold text-festika-navy hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-red-600 text-white font-black hover:bg-red-700 flex items-center justify-center gap-2 transition-colors border-2 border-red-700 shadow-[4px_4px_0_0_#7f1d1d] disabled:opacity-50 disabled:shadow-none"
                >
                  {isLoading ? (
                    <><Loader2 size={16} className="animate-spin" /> Menghapus...</>
                  ) : (
                    <><Trash2 size={16} /> Hapus Sekarang</>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
