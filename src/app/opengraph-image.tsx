import { ImageResponse } from "next/og";

export const alt = "Yılmaz Yapı — İnşaat ve Kentsel Dönüşüm";
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
          justifyContent: "center",
          padding: "72px 88px",
          backgroundColor: "#f8f6f2",
          color: "#2c2c2c",
        }}
      >
        <div
          style={{
            width: 72,
            height: 3,
            backgroundColor: "#B8934A",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: 4,
            lineHeight: 1.05,
          }}
        >
          YILMAZ YAPI
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            color: "#6b6560",
            lineHeight: 1.4,
            maxWidth: 820,
          }}
        >
          İstanbul’da kentsel dönüşüm ve modern yaşam alanları
        </div>
      </div>
    ),
    { ...size },
  );
}
