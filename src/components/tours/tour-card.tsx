import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { TourVisual } from "@/components/tours/tour-visual";
import { tourCategoryLabels, type Tour } from "@/types";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="border-border bg-surface hover:border-border-strong group block overflow-hidden rounded-lg border transition"
    >
      <TourVisual category={tour.category} className="rounded-none" />
      <div className="p-4">
        <Badge>{tourCategoryLabels[tour.category]}</Badge>
        <h3 className="mt-2 font-semibold tracking-tight group-hover:underline">
          {tour.title}
        </h3>
        <p className="text-muted mt-1 text-sm">
          {tour.location} · {tour.sqm} m²
        </p>
      </div>
    </Link>
  );
}
