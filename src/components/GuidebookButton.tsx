"use client";

import { Button } from "@/components/ui/button";
import { downloadFile } from "@/lib/utils";

/**
 * Props interface for the Guidebook button component
 */
interface GuidebookButtonProps {
  /**
   * Path to the guidebook file in the public directory
   * @default "/Guidebook FESTIKA - 2.pdf"
   */
  filePath?: string;
  
  /**
   * Label text to display on the button (max 50 characters)
   * @default "Guidebook"
   */
  label?: string;
  
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
}

/**
 * Guidebook download button component with configurable file path and label.
 * Implements label truncation for labels exceeding 50 characters.
 * 
 * @example
 * // Default usage
 * <GuidebookButton />
 * 
 * @example
 * // Custom file path and label
 * <GuidebookButton 
 *   filePath="/Guidebook FESTIKA - 3.pdf" 
 *   label="Download Festival Guide" 
 * />
 */
export default function GuidebookButton({
  filePath = "/Guidebook FESTIKA - 2.pdf",
  label = "Guidebook",
  className = "",
}: GuidebookButtonProps) {
  // Implement label truncation logic: max 50 chars, truncate to 47 + "..."
  const truncatedLabel = label.length > 50 
    ? label.substring(0, 47) + "..." 
    : label;

  const handleClick = () => {
    try {
      downloadFile(filePath);
    } catch {
      // Error is already logged by downloadFile function
      // Button remains clickable for retry
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      try {
        downloadFile(filePath);
      } catch {
        // Error is already logged by downloadFile function
        // Button remains clickable for retry
      }
    }
  };

  return (
    <Button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label="Download Festika Guidebook PDF"
      variant="outline"
      tabIndex={0}
      className={`bg-white border-2 border-festika-navy text-festika-navy hover:bg-gray-50 hover:text-festika-navy rounded-none px-8 h-12 text-base font-bold shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-festika-orange/60 focus-visible:ring-offset-2 ${className}`}
    >
      {truncatedLabel}
    </Button>
  );
}
