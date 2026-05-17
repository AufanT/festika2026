"use client";

import { useState, useEffect } from "react";
import { Loader2, Upload, Check, ExternalLink } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function SettingsPanel() {
  const { showNotification } = useNotification();
  const [guidebookUrl, setGuidebookUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.data?.guidebook_url) {
          setGuidebookUrl(json.data.guidebook_url);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guidebook_url: guidebookUrl }),
      });
      if (res.ok) {
        showNotification("success", "Berhasil", "Guidebook berhasil disimpan!");
      } else {
        showNotification("error", "Gagal", "Gagal menyimpan guidebook.");
      }
    } catch {
      showNotification("error", "Error", "Terjadi kesalahan koneksi.");
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (json.url) {
        setGuidebookUrl(json.url);
        // Auto-save to settings
        await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guidebook_url: json.url }),
        });
        showNotification("success", "Berhasil", "Guidebook berhasil diupload!");
      } else {
        showNotification("error", "Gagal", json.message || "Gagal mengupload file");
      }
    } catch (err) {
      showNotification("error", "Error", "Terjadi kesalahan koneksi.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-festika-navy" size={32} />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black text-festika-navy uppercase mb-8">
        Pengaturan
      </h2>

      <div className="bg-white border-2 border-festika-navy p-8 max-w-2xl shadow-[8px_8px_0_0_#F5A623]">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-black text-festika-navy mb-2 uppercase">
          Guidebook
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Upload PDF guidebook FESTIKA. File akan tersedia untuk di-download dari halaman utama dan detail lomba.
        </p>
        <p className="text-xs text-red-500 font-bold mb-4">
          ⚠ Maksimal ukuran file: 10 MB (Cloudinary free plan limit)
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-festika-navy block mb-2">
              Upload File PDF
            </label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileUpload}
              disabled={uploading}
              className="w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-festika-navy file:text-white file:font-bold file:text-xs hover:file:bg-festika-navy/90"
            />
            {uploading && (
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" /> Uploading...
              </p>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <label className="text-sm font-bold text-festika-navy block mb-2">
              Atau masukkan URL langsung
            </label>
            <input
              value={guidebookUrl}
              onChange={(e) => setGuidebookUrl(e.target.value)}
              placeholder="https://res.cloudinary.com/..."
              className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange text-sm"
            />
          </div>

          {guidebookUrl && (
            <div className="bg-green-50 border-2 border-green-200 p-3 flex items-center gap-3">
              <Check size={18} className="text-green-600 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-green-700">Guidebook tersimpan</p>
                <a
                  href={guidebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-green-600 underline truncate block flex items-center gap-1"
                >
                  {guidebookUrl} <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-festika-navy text-white px-6 py-3 font-bold hover:bg-festika-navy/90 transition-colors shadow-[4px_4px_0_0_#F5A623] disabled:opacity-50"
          >
            {saving && <Loader2 size={16} className="animate-spin" />}
            {!saving && <Upload size={16} />}
            Simpan Guidebook
          </button>
        </div>
      </div>
    </div>
  );
}
