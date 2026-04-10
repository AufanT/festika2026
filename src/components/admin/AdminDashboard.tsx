"use client";

import StaffPanel from "./StaffPanel";
import SitePanel from "./SitePanel";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect, useCallback, useMemo } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, Users, Trophy, ArrowLeft, Layout } from "lucide-react";

// Sub-components
import StatsOverview from "./dashboard/StatsOverview";
import CompetitionGrid from "./dashboard/CompetitionGrid";
import RegistrantTable from "./dashboard/RegistrantTable";
import { AddCompetitionModal, DeleteCompetitionModal } from "./dashboard/DashboardModals";

// Types
import { Competition, Registrant, User } from "@/types/admin";

export default function AdminDashboard({ user }: { user: User | undefined }) {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<"competitions" | "staff" | "site">("competitions");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, page: 1, topM: "-", topY: "-" });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Modals state
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [deletingComp, setDeletingComp] = useState<Competition | null>(null);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Security Layer 2
  useEffect(() => {
    if (!user || !user.email) {
      window.location.href = "/admin/login";
    }
  }, [user]);

  const fetchCompetitions = useCallback(async () => {
    try {
      const res = await fetch("/api/competitions");
      const json = await res.json();
      setCompetitions(json.data || []);
    } catch { /* ignore */ }
  }, []);

  const fetchRegistrants = useCallback(async (compId: string, pageNum: number = 1) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/registrants?competitionId=${compId}&page=${pageNum}&limit=50`);
      const json = await res.json();
      if (json.success) {
        setRegistrants(json.data.data || []);
        setPagination({
          total: json.data.total,
          totalPages: json.data.totalPages,
          page: json.data.page,
          topM: json.data.topM,
          topY: json.data.topY
        });
      }
      setLastUpdated(new Date());
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitions();
  }, [fetchCompetitions]);

  useEffect(() => {
    if (selectedComp) fetchRegistrants(selectedComp.id, pagination.page);
  }, [selectedComp, fetchRegistrants, pagination.page]);

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
        setNewTitle(""); setNewDesc(""); setIsAdding(false);
        fetchCompetitions();
        showNotification("success", "Berhasil", "Lomba baru berhasil ditambahkan!");
      }
    } catch {
      showNotification("error", "Gagal", "Terjadi kesalahan saat menambah lomba.");
    } finally { setAddLoading(false); }
  };

  const handleDeleteCompetition = async () => {
    if (!deletingComp) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/competitions?id=${deletingComp.id}`, { method: "DELETE" });
      if (res.ok) {
        setDeletingComp(null); setSelectedComp(null);
        fetchCompetitions();
        showNotification("success", "Terhapus", "Lomba berhasil dihapus.");
      }
    } catch {
      showNotification("error", "Error", "Gagal menghapus lomba.");
    } finally { setIsDeleting(false); }
  };

  const exportCSV = () => {
    if (registrants.length === 0 || !selectedComp) return;
    const headers = ["ID", "Nama", "Email", "No HP", "Jurusan", "Angkatan", "Tanggal Daftar"];
    const rows = registrants.map((r, i) => [
      i + 1, r.name, r.email, r.phone, r.major, r.year,
      new Date(r.createdAt).toLocaleString("id-ID")
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `pendaftar-${selectedComp.title}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = useMemo(() => registrants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.email.toLowerCase().includes(search.toLowerCase()) ||
    r.major.toLowerCase().includes(search.toLowerCase())
  ), [registrants, search]);

  const renderDashboardContent = () => {
    if (activeTab === "staff") return <StaffPanel />;
    if (activeTab === "site") return <SitePanel />;
    
    if (!selectedComp) {
      return (
        <CompetitionGrid 
          competitions={competitions}
          onSelect={setSelectedComp}
          onAddRequest={() => setIsAdding(true)}
          onDeleteRequest={(comp) => {
            setDeletingComp(comp); setDeleteStep(1); setDeleteInput("");
          }}
        />
      );
    }

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <button onClick={() => setSelectedComp(null)} className="flex items-center gap-2 text-festika-teal font-medium hover:text-festika-orange text-sm mb-3 transition-colors">
              <ArrowLeft size={16} /> Kembali ke Daftar Lomba
            </button>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-festika-navy">
              Pendaftar: <span className="text-festika-orange">{selectedComp.title}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {lastUpdated ? `Terakhir diperbarui: ${lastUpdated.toLocaleTimeString("id-ID")}` : "Memuat data..."}
            </p>
          </div>
        </div>

        <StatsOverview totalRegistrants={pagination.total} topMajor={pagination.topM} topYear={pagination.topY} />

        <RegistrantTable 
          registrants={registrants}
          filteredRegistrants={filtered}
          search={search}
          onSearchChange={setSearch}
          onRefresh={() => fetchRegistrants(selectedComp.id, pagination.page)}
          onExport={exportCSV}
          isLoading={isLoading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.totalPages,
            onPageChange: (p) => setPagination(prev => ({ ...prev, page: p }))
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-festika-navy sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-white font-[family-name:var(--font-space-grotesk)] font-black text-2xl tracking-tighter">
              FESTIKA<span className="text-festika-orange">.</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right text-xs text-white">
              <p className="font-bold">{user?.name || "Admin"}</p>
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

      <AddCompetitionModal 
        isOpen={isAdding} onClose={() => setIsAdding(false)} onSubmit={handleCreateCompetition}
        title={newTitle} onTitleChange={setNewTitle} description={newDesc} onDescriptionChange={setNewDesc}
        isLoading={addLoading}
      />

      <DeleteCompetitionModal 
        competition={deletingComp} step={deleteStep} input={deleteInput}
        onInputChange={setDeleteInput} onNextStep={() => setDeleteStep(2)}
        onConfirm={handleDeleteCompetition} onClose={() => setDeletingComp(null)}
        isLoading={isDeleting}
      />
    </div>
  );
}
