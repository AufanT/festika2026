"use client";

import { X, CheckCircle2, AlertCircle, Info, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

export type NotificationType = "success" | "error" | "info" | "confirm";

interface NotificationProps {
  isOpen: boolean;
  type: NotificationType;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Notification({
  isOpen,
  type,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Oke",
  cancelText = "Batal",
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  const config = {
    success: {
      bg: "bg-green-50",
      border: "border-green-600",
      icon: <CheckCircle2 className="text-green-600" size={32} />,
      btn: "bg-green-600",
      shadow: "shadow-[6px_6px_0_0_#166534]",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-600",
      icon: <AlertCircle className="text-red-600" size={32} />,
      btn: "bg-red-600",
      shadow: "shadow-[6px_6px_0_0_#991b1b]",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-festika-navy",
      icon: <Info className="text-festika-navy" size={32} />,
      btn: "bg-festika-navy",
      shadow: "shadow-[6px_6px_0_0_#0F2A36]",
    },
    confirm: {
      bg: "bg-white",
      border: "border-festika-navy",
      icon: <HelpCircle className="text-festika-orange" size={32} />,
      btn: "bg-festika-orange",
      shadow: "shadow-[6px_6px_0_0_#0F2A36]",
    },
  }[type];

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-full max-w-sm ${config.bg} border-4 ${config.border} ${
          config.shadow
        } p-0 transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className={`p-4 border-b-2 ${config.border} flex justify-between items-center bg-white/50`}>
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-festika-navy tracking-tight uppercase">
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-festika-navy/40 hover:text-red-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">{config.icon}</div>
          <p className="text-festika-navy font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="p-4 flex gap-3">
          {type === "confirm" ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-3 border-2 border-festika-navy text-festika-navy font-bold hover:bg-gray-100 transition-all"
              >
                {cancelText}
              </button>
              <button
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
                className={`flex-1 py-3 ${config.btn} text-white font-bold border-2 border-festika-navy hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className={`w-full py-3 ${config.btn} text-white font-bold border-2 border-festika-navy hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
