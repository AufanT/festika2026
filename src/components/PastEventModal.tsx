"use client";

import { useState } from "react";
import { X, Trophy, Users, Calendar } from "lucide-react";
import Carousel from "@/components/ui/carousel";

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
  registrationStartDate?: Date | string | null;
  registrationEndDate?: Date | string | null;
}

interface PastEventModalProps {
  event: PastEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PastEventModal({
  event,
  isOpen,
  onClose,
}: PastEventModalProps) {
  if (!isOpen || !event) return null;

  const galleryImages =
    event.galleryUrls && event.galleryUrls.length > 0 ? event.galleryUrls : [];
  const images = [...(event.imageUrl ? [event.imageUrl] : []), ...galleryImages];
  const hasGallery = galleryImages.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-none max-w-2xl w-full my-8 shadow-2xl border-4 border-festika-teal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-100">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-extrabold text-festika-navy uppercase tracking-tight">
            {event.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-festika-navy" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Year & Theme */}
          <div className="mb-6 pb-6 border-b border-gray-100">
            <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-2">
              FESTIKA {event.year}
            </p>
            {event.theme && (
              <p className="text-festika-orange text-sm font-black uppercase tracking-wider italic mb-3">
                Tema: "{event.theme}"
              </p>
            )}
          </div>

          {/* Top Carousel (poster + gallery) */}
          {images.length > 0 && (
            <div className="mb-6">
              <Carousel
                images={images}
                autoPlay={true}
                interval={3500}
                heightClass="h-96"
                objectFit="contain"
              />
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-festika-teal" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                  Peserta
                </span>
              </div>
              <p className="text-2xl font-black text-festika-navy">
                {event.participants ? event.participants.toLocaleString() : "—"}
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-festika-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                  Tahun Acara
                </span>
              </div>
              <p className="text-2xl font-black text-festika-navy">
                {event.year}
              </p>
            </div>
          </div>

          {/* Winners Section */}
          {(event.winner || event.runnerUp || event.thirdPlace) && (
            <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-4 border-festika-orange/30 p-6">
              <h3 className="text-[10px] font-black text-festika-navy uppercase tracking-widest mb-6 flex items-center gap-2">
                <Trophy size={16} className="text-festika-orange" />
                Pemenang Acara
              </h3>
              <div className="space-y-4">
                {event.winner && (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 text-white font-black text-lg flex-shrink-0 border-2 border-yellow-500">
                      🥇
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">
                        Juara 1
                      </p>
                      <p className="text-lg font-bold text-festika-navy">
                        {event.winner}
                      </p>
                    </div>
                  </div>
                )}
                {event.runnerUp && (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-400 text-white font-black text-lg flex-shrink-0 border-2 border-gray-500">
                      🥈
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">
                        Juara 2
                      </p>
                      <p className="text-lg font-bold text-festika-navy">
                        {event.runnerUp}
                      </p>
                    </div>
                  </div>
                )}
                {event.thirdPlace && (
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-orange-400 text-white font-black text-lg flex-shrink-0 border-2 border-orange-500">
                      🥉
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-1">
                        Juara 3
                      </p>
                      <p className="text-lg font-bold text-festika-navy">
                        {event.thirdPlace}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="text-[10px] font-black text-festika-navy uppercase tracking-widest mb-3">
                Deskripsi
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap font-medium text-sm">
                {event.description}
              </p>
            </div>
          )}

          {/* Date Range */}
          {(event.registrationStartDate || event.registrationEndDate) && (
            <div className="bg-gray-50 border-2 border-gray-200 p-4">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">
                📅 Periode Acara
              </p>
              <p className="text-sm text-gray-700 font-medium">
                {event.registrationStartDate &&
                  new Date(event.registrationStartDate).toLocaleDateString(
                    "id-ID",
                  )}{" "}
                -{" "}
                {event.registrationEndDate &&
                  new Date(event.registrationEndDate).toLocaleDateString(
                    "id-ID",
                  )}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-100 p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-festika-navy text-white font-black uppercase tracking-wider text-sm hover:bg-festika-navy/90 transition-colors border-2 border-festika-navy"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
