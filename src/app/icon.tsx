import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#3e4cff",
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          borderRadius: "9999px",
        }}
      >
        SK
      </div>
    ),
    { ...size },
  );
}
