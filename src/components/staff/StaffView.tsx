"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, LayoutDashboard } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  imageUrl: string | null;
};

type Division = {
  id: string;
  name: string;
  imageUrl: string | null;
};

export default function StaffView({ divisions, coreLeaders = [] }: { divisions: Division[], coreLeaders?: Staff[] }) {
  const [selectedDiv, setSelectedDiv] = useState<Division | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDivClick = (div: Division) => {
    setSelectedDiv(div);
    setIsLoading(true);
    fetch(`/api/staff?divisionId=${div.id}`)
      .then((res) => res.json())
      .then((data) => {
        setStaffList(data.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // LEVEL 3: Detail Anggota
  if (selectedStaff) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedStaff(null)}
          className="mb-8 flex items-center text-festika-navy hover:text-festika-orange transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Image (Navy wrapper with wide Orange shadow) */}
          <div className="relative max-w-sm mx-auto w-full">
             <div className="absolute top-6 left-6 right-[-24px] bottom-[-24px] bg-festika-orange z-0"></div>
             <div className="relative z-10 border-[6px] border-festika-navy bg-white aspect-[3/4] overflow-hidden flex items-center justify-center">
               {selectedStaff.imageUrl ? (
                 <img src={selectedStaff.imageUrl} alt={selectedStaff.name} className="w-full h-full object-cover" />
               ) : (
                 <span className="text-gray-400 font-bold">NO FOTO</span>
               )}
             </div>
          </div>
          
          {/* Right: Info Card */}
          <div className="relative">
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] bg-festika-navy z-0"></div>
            <div className="relative z-10 bg-white border-4 border-festika-navy p-8 flex flex-col h-full min-h-[300px]">
              
              <div className="flex items-center gap-4 border-b-4 border-festika-teal pb-4 mb-6">
                <div className="w-12 h-12 border-4 border-festika-navy flex items-center justify-center text-festika-teal">
                  <LayoutDashboard size={24} />
                </div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl lg:text-4xl font-black text-festika-navy uppercase tracking-tighter">
                  {selectedStaff.role}
                </h2>
              </div>
              
              <h3 className="font-bold text-festika-navy text-xl mb-4">{selectedStaff.name}</h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed flex-1">
                {selectedStaff.description || "Anggota ini sangat berdedikasi untuk menyukseskan acara Festika. Tidak ada detail tambahan yang dicantumkan."}
              </p>
              
              <div className="pt-4">
                <button className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-bold text-festika-navy text-sm uppercase">
                  LEARN MORE 
                  <span className="bg-festika-orange text-white p-1 border-2 border-festika-navy">
                    <ArrowLeft size={14} className="rotate-[135deg]" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LEVEL 2: Daftar Anggota
  if (selectedDiv) {
    return (
      <div className="max-w-7xl mx-auto px-4 pb-20 animate-in fade-in zoom-in-95 duration-500">
         <div className="mb-12 cursor-pointer inline-flex items-center" onClick={() => setSelectedDiv(null)}>
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <ArrowLeft size={24} className="text-festika-navy text-opacity-50" />
            </div>
         </div>
         
         <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-black text-festika-navy uppercase tracking-tighter inline-block relative border-b-[6px] border-festika-teal pb-2">
              ANGGOTA
            </h2>
            <p className="text-gray-400 text-sm mt-4 uppercase tracking-wider">
              {selectedDiv.name} • daftar pengurus acara
            </p>
         </div>
         
         {isLoading ? (
           <div className="text-center py-20 text-gray-400 font-bold animate-pulse">MEMUAT...</div>
         ) : staffList.length === 0 ? (
           <div className="text-center py-20 text-gray-400">Belum ada anggota dimasukkan.</div>
         ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {staffList.map((stf) => (
               <div 
                 key={stf.id} 
                 onClick={() => setSelectedStaff(stf)}
                 className="group cursor-pointer flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 hover:-translate-y-2 transition-transform relative"
               >
                 <div className="absolute top-4 -right-2 w-full h-full bg-festika-orange opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                 {/* Card */}
                 <div className="border-4 border-festika-navy bg-white w-full z-10 relative flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative aspect-square w-full border-b-4 border-festika-navy overflow-hidden bg-gray-100">
                      <div className="absolute top-0 right-0 w-12 h-12 bg-festika-teal border-l-4 border-b-4 border-festika-navy z-20 group-hover:bg-festika-orange transition-colors" />
                      {stf.imageUrl ? (
                        <img src={stf.imageUrl} alt={stf.name} className="w-full h-full object-cover transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl bg-festika-navy/5">NO FOTO</div>
                      )}
                    </div>
                    {/* Text Area */}
                    <div className="p-4 text-center pb-6">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-extrabold text-festika-navy mb-1 line-clamp-1">{stf.name}</h3>
                      <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">{stf.role}</p>
                    </div>
                 </div>
               </div>
             ))}
           </div>
         )}
      </div>
    );
  }

  // LEVEL 1: Daftar Divisi & Core Leaders
  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      
      {/* 3 TERATAS: BPH INTI */}
      {coreLeaders.length > 0 && (
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black text-festika-navy uppercase tracking-tighter">
              Badan Pengurus Harian
            </h2>
            <div className="h-1.5 w-24 bg-festika-orange mx-auto mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {coreLeaders.map((leader) => (
              <div 
                key={leader.id}
                onClick={() => setSelectedStaff(leader)}
                className="group cursor-pointer relative animate-in fade-in slide-in-from-top-4 duration-1000"
              >
                {/* Wider Card Design */}
                <div className="absolute top-4 right-[-12px] w-full h-full bg-festika-navy z-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
                <div className="relative z-10 border-4 border-festika-navy bg-white">
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 border-b-4 border-festika-navy">
                    {leader.imageUrl ? (
                      <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-festika-orange/10 text-festika-orange font-black">LEADER</div>
                    )}
                  </div>
                  <div className="p-6 text-center bg-white">
                    <p className="text-festika-teal font-black text-xs uppercase tracking-[0.2em] mb-2">{leader.role}</p>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-festika-navy leading-tight">{leader.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DIVISI SECTION */}
      <div className="text-center mb-12">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black text-festika-navy uppercase tracking-tighter">
          Divisi Panitia
        </h2>
        <div className="h-1.5 w-24 bg-festika-teal mx-auto mt-2"></div>
      </div>

      {divisions.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border-4 border-dashed border-gray-200">
          Susunan panitia belum tersedia saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10">
          {divisions.map((div, i) => (
            <div 
              key={div.id} 
              onClick={() => handleDivClick(div)}
              className="relative group cursor-pointer animate-in fade-in zoom-in-95 duration-[800ms]"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Drop Shadow Block */}
              <div className="absolute top-3 right-[-8px] w-full h-full bg-festika-teal/80 z-0 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
              
              {/* Main Card */}
              <div className="relative z-10 border-4 border-festika-navy bg-white">
                {/* Image */}
                <div className="aspect-square w-full border-b-4 border-festika-navy overflow-hidden bg-gray-100 flex items-center justify-center">
                  {div.imageUrl ? (
                    <img src={div.imageUrl} alt={div.name} className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 transition-all" />
                  ) : (
                    <span className="font-bold text-gray-300 text-sm tracking-widest uppercase">Divisi: {div.name}</span>
                  )}
                </div>
                
                {/* Banner bottom */}
                <div className="bg-festika-orange flex items-stretch">
                  <div className="flex-1 px-3 py-2 flex items-center justify-between text-white font-bold text-xs tracking-wider">
                     <span className="truncate">{div.name}</span>
                     <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
