/**
 * Single source of truth for app-wide constants.
 * Change the name/description here instead of hunting through components.
 */
export const siteConfig = {
  name: "MPTurai",
  description:
    "Interaktyvūs 3D turai butams, namams, biurams ir komercinėms patalpoms su Matterport.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "info@mpturai.lt",
    phone: "+370 659 08007",
  },
} as const;

export type SiteConfig = typeof siteConfig;
