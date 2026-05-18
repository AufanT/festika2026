import { X, Loader2 } from "lucide-react";

type AddSponsorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  onNameChange: (val: string) => void;
  tier: string;
  onTierChange: (val: string) => void;
  onFileChange: (file: File | null) => void;
  isLoading: boolean;
};

export function AddSponsorModal({
  isOpen, onClose, onSubmit, name, onNameChange, tier, onTierChange, onFileChange, isLoading
}: AddSponsorModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start p-4 bg-black/50 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div className="bg-white border-2 border-festika-navy p-6 w-full max-w-md shadow-[8px_8px_0_0_#F5A623] my-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">Tambah Sponsor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Nama Sponsor</label>
            <input required value={name} onChange={e => onNameChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" placeholder="Cth: PT. Teknologi Indonesia" />
          </div>
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Tier / Kategori</label>
            <select value={tier} onChange={e => onTierChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none bg-white">
              <option value="Supported By">Supported By</option>
              <option value="Media Partner">Media Partner</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Logo Sponsor (Wajib)</label>
            <input required type="file" accept="image/*" onChange={e => onFileChange(e.target.files?.[0] || null)} className="w-full text-sm border-2 border-gray-200 p-2" />
          </div>
          <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center gap-2 bg-festika-orange text-white py-2 font-bold border-2 border-festika-navy mt-4 hover:bg-festika-orange-light transition-colors">
            {isLoading && <Loader2 size={16} className="animate-spin" />} Simpan Sponsor
          </button>
        </form>
      </div>
    </div>
  );
}
