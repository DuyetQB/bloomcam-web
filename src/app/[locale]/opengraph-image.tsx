import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const alt = "BloomCam — Smart Plant Timelapse Camera";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0F1720 0%, #1B2530 50%, #5E8B7E 100%)",
          color: "#F5F7FA",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#A7C4A0", letterSpacing: "0.2em" }}>
          BLOOMCAM
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 300,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {isVi
            ? "Camera timelapse cây thông minh"
            : "Smart plant timelapse camera"}
        </div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#A9B4C2", maxWidth: 800 }}>
          {isVi
            ? "Video tăng trưởng điện ảnh · Không phải camera an ninh"
            : "Cinematic growth videos · Not surveillance"}
        </div>
      </div>
    ),
    { ...size }
  );
}
