import { Users, Trash2, ArrowLeft, Plus } from "lucide-react";
import { Staff, Division } from "@/types/admin";

type StaffGridProps = {
  selectedDiv: Division;
  staff: Staff[];
  onBack: () => void;
  onAddRequest: () => void;
  onDeleteRequest: (id: string, name: string) => void;
  isLoading: boolean;
};

export default function StaffGrid({ 
  selectedDiv, staff, onBack, onAddRequest, onDeleteRequest, isLoading 
}: StaffGridProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-festika-teal font-medium hover:text-festika-orange text-sm mb-3 transition-colors"
          >
            <ArrowLeft size={16} /> Kembali ke Daftar
          </button>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
            Staf: <span className="text-festika-orange">{selectedDiv.name}</span>
          </h1>
        </div>
        <button
          onClick={onAddRequest}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] ${selectedDiv.isCore ? 'bg-festika-teal text-white' : 'bg-festika-orange text-white'}`}
        >
          <Plus size={18} />
          Tambah Anggota
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {staff.map((stf) => (
          <div key={stf.id} className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] flex flex-col pt-4 relative">
            {stf.role === "KOORDINATOR" && (
              <div className="absolute -top-3 -right-3 bg-festika-orange text-white text-[10px] font-black px-2 py-1 border-2 border-festika-navy shadow-[2px_2px_0_0_#0F2A36] z-20">
                KOORDINATOR
              </div>
            )}
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDeleteRequest(stf.id, stf.name);
              }}
              className="absolute top-2 left-2 p-1.5 bg-white border-2 border-festika-navy text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-20"
              title="Hapus Anggota"
            >
              <Trash2 size={16} />
            </button>
            <div className="px-4 mx-auto w-full aspect-square border-2 border-festika-navy bg-festika-navy/10 overflow-hidden mb-4 rounded-full max-w-[160px]">
              {stf.imageUrl ? (
                <img src={stf.imageUrl} alt={stf.name} className="w-full h-full object-cover" />
              ) : <Users className="w-full h-full p-8 text-gray-400" />}
            </div>
            <div className="text-center pb-4 px-4 border-b-2 border-gray-100 flex-1">
              <h4 className="font-[family-name:var(--font-space-grotesk)] font-bold text-festika-navy text-lg leading-tight mb-1">{stf.name}</h4>
              <p className="text-festika-teal font-extrabold text-[10px] uppercase tracking-widest">{stf.role}</p>
            </div>
            <div className="bg-gray-50 p-4 text-xs text-gray-500 h-24 overflow-y-auto">
              {stf.description || "Tidak ada rincian tugas."}
            </div>
          </div>
        ))}
        {staff.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200">
            Belum ada anggota di kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}
