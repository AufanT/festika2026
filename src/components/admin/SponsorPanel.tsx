"use client";

import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { Sponsor } from "@/types/admin";

// Sub-components
import SponsorGrid from "./sponsor/SponsorGrid";
import { AddSponsorModal } from "./sponsor/SponsorModals";
import { DeleteMultipleModal, DeleteMultipleTarget } from "./dashboard/DashboardModals";

export default function SponsorPanel() {
  const { showNotification } = useNotification();
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Forms State ──────────────────────────────────────────────────────────
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [tier, setTier] = useState("Supported By");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Bulk Delete ──────────────────────────────────────────────────────────
  const [deleteTargets, setDeleteTargets] = useState<DeleteMultipleTarget[]>([]);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Data Fetching ────────────────────────────────────────────────────────
  const fetchSponsors = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sponsors");
      const json = await res.json();
      setSponsors(json.data || []);
    } catch { /* ignore */ } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchSponsors(); }, []);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (!json.success) throw new Error(json.message || "Upload fail");
    return json.url;
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAddSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return showNotification("error", "Peringatan", "Logo sponsor wajib diunggah!");
    
    setIsSubmitting(true);
    try {
      const imageUrl = await uploadFile(file);
      const res = await fetch("/api/sponsors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, tier, imageUrl }),
      });
      
      if (res.ok) {
        setShowAdd(false); 
        setName(""); 
        setTier("Supported By"); 
        setFile(null);
        fetchSponsors();
        showNotification("success", "Berhasil", "Sponsor berhasil ditambahkan");
      } else {
        const errJson = await res.json();
        showNotification("error", "Gagal", errJson.message || "Gagal menambahkan sponsor");
      }
    } catch (error: any) { 
      showNotification("error", "Gagal", error.message || "Terjadi kesalahan sistem"); 
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const handleOpenDelete = (selectedIds: string[]) => {
    const targets: DeleteMultipleTarget[] = sponsors
      .filter(s => selectedIds.includes(s.id))
      .map(s => ({
        id: s.id,
        label: s.name,
        subLabel: s.tier || "General",
      }));
    setDeleteTargets(targets);
    setIsDeleteOpen(true);
  };

  const handleBulkDelete = async () => {
    if (deleteTargets.length === 0) return;
    setIsDeleting(true);
    try {
      const results = await Promise.allSettled(
        deleteTargets.map(t =>
          fetch(`/api/sponsors?id=${t.id}`, { method: "DELETE" })
        )
      );
      const successCount = results.filter(r => r.status === "fulfilled").length;
      const failCount = results.length - successCount;

      setIsDeleteOpen(false);
      setDeleteTargets([]);
      await fetchSponsors();

      if (failCount === 0) {
        showNotification("success", "Berhasil Dihapus", `${successCount} sponsor telah dihapus.`);
      } else {
        showNotification("error", "Sebagian Gagal", `${successCount} berhasil, ${failCount} gagal dihapus.`);
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan tak terduga.");
    } finally { setIsDeleting(false); }
  };

  return (
    <div className="w-full">
      <SponsorGrid
        sponsors={sponsors}
        onAddRequest={() => setShowAdd(true)}
        onDeleteMode={handleOpenDelete}
        isLoading={isLoading}
      />

      <AddSponsorModal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onSubmit={handleAddSponsor}
        name={name}
        onNameChange={setName}
        tier={tier}
        onTierChange={setTier}
        onFileChange={setFile}
        isLoading={isSubmitting}
      />

      <DeleteMultipleModal
        key="bulk-delete-sponsor"
        isOpen={isDeleteOpen}
        title="Hapus Sponsor Terpilih"
        entityLabel="SPONSOR"
        targets={deleteTargets}
        cascadeWarning="Data sponsor yang dipilih akan dihapus secara permanen dari database. Logo yang telah diunggah tidak akan terhapus dari storage, namun data sponsor tidak akan ditampilkan lagi di website."
        onConfirm={handleBulkDelete}
        onClose={() => { setIsDeleteOpen(false); setDeleteTargets([]); }}
        isLoading={isDeleting}
      />
    </div>
  );
}
