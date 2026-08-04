import type { Project } from "@/types";

/**
 * Temporary in-memory data.
 *
 * Every page reads through these async functions, so when we add a real
 * backend (database or API) only this file changes — no page or component
 * needs to be touched.
 */
const projects: Project[] = [
  {
    id: "1",
    name: "Landing page",
    owner: "Teammate A",
    status: "active",
    updatedAt: "2026-08-01",
  },
  {
    id: "2",
    name: "Auth flow",
    owner: "Teammate B",
    status: "paused",
    updatedAt: "2026-07-28",
  },
  {
    id: "3",
    name: "Deployment pipeline",
    owner: "Teammate C",
    status: "done",
    updatedAt: "2026-07-24",
  },
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  return projects.find((project) => project.id === id);
}
