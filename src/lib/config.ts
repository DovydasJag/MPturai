/**
 * Single source of truth for app-wide constants.
 * Change the name/description here instead of hunting through components.
 */
export const siteConfig = {
  name: "MPturai",
  description: "A web app built by a three-person team.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { title: "Home", href: "/" },
    { title: "Dashboard", href: "/dashboard" },
    { title: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
