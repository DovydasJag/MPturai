import type { Metadata } from "next";
import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getServices } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">Services & pricing</h1>
      <p className="text-muted mt-2 max-w-xl">
        One flat price per property, based on size. Every tour includes an
        on-site 3D scan and a hosted, embeddable walkthrough.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {services.map((service) => (
          <Card
            key={service.id}
            className={cn(service.highlighted && "border-foreground")}
          >
            <CardTitle>{service.name}</CardTitle>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {service.price}
            </p>
            <CardDescription>{service.priceNote}</CardDescription>
            <p className="text-muted mt-3 text-sm">{service.description}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {service.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/contact" className={buttonClasses()}>
          Get a quote
        </Link>
      </div>
    </Container>
  );
}
