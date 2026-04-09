"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Save, Upload, Loader2, Image as ImageIcon, FileText } from "lucide-react";

import { useNotification } from "@/context/NotificationContext";

export default function SitePanel() {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_image: "",
    about_image: "",
    about_description: "",
  });

  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setSettings({
            hero_image: data.data.hero_image || "",
            about_image: data.data.about_image || "",
            about_description: data.data.about_description || "",
          });
        }
      }
    } catch (error) {
      console.error("Gagal mengambil setting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (key: string, file: File) => {
    setUploading(prev => ({ ...prev, [key]: true }));
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(prev => ({ ...prev, [key]: data.url }));
      } else {
        showNotification("error", "Gagal", "Gagal mengunggah gambar");
      }
    } catch (error) {
      showNotification("error", "Error", "Terjadi kesalahan saat mengunggah");
    } finally {
      setUploading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        showNotification("success", "Berhasil", "Konfigurasi berhasil disimpan!");
      } else {
        showNotification("error", "Gagal", "Gagal menyimpan konfigurasi");
      }
    } catch (error) {
      showNotification("error", "Sistem Error", "Terjadi kesalahan sistem");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Loader2 className="animate-spin text-festika-teal" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-festika-navy uppercase tracking-tight leading-tight">Pengaturan Situs</h2>
          <p className="text-gray-500 text-xs sm:text-sm">Kelola konten visual dan teks pada halaman utama.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-festika-orange text-white px-6 py-3 font-bold uppercase tracking-widest text-xs border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Simpan Perubahan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* HERO IMAGE */}
        <div className="bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36]">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={20} className="text-festika-teal" />
            <h3 className="font-bold text-festika-navy uppercase text-sm">Hero Section Photo</h3>
          </div>
          
          <div className="relative aspect-video bg-gray-100 border-2 border-dashed border-gray-300 mb-4 flex items-center justify-center overflow-hidden">
            {settings.hero_image ? (
              <Image src={settings.hero_image} alt="Hero Preview" fill className="object-cover" />
            ) : (
              <span className="text-gray-400 text-xs">Belum ada foto</span>
            )}
            {uploading.hero_image && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}
          </div>
          
          <label className="block">
            <span className="sr-only">Pilih foto hero</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload("hero_image", e.target.files[0])}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-festika-navy file:text-xs file:font-bold file:bg-festika-teal/10 file:text-festika-teal hover:file:bg-festika-teal/20 cursor-pointer"
            />
          </label>
        </div>

        {/* ABOUT IMAGE */}
        <div className="bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36]">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon size={20} className="text-festika-teal" />
            <h3 className="font-bold text-festika-navy uppercase text-sm">About Section Photo</h3>
          </div>
          
          <div className="relative aspect-[3/4] max-h-[250px] bg-gray-100 border-2 border-dashed border-gray-300 mb-4 flex items-center justify-center overflow-hidden mx-auto">
            {settings.about_image ? (
              <Image src={settings.about_image} alt="About Preview" fill className="object-cover" />
            ) : (
              <span className="text-gray-400 text-xs">Belum ada foto</span>
            )}
            {uploading.about_image && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" />
              </div>
            )}
          </div>
          
          <label className="block">
            <span className="sr-only">Pilih foto about</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload("about_image", e.target.files[0])}
              className="block w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-2 file:border-festika-navy file:text-xs file:font-bold file:bg-festika-teal/10 file:text-festika-teal hover:file:bg-festika-teal/20 cursor-pointer"
            />
          </label>
        </div>

        {/* ABOUT DESCRIPTION */}
        <div className="lg:col-span-2 bg-white border-2 border-festika-navy p-6 shadow-[6px_6px_0_0_#0F2A36]">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={20} className="text-festika-teal" />
            <h3 className="font-bold text-festika-navy uppercase text-sm">Deskripsi About Festika</h3>
          </div>
          
          <textarea
            value={settings.about_description}
            onChange={(e) => setSettings(prev => ({ ...prev, about_description: e.target.value }))}
            placeholder="Tuliskan deskripsi mengenai Festika di sini..."
            rows={6}
            className="w-full p-4 border-2 border-gray-200 focus:border-festika-teal focus:outline-none text-sm leading-relaxed"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
