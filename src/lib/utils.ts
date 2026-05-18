import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number for WhatsApp wa.me links.
 * Handles Indonesian numbers by converting leading '0' or '8' to '62'.
 */
export function formatWhatsAppLink(phone: string, message?: string) {
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, "");

  // Handle common Indonesian formats
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (cleaned.startsWith("8")) {
    cleaned = "62" + cleaned;
  }
  
  // If it's empty after cleaning, return a fallback or empty
  if (!cleaned) return "#";

  const baseUrl = `https://wa.me/${cleaned}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

/**
 * Downloads a file from the specified path using browser-native download mechanism.
 * 
 * @param filePath - Root-relative or absolute path to the file (e.g., "/Guidebook FESTIKA - 2.pdf")
 * @param filename - Optional custom filename for the downloaded file. If not provided, extracts from filePath
 * @throws {TypeError} If filePath is null, undefined, empty, or contains only whitespace
 * @example
 * downloadFile("/Guidebook FESTIKA - 2.pdf");
 * downloadFile("/docs/guide.pdf", "Festival-Guide-2026.pdf");
 */
export function downloadFile(filePath: string, filename?: string): void {
  // Validate file path - reject null, undefined, empty, or whitespace-only
  if (filePath == null || typeof filePath !== 'string' || filePath.trim().length === 0) {
    const errorMessage = "File path is required and cannot be empty";
    console.error(`[Guidebook Download] Error: ${errorMessage}`);
    throw new TypeError(errorMessage);
  }

  // For absolute URLs (http/https), use directly; for relative paths, ensure root-relative
  let normalizedPath = filePath.trim();
  const isAbsolute = /^https?:\/\//i.test(normalizedPath);
  if (!isAbsolute && !normalizedPath.startsWith("/")) {
    normalizedPath = "/" + normalizedPath;
  }

  // Extract filename from path if not provided (substring after last "/")
  const extractedFilename = filename || normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);

  // Skip validation checks for absolute URLs (Cloudinary paths have colons, slashes, etc.)
  if (!isAbsolute) {
    const safeCharPattern = /^[a-zA-Z0-9._/\- ]+$/;
    if (!safeCharPattern.test(normalizedPath)) {
      console.warn(`[Guidebook Download] Warning: File path contains potentially unsafe characters: ${normalizedPath}`);
    }
    const standardFilenamePattern = /^Guidebook FESTIKA - \d+\.pdf$/;
    if (!standardFilenamePattern.test(extractedFilename)) {
      console.warn(`[Guidebook Download] Warning: Non-standard filename format: ${extractedFilename}`);
    }
  }

  try {
    if (isAbsolute) {
      // For cross-origin URLs (Cloudinary), open in new tab
      // The browser's PDF viewer will display it, user can save from there
      window.open(normalizedPath, "_blank", "noopener,noreferrer");
      return;
    }

    // Create temporary anchor element with href and download attributes for same-origin files
    const anchor = document.createElement("a");
    anchor.href = normalizedPath;
    anchor.download = extractedFilename;
    
    // Append to body (required for Firefox)
    document.body.appendChild(anchor);
    
    // Programmatically trigger click event on anchor
    anchor.click();
    
    // Remove anchor element from DOM after 100ms
    setTimeout(() => {
      document.body.removeChild(anchor);
    }, 100);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[Guidebook Download] Error: ${errorMessage}`, {
      filePath: normalizedPath,
      timestamp: new Date().toISOString(),
      error
    });
    throw error;
  }
}
