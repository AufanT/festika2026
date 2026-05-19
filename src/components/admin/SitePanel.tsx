"use client";

import { useState } from "react";
import SponsorPanel from "./SponsorPanel";
import FaqPanel from "./faq/FaqPanel";
import SettingsPanel from "./SettingsPanel";

const subTabs = [
  { id: "sponsors", label: "Sponsor" },
  { id: "faq", label: "FAQ" },
  { id: "settings", label: "Guidebook" },
] as const;

export default function SitePanel() {
  const [activeSub, setActiveSub] = useState<string>("sponsors");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSub(tab.id)}
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
