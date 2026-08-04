import type { Metadata } from "next";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";
import { getTeam } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
};

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">About {siteConfig.name}</h1>
      <p className="text-muted mt-4 max-w-2xl">
        We&apos;re a three-person team based in Lithuania, scanning properties
        into interactive 3D tours for real estate agents, hotels and retail
        businesses across {siteConfig.contact.serviceArea}.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {team.map((member) => (
          <Card key={member.role}>
            <CardTitle>{member.role}</CardTitle>
            <CardDescription>{member.bio}</CardDescription>
          </Card>
        ))}
      </div>
    </Container>
  );
}
