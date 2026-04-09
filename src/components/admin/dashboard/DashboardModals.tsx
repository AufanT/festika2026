import { Loader2, AlertTriangle, X } from "lucide-react";
import { Competition } from "@/types/admin";

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

export function AddCompetitionModal({
  isOpen, onClose, onSubmit, title, onTitleChange, description, onDescriptionChange, isLoading
}: AddModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-md shadow-[12px_12px_0_0_#F5A623]">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-4">Tambah Lomba Baru</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input required value={title} onChange={e => onTitleChange(e.target.value)} placeholder="Nama Lomba" className="w-full px-4 py-3 border-2 border-festika-navy outline-none" />
          <textarea value={description} onChange={e => onDescriptionChange(e.target.value)} placeholder="Deskripsi" className="w-full px-4 py-3 border-2 border-festika-navy outline-none h-32" />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">Batal</button>
            <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623]">
              {isLoading && <Loader2 size={16} className="animate-spin" />} Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

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
              <input autoFocus type="text" value={input} onChange={(e) => onInputChange(e.target.value)} placeholder="Ketik nama lomba..." className="w-full px-4 py-3 border-2 border-gray-200 outline-none mb-4 font-bold" />
              <button disabled={input !== competition.title} onClick={onNextStep} className="w-full py-3 bg-festika-navy text-white font-bold disabled:opacity-30">Lanjut</button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300 text-center">
              <div className="bg-red-50 border-2 border-red-100 p-4 mb-6">
                <p className="text-red-600 text-xs leading-relaxed font-bold">PERINGATAN: Menghapus lomba akan menghapus SEMUA data pendaftar terkait secara permanen!</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => onInputChange("") || onNextStep()} className="flex-1 py-3 border-2 border-gray-200 font-bold">Batal (Reset)</button>
                <button onClick={onConfirm} disabled={isLoading} className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 flex items-center justify-center gap-2">
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
