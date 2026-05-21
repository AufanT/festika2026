import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const alt = "FESTIKA UA 2026 — IT Festival";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
          }}
        >
          <span style={{ fontSize: 100, fontWeight: 900, color: "#FFFFFF" }}>FEST</span>
          <span
            style={{
              fontSize: 100,
              fontWeight: 900,
              color: "#F5A623",
              background: "#FFFFFF",
              padding: "0 16px",
            }}
          >
            IKA
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: "#FDE8CF",
            marginTop: 24,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
          }}
        >
          IT Festival 2026 — Universitas Andalas
        </p>
      </div>
    ),
    { ...size },
  );
}
