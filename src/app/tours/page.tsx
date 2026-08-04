import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { TourCard } from "@/components/tours/tour-card";
import { getTours } from "@/lib/data";
import { cn } from "@/lib/utils";
import { tourCategoryLabels, type TourCategory } from "@/types";

export const metadata: Metadata = {
  title: "Tours",
};

const categories = Object.keys(tourCategoryLabels) as TourCategory[];

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const tours = await getTours();
  const filtered = category
    ? tours.filter((tour) => tour.category === category)
    : tours;

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">Tours</h1>
      <p className="text-muted mt-2 max-w-xl">
        Browse completed 3D tours from real estate, hospitality and retail
        clients across Lithuania.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/tours"
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition",
            !category
              ? "bg-foreground text-background"
              : "bg-surface-hover text-muted hover:text-foreground",
          )}
        >
          All
        </Link>
        {categories.map((value) => (
          <Link
            key={value}
            href={`/tours?category=${value}`}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition",
              category === value
                ? "bg-foreground text-background"
                : "bg-surface-hover text-muted hover:text-foreground",
            )}
          >
            {tourCategoryLabels[value]}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-muted mt-8">No tours in this category yet.</p>
      )}
    </Container>
  );
}
