import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FESTIKA UA 2026",
    short_name: "FESTIKA 2026",
    description: "IT Festival Universitas Andalas 2026",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#F5A623",
    icons: [
      { src: "/icon.png", sizes: "any", type: "image/png" },
    ],
  };
}
