"use client";

interface GuidebookButtonProps {
  filePath?: string;
  label?: string;
  className?: string;
}

export default function GuidebookButton({
  filePath,
  label = "Guidebook",
  className = "",
}: GuidebookButtonProps) {
  const truncatedLabel = label.length > 50
    ? label.substring(0, 47) + "..."
    : label;

  return (
    <a
      href={filePath || "/api/guidebook/download"}
      download={filePath ? undefined : "Guidebook FESTIKA 2026.pdf"}
      aria-label="Download Festika Guidebook PDF"
      className={`inline-flex items-center justify-center bg-white border-2 border-festika-navy text-festika-navy hover:bg-gray-50 hover:text-festika-navy rounded-none px-8 h-12 text-base font-bold shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-festika-orange/60 focus-visible:ring-offset-2 ${className}`}
    >
      {truncatedLabel}
    </a>
  );
}
