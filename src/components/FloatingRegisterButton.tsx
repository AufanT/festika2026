"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function FloatingRegisterButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const card = document.getElementById("registration-card");
    if (!card) return;

    const onScroll = () => {
      const rect = card.getBoundingClientRect();
      setIsVisible(rect.top < 0 || rect.bottom > window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const el = document.getElementById("registration-card");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 sm:px-6 py-3 bg-festika-orange text-white font-black uppercase tracking-widest text-sm border-2 border-white shadow-[6px_6px_0_0_#0F2A36] transition-all duration-300 ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      Daftar
      <ArrowDown size={18} />
    </button>
  );
}
