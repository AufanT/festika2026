"use client";

/**
 * GuidebookCalloutCard
 * ──────────────────────────────────────────────────────────────────────────────
 * Eye-catching card yang mengarahkan peserta untuk membaca guidebook.
 * Ditempatkan di sidebar detail lomba, tepat di atas Contact Person.
 *
 * Extensibility:
 *   - `title`   : override judul card
 *   - `message` : override teks deskripsi
 *   - `label`   : override label tombol guidebook
 *   - `filePath`: override path file guidebook
 */

import GuidebookButton from "@/components/GuidebookButton";
import { BookOpen, Sparkles } from "lucide-react";

interface GuidebookCalloutCardProps {
  title?: string;
  message?: string;
  label?: string;
  filePath?: string;
}

export default function GuidebookCalloutCard({
  title = "Info Lebih Lengkap",
  message = "Temukan semua detail teknis, aturan, timeline, dan prize di Guidebook resmi FESTIKA 2026.",
  label = "Download Guidebook",
  filePath = "/Guidebook FESTIKA - 2.pdf",
}: GuidebookCalloutCardProps) {
  return (
    <div className="relative overflow-hidden border-[3px] border-festika-navy shadow-[8px_8px_0_0_#0F2A36] bg-gradient-to-br from-festika-teal to-[#0d7a6f]">
      {/* ── Background decorative dots ── */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* ── Orange accent strip (top) ── */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-festika-orange" />

      {/* ── Glow blob ── */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-festika-orange/20 blur-xl pointer-events-none" />

      <div className="relative z-10 p-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-festika-orange px-3 py-1 mb-4 border-2 border-festika-navy shadow-[2px_2px_0_0_#0F2A36]">
          <Sparkles size={11} className="text-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            Guidebook Resmi
          </span>
        </div>

        {/* Icon + Title */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-white/15 border-2 border-white/30 flex items-center justify-center flex-shrink-0">
            <BookOpen size={20} className="text-white" />
          </div>
          <h4 className="font-[family-name:var(--font-space-grotesk)] font-extrabold text-white text-lg leading-tight">
            {title}
          </h4>
        </div>

        {/* Message */}
        <p className="text-white/80 text-xs font-semibold leading-relaxed mb-5">
          {message}
        </p>

        {/* Divider */}
        <div className="w-full h-[1.5px] bg-white/20 mb-5" />

        {/* CTA Button — pakai GuidebookButton yg sudah ada, di-override style via className */}
        <GuidebookButton
          filePath={filePath}
          label={label}
          className="w-full !bg-festika-orange !border-white !text-white !shadow-[3px_3px_0_0_rgba(255,255,255,0.5)] hover:!bg-white hover:!text-festika-navy hover:!shadow-none !h-11 !text-xs !tracking-widest justify-center"
        />
      </div>
    </div>
  );
}
