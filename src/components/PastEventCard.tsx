"use client";

import { Trophy, Users, Sparkles } from "lucide-react";

interface PastEvent {
  id: string;
  title: string;
  theme?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  year: number;
  participants?: number | null;
  winner?: string | null;
  runnerUp?: string | null;
  thirdPlace?: string | null;
  galleryUrls?: string[];
}

interface PastEventCardProps {
  event: PastEvent;
  onDetailsClick: (event: PastEvent) => void;
}

export default function PastEventCard({
  event,
  onDetailsClick,
}: PastEventCardProps) {
  return (
    <div
      onClick={() => onDetailsClick(event)}
      className="border-2 border-gray-100 rounded-none p-6 flex flex-col group hover:border-festika-teal hover:shadow-[12px_12px_0_0_#17A99E] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/80 hover:bg-white"
    >
      {/* Corner Accent - Top Right */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-festika-orange flex items-center justify-center">
        <Sparkles size={14} className="text-white opacity-70" />
      </div>

      {/* Image Container */}
      {event.imageUrl && (
        <div className="mb-5 w-full h-48 overflow-hidden border-2 border-festika-navy grayscale group-hover:grayscale-0 transition-all duration-300">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}

      {/* Icon (if no image) */}
      {!event.imageUrl && (
        <div className="w-16 h-16 border-2 border-festika-teal bg-festika-teal/5 flex items-center justify-center text-festika-teal mb-5 group-hover:bg-festika-teal group-hover:text-white transition-colors">
          <Trophy size={32} />
        </div>
      )}

      {/* Title & Year */}
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg lg:text-xl font-extrabold text-festika-navy uppercase tracking-tight group-hover:text-festika-teal transition-colors mb-1">
        {event.title}
      </h3>
      <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-3">
        FESTIKA {event.year}
      </p>

      {/* Theme */}
      {event.theme && (
        <p className="text-festika-orange text-[10px] font-black uppercase tracking-widest mb-4 italic">
          Tema: "{event.theme}"
        </p>
      )}

      {/* Stats Row */}
      <div className="flex gap-4 mb-5 text-sm">
        {event.participants && (
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={16} className="text-festika-teal" />
            <span className="font-semibold">
              {event.participants.toLocaleString()} Peserta
            </span>
          </div>
        )}
      </div>

      {/* Winners Section */}
      {(event.winner || event.runnerUp || event.thirdPlace) && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-festika-orange/20 p-4 mb-5 rounded-none">
          <p className="text-[10px] font-black text-festika-navy uppercase tracking-widest mb-3">
            🏆 Pemenang
          </p>
          <div className="space-y-2 text-sm">
            {event.winner && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-400 text-white font-black text-[10px]">
                  1
                </span>
                <span className="font-semibold text-gray-700">
                  {event.winner}
                </span>
              </div>
            )}
            {event.runnerUp && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-400 text-white font-black text-[10px]">
                  2
                </span>
                <span className="font-medium text-gray-600">
                  {event.runnerUp}
                </span>
              </div>
            )}
            {event.thirdPlace && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-400 text-white font-black text-[10px]">
                  3
                </span>
                <span className="font-medium text-gray-600">
                  {event.thirdPlace}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description (if exists) */}
      {event.description && (
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 font-medium mb-5">
          {event.description}
        </p>
      )}

      {/* View Details Button */}
      <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-festika-navy group-hover:text-festika-orange transition-colors cursor-pointer">
          Lihat Detail
        </span>
        <div className="w-6 h-6 bg-festika-navy flex items-center justify-center group-hover:bg-festika-orange transition-colors">
          <span className="text-white text-[10px] font-black">→</span>
        </div>
      </div>
    </div>
  );
}
