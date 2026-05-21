"use client";

import { useState } from "react";
import { Calendar, Link as LinkIcon, Check, BookOpen } from "lucide-react";
import Reveal from "@/components/Reveal";
import GuidebookButton from "@/components/GuidebookButton";

interface RegistrationCardProps {
  registrationLink: string;
  startDate: string | null;
  endDate: string | null;
  delay?: number;
  guidebookFile?: string;
}

export default function RegistrationCard({
  registrationLink,
  startDate,
  endDate,
  delay = 0,
  guidebookFile,
}: RegistrationCardProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <Reveal delay={delay}>
      <div
        id="registration-card"
        className="bg-festika-navy p-8 text-white border-4 border-festika-navy shadow-[8px_8px_0_0_#14B8A6]"
      >
        <h4 className="font-black uppercase tracking-widest text-xs text-festika-orange mb-6 font-[family-name:var(--font-space-grotesk)]">
          Pendaftaran
        </h4>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <Calendar className="text-festika-orange shrink-0" size={24} />
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Periode
              </p>
              <p className="font-bold text-sm">
                {startDate || "?"} — {endDate || "Selesai"}
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <div className="relative shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="peer sr-only"
            />
            <div
              className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                isConfirmed
                  ? "bg-festika-orange border-festika-orange"
                  : "bg-white/10 border-white/30 group-hover:border-white/60"
              }`}
            >
              {isConfirmed && <Check size={14} className="text-white" />}
            </div>
          </div>
          <span className="text-xs font-bold text-gray-300 leading-relaxed group-hover:text-white transition-colors">
            Saya sudah membaca <strong>guidebook</strong> dan memahami lomba yang
            akan diikuti
          </span>
        </label>

        {/* Guidebook */}
        <div className="mb-6">
          <GuidebookButton
            filePath={guidebookFile}
            className="w-full !bg-white/10 !border-white/30 !text-white hover:!bg-white/20 hover:!border-white/60 !shadow-none !px-4 !py-3 !text-xs !tracking-wider justify-center"
          />
        </div>

        <a
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block transition-opacity ${
            !isConfirmed ? "pointer-events-none" : ""
          }`}
        >
          <button
            disabled={!isConfirmed}
            className={`w-full px-6 py-4 font-black uppercase tracking-widest text-sm border-2 border-white transition-all flex items-center justify-center gap-3 ${
              isConfirmed
                ? "bg-festika-orange hover:bg-white hover:text-festika-navy text-white cursor-pointer"
                : "bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed"
            }`}
          >
            Daftar Sekarang
            <LinkIcon size={18} />
          </button>
        </a>
        <p className="text-[10px] text-center text-gray-400 mt-4 font-medium italic">
          *Anda akan diarahkan ke Google Form eksternal
        </p>
      </div>
    </Reveal>
  );
}
