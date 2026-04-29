"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type CarouselProps = {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  className?: string;
  heightClass?: string;
  objectFit?: "cover" | "contain";
};

export default function Carousel({
  images,
  autoPlay = true,
  interval = 3500,
  showControls = true,
  className = "",
  heightClass = "h-64",
  objectFit = "cover",
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = setInterval(() => {
      if (!isPaused) setCurrent((p) => (p + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, images.length, interval, isPaused]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const child = c.children[current] as HTMLElement | undefined;
    if (!child) return;
    // center the child inside container
    const offset = child.offsetLeft - (c.clientWidth - child.clientWidth) / 2;
    c.scrollTo({ left: offset, behavior: "smooth" });
  }, [current, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i === null ? null : i === 0 ? images.length - 1 : i - 1,
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i === null ? null : i === images.length - 1 ? 0 : i + 1,
        );
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, images.length]);

  const goPrev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  const goNext = () => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));

  if (!images || images.length === 0) return null;

  const objectFitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <>
      <div className={`relative ${className}`}>
        {showControls && images.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setIsPaused(true);
              goPrev();
              setTimeout(() => setIsPaused(false), 3000);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-1 rounded-full shadow hover:bg-white transition-colors"
            aria-label="Previous"
          >
            ‹
          </button>
        )}

        <div
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 py-2 no-scrollbar`}
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              className={`snap-center flex-shrink-0 w-[80%] relative bg-gray-100/50 rounded overflow-hidden shadow-sm ${heightClass}`}
            >
              <img
                src={src}
                alt={`carousel-${i}`}
                className={`w-full h-full ${objectFitClass} cursor-zoom-in transition-all duration-300`}
                draggable={false}
                onClick={() => setLightboxIndex(i)}
              />
            </div>
          ))}
        </div>

        {showControls && images.length > 1 && (
          <button
            type="button"
            onClick={() => {
              setIsPaused(true);
              goNext();
              setTimeout(() => setIsPaused(false), 3000);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 p-1 rounded-full shadow hover:bg-white transition-colors"
            aria-label="Next"
          >
            ›
          </button>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button - Top Right */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-white/50 hover:text-white transition-all p-2 bg-white/5 hover:bg-white/10 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close preview"
          >
            <X size={28} />
          </button>

          {/* Navigation - Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white transition-all p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-full group"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : i === 0 ? images.length - 1 : i - 1,
                );
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          )}

          {/* Main Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              className="max-w-full max-h-full object-contain shadow-2xl animate-in zoom-in-95 duration-300 select-none"
              alt={`preview-${lightboxIndex}`}
              draggable={false}
            />
          </div>

          {/* Navigation - Next */}
          {images.length > 1 && (
            <button
              className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[110] text-white/50 hover:text-white transition-all p-3 md:p-4 bg-white/5 hover:bg-white/10 rounded-full group"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((i) =>
                  i === null ? null : i === images.length - 1 ? 0 : i + 1,
                );
              }}
              aria-label="Next"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Counter/Index */}
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-sm font-bold tracking-widest uppercase bg-white/5 px-4 py-1 rounded-full">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}

    </>
  );
}

