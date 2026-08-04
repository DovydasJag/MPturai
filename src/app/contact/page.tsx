import type { Metadata } from "next";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const { email, phone, serviceArea } = siteConfig.contact;

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">Get a quote</h1>
      <p className="text-muted mt-2 max-w-xl">
        Tell us the property, its size and when you&apos;d like it scanned. We
        serve {serviceArea} and usually reply within a day.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardTitle>Email</CardTitle>
          <CardDescription>
            <a href={`mailto:${email}`} className="text-accent">
              {email}
            </a>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Phone</CardTitle>
          <CardDescription>
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-accent">
              {phone}
            </a>
          </CardDescription>
        </Card>
      </div>
    </Container>
  );
}
