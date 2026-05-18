"use client";

import { useState, useEffect } from "react";
import { Loader2, Check } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";

export default function SettingsPanel() {
  const { showNotification } = useNotification();
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((json) => {
        if (json.data?.guidebook_url) {
          setUploaded(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
        await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guidebook_url: json.url }),
        });
        setUploaded(true);
        showNotification("success", "Berhasil", "Guidebook berhasil diupload!");
      } else {
        showNotification("error", "Gagal", json.message || "Gagal mengupload file");
      }
    } catch {
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
          {uploaded && (
            <div className="bg-green-50 border-2 border-green-200 p-3 flex items-center gap-3">
              <Check size={18} className="text-green-600 shrink-0" />
              <p className="text-xs font-bold text-green-700">Guidebook tersimpan</p>
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
}
