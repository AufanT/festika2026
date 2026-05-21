"use client";

import { useEffect, useState } from "react";

export default function CursorYou() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  return (
    <div
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{
        left: pos.x + 16,
        top: pos.y - 10,
        opacity: visible ? 1 : 0,
        transition: "left 0.15s ease-out, top 0.15s ease-out, opacity 0.3s",
      }}
    >
      <span className="bg-festika-teal text-white text-[10px] font-black px-2 py-0.5 border-2 border-festika-navy shadow-[2px_2px_0_0_#0F2A36] uppercase tracking-[0.15em] whitespace-nowrap">
        you
      </span>
    </div>
  );
}
