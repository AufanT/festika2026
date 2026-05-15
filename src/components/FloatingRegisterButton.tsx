"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function FloatingRegisterButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const card = document.getElementById("registration-card");
    if (!card) return;

    const onScroll = () => {
      if (window.scrollY > 500) {
        const rect = card.getBoundingClientRect();
        setIsVisible(rect.top > 100);
      } else {
        setIsVisible(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    document
      .getElementById("registration-card")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 bg-festika-orange text-white font-black uppercase tracking-widest text-sm border-2 border-white shadow-[6px_6px_0_0_#0F2A36] transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      Daftar (Ada di Bawah)
      <ArrowDown size={18} />
    </button>
  );
}
