export type Client = {
  /** Subdomain label, e.g. "smith" for smith.mpturai.lt */
  slug: string;
  name: string;
  matterportId: string;
};

export const clients: Client[] = [
  // Pridėkite naują klientą čia, kai sukuriate jam subdomeną.
  // Nepamirškite taip pat sukurti CNAME įrašo Hostinger DNS.
  // { slug: "smith", name: "Smith Real Estate", matterportId: "jm5WwEA3HUN" },
];

export function getClientBySlug(slug: string) {
  return clients.find((c) => c.slug === slug);
}
