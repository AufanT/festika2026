"use client";

import StaffPanel from "./StaffPanel";
import SitePanel from "./SitePanel";
import SponsorPanel from "./SponsorPanel";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import { LogOut, Users, Trophy, ArrowLeft, Layout, Handshake } from "lucide-react";

// Sub-components
import StatsOverview from "./dashboard/StatsOverview";
import CompetitionGrid from "./dashboard/CompetitionGrid";
import {
  CompetitionModal,
  DeleteCompetitionModal,
  DeleteMultipleModal,
  DeleteMultipleTarget,
} from "./dashboard/DashboardModals";

// Types
import { Competition, User } from "@/types/admin";

export default function AdminDashboard({ user }: { user: User | undefined }) {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<"competitions" | "staff" | "site" | "sponsors">("competitions");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ── Modal: Competition (Add & Edit) ──────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingComp, setEditingComp] = useState<Competition | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // ── Modal: Hapus satu lomba (legacy) ──
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
    setIsLoading(true);
    try {
      const res = await fetch("/api/competitions");
      const json = await res.json();
      setCompetitions(json.data || []);
      setLastUpdated(new Date());
    } catch { /* ignore */ } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchCompetitions(); }, [fetchCompetitions]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditingComp(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (comp: Competition) => {
    setModalMode("edit");
    setEditingComp(comp);
    setIsModalOpen(true);
  };

  const handleCompetitionSubmit = async (formData: any) => {
    setModalLoading(true);
    try {
      const url = modalMode === "add" ? "/api/competitions" : `/api/competitions?id=${editingComp?.id}`;
      const method = modalMode === "add" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchCompetitions();
        showNotification("success", "Berhasil", `Lomba berhasil ${modalMode === "add" ? "ditambahkan" : "diperbarui"}!`);
      } else {
        const json = await res.json();
        showNotification("error", "Gagal", json.message || "Terjadi kesalahan.");
      }
    } catch {
      showNotification("error", "Gagal", "Terjadi kesalahan koneksi.");
    } finally { setModalLoading(false); }
  };

  const handleOpenBulkDelete = (selectedIds: string[]) => {
    const targets: DeleteMultipleTarget[] = competitions
      .filter(c => selectedIds.includes(c.id))
      .map(c => ({
        id: c.id,
        label: c.title,
        subCount: 0,
        subLabel: "pendaftar (external)",
      }));
    setBulkDeleteTargets(targets);
    setIsBulkDeleteOpen(true);
  };

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

  const handleDeleteCompetition = async () => {
    if (!deletingComp) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/competitions?id=${deletingComp.id}`, { method: "DELETE" });
      if (res.ok) {
        setDeletingComp(null);
        fetchCompetitions();
        showNotification("success", "Terhapus", "Lomba berhasil dihapus.");
      }
    } catch {
      showNotification("error", "Error", "Gagal menghapus lomba.");
    } finally { setIsDeleting(false); }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  const renderDashboardContent = () => {
    if (activeTab === "staff") return <StaffPanel />;
    if (activeTab === "site") return <SitePanel />;
    if (activeTab === "sponsors") return <SponsorPanel />;

    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-4">
            {lastUpdated ? `Terakhir diperbarui: ${lastUpdated.toLocaleTimeString("id-ID")}` : "Memuat data..."}
          </p>
          <StatsOverview 
            totalCompetitions={competitions.length} 
            activeLinks={competitions.filter(c => c.registrationLink).length} 
          />
        </div>

        <CompetitionGrid
          competitions={competitions}
          onSelect={handleOpenEdit}
          onAddRequest={handleOpenAdd}
          onDeleteMode={handleOpenBulkDelete}
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
            { id: "sponsors", label: "Sponsor", icon: Handshake, activeColor: "border-festika-orange" },
            { id: "site", label: "Situs", icon: Layout, activeColor: "border-festika-navy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); }}
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
      <CompetitionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCompetitionSubmit}
        initialData={editingComp}
        isLoading={modalLoading}
        mode={modalMode}
      />

      <DeleteCompetitionModal
        competition={deletingComp} step={deleteStep} input={deleteInput}
        onInputChange={setDeleteInput} onNextStep={() => setDeleteStep(2)}
        onConfirm={handleDeleteCompetition} onClose={() => setDeletingComp(null)}
        isLoading={isDeleting}
      />

      <DeleteMultipleModal
        isOpen={isBulkDeleteOpen}
        title="Hapus Lomba Terpilih"
        entityLabel="LOMBA"
        targets={bulkDeleteTargets}
        cascadeWarning="Data lomba akan dihapus permanen dari database. Pendaftaran dilakukan secara eksternal melalui Google Form."
        onConfirm={handleBulkDeleteCompetitions}
        onClose={() => { setIsBulkDeleteOpen(false); setBulkDeleteTargets([]); }}
        isLoading={isBulkDeleting}
      />
    </div>
  );
}
