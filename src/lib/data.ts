import type { Service, TeamMember, Tour } from "@/types";

/**
 * Temporary in-memory data.
 *
 * Every page reads through these async functions, so when we add a real
 * backend (database or API) only this file changes — no page or component
 * needs to be touched. Sample tours below are placeholders for the
 * portfolio layout — swap in real client properties once they exist.
 */
const tours: Tour[] = [
  {
    id: "1",
    title: "Two-Bedroom Apartment — Vilnius Old Town",
    category: "real-estate",
    location: "Vilnius",
    sqm: 68,
    summary:
      "Renovated apartment near Cathedral Square, scanned for a fast-moving resale listing.",
    completedAt: "2026-07-22",
    featured: true,
  },
  {
    id: "2",
    title: "Boutique Hotel Suite — Klaipėda",
    category: "hospitality",
    location: "Klaipėda",
    sqm: 42,
    summary:
      "Seafront suite tour used on the hotel's own booking page to lift direct reservations.",
    completedAt: "2026-07-10",
    featured: true,
  },
  {
    id: "3",
    title: "Concept Store — Kaunas Old Town",
    category: "retail",
    location: "Kaunas",
    sqm: 95,
    summary:
      "Two-floor retail space captured with floor plan and dollhouse view for a lease listing.",
    completedAt: "2026-06-28",
    featured: true,
  },
  {
    id: "4",
    title: "New-Build Townhouse — Vilnius, Pilaitė",
    category: "real-estate",
    location: "Vilnius",
    sqm: 134,
    summary: "Pre-sale tour for a developer selling four identical units off-plan.",
    completedAt: "2026-06-15",
    featured: false,
  },
  {
    id: "5",
    title: "Café & Roastery — Kaunas",
    category: "hospitality",
    location: "Kaunas",
    sqm: 58,
    summary: "Interior tour embedded on the café's website and Google Business Profile.",
    completedAt: "2026-05-30",
    featured: false,
  },
  {
    id: "6",
    title: "Showroom — Šiauliai",
    category: "retail",
    location: "Šiauliai",
    sqm: 210,
    summary: "Furniture showroom tour with product tags planned for a future update.",
    completedAt: "2026-05-12",
    featured: false,
  },
];

const services: Service[] = [
  {
    id: "starter",
    name: "Starter",
    price: "€90",
    priceNote: "per property, up to 80 m²",
    description: "For single apartments and small listings.",
    features: [
      "On-site 3D scan (1–2 hours)",
      "Interactive walkthrough tour",
      "Hosted link + embed code",
      "Delivered within 48 hours",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "€150",
    priceNote: "per property, up to 150 m²",
    description: "For houses, hotel floors and mid-size retail units.",
    features: [
      "Everything in Starter",
      "Floor plan + dollhouse view",
      "Branded tour intro",
      "20 high-res still photos",
    ],
    highlighted: true,
  },
  {
    id: "commercial",
    name: "Commercial",
    price: "Custom quote",
    priceNote: "150 m²+, multi-room venues",
    description: "For hotels, restaurants and retail chains.",
    features: [
      "Everything in Standard",
      "Multi-floor scanning",
      "Recurring updates on request",
      "Priority scheduling",
    ],
  },
];

const team: TeamMember[] = [
  {
    role: "Founder — Operations & Client Scanning",
    bio: "Books shoots, runs the on-site capture, and manages client handoff.",
  },
  {
    role: "Co-Founder — Post-Production",
    bio: "Processes scans into finished tours: floor plans, dollhouse views, retouching.",
  },
  {
    role: "Co-Founder — Sales & Web",
    bio: "Handles client outreach, pricing, and keeps the website and tour library up to date.",
  },
];

export async function getTours(): Promise<Tour[]> {
  return tours;
}

export async function getFeaturedTours(): Promise<Tour[]> {
  return tours.filter((tour) => tour.featured);
}

export async function getTour(id: string): Promise<Tour | undefined> {
  return tours.find((tour) => tour.id === id);
}

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getTeam(): Promise<TeamMember[]> {
  return team;
}
