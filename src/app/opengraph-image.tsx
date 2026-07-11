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
          background: "#0e1219",
          padding: 56,
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Map path suggestion */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            opacity: 0.35,
          }}
        >
          <svg
            width="1200"
            height="630"
            viewBox="0 0 1200 630"
            style={{ position: "absolute" }}
          >
            <path
              d="M 180 80 C 180 200, 420 180, 420 300 C 420 420, 780 380, 780 500 C 780 560, 980 540, 1040 580"
              fill="none"
              stroke="#e3a857"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="180" cy="80" r="10" fill="#4a9c8c" />
            <circle cx="420" cy="300" r="8" fill="#e3a857" />
            <circle cx="780" cy="500" r="11" fill="#d4786a" />
            <circle cx="1040" cy="580" r="9" fill="#4a9c8c" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#e3a857",
            fontFamily: "monospace",
            zIndex: 1,
          }}
        >
          LEVEL MAP · PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 68,
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
              fontSize: 26,
              color: "#c9c2ad",
              maxWidth: 720,
            }}
          >
            Projects as waypoints. Internships as boss encounters.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 20,
            fontFamily: "monospace",
            fontSize: 17,
            color: "#4a9c8c",
            zIndex: 1,
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
