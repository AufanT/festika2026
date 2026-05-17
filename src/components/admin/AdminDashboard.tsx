"use client";

import Image from "next/image";
import StaffPanel from "./StaffPanel";
import SponsorPanel from "./SponsorPanel";
import { useNotification } from "@/context/NotificationContext";
import { useState, useEffect, useCallback } from "react";
import { signOut } from "next-auth/react";
import {
  LogOut,
  Users,
  Trophy,
  ArrowLeft,
  Handshake,
  HelpCircle,
  Settings,
} from "lucide-react";

// Sub-components
import StatsOverview from "./dashboard/StatsOverview";
import CompetitionGrid from "./dashboard/CompetitionGrid";
import FaqPanel from "./faq/FaqPanel";
import SettingsPanel from "./SettingsPanel";
import {
  CompetitionModal,
  AdminPastEventModal,
  AddYearModal,
  DeleteCompetitionModal,
  DeleteMultipleModal,
  DeleteMultipleTarget,
} from "./dashboard/DashboardModals";

// Types
import { Competition, User } from "@/types/admin";

export default function AdminDashboard({ user }: { user: User | undefined }) {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<
    "competitions" | "past-events" | "staff" | "sponsors" | "faq" | "settings"
  >("competitions");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [pastEvents, setPastEvents] = useState<Competition[]>([]);
  const [adminYears, setAdminYears] = useState<number[]>([]);
  const [adminSelectedYear, setAdminSelectedYear] = useState<number | "all" | null>(null);
  const [modalInitialData, setModalInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ── Modal: Competition (Add & Edit) ──────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [modalType, setModalType] = useState<"competition" | "past-event">(
    "competition",
  );
  const [editingComp, setEditingComp] = useState<Competition | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [isAddYearOpen, setIsAddYearOpen] = useState(false);

  // ── Modal: Hapus satu lomba (legacy) ──
  const [deletingComp, setDeletingComp] = useState<Competition | null>(null);
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Modal: Hapus banyak lomba ────────────────────────────────────────────
  const [bulkDeleteTargets, setBulkDeleteTargets] = useState<
    DeleteMultipleTarget[]
  >([]);
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
    } catch {
      /* ignore */
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPastEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/past-events");
      const json = await res.json();
      const data = json.data;
      const events = Array.isArray(data) ? data : data?.events || [];
      setPastEvents(events || []);
      // compute available years
      try {
        let ys = Array.from(new Set((events || []).map((e: any) => Number(e.year)).filter(Boolean))) as number[];
        ys = ys.sort((a: number, b: number) => b - a);
        setAdminYears(ys);
        const defaultYear = ys.length > 0 ? ys[0] : new Date().getFullYear() - 1;
        setAdminSelectedYear((prev) => (prev === null ? defaultYear : prev));
      } catch (err) {
        /* ignore */
      }
      setLastUpdated(new Date());
    } catch {
      /* ignore */
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "competitions") {
      fetchCompetitions();
    } else if (activeTab === "past-events") {
      fetchPastEvents();
    }
  }, [activeTab, fetchCompetitions, fetchPastEvents]);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const handleOpenAdd = () => {
    setModalType("competition");
    setModalMode("add");
    setEditingComp(null);
    setIsModalOpen(true);
  };

  const handleOpenAddPastEvent = () => {
    setModalType("past-event");
    setModalMode("add");
    setEditingComp(null);
    const yearToUse = adminSelectedYear === null || adminSelectedYear === "all" ? new Date().getFullYear() - 1 : adminSelectedYear;
    setModalInitialData({ year: yearToUse });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (comp: Competition) => {
    setModalMode("edit");
    setEditingComp(comp);
    // if we're in the past-events tab, always open the PastEvent modal
    if (activeTab === "past-events") setModalType("past-event");
    else setModalType(comp.isArchived ? "past-event" : "competition");
    setModalInitialData(comp);
    setIsModalOpen(true);
  };

  const handleConfirmAddYear = (year: number) => {
    setAdminYears((prev) => (prev.includes(year) ? prev : [year, ...prev].sort((a, b) => b - a)));
    setAdminSelectedYear(year);
    setIsAddYearOpen(false);
  };

  const handleCompetitionSubmit = async (formData: any) => {
    setModalLoading(true);
    try {
      let submitData = { ...formData };
      const isPast = modalType === "past-event";
      const url =
        modalMode === "add"
          ? isPast
            ? "/api/past-events"
            : "/api/competitions"
          : isPast
            ? `/api/past-events?id=${editingComp?.id}`
            : `/api/competitions?id=${editingComp?.id}`;
      const method = modalMode === "add" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        if (modalType === "past-event") {
          fetchPastEvents();
        } else {
          fetchCompetitions();
        }
        showNotification(
          "success",
          "Berhasil",
          `Lomba berhasil ${modalMode === "add" ? "ditambahkan" : "diperbarui"}!`,
        );
      } else {
        const json = await res.json();
        showNotification(
          "error",
          "Gagal",
          json.message || "Terjadi kesalahan.",
        );
      }
    } catch {
      showNotification("error", "Gagal", "Terjadi kesalahan koneksi.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleOpenBulkDelete = (selectedIds: string[]) => {
    const sourceList = activeTab === "past-events" ? pastEvents : competitions;
    const targets: DeleteMultipleTarget[] = sourceList
      .filter((c) => selectedIds.includes(c.id))
      .map((c) => ({
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
      const base =
        activeTab === "past-events" ? "/api/past-events" : "/api/competitions";
      const results = await Promise.allSettled(
        bulkDeleteTargets.map((t) =>
          fetch(`${base}?id=${t.id}`, { method: "DELETE" }),
        ),
      );
      const successCount = results.filter(
        (r) => r.status === "fulfilled",
      ).length;
      const failCount = results.length - successCount;

      setIsBulkDeleteOpen(false);
      setBulkDeleteTargets([]);

      if (activeTab === "past-events") {
        fetchPastEvents();
      } else {
        fetchCompetitions();
      }

      if (failCount === 0) {
        showNotification(
          "success",
          "Berhasil Dihapus",
          `${successCount} lomba telah dihapus permanen.`,
        );
      } else {
        showNotification(
          "error",
          "Sebagian Gagal",
          `${successCount} berhasil, ${failCount} gagal dihapus.`,
        );
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan tak terduga.");
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const handleDeleteCompetition = async () => {
    if (!deletingComp) return;
    setIsDeleting(true);
    try {
      const base =
        activeTab === "past-events" ? "/api/past-events" : "/api/competitions";
      const res = await fetch(`${base}?id=${deletingComp.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeletingComp(null);
        fetchCompetitions();
        showNotification("success", "Terhapus", "Lomba berhasil dihapus.");
      }
    } catch {
      showNotification("error", "Error", "Gagal menghapus lomba.");
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  const renderDashboardContent = () => {
    if (activeTab === "staff") return <StaffPanel />;
    if (activeTab === "sponsors") return <SponsorPanel />;
    if (activeTab === "faq") return <FaqPanel />;
    if (activeTab === "settings") return <SettingsPanel />;

    // Past Events Tab
    if (activeTab === "past-events") {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <p className="text-gray-500 text-sm mb-4">
              {lastUpdated
                ? `Terakhir diperbarui: ${lastUpdated.toLocaleTimeString("id-ID")}`
                : "Memuat data..."}
            </p>
          </div>
          {/* Year selector for admin */}
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setAdminSelectedYear("all")}
              className={`px-4 py-2 border-2 font-bold ${adminSelectedYear === "all" ? "bg-festika-teal text-white border-festika-teal" : "bg-white border-festika-navy text-festika-navy"}`}
            >
              Semua Tahun
            </button>
            {adminYears.map((y) => (
              <button
                key={y}
                onClick={() => setAdminSelectedYear(y)}
                className={`px-4 py-2 border-2 font-bold ${adminSelectedYear === y ? "bg-festika-teal text-white border-festika-teal" : "bg-white border-festika-navy text-festika-navy"}`}
              >
                FESTIKA {y}
              </button>
            ))}

            <div className="flex flex-wrap items-center gap-2 ml-2">
              <button
                onClick={() => setIsAddYearOpen(true)}
                className="px-3 py-2 bg-festika-navy text-white font-bold border-2 border-festika-navy hover:bg-festika-navy/90 transition-colors"
              >
                + Tambah Tab Tahun
              </button>

              {adminSelectedYear && adminSelectedYear !== "all" && (
                <button
                  onClick={() => {
                    const targets = pastEvents
                      .filter((p) => Number(p.year) === adminSelectedYear)
                      .map((c) => ({
                        id: c.id,
                        label: c.title,
                        subCount: 0,
                        subLabel: "pendaftar (external)",
                      }));
                    
                    if (targets.length === 0) {
                      // If no events, just remove the tab from state if it's empty
                      setAdminYears(prev => prev.filter(y => y !== adminSelectedYear));
                      setAdminSelectedYear("all");
                      return;
                    }

                    setBulkDeleteTargets(targets);
                    setIsBulkDeleteOpen(true);
                  }}
                  className="px-3 py-2 bg-red-600 text-white font-bold border-2 border-red-600 hover:bg-red-700 transition-colors"
                >
                  Hapus Tahun {adminSelectedYear}
                </button>
              )}
            </div>

          {/* pass filtered list to grid */}
          </div>

          <CompetitionGrid
            competitions={adminSelectedYear === "all" || adminSelectedYear === null ? pastEvents : pastEvents.filter((p) => Number(p.year) === adminSelectedYear)}
            onSelect={handleOpenEdit}
            onAddRequest={handleOpenAddPastEvent}
            onDeleteMode={handleOpenBulkDelete}
            title={`Past Events ${adminSelectedYear && adminSelectedYear !== "all" ? `(${adminSelectedYear})` : "(All Years)"}`}
            addButtonLabel="Tambah Past Event"
          />
        </div>
      );
    }

    // Competitions Tab (Active)
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-4">
            {lastUpdated
              ? `Terakhir diperbarui: ${lastUpdated.toLocaleTimeString("id-ID")}`
              : "Memuat data..."}
          </p>
          <StatsOverview
            totalCompetitions={competitions.length}
            activeLinks={competitions.filter((c) => c.registrationLink).length}
          />
        </div>

        <CompetitionGrid
          competitions={competitions}
          onSelect={handleOpenEdit}
          onAddRequest={handleOpenAdd}
          onDeleteMode={handleOpenBulkDelete}
          title="Manajemen Lomba"
          addButtonLabel="Tambah Lomba"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-festika-navy sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative h-12 w-44">
              <Image
                src="/logo-festika.svg"
                alt="Festika Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right text-xs text-white">
              <p className="font-bold">{user?.name || "Admin"}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-white/10 hover:bg-red-600 text-white px-3 py-1.5 flex items-center gap-2 text-sm transition-colors border border-white/20"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto no-scrollbar scroll-smooth">
          {[
            {
              id: "competitions",
              label: "Lomba",
              icon: Trophy,
              activeColor: "border-festika-orange",
            },
            {
              id: "past-events",
              label: "Past Events",
              icon: Trophy,
              activeColor: "border-festika-orange",
            },
            {
              id: "staff",
              label: "Panitia",
              icon: Users,
              activeColor: "border-festika-orange",
            },
            {
              id: "sponsors",
              label: "Sponsor",
              icon: Handshake,
              activeColor: "border-festika-orange",
            },
            {
              id: "faq",
              label: "FAQ",
              icon: HelpCircle,
              activeColor: "border-festika-orange",
            },
            {
              id: "settings",
              label: "Pengaturan",
              icon: Settings,
              activeColor: "border-festika-orange",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
              }}
              className={`flex items-center gap-2 px-5 sm:px-6 py-4 font-bold transition-all border-b-4 shrink-0 whitespace-nowrap ${
                activeTab === tab.id
                  ? `${tab.activeColor} text-white bg-white/5`
                  : "border-transparent text-gray-400 hover:text-white"
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
      {modalType === "competition" ? (
        <CompetitionModal
          key={`${isModalOpen}-${modalMode}-${modalInitialData?.id || "new"}`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCompetitionSubmit}
          initialData={modalInitialData}
          isLoading={modalLoading}
          mode={modalMode}
        />
      ) : (
        <AdminPastEventModal
          key={`${isModalOpen}-${modalMode}-${modalInitialData?.id || "new"}`}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCompetitionSubmit}
          initialData={modalInitialData}
          isLoading={modalLoading}
          mode={modalMode}
        />
      )}

      <AddYearModal
        key="add-year-modal"
        isOpen={isAddYearOpen}
        onClose={() => setIsAddYearOpen(false)}
        onConfirm={handleConfirmAddYear}
        existingYears={adminYears}
      />

      <DeleteCompetitionModal
        competition={deletingComp}
        step={deleteStep}
        input={deleteInput}
        onInputChange={setDeleteInput}
        onNextStep={() => setDeleteStep(2)}
        onConfirm={handleDeleteCompetition}
        onClose={() => setDeletingComp(null)}
        isLoading={isDeleting}
      />

      <DeleteMultipleModal
        key="delete-multiple-modal"
        isOpen={isBulkDeleteOpen}
        title={bulkDeleteTargets.length > 5 ? `Hapus ${bulkDeleteTargets.length} Lomba` : "Hapus Lomba Terpilih"}
        entityLabel="LOMBA"
        targets={bulkDeleteTargets}
        cascadeWarning="Data lomba akan dihapus permanen dari database. Pendaftaran dilakukan secara eksternal melalui Google Form."
        onConfirm={handleBulkDeleteCompetitions}
        onClose={() => {
          setIsBulkDeleteOpen(false);
          setBulkDeleteTargets([]);
        }}
        isLoading={isBulkDeleting}
      />
    </div>
  );
}
