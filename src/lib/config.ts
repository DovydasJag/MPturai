/**
 * Single source of truth for app-wide constants.
 * Change the name/description here instead of hunting through components.
 */
export const siteConfig = {
  name: "MPturai",
  description:
    "Interactive 3D virtual tours for real estate, hospitality and retail businesses in Lithuania.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { title: "Home", href: "/" },
    { title: "Tours", href: "/tours" },
    { title: "Services", href: "/services" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ],
  // Placeholder contact details — replace with the real ones before launch.
  contact: {
    email: "hello@mpturai.lt",
    phone: "+370 6XX XXXXX",
    serviceArea: "Vilnius, Kaunas, Klaipėda",
  },
} as const;

export type SiteConfig = typeof siteConfig;
