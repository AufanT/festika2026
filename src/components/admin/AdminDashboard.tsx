"use client";

import StaffPanel from "./StaffPanel";
import SitePanel from "./SitePanel";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Users, Trophy, ArrowLeft, Layout } from "lucide-react";

// Sub-components
import StatsOverview from "./dashboard/StatsOverview";
import CompetitionGrid from "./dashboard/CompetitionGrid";
import RegistrantTable from "./dashboard/RegistrantTable";
import {
  AddCompetitionModal,
  DeleteCompetitionModal,
  DeleteMultipleModal,
  DeleteMultipleTarget,
} from "./dashboard/DashboardModals";

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
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Modal: Tambah Lomba ──────────────────────────────────────────────────
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  // ── Modal: Hapus satu lomba (legacy — tidak dipakai dari UI utama, tetap tersedia) ──
  const [deletingComp, setDeletingComp] = useState<Competition | null>(null);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Modal: Hapus banyak lomba ────────────────────────────────────────────
  const [bulkDeleteTargets, setBulkDeleteTargets] = useState<DeleteMultipleTarget[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  // Security Layer 2
  useEffect(() => {
    if (typeof window !== "undefined" && (!user || !user.name)) {
      window.location.href = "/admin/login";
    }
  }, [user]);

  // ── Data Fetching ────────────────────────────────────────────────────────
  const fetchCompetitions = useCallback(async () => {
    try {
      const res = await fetch("/api/competitions");
      const json = await res.json();
      setCompetitions(json.data || []);
    } catch { /* ignore */ }
  }, []);

  const fetchRegistrants = useCallback(async (compId: string, pageNum: number = 1, searchQuery: string = "") => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/registrants?competitionId=${compId}&page=${pageNum}&limit=50&search=${searchQuery}`);
      const json = await res.json();
      if (json.success) {
        setRegistrants(json.data.data || []);
        setPagination({
          total: json.data.total,
          totalPages: json.data.totalPages,
          page: json.data.page,
          topM: json.data.topM,
          topY: json.data.topY,
        });
      }
      setLastUpdated(new Date());
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchCompetitions(); }, [fetchCompetitions]);
  useEffect(() => {
    if (selectedComp) fetchRegistrants(selectedComp.id, pagination.page, debouncedSearch);
  }, [selectedComp, fetchRegistrants, pagination.page, debouncedSearch]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleCreateCompetition = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch("/api/competitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDesc }),
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

  /** Dipanggil oleh CompetitionGrid ketika user menekan tombol hapus di delete-mode */
  const handleOpenBulkDelete = (selectedIds: string[]) => {
    const targets: DeleteMultipleTarget[] = competitions
      .filter(c => selectedIds.includes(c.id))
      .map(c => ({
        id: c.id,
        label: c.title,
        subCount: c.registrant_count ?? 0,
        subLabel: "pendaftar",
      }));
    setBulkDeleteTargets(targets);
    setIsBulkDeleteOpen(true);
  };

  /**
   * Eksekusi hapus banyak lomba secara paralel.
   * Setiap request dikirim ke endpoint yang sudah memiliki auth-guard.
   * Bila ada yang gagal, bulk selesai namun notifikasi menampilkan jumlah yang berhasil.
   */
  const handleBulkDeleteCompetitions = async () => {
    if (bulkDeleteTargets.length === 0) return;
    setIsBulkDeleting(true);
    try {
      const results = await Promise.allSettled(
        bulkDeleteTargets.map(t =>
          fetch(`/api/competitions?id=${t.id}`, { method: "DELETE" })
        )
      );
      const successCount = results.filter(r => r.status === "fulfilled").length;
      const failCount = results.length - successCount;

      setIsBulkDeleteOpen(false);
      setBulkDeleteTargets([]);
      setSelectedComp(null);
      await fetchCompetitions();

      if (failCount === 0) {
        showNotification("success", "Berhasil Dihapus", `${successCount} lomba telah dihapus permanen.`);
      } else {
        showNotification("error", "Sebagian Gagal", `${successCount} berhasil, ${failCount} gagal dihapus.`);
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan tak terduga.");
    } finally { setIsBulkDeleting(false); }
  };

  /** Hapus satu lomba (digunakan bila single-delete modal dipanggil — legacy flow) */
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

  const exportCSV = async () => {
    if (!selectedComp) return;
    setIsLoading(true);
    showNotification("info", "Mengekspor", "Sedang mengunduh data pendaftar...");
    try {
      const res = await fetch(`/api/registrants?competitionId=${selectedComp.id}&export=true`);
      const json = await res.json();
      if (!json.success) throw new Error("Gagal mengambil data");

      const allData: Registrant[] = json.data.data;
      const headers = ["ID", "Nama", "Email", "No HP", "Jurusan", "Angkatan", "Tanggal Daftar"];
      const rows = allData.map((r, i) => [
        i + 1, r.name, r.email, r.phone, r.major, r.year,
        new Date(r.createdAt).toLocaleString("id-ID"),
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
      showNotification("success", "Selesai", "Data berhasil diekspor.");
    } catch {
      showNotification("error", "Gagal", "Terjadi kesalahan saat mengekspor data.");
    } finally { setIsLoading(false); }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  const renderDashboardContent = () => {
    if (activeTab === "staff") return <StaffPanel />;
    if (activeTab === "site") return <SitePanel />;

    if (!selectedComp) {
      return (
        <CompetitionGrid
          competitions={competitions}
          onSelect={setSelectedComp}
          onAddRequest={() => setIsAdding(true)}
          onDeleteMode={handleOpenBulkDelete}
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
          filteredRegistrants={registrants}
          search={search}
          onSearchChange={setSearch}
          onRefresh={() => fetchRegistrants(selectedComp.id, pagination.page)}
          onExport={exportCSV}
          isLoading={isLoading}
          pagination={{
            currentPage: pagination.page,
            totalPages: pagination.totalPages,
            onPageChange: (p) => setPagination(prev => ({ ...prev, page: p })),
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

      {/* ── Modals ── */}
      <AddCompetitionModal
        isOpen={isAdding} onClose={() => setIsAdding(false)} onSubmit={handleCreateCompetition}
        title={newTitle} onTitleChange={setNewTitle} description={newDesc} onDescriptionChange={setNewDesc}
        isLoading={addLoading}
      />

      {/* Single-delete modal — legacy, tetap tersedia */}
      <DeleteCompetitionModal
        competition={deletingComp} step={deleteStep} input={deleteInput}
        onInputChange={setDeleteInput} onNextStep={() => setDeleteStep(2)}
        onConfirm={handleDeleteCompetition} onClose={() => setDeletingComp(null)}
        isLoading={isDeleting}
      />

      {/* Bulk delete modal untuk Lomba */}
      <DeleteMultipleModal
        isOpen={isBulkDeleteOpen}
        title="Hapus Lomba Terpilih"
        entityLabel="LOMBA"
        targets={bulkDeleteTargets}
        cascadeWarning="Seluruh data pendaftar yang terdaftar pada lomba-lomba ini akan ikut terhapus secara permanen dari database. Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleBulkDeleteCompetitions}
        onClose={() => { setIsBulkDeleteOpen(false); setBulkDeleteTargets([]); }}
        isLoading={isBulkDeleting}
      />
    </div>
  );
}
