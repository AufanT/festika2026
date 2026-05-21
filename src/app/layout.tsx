import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import JsonLd from "@/components/JsonLd";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://festika2026.ifportofolio.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FESTIKA UA 2026 — IT Festival",
    template: "%s — FESTIKA UA 2026",
  },
  description:
    "Unleashing Innovation through Digital Creativity. Festival Teknologi Informasi terbesar di Universitas — kompetisi UI/UX Design, Competitive Programming, dan Web Development.",
  keywords: ["festika", "IT festival", "2026", "kompetisi", "teknologi"],
  openGraph: {
    siteName: "FESTIKA UA 2026",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "FESTIKA UA 2026",
            url: baseUrl,
            description:
              "Festival Teknologi Informasi terbesar di Universitas Andalas.",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "FESTIKA UA 2026",
            url: baseUrl,
            logo: `${baseUrl}/icon.png`,
            sameAs: [
              "https://www.instagram.com/festika_ua/",
              "https://www.tiktok.com/@festikaua",
            ],
          }}
        />
      </body>
    </html>
  );
}
