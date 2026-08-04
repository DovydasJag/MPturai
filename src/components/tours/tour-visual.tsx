import type { TourCategory } from "@/types";
import { cn } from "@/lib/utils";

const gradients: Record<TourCategory, string> = {
  "real-estate": "from-blue-600/70 to-slate-900",
  hospitality: "from-amber-600/70 to-slate-900",
  retail: "from-emerald-600/70 to-slate-900",
};

/**
 * Stand-in for a real Matterport thumbnail/embed until client tours exist.
 * Swap for an <iframe> or <Image> once real tour footage is available.
 */
export function TourVisual({
  category,
  className,
}: {
  category: TourCategory;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br",
        gradients[category],
        className,
      )}
    >
      <span className="absolute top-3 left-3 rounded-full bg-black/40 px-2 py-0.5 text-xs font-medium text-white">
        360°
      </span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-slate-900">
        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  );
}
