import { ImageResponse } from "next/og";

/**
 * Naršyklės kortelės ikona — tas pats kubo logotipas kaip svetainės viršuje
 * (žr. components/logo.tsx), ant smėlinės plytelės, kad matytųsi ir tamsioje
 * naršyklės juostoje. Generuojama kode, todėl atskiro paveikslėlio nereikia.
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#EAE3D6"/>
  <g transform="translate(4 4)" fill="none" stroke="#1C1C1A" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round">
    <path d="M3.27 6.96 12 2.15 20.73 6.96 12 12.01Z" fill="#D4A24E" stroke="none"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <path d="M3.27 6.96 12 12.01l8.73-5.05"/>
    <path d="M12 12.01v10.07"/>
  </g>
</svg>`;

export default function Icon() {
  const src = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <img src={src} width={32} height={32} alt="" />
      </div>
    ),
    size,
  );
}
