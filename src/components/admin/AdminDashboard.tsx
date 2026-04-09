"use client";

import StaffPanel from "./StaffPanel";
import SitePanel from "./SitePanel";
import { useNotification } from "@/context/NotificationContext";

import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
  LogOut, Users, Download, RefreshCw, Search,
  GraduationCap, Phone, Mail, Calendar, Trophy, Plus, ArrowLeft, X, Loader2, Trash2, AlertTriangle, Layout
} from "lucide-react";

type Competition = {
  id: string;
  title: string;
  description: string;
};

type Registrant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  createdAt: string;
};

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default function AdminDashboard({ user }: { user: User | undefined }) {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<"competitions" | "staff" | "site">("competitions");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Add Competition State
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // Deletion specific states
  const [deletingComp, setDeletingComp] = useState<Competition | null>(null);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCompetitions = useCallback(async () => {
    try {
      const res = await fetch("/api/competitions");
      const json = await res.json();
      setCompetitions(json.data || []);
    } catch {
      // ignore
    }
  }, []);

  const fetchRegistrants = useCallback(async (compId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/registrants?competitionId=${compId}`);
      const json = await res.json();
      setRegistrants(json.data || []);
      setLastUpdated(new Date());
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  useEffect(() => {
    if (selectedComp) {
      fetchRegistrants(selectedComp.id);
    }
  }, [selectedComp, fetchRegistrants]);

  const handleCreateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch("/api/competitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDesc })
      });
      if (res.ok) {
        setNewTitle("");
        setNewDesc("");
        setIsAdding(false);
        fetchCompetitions();
        showNotification("success", "Berhasil", "Lomba baru berhasil ditambahkan!");
      }
    } catch {
      showNotification("error", "Gagal", "Terjadi kesalahan saat menambah lomba.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteCompetition = async () => {
    if (!deletingComp) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/competitions?id=${deletingComp.id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setDeletingComp(null);
        setSelectedComp(null);
        fetchCompetitions();
        showNotification("success", "Terhapus", "Lomba berhasil dihapus.");
      }
    } catch {
      showNotification("error", "Error", "Gagal menghapus lomba.");
    } finally {
      setIsDeleting(false);
    }
  };

  const exportCSV = () => {
    if (registrants.length === 0 || !selectedComp) return;
    const headers = ["ID", "Nama", "Email", "No HP", "Jurusan", "Angkatan", "Tanggal Daftar"];
    const rows = registrants.map((r, i) => [
      i + 1,
      r.name,
      r.email,
      r.phone,
      r.major,
      r.year,
      new Date(r.createdAt).toLocaleString("id-ID")
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `pendaftar-${selectedComp.title}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = registrants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.major.toLowerCase().includes(search.toLowerCase())
  );

  const totalRegistrants = registrants.length;
  const majors = registrants.reduce<Record<string, number>>((acc, r) => {
    acc[r.major] = (acc[r.major] || 0) + 1;
    return acc;
  }, {});
  const topMajor = Object.entries(majors).sort((a, b) => b[1] - a[1])[0];
  const years = registrants.reduce<Record<number, number>>((acc, r) => {
    acc[r.year] = (acc[r.year] || 0) + 1;
    return acc;
  }, {});
  const topYear = Object.entries(years).sort((a, b) => b[1] - a[1])[0];

  const renderDashboardContent = () => {
    if (activeTab === "staff") return <StaffPanel />;
    if (activeTab === "site") return <SitePanel />;
    
    // Competitions Tab Logic
    if (!selectedComp) {
      return (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-extrabold text-festika-navy leading-tight">
                Manajemen Lomba
              </h1>
              <p className="text-gray-500 text-sm mt-1">Pilih lomba untuk melihat daftar peserta</p>
            </div>
            <button
              onClick={() => setIsAdding(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-festika-orange hover:bg-festika-orange-light text-white px-4 py-2.5 font-bold transition-all border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]"
            >
              <Plus size={18} />
              Tambah Lomba
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((comp) => (
              <div
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className="bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36] hover:translate-x-1 hover:translate-y-1 hover:shadow-none cursor-pointer group relative flex flex-col transition-all min-h-[200px]"
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeletingComp(comp);
                    setDeleteStep(1);
                    setDeleteInput("");
                  }}
                  className="absolute top-4 right-4 p-2 bg-white border-2 border-festika-navy text-festika-navy hover:bg-red-500 hover:text-white transition-colors z-10"
                >
                  <Trash2 size={16} />
                </button>
                <div className="w-12 h-12 bg-festika-teal/10 flex items-center justify-center mb-4 border-2 border-festika-teal">
                  <Trophy className="text-festika-teal" size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-2">
                  {comp.title}
                </h3>
                <p className="text-gray-600 text-xs flex-1 line-clamp-2">
                  {comp.description || "Tidak ada rincian."}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 w-full flex justify-between items-center text-festika-teal text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity text-right">
                  <span>Kelola Peserta</span> <ArrowLeft className="rotate-180" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <button
              onClick={() => setSelectedComp(null)}
              className="flex items-center gap-2 text-festika-teal font-medium hover:text-festika-orange text-sm mb-3 transition-colors"
            >
              <ArrowLeft size={16} />
              Kembali ke Daftar Lomba
            </button>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-festika-navy">
              Pendaftar: <span className="text-festika-orange">{selectedComp.title}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {lastUpdated ? `Terakhir diperbarui: ${lastUpdated.toLocaleTimeString("id-ID")}` : "Memuat data..."}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#F5A623] p-5">
            <Users size={20} className="text-festika-orange mb-3" />
            <p className="text-gray-500 text-xs uppercase font-semibold">Total Pendaftar</p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">{totalRegistrants}</p>
          </div>
          <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#1A6B73] p-5">
            <GraduationCap size={20} className="text-festika-teal mb-3" />
            <p className="text-gray-500 text-xs uppercase font-semibold">Jurusan Terbanyak</p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mt-1 truncate">{topMajor ? topMajor[0] : "-"}</p>
          </div>
          <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] p-5">
            <Calendar size={20} className="text-festika-navy mb-3" />
            <p className="text-gray-500 text-xs uppercase font-semibold">Angkatan Terbanyak</p>
            <p className="font-[family-name:var(--font-space-grotesk)] text-4xl font-extrabold text-festika-navy mt-1">{topYear ? topYear[0] : "-"}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-b-2 border-gray-100 gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari pendaftar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border-2 border-gray-200 focus:border-festika-teal outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => fetchRegistrants(selectedComp.id)}
                className="flex items-center gap-2 border-2 border-gray-200 px-3 py-2 text-sm font-bold hover:border-festika-teal transition-all"
              >
                <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} /> Refresh
              </button>
              <button 
                onClick={exportCSV}
                disabled={registrants.length === 0}
                className="flex items-center gap-2 bg-festika-teal text-white px-3 py-2 text-sm font-bold border-2 border-festika-navy shadow-[2px_2px_0_0_#0F2A36] disabled:opacity-50"
              >
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-20 text-center text-gray-400">Memuat data...</div>
            ) : filtered.length === 0 ? (
              <div className="p-20 text-center text-gray-400">Tidak ada data.</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-festika-navy text-white text-left font-bold">
                    <th className="p-4">#</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">WhatsApp</th>
                    <th className="p-4">Jurusan</th>
                    <th className="p-4">Angkatan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-400 font-mono text-xs">{i + 1}</td>
                      <td className="p-4 font-bold text-festika-navy">{r.name}</td>
                      <td className="p-4 text-gray-600">{r.email}</td>
                      <td className="p-4 text-gray-600">{r.phone}</td>
                      <td className="p-4"><span className="bg-festika-teal/10 text-festika-teal px-2 py-0.5 text-xs font-bold">{r.major}</span></td>
                      <td className="p-4"><span className="bg-festika-orange/10 text-festika-orange px-2 py-0.5 text-xs font-bold">{r.year}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-festika-navy sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-festika-orange flex items-center justify-center">
              <Image src="/Logo_Festika-04.webp" alt="Logo" width={32} height={32} />
            </div>
            <span className="text-white font-bold text-lg">FESTIKA ADMIN</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right text-xs">
              <p className="text-white font-bold">{user?.name || "Admin"}</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
            <button onClick={() => signOut()} className="bg-white/10 hover:bg-red-600 text-white px-3 py-1.5 flex items-center gap-2 text-sm transition-colors border border-white/20">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar scroll-smooth">
          {[
            { id: "competitions", label: "Lomba", icon: Trophy, activeColor: "border-festika-orange" },
            { id: "staff", label: "Panitia", icon: Users, activeColor: "border-festika-teal" },
            { id: "site", label: "Situs", icon: Layout, activeColor: "border-festika-navy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSelectedComp(null); }}
              className={`flex items-center gap-2 px-5 sm:px-6 py-4 font-bold transition-all border-b-4 shrink-0 whitespace-nowrap ${
                activeTab === tab.id ? `${tab.activeColor} text-white bg-white/5` : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              <tab.icon size={18} />
              <span className="text-sm sm:text-base">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {renderDashboardContent()}
      </main>

      {/* MODAL TAMBAH LOMBA */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-md shadow-[12px_12px_0_0_#F5A623]">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy mb-4">Tambah Lomba Baru</h2>
            <form onSubmit={handleCreateCompetition} className="space-y-4">
              <input required value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Nama Lomba" className="w-full px-4 py-3 border-2 border-festika-navy outline-none" />
              <textarea value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Deskripsi" className="w-full px-4 py-3 border-2 border-festika-navy outline-none h-32" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors">Batal</button>
                <button type="submit" disabled={addLoading} className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623]">
                  {addLoading && <Loader2 size={16} className="animate-spin" />} Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS LOMBA */}
      {deletingComp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border-4 border-festika-navy p-0 w-full max-w-md shadow-[12px_12px_0_0_#0F2A36]">
            <div className="bg-festika-navy p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2"><AlertTriangle size={20} className="text-festika-orange" /><h2 className="font-bold">Konfirmasi Hapus</h2></div>
              <button onClick={() => setDeletingComp(null)}><X size={20}/></button>
            </div>
            <div className="p-6">
              {deleteStep === 1 ? (
                <div className="animate-in slide-in-from-right-4 duration-300">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">Ketik nama lomba <strong className="text-festika-navy">"{deletingComp.title}"</strong> untuk konfirmasi.</p>
                  <input autoFocus type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)} placeholder="Ketik nama lomba..." className="w-full px-4 py-3 border-2 border-gray-200 outline-none mb-4 font-bold" />
                  <button disabled={deleteInput !== deletingComp.title} onClick={() => setDeleteStep(2)} className="w-full py-3 bg-festika-navy text-white font-bold disabled:opacity-30">Lanjut</button>
                </div>
              ) : (
                <div className="animate-in slide-in-from-right-4 duration-300 text-center">
                  <div className="bg-red-50 border-2 border-red-100 p-4 mb-6">
                    <p className="text-red-600 text-xs leading-relaxed font-bold">PERINGATAN: Menghapus lomba akan menghapus SEMUA data pendaftar terkait secara permanen!</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setDeleteStep(1)} className="flex-1 py-3 border-2 border-gray-200 font-bold">Batal</button>
                    <button onClick={handleDeleteCompetition} disabled={isDeleting} className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 flex items-center justify-center gap-2">
                       {isDeleting && <Loader2 size={16} className="animate-spin" />} Ya, Hapus!
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
