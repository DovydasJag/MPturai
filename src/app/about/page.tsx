import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">About</h1>
      <p className="text-muted mt-4 max-w-2xl">
        {siteConfig.name} is a work in progress. Replace this page with real
        content — it exists to show how a second static route is added.
      </p>
    </Container>
  );
}
