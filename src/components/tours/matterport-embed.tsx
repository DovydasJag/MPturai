/**
 * Matterport's public demo space — used so visitors can try a real,
 * interactive 3D tour before we have a client tour to embed here.
 * Swap the src for a client's own Matterport model URL when ready.
 */
export function MatterportEmbed({ className }: { className?: string }) {
  return (
    <div
      className={`border-border aspect-video overflow-hidden rounded-lg border ${className ?? ""}`}
    >
      <iframe
        src="https://my.matterport.com/show/?m=nrk2W1JeeJd"
        title="Sample interactive 3D tour"
        allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
