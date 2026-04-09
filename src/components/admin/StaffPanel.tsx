"use client";

import { useState, useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";
import { Staff, Division } from "@/types/admin";

// Sub-components
import DivisionGrid from "./staff/DivisionGrid";
import StaffGrid from "./staff/StaffGrid";
import { AddDivisionModal, AddStaffModal } from "./staff/StaffModals";

export default function StaffPanel() {
  const { showNotification } = useNotification();
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [selectedDiv, setSelectedDiv] = useState<Division | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Forms State
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
    } catch { /* ignore */ } finally { setIsLoading(false); }
  };

  const fetchStaff = async (divId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/staff?divisionId=${divId}`);
      const json = await res.json();
      setStaff(json.data || []);
    } catch { /* ignore */ } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchDivisions(); }, []);
  useEffect(() => { if (selectedDiv) fetchStaff(selectedDiv.id); }, [selectedDiv]);

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
      let imageUrl = divFile ? await uploadFile(divFile) : null;
      const res = await fetch("/api/divisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: divName, imageUrl })
      });
      if (res.ok) {
        setShowAddDiv(false); setDivName(""); setDivFile(null);
        fetchDivisions();
        showNotification("success", "Berhasil", "Divisi berhasil ditambahkan");
      }
    } catch (err) { showNotification("error", "Gagal", "Gagal menambahkan divisi"); }
    finally { setDivLoading(false); }
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffRole) return showNotification("error", "Peringatan", "Pilih jabatan terlebih dahulu!");
    setStfLoading(true);
    try {
      let imageUrl = staffFile ? await uploadFile(staffFile) : null;
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: staffName, role: staffRole, description: staffDesc, imageUrl, 
          divisionId: selectedDiv?.isCore ? null : selectedDiv!.id 
        })
      });
      if (res.ok) {
        setShowAddStaff(false); setStaffName(""); setStaffRole(""); setStaffDesc(""); setStaffFile(null);
        fetchStaff(selectedDiv!.id);
        showNotification("success", "Berhasil", "Anggota berhasil ditambahkan");
      } else {
        const errJson = await res.json();
        showNotification("error", "Gagal", errJson.message || "Gagal menambahkan staff");
      }
    } catch (err) { showNotification("error", "Sistem Error", "Terjadi kesalahan sistem"); }
    finally { setStfLoading(false); }
  };

  const handleDeleteStaff = (id: string, name: string) => {
    showNotification("confirm", "Hapus Anggota", `Apakah Anda yakin ingin menghapus ${name}?`, async () => {
      try {
        const res = await fetch(`/api/staff?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchStaff(selectedDiv!.id);
          showNotification("success", "Terhapus", "Anggota berhasil dihapus");
        }
      } catch (err) { showNotification("error", "Error", "Terjadi kesalahan sistem"); }
    });
  };

  const hasCoordinator = staff.some(s => s.role === "KOORDINATOR");

  return (
    <div className="w-full">
      {!selectedDiv ? (
        <DivisionGrid 
          divisions={divisions}
          onSelect={setSelectedDiv}
          onAddRequest={() => setShowAddDiv(true)}
          isLoading={isLoading}
        />
      ) : (
        <StaffGrid 
          selectedDiv={selectedDiv}
          staff={staff}
          onBack={() => setSelectedDiv(null)}
          onAddRequest={() => setShowAddStaff(true)}
          onDeleteRequest={handleDeleteStaff}
          isLoading={isLoading}
        />
      )}

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
    </div>
  );
}
