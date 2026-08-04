import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { MatterportEmbed } from "@/components/tours/matterport-embed";
import { TourCard } from "@/components/tours/tour-card";
import { siteConfig } from "@/lib/config";
import { getFeaturedTours, getServices } from "@/lib/data";

const process = [
  {
    step: "1",
    title: "Book a date",
    description: "Tell us the property, size and when you'd like it scanned.",
  },
  {
    step: "2",
    title: "We scan on-site",
    description: "A 3D scan takes 1–3 hours depending on the size of the space.",
  },
  {
    step: "3",
    title: "Get your tour",
    description: "A hosted, embeddable 3D tour is delivered within 48 hours.",
  },
];

export default async function HomePage() {
  const [featuredTours, services] = await Promise.all([
    getFeaturedTours(),
    getServices(),
  ]);

  return (
    <>
      <Container className="py-20">
        <section className="max-w-2xl">
          <p className="text-accent text-sm font-medium">3D Virtual Tours</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Let clients walk through your space before they visit
          </h1>
          <p className="text-muted mt-4 text-lg">{siteConfig.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/tours" className={buttonClasses()}>
              Browse tours
            </Link>
            <Link
              href="/contact"
              className={buttonClasses({ variant: "secondary" })}
            >
              Get a quote
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-lg font-semibold tracking-tight">
            Try a live tour
          </h2>
          <p className="text-muted mt-1 text-sm">
            Drag to look around — this is what an MPturai tour feels like.
          </p>
          <MatterportEmbed className="mt-4" />
        </section>
      </Container>

      <section className="border-border border-t">
        <Container className="py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Recent tours</h2>
            <Link href="/tours" className="text-accent text-sm font-medium">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border border-t">
        <Container className="py-16">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {process.map((item) => (
              <Card key={item.step}>
                <span className="text-accent text-sm font-semibold">
                  {item.step}
                </span>
                <CardTitle className="mt-1">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border border-t">
        <Container className="py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Services & pricing
            </h2>
            <Link href="/services" className="text-accent text-sm font-medium">
              See details →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id}>
                <CardTitle>{service.name}</CardTitle>
                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {service.price}
                </p>
                <CardDescription>{service.priceNote}</CardDescription>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border border-t">
        <Container className="py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Ready to show your space in 3D?
          </h2>
          <p className="text-muted mx-auto mt-2 max-w-md">
            Serving {siteConfig.contact.serviceArea}. Tours usually delivered
            within 48 hours of the shoot.
          </p>
          <Link
            href="/contact"
            className={buttonClasses({ className: "mt-6" })}
          >
            Get a quote
          </Link>
        </Container>
      </section>
    </>
  );
}
