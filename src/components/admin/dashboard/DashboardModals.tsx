"use client";

import { useState, useRef } from "react";
import { Loader2, AlertTriangle, X, CheckCircle2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Competition } from "@/types/admin";

// ---------------------------------------------------------------------------
// AddCompetitionModal
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// CompetitionModal (Add & Edit)
// ---------------------------------------------------------------------------
type CompetitionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  isLoading: boolean;
  mode: "add" | "edit";
  modalType?: "competition" | "past-event";
};

export function CompetitionModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
  modalType = "competition",
}: CompetitionModalProps) {
  const [formData, setFormData] = useState(() =>
    initialData
      ? {
          title: initialData.title || "",
          theme: initialData.theme || "",
          description: initialData.description || "",
          registrationStartDate: initialData.registrationStartDate
            ? new Date(initialData.registrationStartDate).toISOString().split("T")[0]
            : "",
          registrationEndDate: initialData.registrationEndDate
            ? new Date(initialData.registrationEndDate).toISOString().split("T")[0]
            : "",
          registrationLink: initialData.registrationLink || "",
          tags: initialData.tags || "",
          imageUrl: initialData.imageUrl || "",
          contacts:
            initialData.contacts && initialData.contacts.length > 0
              ? initialData.contacts
              : [{ name: "", phone: "" }],
          timeline:
            initialData.timeline && initialData.timeline.length > 0
              ? initialData.timeline
              : [],
          prizeList:
            initialData.prizeList && initialData.prizeList.length > 0
              ? initialData.prizeList
              : [],
          isArchived: initialData.isArchived || false,
          year: initialData.year || 2025,
          participants: initialData.participants || "",
          winner: initialData.winner || "",
          runnerUp: initialData.runnerUp || "",
          thirdPlace: initialData.thirdPlace || "",
        }
      : {
          title: "",
          theme: "",
          description: "",
          registrationStartDate: "",
          registrationEndDate: "",
          registrationLink: "",
          tags: "",
          imageUrl: "",
          contacts: [{ name: "", phone: "" }],
          timeline: [],
          prizeList: [],
          isArchived: false,
          year: 2025,
          participants: "",
          winner: "",
          runnerUp: "",
          thirdPlace: "",
        },
  );

  const handleAddContact = () => {
    setFormData((prev: any) => ({
      ...prev,
      contacts: [...prev.contacts, { name: "", phone: "" }],
    }));
  };

  const handleRemoveContact = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      contacts: prev.contacts.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleContactChange = (
    index: number,
    field: "name" | "phone",
    value: string,
  ) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    setFormData((prev: any) => ({ ...prev, contacts: newContacts }));
  };

  const handleAddTimeline = () => {
    setFormData((prev: any) => ({
      ...prev,
      timeline: [...prev.timeline, { label: "", date: "", description: "" }],
    }));
  };

  const handleRemoveTimeline = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      timeline: prev.timeline.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleTimelineChange = (
    index: number,
    field: "label" | "date" | "description",
    value: string,
  ) => {
    const newTimeline = [...formData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, timeline: newTimeline }));
  };

  const handleAddPrize = () => {
    setFormData((prev: any) => ({
      ...prev,
      prizeList: [...prev.prizeList, { position: "", prize: "", description: "" }],
    }));
  };

  const handleRemovePrize = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      prizeList: prev.prizeList.filter((_: any, i: number) => i !== index),
    }));
  };

  const handlePrizeChange = (
    index: number,
    field: "position" | "prize" | "description",
    value: string,
  ) => {
    const newPrizes = [...formData.prizeList];
    newPrizes[index] = { ...newPrizes[index], [field]: value };
    setFormData((prev: any) => ({ ...prev, prizeList: newPrizes }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-2xl my-8 shadow-[12px_12px_0_0_#F5A623] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-festika-navy"
        >
          <X size={24} />
        </button>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-6">
          {modalType === "past-event"
            ? mode === "add"
              ? "🏆 Tambah Past Event Baru"
              : "Edit Past Event"
            : mode === "add"
              ? "Tambah Lomba Baru"
              : "Edit Lomba"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                Nama Lomba*
              </label>
              <input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Contoh: Lomba Karya Tulis Ilmiah"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                Tema
              </label>
              <input
                value={formData.theme}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, theme: e.target.value }))
                }
                placeholder="Contoh: NextGen Tech"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-festika-navy">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Jelaskan detail lomba..."
              className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange h-32"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                Tanggal Buka Pendaftaran
              </label>
              <input
                type="date"
                value={formData.registrationStartDate}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    registrationStartDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                Tanggal Tutup Pendaftaran
              </label>
              <input
                type="date"
                value={formData.registrationEndDate}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    registrationEndDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-festika-navy">
              Link Google Form*
            </label>
            <input
              required
              type="url"
              value={formData.registrationLink}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationLink: e.target.value,
                }))
              }
              placeholder="https://forms.gle/..."
              className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                Hashtag/Tags
              </label>
              <input
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, tags: e.target.value }))
                }
                placeholder={
                  modalType === "past-event"
                    ? "#FESTIKA2025 #Success"
                    : "#FESTIKA2026 #Innovation"
                }
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-festika-navy">
                URL Poster (Opsional)
              </label>
              <input
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, imageUrl: e.target.value }))
                }
                placeholder="https://example.com/poster.jpg"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-festika-navy">
                Contact Persons
              </label>
              <button
                type="button"
                onClick={handleAddContact}
                className="text-xs bg-festika-teal text-white px-2 py-1 font-bold"
              >
                {" "}
                + Tambah CP
              </button>
            </div>
            {formData.contacts.map((contact, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-1">
                  <input
                    value={contact.name}
                    onChange={(e) =>
                      handleContactChange(index, "name", e.target.value)
                    }
                    placeholder="Nama CP"
                    className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <input
                    value={contact.phone}
                    onChange={(e) =>
                      handleContactChange(index, "phone", e.target.value)
                    }
                    placeholder="No WhatsApp (08...)"
                    className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveContact(index)}
                  className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* ── Timeline Lomba ── */}
          {modalType !== "past-event" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-festika-navy">
                  Timeline Lomba
                </label>
                <button
                  type="button"
                  onClick={handleAddTimeline}
                  className="text-xs bg-festika-teal text-white px-2 py-1 font-bold"
                >
                  + Tambah Event
                </button>
              </div>
              {formData.timeline.map((item: any, index: number) => (
                <div key={index} className="flex gap-2 items-start border border-gray-200 p-3">
                  <div className="flex-1 space-y-2">
                    <input
                      value={item.label}
                      onChange={(e) => handleTimelineChange(index, "label", e.target.value)}
                      placeholder="Nama Event (cth: Pendaftaran)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                    <input
                      value={item.date}
                      onChange={(e) => handleTimelineChange(index, "date", e.target.value)}
                      placeholder="Tanggal (cth: 15-20 Mar 2026)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                    <input
                      value={item.description || ""}
                      onChange={(e) => handleTimelineChange(index, "description", e.target.value)}
                      placeholder="Deskripsi (opsional)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeline(index)}
                    className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── Prize List ── */}
          {modalType !== "past-event" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-festika-navy">
                  Prize List
                </label>
                <button
                  type="button"
                  onClick={handleAddPrize}
                  className="text-xs bg-festika-teal text-white px-2 py-1 font-bold"
                >
                  + Tambah Prize
                </button>
              </div>
              {formData.prizeList.map((item: any, index: number) => (
                <div key={index} className="flex gap-2 items-start border border-gray-200 p-3">
                  <div className="flex-1 space-y-2">
                    <input
                      value={item.position}
                      onChange={(e) => handlePrizeChange(index, "position", e.target.value)}
                      placeholder="Posisi (cth: Juara 1, Harapan)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                    <input
                      value={item.prize}
                      onChange={(e) => handlePrizeChange(index, "prize", e.target.value)}
                      placeholder="Hadiah (cth: Rp 3.000.000)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                    <input
                      value={item.description || ""}
                      onChange={(e) => handlePrizeChange(index, "description", e.target.value)}
                      placeholder="Deskripsi (opsional)"
                      className="w-full px-3 py-1.5 border-2 border-festika-navy text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePrize(index)}
                    className="p-2 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Archive option removed: past-event flow is handled in dedicated Past Event modal */}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623] disabled:opacity-50"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}{" "}
              {mode === "add" ? "Simpan" : "Perbarui"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type AddYearModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (year: number) => void;
  existingYears?: number[];
};

export function AddYearModal({
  isOpen,
  onClose,
  onConfirm,
  existingYears = [],
}: AddYearModalProps) {
  const [yearStr, setYearStr] = useState("");

  if (!isOpen) return null;

  const yearNum = Number(yearStr);
  const exists = existingYears.includes(yearNum);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-md my-8 shadow-[12px_12px_0_0_#F5A623] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-festika-navy"
        >
          <X size={24} />
        </button>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-4">
          Tambah Tab Tahun
        </h2>

        <div className="space-y-3">
          <label className="text-sm font-bold text-festika-navy">Tahun</label>
          <input
            type="number"
            value={yearStr}
            onChange={(e) => setYearStr(e.target.value)}
            placeholder="2026"
            className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
          />
          {yearStr && (isNaN(yearNum) || yearNum < 1900) && (
            <p className="text-red-500 text-sm">Tahun tidak valid</p>
          )}
          {yearStr && !isNaN(yearNum) && exists && (
            <p className="text-yellow-600 text-sm">Tab tahun ini sudah ada</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => {
              if (!isNaN(yearNum) && yearNum > 1900 && !exists) onConfirm(yearNum);
            }}
            disabled={isNaN(yearNum) || yearNum < 1900 || exists}
            className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors disabled:opacity-50"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Admin Past Event Modal (separate from CompetitionModal)
// ---------------------------------------------------------------------------
export function AdminPastEventModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}: CompetitionModalProps) {
  const [formData, setFormData] = useState(() => {
    const defaultYear = new Date().getFullYear() - 1;
    if (initialData) {
      return {
        title: initialData.title || "",
        theme: initialData.theme || "",
        description: initialData.description || "",
        eventDate: initialData.eventDate
          ? new Date(initialData.eventDate).toISOString().split("T")[0]
          : "",
        imageUrl: initialData.imageUrl || "",
        galleryUrls: Array.isArray(initialData.galleryUrls)
          ? initialData.galleryUrls
          : initialData.galleryUrls || [],
        year: initialData.year || defaultYear,
        participants: initialData.participants ? String(initialData.participants) : "",
        winner: initialData.winner || "",
        runnerUp: initialData.runnerUp || "",
        thirdPlace: initialData.thirdPlace || "",
        orderIndex: initialData.orderIndex || 0,
      };
    }
    return {
      title: "",
      theme: "",
      description: "",
      eventDate: "",
      imageUrl: "",
      galleryUrls: [] as string[],
      year: defaultYear,
      participants: "",
      winner: "",
      runnerUp: "",
      thirdPlace: "",
      orderIndex: 0,
    };
  });

  const galleryRef = useRef<HTMLDivElement | null>(null);

  const scrollGallery = (dir: "left" | "right") => {
    const c = galleryRef.current as HTMLDivElement | null;
    if (!c) return;
    const delta = Math.round(c.clientWidth * 0.6) * (dir === "left" ? -1 : 1);
    c.scrollBy({ left: delta, behavior: "smooth" });
  };

  const [isUploading, setIsUploading] = useState(false);

  const uploadToServer = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/past-events/upload", {
      method: "POST",
      body: fd,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || "Upload gagal");
    return json.data; // Cloudinary response
  };

  const handlePosterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      setIsUploading(true);
      const data: any = await uploadToServer(f);
      const url = data?.secure_url || data?.url;
      if (url) setFormData((prev: any) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      console.error(err);
      alert("Gagal mengupload poster");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const uploaded: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const d: any = await uploadToServer(files[i]);
        const url = d?.secure_url || d?.url;
        if (url) uploaded.push(url);
      }
      setFormData((prev: any) => ({
        ...prev,
        galleryUrls: [...(prev.galleryUrls || []), ...uploaded],
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal mengupload gallery images");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      title: formData.title,
      theme: formData.theme || null,
      description: formData.description || null,
      eventDate: formData.eventDate ? new Date(formData.eventDate) : null,
      imageUrl: formData.imageUrl || null,
      galleryUrls: formData.galleryUrls || [],
      year: Number(formData.year),
      participants: formData.participants
        ? Number(formData.participants)
        : null,
      winner: formData.winner || null,
      runnerUp: formData.runnerUp || null,
      thirdPlace: formData.thirdPlace || null,
      orderIndex: Number(formData.orderIndex) || 0,
    };

    onSubmit(payload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
      <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-2xl my-8 shadow-[12px_12px_0_0_#F5A623] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-festika-navy"
        >
          <X size={24} />
        </button>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-6">
          {mode === "add" ? "🏆 Tambah Past Event Baru" : "Edit Past Event"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "edit" && formData.galleryUrls && formData.galleryUrls.length > 0 && (
            <div className="mb-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => scrollGallery("left")}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-1 rounded-full shadow"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>

                <div
                  ref={galleryRef}
                  className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-2"
                >
                  {formData.galleryUrls.map((u: string) => (
                      <div
                        key={u}
                        className="snap-center flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] relative bg-gray-50 border border-gray-100 rounded overflow-hidden"
                      >
                        <img
                          src={u}
                          alt="gallery"
                          className="h-44 w-full object-contain rounded"
                        />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev: any) => ({
                            ...prev,
                            galleryUrls: prev.galleryUrls.filter(
                              (x: string) => x !== u,
                            ),
                          }))
                        }
                        className="absolute top-2 right-2 bg-white/90 p-1 rounded"
                        title="Hapus gambar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollGallery("right")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-1 rounded-full shadow"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-festika-navy">
              Judul*
            </label>
              <input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Nama acara"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
              />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-festika-navy">
                Tema
              </label>
              <input
                value={formData.theme}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, theme: e.target.value }))
                }
                placeholder="Tema acara"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-festika-navy">
                Tanggal Acara
              </label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    eventDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-festika-navy">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Deskripsi acara"
              className="w-full px-4 py-2 border-2 border-festika-navy outline-none h-28"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-festika-navy">
                Tahun*
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }))
                }
                placeholder="Masukkan tahun, contoh: 2024"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-festika-navy">
                Jumlah Peserta
              </label>
              <input
                type="number"
                value={formData.participants}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    participants: e.target.value,
                  }))
                }
                placeholder="0"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-bold text-festika-navy">
                🥇 Pemenang
              </label>
              <input
                value={formData.winner}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, winner: e.target.value }))
                }
                placeholder="Nama pemenang"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-festika-navy">
                🥈 Runner-up
              </label>
              <input
                value={formData.runnerUp}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, runnerUp: e.target.value }))
                }
                placeholder="Runner-up"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-festika-navy">
                🥉 Third Place
              </label>
              <input
                value={formData.thirdPlace}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    thirdPlace: e.target.value,
                  }))
                }
                placeholder="Third place"
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold text-festika-navy">
                Upload Poster
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="w-full mt-1"
              />
              {isUploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="poster"
                    className="h-28 object-cover border"
                  />
                </div>
              )}

              <label className="text-sm font-bold text-festika-navy mt-3 block">
                Or URL Poster
              </label>
              <input
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev: any) => ({ ...prev, imageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="w-full px-4 py-2 border-2 border-festika-navy outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-festika-navy">
                Upload Gallery
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="w-full mt-1"
              />
              {isUploading && (
                <p className="text-sm text-gray-500 mt-2">Uploading...</p>
              )}

              {mode !== "edit" && formData.galleryUrls && formData.galleryUrls.length > 0 && (
                <div className="mt-2 relative">
                  <button
                    type="button"
                    onClick={() => scrollGallery("left")}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-1 rounded-full shadow"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div
                    ref={galleryRef}
                    className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-2"
                  >
                    {formData.galleryUrls.map((u: string) => (
                      <div
                        key={u}
                        className="snap-center flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] relative"
                      >
                        <img
                          src={u}
                          alt="gallery"
                          className="h-44 w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev: any) => ({
                              ...prev,
                              galleryUrls: prev.galleryUrls.filter(
                                (x: string) => x !== u,
                              ),
                            }))
                          }
                          className="absolute top-2 right-2 bg-white/90 p-1 rounded"
                          title="Hapus gambar"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollGallery("right")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 p-1 rounded-full shadow"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">Upload images and they will appear in the gallery above. Swipe to preview — you'll see a peek of adjacent images.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623] disabled:opacity-50"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}{" "}
              {mode === "add" ? "Simpan" : "Perbarui"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeleteCompetitionModal (single — legacy, dipertahankan jika masih dipakai)
// ---------------------------------------------------------------------------
type DeleteModalProps = {
  competition: Competition | null;
  step: number;
  input: string;
  onInputChange: (val: string) => void;
  onNextStep: () => void;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export function DeleteCompetitionModal({
  competition,
  step,
  input,
  onInputChange,
  onNextStep,
  onConfirm,
  onClose,
  isLoading,
}: DeleteModalProps) {
  if (!competition) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border-4 border-festika-navy p-0 w-full max-w-md shadow-[12px_12px_0_0_#0F2A36]">
        <div className="bg-festika-navy p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-festika-orange" />
            <h2 className="font-bold">Konfirmasi Hapus</h2>
          </div>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {step === 1 ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Ketik nama lomba{" "}
                <strong className="text-festika-navy">
                  "{competition.title}"
                </strong>{" "}
                untuk konfirmasi.
              </p>
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder="Ketik nama lomba..."
                className="w-full px-4 py-3 border-2 border-gray-200 outline-none mb-4 font-bold focus:border-red-400 transition-colors"
              />
              <button
                disabled={input !== competition.title}
                onClick={onNextStep}
                className="w-full py-3 bg-festika-navy text-white font-bold disabled:opacity-30 transition-opacity"
              >
                Lanjut
              </button>
            </div>
          ) : (
            <div className="animate-in slide-in-from-right-4 duration-300 text-center">
              <div className="bg-red-50 border-2 border-red-100 p-4 mb-6">
                <p className="text-red-600 text-xs leading-relaxed font-bold">
                  PERINGATAN: Menghapus lomba akan menghapus SEMUA data
                  pendaftar terkait secara permanen!
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onInputChange("");
                    onNextStep();
                  }}
                  className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
                >
                  Batal (Reset)
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isLoading && <Loader2 size={16} className="animate-spin" />}{" "}
                  Ya, Hapus!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DeleteMultipleModal — Modal Konfirmasi Hapus Massal dengan Verifikasi Input
//
// Desain: 2 langkah (step)
//   Step 1: Tampilkan daftar item yang akan dihapus + dampak, user harus mengetik
//           teks verifikasi persis untuk melanjutkan.
//   Step 2: Konfirmasi akhir sebelum aksi tidak dapat dibatalkan.
//
// Prinsip:
//   - Fail-safe default: tombol hapus disabled hingga kondisi terpenuhi
//   - Least privilege: hanya berjalan setelah sesi aktif (divalidasi di backend)
//   - UX: teks verifikasi unik per aksi, bukan password statis
// ---------------------------------------------------------------------------
export type DeleteMultipleTarget = {
  id: string;
  label: string; // nama item yang ditampilkan di daftar
  subCount?: number; // jumlah data turunan (misal: pendaftar / anggota)
  subLabel?: string; // label turunannya (misal: "pendaftar", "anggota")
};

type DeleteMultipleModalProps = {
  isOpen: boolean;
  title: string; // Judul modal: "Hapus Lomba", "Hapus Divisi", dst.
  entityLabel: string; // Label untuk teks verifikasi, huruf kapital (misal: "LOMBA")
  targets: DeleteMultipleTarget[];
  cascadeWarning: string; // Deskripsi dampak penghapusan cascade
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
};

export function DeleteMultipleModal({
  isOpen,
  title,
  entityLabel,
  targets,
  cascadeWarning,
  onConfirm,
  onClose,
  isLoading,
}: DeleteMultipleModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [input, setInput] = useState("");

  if (!isOpen || targets.length === 0) return null;

  const count = targets.length;
  // Teks verifikasi unik berdasarkan jumlah dan jenis item — menghindari klik tidak sengaja
  const expectedInput = `HAPUS ${count} ${entityLabel}`;
  const isInputValid = input === expectedInput;
  const totalSubItems = targets.reduce((acc, t) => acc + (t.subCount ?? 0), 0);

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
      // Tidak bisa tutup dengan klik overlay — tindakan kritis harus eksplisit
    >
      <div className="bg-white border-4 border-festika-navy w-full max-w-lg shadow-[16px_16px_0_0_#0F2A36] animate-in zoom-in-95 duration-200">
        {/* ── Header ── */}
        <div className="bg-red-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <Trash2 size={18} />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] font-black text-lg">
                {title}
              </h2>
              <p className="text-red-200 text-xs">
                Tindakan ini tidak dapat dibatalkan
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-1 hover:bg-white/20 rounded-sm transition-colors disabled:opacity-50"
            title="Tutup"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* ── STEP 1: Review & Verifikasi ── */}
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300 space-y-5">
              {/* Daftar item yang akan dihapus */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {count} Item yang akan dihapus
                </p>
                <div className="border-2 border-gray-200 max-h-40 overflow-y-auto">
                  {targets.map((t, i) => (
                    <div
                      key={t.id}
                      className={`flex items-center justify-between px-4 py-2.5 text-sm ${i < targets.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <span className="font-bold text-festika-navy">
                        {t.label}
                      </span>
                      {t.subCount !== undefined && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 border border-gray-200">
                          {t.subCount} {t.subLabel ?? "item"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Peringatan cascade / dampak */}
              <div className="bg-amber-50 border-2 border-amber-300 p-4 flex gap-3">
                <AlertTriangle
                  className="text-amber-500 shrink-0 mt-0.5"
                  size={18}
                />
                <div className="space-y-1">
                  <p className="text-amber-800 font-black text-xs uppercase tracking-wide">
                    Dampak Penghapusan
                  </p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    {cascadeWarning}
                  </p>
                  {totalSubItems > 0 && (
                    <p className="text-amber-600 text-xs font-bold mt-1">
                      ⚠ Total {totalSubItems} data turunan akan ikut terhapus
                      secara permanen.
                    </p>
                  )}
                </div>
              </div>

              {/* Input verifikasi */}
              <div>
                <label className="block text-sm font-bold text-festika-navy mb-2">
                  Ketik{" "}
                  <span className="font-black text-red-600 tracking-wide font-mono bg-red-50 px-1 py-0.5 border border-red-200">
                    {expectedInput}
                  </span>{" "}
                  untuk melanjutkan:
                </label>
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={expectedInput}
                  className={`w-full px-4 py-3 border-2 font-mono text-sm outline-none transition-colors ${
                    input.length > 0
                      ? isInputValid
                        ? "border-green-400 bg-green-50"
                        : "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                {input.length > 0 && !isInputValid && (
                  <p className="text-red-500 text-xs mt-1 font-bold">
                    Teks verifikasi tidak cocok
                  </p>
                )}
                {isInputValid && (
                  <p className="text-green-600 text-xs mt-1 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} /> Verifikasi berhasil
                  </p>
                )}
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-3 border-2 border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={!isInputValid}
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Lanjut →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Konfirmasi Akhir ── */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300 space-y-5">
              <div className="text-center py-2">
                <div className="w-16 h-16 bg-red-100 border-4 border-red-300 mx-auto flex items-center justify-center mb-4">
                  <AlertTriangle className="text-red-600" size={32} />
                </div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-black text-festika-navy">
                  Anda Yakin?
                </p>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                  Anda akan menghapus{" "}
                  <strong className="text-red-600">
                    {count} {entityLabel.toLowerCase()}
                  </strong>
                  . Data yang sudah dihapus{" "}
                  <strong>tidak bisa dikembalikan</strong>.
                </p>
              </div>

              <div className="bg-festika-navy/5 border-2 border-festika-navy/20 p-3 text-center">
                <p className="text-festika-navy/70 text-xs font-bold">
                  Ini adalah langkah terakhir. Pastikan Anda sudah yakin.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isLoading}
                  className="flex-1 py-3 border-2 border-festika-navy font-bold text-festika-navy hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="flex-1 py-3 bg-red-600 text-white font-black hover:bg-red-700 flex items-center justify-center gap-2 transition-colors border-2 border-red-700 shadow-[4px_4px_0_0_#7f1d1d] disabled:opacity-50 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />{" "}
                      Menghapus...
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} /> Hapus Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
