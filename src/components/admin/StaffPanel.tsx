"use client";

import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { Staff, Division } from "@/types/admin";

// Sub-components
import DivisionGrid from "./staff/DivisionGrid";
import StaffGrid from "./staff/StaffGrid";
import { AddDivisionModal, AddStaffModal } from "./staff/StaffModals";
import { DeleteMultipleModal, DeleteMultipleTarget } from "./dashboard/DashboardModals";

export default function StaffPanel() {
  const { showNotification } = useNotification();
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [selectedDiv, setSelectedDiv] = useState<Division | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ── Forms State ──────────────────────────────────────────────────────────
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

  // ── Bulk Delete: Divisi ──────────────────────────────────────────────────
  const [divDeleteTargets, setDivDeleteTargets] = useState<DeleteMultipleTarget[]>([]);
  const [isDivDeleteOpen, setIsDivDeleteOpen] = useState(false);
  const [isDivDeleting, setIsDivDeleting] = useState(false);

  // ── Bulk Delete: Anggota / Staff ─────────────────────────────────────────
  const [staffDeleteTargets, setStaffDeleteTargets] = useState<DeleteMultipleTarget[]>([]);
  const [isStaffDeleteOpen, setIsStaffDeleteOpen] = useState(false);
  const [isStaffDeleting, setIsStaffDeleting] = useState(false);

  // ── Data Fetching ────────────────────────────────────────────────────────
  const fetchDivisions = async () => {
    try {
      const res = await fetch("/api/divisions");
      const json = await res.json();
      setDivisions(json.data || []);
    } catch { showNotification("error", "Gagal", "Gagal memuat data divisi"); } finally { setIsLoading(false); }
  };

  const fetchStaff = async (divId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/staff?divisionId=${divId}`);
      const json = await res.json();
      setStaff(json.data || []);
    } catch { showNotification("error", "Gagal", "Gagal memuat data anggota"); } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchDivisions(); }, []);
  useEffect(() => { if (selectedDiv) fetchStaff(selectedDiv.id); }, [selectedDiv]);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const json = await res.json();
    if (!json.success) throw new Error("Upload fail");
    return json.url;
  };

  // ── Add Handlers ─────────────────────────────────────────────────────────
  const handleAddDivision = async (e: React.FormEvent) => {
    e.preventDefault();
    setDivLoading(true);
    try {
      const imageUrl = divFile ? await uploadFile(divFile) : null;
      const res = await fetch("/api/divisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: divName, imageUrl }),
      });
      if (res.ok) {
        setShowAddDiv(false); setDivName(""); setDivFile(null);
        fetchDivisions();
        showNotification("success", "Berhasil", "Divisi berhasil ditambahkan");
      }
    } catch { showNotification("error", "Gagal", "Gagal menambahkan divisi"); }
    finally { setDivLoading(false); }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffRole) return showNotification("error", "Peringatan", "Pilih jabatan terlebih dahulu!");
    setStfLoading(true);
    try {
      const imageUrl = staffFile ? await uploadFile(staffFile) : null;
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: staffName, role: staffRole, description: staffDesc, imageUrl,
          divisionId: selectedDiv?.isCore ? null : selectedDiv!.id,
        }),
      });
      if (res.ok) {
        setShowAddStaff(false); setStaffName(""); setStaffRole(""); setStaffDesc(""); setStaffFile(null);
        fetchStaff(selectedDiv!.id);
        showNotification("success", "Berhasil", "Anggota berhasil ditambahkan");
      } else {
        const errJson = await res.json();
        showNotification("error", "Gagal", errJson.message || "Gagal menambahkan staff");
      }
    } catch { showNotification("error", "Sistem Error", "Terjadi kesalahan sistem"); }
    finally { setStfLoading(false); }
  };

  // ── Delete Handlers: Divisi ──────────────────────────────────────────────

  /**
   * Dipanggil dari DivisionGrid dengan array ID divisi terpilih.
   * Siapkan targets kemudian buka modal konfirmasi delete.
   */
  const handleOpenDivisionBulkDelete = (selectedIds: string[]) => {
    const targets: DeleteMultipleTarget[] = divisions
      .filter(d => selectedIds.includes(d.id))
      .map(d => ({
        id: d.id,
        label: d.name,
        // Jumlah staf per divisi tidak di-fetch secara real-time di sini untuk efisiensi.
        // Peringatkan via cascadeWarning bahwa staf akan ikut terhapus.
      }));
    setDivDeleteTargets(targets);
    setIsDivDeleteOpen(true);
  };

  /**
   * Eksekusi hapus banyak divisi secara paralel.
   * Staff di dalamnya akan terhapus otomatis karena onDelete: Cascade di database.
   */
  const handleBulkDeleteDivisions = async () => {
    if (divDeleteTargets.length === 0) return;
    setIsDivDeleting(true);
    try {
      const results = await Promise.allSettled(
        divDeleteTargets.map(t =>
          fetch(`/api/divisions?id=${t.id}`, { method: "DELETE" })
        )
      );
      const successCount = results.filter(r => r.status === "fulfilled" && (r.value as Response).ok).length;
      const failCount = results.length - successCount;

      setIsDivDeleteOpen(false);
      setDivDeleteTargets([]);
      await fetchDivisions();

      if (failCount === 0) {
        showNotification("success", "Berhasil Dihapus", `${successCount} divisi telah dihapus.`);
      } else {
        showNotification("error", "Sebagian Gagal", `${successCount} berhasil, ${failCount} gagal dihapus.`);
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan tak terduga.");
    } finally { setIsDivDeleting(false); }
  };

  // ── Delete Handlers: Staff / Anggota ─────────────────────────────────────

  /**
   * Dipanggil dari StaffGrid dengan array ID staff terpilih.
   */
  const handleOpenStaffBulkDelete = (selectedIds: string[]) => {
    const targets: DeleteMultipleTarget[] = staff
      .filter(s => selectedIds.includes(s.id))
      .map(s => ({
        id: s.id,
        label: s.name,
        subCount: undefined, // Anggota tidak punya sub-data
      }));
    setStaffDeleteTargets(targets);
    setIsStaffDeleteOpen(true);
  };

  /**
   * Eksekusi hapus banyak anggota secara paralel.
   */
  const handleBulkDeleteStaff = async () => {
    if (staffDeleteTargets.length === 0) return;
    setIsStaffDeleting(true);
    try {
      const results = await Promise.allSettled(
        staffDeleteTargets.map(t =>
          fetch(`/api/staff?id=${t.id}`, { method: "DELETE" })
        )
      );
      const successCount = results.filter(r => r.status === "fulfilled" && (r.value as Response).ok).length;
      const failCount = results.length - successCount;

      setIsStaffDeleteOpen(false);
      setStaffDeleteTargets([]);
      if (selectedDiv) await fetchStaff(selectedDiv.id);

      if (failCount === 0) {
        showNotification("success", "Berhasil Dihapus", `${successCount} anggota telah dihapus.`);
      } else {
        showNotification("error", "Sebagian Gagal", `${successCount} berhasil, ${failCount} gagal dihapus.`);
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan tak terduga.");
    } finally { setIsStaffDeleting(false); }
  };

  const hasCoordinator = staff.some(s => s.role === "KOORDINATOR");

  return (
    <div className="w-full">
      {!selectedDiv ? (
        <DivisionGrid
          divisions={divisions}
          onSelect={setSelectedDiv}
          onAddRequest={() => setShowAddDiv(true)}
          onDeleteMode={handleOpenDivisionBulkDelete}
          isLoading={isLoading}
        />
      ) : (
        <StaffGrid
          selectedDiv={selectedDiv}
          staff={staff}
          onBack={() => setSelectedDiv(null)}
          onAddRequest={() => setShowAddStaff(true)}
          onDeleteMode={handleOpenStaffBulkDelete}
          isLoading={isLoading}
        />
      )}

      {/* ── Modals: Add ── */}
      <AddDivisionModal
        isOpen={showAddDiv} onClose={() => setShowAddDiv(false)} onSubmit={handleAddDivision}
        name={divName} onNameChange={setDivName} onFileChange={setDivFile} isLoading={divLoading}
      />

      {selectedDiv && (
        <AddStaffModal
          isOpen={showAddStaff} onClose={() => setShowAddStaff(false)} onSubmit={handleAddStaff}
          name={staffName} onNameChange={setStaffName} role={staffRole} onRoleChange={setStaffRole}
          description={staffDesc} onDescriptionChange={setStaffDesc} onFileChange={setStaffFile}
          selectedDiv={selectedDiv} hasCoordinator={hasCoordinator} isLoading={stfLoading}
        />
      )}

      {/* ── Modal: Bulk Delete Divisi ── */}
      <DeleteMultipleModal
        key="bulk-delete-divisi"
        isOpen={isDivDeleteOpen}
        title="Hapus Divisi Terpilih"
        entityLabel="DIVISI"
        targets={divDeleteTargets}
        cascadeWarning="Seluruh anggota / staf di dalam divisi-divisi ini akan ikut terhapus secara permanen. Gambar profil yang sudah diunggah tidak akan terhapus dari storage, namun entri datanya akan hilang dari database."
        onConfirm={handleBulkDeleteDivisions}
        onClose={() => { setIsDivDeleteOpen(false); setDivDeleteTargets([]); }}
        isLoading={isDivDeleting}
      />

      {/* ── Modal: Bulk Delete Anggota ── */}
      <DeleteMultipleModal
        key="bulk-delete-staff"
        isOpen={isStaffDeleteOpen}
        title="Hapus Anggota Terpilih"
        entityLabel="ANGGOTA"
        targets={staffDeleteTargets}
        cascadeWarning="Data anggota yang dipilih akan dihapus secara permanen dari database. Foto profil yang telah diunggah tidak akan terhapus dari storage, namun data profil tidak akan ditampilkan lagi di website."
        onConfirm={handleBulkDeleteStaff}
        onClose={() => { setIsStaffDeleteOpen(false); setStaffDeleteTargets([]); }}
        isLoading={isStaffDeleting}
      />
    </div>
  );
}
