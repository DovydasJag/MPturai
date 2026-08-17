type LogoMarkProps = {
  className?: string;
  /** Colour of the gold accent (top face of the cube). */
  accent?: string;
  /** Colour of the box outline. */
  outline?: string;
};

/**
 * MPTurai cube logo — an isometric 3D box with a gold top-face accent.
 * Pure SVG so it stays retina-sharp at any size and works in both server
 * and client components. Recolour via the `accent` / `outline` props.
 */
export function LogoMark({
  className = "",
  accent = "#D4A24E",
  outline = "#1C1C1A",
}: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="MPTurai logo"
    >
      {/* Gold top face (drawn first; the outline strokes sit on top). */}
      <path d="M3.27 6.96 12 2.15 20.73 6.96 12 12.01Z" fill={accent} />
      {/* Box silhouette. */}
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        stroke={outline}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
      {/* Two top edges meeting at the centre. */}
      <path
        d="M3.27 6.96 12 12.01l8.73-5.05"
        stroke={outline}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Front vertical edge. */}
      <path
        d="M12 12.01v10.07"
        stroke={outline}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
