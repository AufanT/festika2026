import { X, Loader2 } from "lucide-react";
import { Division } from "@/types/admin";

type AddDivisionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  onNameChange: (val: string) => void;
  onFileChange: (file: File | null) => void;
  isLoading: boolean;
};

type AddStaffModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  onNameChange: (val: string) => void;
  role: string;
  onRoleChange: (val: string) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  onFileChange: (file: File | null) => void;
  selectedDiv: Division;
  hasCoordinator: boolean;
  isLoading: boolean;
};

export function AddDivisionModal({
  isOpen, onClose, onSubmit, name, onNameChange, onFileChange, isLoading
}: AddDivisionModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-2 border-festika-navy p-6 w-full max-w-md shadow-[8px_8px_0_0_#F5A623]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">Tambah Divisi</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Nama Divisi</label>
            <input required value={name} onChange={e => onNameChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" placeholder="Cth: Acara" />
          </div>
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Foto Rombongan Divisi (Opsional)</label>
            <input type="file" accept="image/*" onChange={e => onFileChange(e.target.files?.[0] || null)} className="w-full text-sm border-2 border-gray-200 p-2" />
          </div>
          <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center gap-2 bg-festika-teal text-white py-2 font-bold border-2 border-festika-navy mt-4">
            {isLoading && <Loader2 size={16} className="animate-spin" />} Simpan Divisi
          </button>
        </form>
      </div>
    </div>
  );
}

export function AddStaffModal({
  isOpen, onClose, onSubmit, name, onNameChange, role, onRoleChange,
  description, onDescriptionChange, onFileChange, selectedDiv, hasCoordinator, isLoading
}: AddStaffModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-2 border-festika-navy p-6 w-full max-w-md shadow-[8px_8px_0_0_#F5A623] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">Tambah Anggota</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Nama Anggota</label>
            <input required value={name} onChange={e => onNameChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" />
          </div>
          
          {selectedDiv.isCore ? (
            <div>
              <label className="text-sm font-bold text-festika-navy block mb-1">Jabatan Pimpinan</label>
              <select required value={role} onChange={e => onRoleChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none bg-white">
                <option value="">-- Pilih Jabatan --</option>
                <option value="KETUA PELAKSANA">KETUA PELAKSANA</option>
                <option value="SEKRETARIS UMUM">SEKRETARIS UMUM</option>
                <option value="BENDAHARA UMUM">BENDAHARA UMUM</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="text-sm font-bold text-festika-navy block mb-1">Tipe Jabatan</label>
              <select required value={role} onChange={e => onRoleChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none bg-white">
                <option value="">-- Pilih Jabatan --</option>
                <option value="KOORDINATOR" disabled={hasCoordinator}>KOORDINATOR {hasCoordinator ? "(Sudah Ada)" : ""}</option>
                <option value="STAFF">STAFF</option>
              </select>
              {hasCoordinator && role !== "KOORDINATOR" && <p className="text-[10px] text-orange-500 font-bold mt-1 uppercase italic">Hanya diperbolehkan satu Koordinator per divisi.</p>}
            </div>
          )}

          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Deskripsi Tambahan</label>
            <textarea value={description} onChange={e => onDescriptionChange(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" rows={3} />
          </div>
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-1">Foto Persona (Opsional)</label>
            <input type="file" accept="image/*" onChange={e => onFileChange(e.target.files?.[0] || null)} className="w-full text-sm border-2 border-gray-200 p-2" />
          </div>
          <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center gap-2 bg-festika-orange text-white py-2 font-bold border-2 border-festika-navy mt-4">
            {isLoading && <Loader2 size={16} className="animate-spin" />} Simpan Anggota
          </button>
        </form>
      </div>
    </div>
  );
}
