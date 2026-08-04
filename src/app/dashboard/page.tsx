import type { Metadata } from "next";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

const statusStyles = {
  active: "bg-accent/10 text-accent",
  paused: "bg-surface-hover text-muted",
  done: "bg-surface-hover text-foreground",
} as const;

export default async function DashboardPage() {
  const projects = await getProjects();

  return (
    <Container className="py-12">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted mt-2">
        Example server component — it awaits data before rendering.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <div className="flex items-start justify-between gap-3">
              <CardTitle>{project.name}</CardTitle>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  statusStyles[project.status],
                )}
              >
                {project.status}
              </span>
            </div>
            <CardDescription>
              {project.owner} · updated {formatDate(project.updatedAt)}
            </CardDescription>
          </Card>
        ))}
      </div>
    </Container>
  );
}
