"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Users, Image as ImageIcon, X, Loader2, ArrowLeft, ShieldCheck, Trash2 } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
};

type Division = {
  id: string;
  name: string;
  imageUrl: string | null;
  isCore?: boolean;
};

import { useNotification } from "@/context/NotificationContext";

export default function StaffPanel() {
  const { showNotification } = useNotification();
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [selectedDiv, setSelectedDiv] = useState<Division | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Forms
  const [showAddDiv, setShowAddDiv] = useState(false);
  const [divName, setDivName] = useState("");
  const [divFile, setDivFile] = useState<File | null>(null);
  const [divLoading, setDivLoading] = useState(false);

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffDesc, setStaffDesc] = useState("");
  const [staffFile, setStaffFile] = useState<File | null>(null);
  const [stfLoading, setStfLoading] = useState(false);

  const fetchDivisions = async () => {
    try {
      const res = await fetch("/api/divisions");
      const json = await res.json();
      setDivisions(json.data || []);
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStaff = async (divId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/staff?divisionId=${divId}`);
      const json = await res.json();
      setStaff(json.data || []);
    } catch {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  useEffect(() => {
    if (selectedDiv) fetchStaff(selectedDiv.id);
  }, [selectedDiv]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (!json.success) throw new Error("Upload fail");
    return json.url;
  };

  const handleAddDivision = async (e: React.FormEvent) => {
    e.preventDefault();
    setDivLoading(true);
    try {
      let imageUrl = null;
      if (divFile) {
        imageUrl = await uploadFile(divFile);
      }
      const res = await fetch("/api/divisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: divName, imageUrl })
      });
      if (res.ok) {
        setShowAddDiv(false);
        setDivName("");
        setDivFile(null);
        fetchDivisions();
        showNotification("success", "Berhasil", "Divisi berhasil ditambahkan");
      }
    } catch (err) {
      showNotification("error", "Gagal", "Gagal menambahkan divisi");
    } finally {
      setDivLoading(false);
    }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffRole) {
      showNotification("error", "Peringatan", "Pilih jabatan terlebih dahulu!");
      return;
    }
    setStfLoading(true);
    try {
      let imageUrl = null;
      if (staffFile) {
        imageUrl = await uploadFile(staffFile);
      }
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: staffName, 
          role: staffRole, 
          description: staffDesc, 
          imageUrl, 
          divisionId: selectedDiv?.isCore ? null : selectedDiv!.id 
        })
      });
      if (res.ok) {
        setShowAddStaff(false);
        setStaffName("");
        setStaffRole("");
        setStaffDesc("");
        setStaffFile(null);
        fetchStaff(selectedDiv!.id);
        showNotification("success", "Berhasil", "Anggota berhasil ditambahkan");
      } else {
        const errJson = await res.json();
        showNotification("error", "Gagal", errJson.message || "Gagal menambahkan staff");
      }
    } catch (err) {
      showNotification("error", "Sistem Error", "Terjadi kesalahan sistem");
    } finally {
      setStfLoading(false);
    }
  };

  const handleDeleteStaff = (id: string, name: string) => {
    showNotification("confirm", "Hapus Anggota", `Apakah Anda yakin ingin menghapus ${name}?`, async () => {
      try {
        const res = await fetch(`/api/staff?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchStaff(selectedDiv!.id);
          showNotification("success", "Terhapus", "Anggota berhasil dihapus");
        } else {
          showNotification("error", "Gagal", "Gagal menghapus anggota");
        }
      } catch (err) {
        showNotification("error", "Error", "Terjadi kesalahan sistem");
      }
    });
  };

  const hasCoordinator = staff.some(s => s.role === "KOORDINATOR");

  return (
    <div className="w-full">
      {!selectedDiv ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
                Manajemen Kepanitiaan
              </h1>
              <p className="text-gray-500 text-sm mt-1">Kelola pimpinan inti dan divisi panitia</p>
            </div>
            <button
              onClick={() => setShowAddDiv(true)}
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
              onClick={() => setSelectedDiv({ id: "core", name: "BPH INTI", imageUrl: null, isCore: true })}
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
                onClick={() => setSelectedDiv(div)}
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

          {/* Modal Add Div */}
          {showAddDiv && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white border-2 border-festika-navy p-6 w-full max-w-md shadow-[8px_8px_0_0_#F5A623]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">Tambah Divisi</h2>
                  <button onClick={() => setShowAddDiv(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddDivision} className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-festika-navy block mb-1">Nama Divisi</label>
                    <input required value={divName} onChange={e => setDivName(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" placeholder="Cth: Acara" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-festika-navy block mb-1">Foto Rombongan Divisi (Opsional)</label>
                    <input type="file" accept="image/*" onChange={e => setDivFile(e.target.files?.[0] || null)} className="w-full text-sm border-2 border-gray-200 p-2" />
                  </div>
                  <button disabled={divLoading} type="submit" className="w-full flex items-center justify-center gap-2 bg-festika-teal text-white py-2 font-bold border-2 border-festika-navy mt-4">
                    {divLoading && <Loader2 size={16} className="animate-spin" />}
                    Simpan Divisi
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <button
                onClick={() => setSelectedDiv(null)}
                className="flex items-center gap-2 text-festika-teal font-medium hover:text-festika-orange text-sm mb-3 transition-colors"
              >
                <ArrowLeft size={16} /> Kembali ke Daftar
              </button>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
                Staf: <span className="text-festika-orange">{selectedDiv.name}</span>
              </h1>
            </div>
            <button
              onClick={() => {
                setShowAddStaff(true);
                setStaffRole(""); // reset role selection
              }}
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
                
                {/* Delete Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteStaff(stf.id, stf.name);
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

          {/* Modal Add Staff */}
          {showAddStaff && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white border-2 border-festika-navy p-6 w-full max-w-md shadow-[8px_8px_0_0_#F5A623] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">Tambah Anggota</h2>
                  <button onClick={() => setShowAddStaff(false)} className="text-gray-400 hover:text-red-500"><X size={20}/></button>
                </div>
                <form onSubmit={handleAddStaff} className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-festika-navy block mb-1">Nama Anggota</label>
                    <input required value={staffName} onChange={e => setStaffName(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" />
                  </div>
                  
                  {selectedDiv.isCore ? (
                    <div>
                      <label className="text-sm font-bold text-festika-navy block mb-1">Jabatan Pimpinan</label>
                      <select required value={staffRole} onChange={e => setStaffRole(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none bg-white">
                        <option value="">-- Pilih Jabatan --</option>
                        <option value="KETUA PELAKSANA">KETUA PELAKSANA</option>
                        <option value="SEKRETARIS UMUM">SEKRETARIS UMUM</option>
                        <option value="BENDAHARA UMUM">BENDAHARA UMUM</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="text-sm font-bold text-festika-navy block mb-1">Tipe Jabatan</label>
                      <select required value={staffRole} onChange={e => setStaffRole(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none bg-white">
                        <option value="">-- Pilih Jabatan --</option>
                        <option value="KOORDINATOR" disabled={hasCoordinator}>KOORDINATOR {hasCoordinator ? "(Sudah Ada)" : ""}</option>
                        <option value="STAFF">STAFF</option>
                      </select>
                      {hasCoordinator && staffRole !== "KOORDINATOR" && <p className="text-[10px] text-orange-500 font-bold mt-1 uppercase italic">Hanya diperbolehkan satu Koordinator per divisi.</p>}
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-bold text-festika-navy block mb-1">Deskripsi Tambahan</label>
                    <textarea value={staffDesc} onChange={e => setStaffDesc(e.target.value)} className="w-full px-3 py-2 border-2 border-gray-200 focus:border-festika-teal focus:outline-none" rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-festika-navy block mb-1">Foto Persona (Opsional)</label>
                    <input type="file" accept="image/*" onChange={e => setStaffFile(e.target.files?.[0] || null)} className="w-full text-sm border-2 border-gray-200 p-2" />
                  </div>
                  <button disabled={stfLoading} type="submit" className="w-full flex items-center justify-center gap-2 bg-festika-orange text-white py-2 font-bold border-2 border-festika-navy mt-4">
                    {stfLoading && <Loader2 size={16} className="animate-spin" />}
                    Simpan Anggota
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
