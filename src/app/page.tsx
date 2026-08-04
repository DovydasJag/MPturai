import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

const features = [
  {
    title: "App Router",
    description:
      "Routes live in src/app — a folder with a page.tsx becomes a URL.",
  },
  {
    title: "Shared components",
    description:
      "Reusable pieces live in src/components/ui so the whole team builds from the same parts.",
  },
  {
    title: "Design tokens",
    description:
      "Colors are defined once in globals.css and used as Tailwind classes.",
  },
];

export default function HomePage() {
  return (
    <Container className="py-20">
      <section className="max-w-2xl">
        <p className="text-accent text-sm font-medium">Starter</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="text-muted mt-4 text-lg">{siteConfig.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className={buttonClasses()}>
            Open dashboard
          </Link>
          <Link
            href="/about"
            className={buttonClasses({ variant: "secondary" })}
          >
            About
          </Link>
        </div>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </Card>
        ))}
      </section>
    </Container>
  );
}
