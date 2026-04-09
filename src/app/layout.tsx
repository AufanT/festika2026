import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FESTIKA UA 2026 — IT Festival",
  description:
    "Unleashing Innovation through Digital Creativity. Festival Teknologi Informasi terbesar di Universitas — kompetisi UI/UX Design, Competitive Programming, dan Web Development.",
  keywords: ["festika", "IT festival", "2026", "kompetisi", "teknologi"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
