import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Emel Senemoglu — Greater Vancouver Mortgage Broker · Powerhaus Mortgages — Dominion Lending Centres National";

export default async function OpenGraphImage() {
  const imageBuffer = await readFile(join(process.cwd(), "public", "emelsenemoglu.jpg"));
  const imageSrc = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #FAF7F2 0%, #f3eee2 50%, #dcefe5 100%)",
          padding: "72px 88px",
          alignItems: "center",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background: "rgba(15, 76, 58, 0.12)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -160,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(224, 120, 86, 0.18)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingRight: 56,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              color: "#0F4C3A",
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#E07856",
              }}
            />
            Greater Vancouver · British Columbia
          </div>
          <div
            style={{
              fontSize: 76,
              color: "#0F4C3A",
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1.5,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>Mortgages built around&nbsp;</span>
            <span style={{ color: "#E07856", fontStyle: "italic" }}>your life</span>
            <span>.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#1F2A30",
              marginTop: 28,
              lineHeight: 1.35,
              maxWidth: 560,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Emel Senemoglu — Greater Vancouver Mortgage Broker. 40+ Canadian lenders shopped on your behalf.
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#4a565d",
              marginTop: 36,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 500,
            }}
          >
            Powerhaus Mortgages — Dominion Lending Centres National
          </div>
        </div>

        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 360,
              height: 460,
              borderRadius: 28,
              overflow: "hidden",
              display: "flex",
              boxShadow: "0 30px 80px rgba(15, 76, 58, 0.25)",
              border: "10px solid #FAF7F2",
            }}
          >
            <img
              src={imageSrc}
              width={340}
              height={440}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
