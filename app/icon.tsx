import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div
            style={{
              width: 14,
              height: 2,
              background: "#E4A23C",
              transform: "rotate(-28deg)",
              marginLeft: -6,
            }}
          />
          <div style={{ width: 16, height: 2, background: "#F3EFE6" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
