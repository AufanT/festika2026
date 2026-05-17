"use client";

import { useState, useEffect, useCallback } from "react";
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown, X } from "lucide-react";
import { Faq } from "@/types/admin";

export default function FaqPanel() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchFaqs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/faqs");
      const json = await res.json();
      setFaqs(json.data || []);
    } catch {
      /* ignore */
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: Faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) return;
    setSaving(true);
    try {
      const url = editingFaq
        ? `/api/faqs?id=${editingFaq.id}`
        : "/api/faqs";
      const method = editingFaq ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchFaqs();
      }
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    try {
      await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      fetchFaqs();
    } catch {
      /* ignore */
    } finally {
      setDeleteId(null);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= faqs.length) return;

    const items = [...faqs];
    const temp = items[index].orderIndex;
    items[index].orderIndex = items[newIndex].orderIndex;
    items[newIndex].orderIndex = temp;

    setFaqs(items);

    await Promise.all([
      fetch(`/api/faqs?id=${items[index].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIndex: items[index].orderIndex }),
      }),
      fetch(`/api/faqs?id=${items[newIndex].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderIndex: items[newIndex].orderIndex }),
      }),
    ]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-festika-navy" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black text-festika-navy uppercase">
          Manajemen FAQ
        </h2>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-festika-navy text-white px-4 py-2 font-bold hover:bg-festika-navy/90 transition-colors shadow-[4px_4px_0_0_#F5A623]"
        >
          <Plus size={18} /> Tambah FAQ
        </button>
      </div>

      {faqs.length === 0 && (
        <p className="text-gray-400 text-center py-10 font-bold">
          Belum ada FAQ. Klik &quot;Tambah FAQ&quot; untuk mulai.
        </p>
      )}

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq.id}
            className="bg-white border-2 border-festika-navy p-4 flex items-start gap-4"
          >
            <div className="flex flex-col gap-1 pt-1">
              <button
                onClick={() => handleMove(index, "up")}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-festika-navy disabled:opacity-30"
              >
                <ArrowUp size={16} />
              </button>
              <button
                onClick={() => handleMove(index, "down")}
                disabled={index === faqs.length - 1}
                className="p-1 text-gray-400 hover:text-festika-navy disabled:opacity-30"
              >
                <ArrowDown size={16} />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-festika-navy text-sm truncate">
                {faq.question}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                {faq.answer}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleOpenEdit(faq)}
                className="p-2 text-gray-400 hover:text-festika-teal transition-colors"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(faq.id)}
                disabled={deleteId === faq.id}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
              >
                {deleteId === faq.id ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto py-8">
          <div className="bg-white border-4 border-festika-navy p-6 w-full max-w-lg my-8 shadow-[12px_12px_0_0_#F5A623] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-festika-navy"
            >
              <X size={24} />
            </button>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-6">
              {editingFaq ? "Edit FAQ" : "Tambah FAQ"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-festika-navy">
                  Pertanyaan*
                </label>
                <input
                  value={formData.question}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="Tulis pertanyaan..."
                  className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-festika-navy">
                  Jawaban*
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, answer: e.target.value }))
                  }
                  placeholder="Tulis jawaban..."
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-festika-navy outline-none focus:border-festika-orange"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 border-2 border-gray-200 font-bold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !formData.question.trim() || !formData.answer.trim()}
                  className="flex-1 py-3 bg-festika-navy text-white font-bold hover:bg-festika-navy/90 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0_0_#F5A623] disabled:opacity-50"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}{" "}
                  {editingFaq ? "Perbarui" : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
