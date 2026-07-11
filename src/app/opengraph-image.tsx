import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anubhav Kayal — Level Map Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#11141c",
          padding: 64,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#e3a857",
            fontFamily: "monospace",
          }}
        >
          LEVEL MAP · PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 600,
              color: "#f3ede0",
              lineHeight: 1.05,
            }}
          >
            Anubhav Kayal
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#c9c2ad",
              maxWidth: 800,
            }}
          >
            Projects as waypoints. Internships as boss encounters.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 24,
            fontFamily: "monospace",
            fontSize: 18,
            color: "#4a9c8c",
          }}
        >
          <span>7 projects</span>
          <span>·</span>
          <span>4 bosses</span>
          <span>·</span>
          <span>scroll the path</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
