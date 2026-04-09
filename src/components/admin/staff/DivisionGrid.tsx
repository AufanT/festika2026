import { Plus, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { Division } from "@/types/admin";

type DivisionGridProps = {
  divisions: Division[];
  onSelect: (div: Division) => void;
  onAddRequest: () => void;
  isLoading: boolean;
};

export default function DivisionGrid({ divisions, onSelect, onAddRequest, isLoading }: DivisionGridProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
            Manajemen Kepanitiaan
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola pimpinan inti dan divisi panitia</p>
        </div>
        <button
          onClick={onAddRequest}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-festika-teal hover:bg-festika-navy text-white px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]"
        >
          <Plus size={18} />
          Tambah Divisi
        </button>
      </div>

      {/* Section BPH Inti */}
      <div className="mb-10">
        <h2 className="font-bold text-festika-navy/40 uppercase tracking-widest text-xs mb-4">Pimpinan Utama</h2>
        <div 
          onClick={() => onSelect({ id: "core", name: "BPH INTI", imageUrl: null, isCore: true })}
          className="bg-festika-orange border-2 border-festika-navy p-6 w-full max-w-sm shadow-[8px_8px_0_0_#0F2A36] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_0_#0F2A36] transition-all cursor-pointer group"
        >
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

      <h2 className="font-bold text-festika-navy/40 uppercase tracking-widest text-xs mb-4">Daftar Divisi</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {divisions.map((div) => (
          <div 
            key={div.id}
            onClick={() => onSelect(div)}
            className="bg-white border-2 border-festika-navy p-5 shadow-[4px_4px_0_0_#F5A623] hover:shadow-[2px_2px_0_0_#F5A623] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
          >
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
          </div>
        ))}
        {divisions.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-200">
            Belum ada divisi yang terdaftar.
          </div>
        )}
      </div>
    </div>
  );
}
