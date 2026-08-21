export type ClientDetail = {
  /** e.g. "Plotas" */
  label: string;
  /** e.g. "54 m²" */
  value: string;
};

export type Client = {
  /** Subdomain label, e.g. "smith" for smith.mpturai.lt. Visada mažosiomis raidėmis. */
  slug: string;
  /** Kliento vardas — rodomas antraštėje, pvz. "Vardas Pavardenis". */
  name: string;
  /** Matterport modelio ID iš Share > Copy link (my.matterport.com/show/?m=XXX). */
  matterportId: string;
  /** Objekto pavadinimas arba adresas, pvz. "Aukštagirio g. 12, Vilnius". */
  title: string;
  /**
   * Objekto aprašymas — tekstą pateikia klientas.
   * Tuščia eilutė tarp pastraipų sukuria naują pastraipą.
   */
  description: string;
  /** Neprivaloma: trumpi faktai apie objektą (plotas, kambariai, aukštas...). */
  details?: ClientDetail[];
  /** Neprivaloma: kliento kontaktai, kad pirkėjas galėtų susisiekti. */
  contact?: {
    phone?: string;
    email?: string;
  };
};

/**
 * Klientų sąrašas. Kol jis tuščias, jokio subdomeno puslapio nėra — bet koks
 * `<kas-nors>.mpturai.lt` grąžina 404.
 *
 * Pridedant naują klientą:
 *  1. Įrašykite jo duomenis čia (`slug` — tik mažosios raidės, be lietuviškų
 *     raidžių: „Pavardenė“ → „pavardene“).
 *  2. Sukurkite CNAME įrašą DNS, kad subdomenas pasiektų svetainę.
 *
 * Pavyzdys:
 *
 * {
 *   slug: "pavardenis",
 *   name: "Vardas Pavardenis",
 *   matterportId: "xxxxxxxxxxx",
 *   title: "Gatvės g. 1, Vilnius",
 *   description: `Pirma pastraipa.
 *
 * Antra pastraipa.`,
 *   details: [{ label: "Plotas", value: "54 m²" }],
 *   contact: { phone: "+370 600 00000", email: "vardas@pavyzdys.lt" },
 * }
 */
export const clients: Client[] = [];

export function getClientBySlug(slug: string) {
  return clients.find((c) => c.slug === slug.toLowerCase());
}

/** Matterport embed nuoroda su išjungtu pavadinimu ir pagalbos langu. */
export function tourEmbedUrl(matterportId: string) {
  return `https://my.matterport.com/show/?m=${matterportId}&play=1&title=0&help=0&qs=1`;
}
