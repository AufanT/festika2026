"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import Notification, { NotificationType } from "@/components/admin/Notification";

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message: string, onConfirm?: () => void) => void;
  closeNotification: () => void;
}

const AUTOCLOSE_DURATION = 5000;

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notif, setNotif] = useState<{
    isOpen: boolean;
    type: NotificationType;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const closeNotification = useCallback(() => {
    setNotif((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const showNotification = (type: NotificationType, title: string, message: string, onConfirm?: () => void) => {
    setNotif({ isOpen: true, type, title, message, onConfirm });
  };

  // Auto-dismiss success/error/info after AUTOCLOSE_DURATION
  useEffect(() => {
    if (!notif.isOpen || notif.type === "confirm") return;
    const timer = setTimeout(closeNotification, AUTOCLOSE_DURATION);
    return () => clearTimeout(timer);
  }, [notif.isOpen, notif.type, closeNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}
      <Notification
        isOpen={notif.isOpen}
        type={notif.type}
        title={notif.title}
        message={notif.message}
        onConfirm={notif.onConfirm}
        onClose={closeNotification}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
