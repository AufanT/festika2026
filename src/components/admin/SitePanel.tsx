"use client";

import { useState, useEffect } from "react";
import SponsorPanel from "./SponsorPanel";
import FaqPanel from "./faq/FaqPanel";
import SettingsPanel from "./SettingsPanel";

const subTabs = [
  { id: "sponsors", label: "Sponsor" },
  { id: "faq", label: "FAQ" },
  { id: "settings", label: "Guidebook" },
] as const;

function getTabFromUrl(): string {
  if (typeof window === "undefined") return "sponsors";
  const params = new URLSearchParams(window.location.search);
  return params.get("tab") || "sponsors";
}

export default function SitePanel() {
  const [activeSub, setActiveSub] = useState(getTabFromUrl);

  useEffect(() => {
    setActiveSub(getTabFromUrl());
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveSub(tab);
    const url = new URL(window.location.href);
    if (tab === "sponsors") url.searchParams.delete("tab");
    else url.searchParams.set("tab", tab);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-5 py-3 font-bold text-sm transition-all border-b-4 shrink-0 whitespace-nowrap ${
              activeSub === tab.id
                ? "border-festika-orange text-festika-navy"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeSub === "sponsors" && <SponsorPanel />}
      {activeSub === "faq" && <FaqPanel />}
      {activeSub === "settings" && <SettingsPanel />}
    </div>
  );
}
