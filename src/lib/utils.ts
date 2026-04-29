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
