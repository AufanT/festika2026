"use client";
import NavigationLoader from "@/components/NavigationLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationLoader />
      {children}
    </>
  );
}
