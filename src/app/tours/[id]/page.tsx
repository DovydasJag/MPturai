import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { TourVisual } from "@/components/tours/tour-visual";
import { getTour } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { tourCategoryLabels } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const tour = await getTour(id);
  return { title: tour?.title ?? "Tour" };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    notFound();
  }

  return (
    <Container className="py-12">
      <Link href="/tours" className="text-accent text-sm font-medium">
        ← All tours
      </Link>

      <div className="mt-4">
        <Badge>{tourCategoryLabels[tour.category]}</Badge>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          {tour.title}
        </h1>
        <p className="text-muted mt-1 text-sm">
          {tour.location} · {tour.sqm} m² · completed{" "}
          {formatDate(tour.completedAt)}
        </p>
      </div>

      <TourVisual category={tour.category} className="mt-6" />

      <p className="text-muted mt-6 max-w-2xl">{tour.summary}</p>

      <Link href="/contact" className={buttonClasses({ className: "mt-6" })}>
        Get a quote for a tour like this
      </Link>
    </Container>
  );
}
