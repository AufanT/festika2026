"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavigationLoader() {
  const pathname = usePathname();
  const [currentPathname, setCurrentPathname] = useState(pathname);
  const [transitioning, setTransitioning] = useState(false);

  if (currentPathname !== pathname) {
    setCurrentPathname(pathname);
    setTransitioning(true);
  }

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => setTransitioning(false), 900);
    return () => clearTimeout(timer);
  }, [transitioning]);

  if (!transitioning) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)" }}
    >
      <div className="animate-fade-pulse flex items-center">
        <span className="font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-extrabold tracking-tighter text-festika-peach">
          FEST
        </span>
        <span className="bg-festika-peach text-festika-teal px-3 md:px-4 py-1 ml-2 md:ml-3 font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-extrabold tracking-tighter inline-flex items-center justify-center">
          IKA
        </span>
      </div>
    </div>
  );
}
