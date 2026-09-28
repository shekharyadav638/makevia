import { ImageResponse } from "next/og";

export const alt = "Makevia — From idea to product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#faf8f4",
          color: "#0d1321",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M16 4h12v24H16a12 12 0 0 1 0-24Z" fill="#0d1321" />
            <circle cx="15" cy="16" r="4.2" fill="#c2460f" />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 600, letterSpacing: -1.5 }}>
            Make<span style={{ opacity: 0.6, fontWeight: 400 }}>via</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>
            From idea to product<span style={{ color: "#c2460f" }}>.</span>
          </div>
          <div style={{ fontSize: 32, color: "#646a7a", marginTop: 28 }}>
            Coming soon · makevia.in
          </div>
        </div>
      </div>
    ),
    size,
  );
}
