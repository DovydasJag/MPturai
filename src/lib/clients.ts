export type ClientDetail = {
  /** e.g. "Plotas" */
  label: string;
  /** e.g. "54 m²" */
  value: string;
};

export type Client = {
  /** Subdomain label, e.g. "smith" for smith.mpturai.lt. Visada mažosiomis raidėmis. */
  slug: string;
  /** Kliento vardas — rodomas antraštėje, pvz. "Sandra Butkutė". */
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

export const clients: Client[] = [
  // Pridėkite naują klientą čia, kai sukuriate jam subdomeną.
  // Nepamirškite taip pat sukurti CNAME įrašo Hostinger DNS.
  {
    slug: "sandrabutkute",
    name: "Sandra Butkutė",
    matterportId: "sgUejtUptyy",
    title: "Aukštagirio g., Vilnius",
    description: `Jaukus, tvarkingas butas ramioje miesto dalyje. Erdvus miegamasis su
integruota spinta, atskiras vonios kambarys su langu bei patogus
priėjimas laiptinėje.

Butas parduodamas su visais baldais ir buitine technika. Netoliese —
mokykla, darželis, prekybos centras ir viešojo transporto stotelė.`,
    details: [
      { label: "Plotas", value: "54 m²" },
      { label: "Kambariai", value: "2" },
      { label: "Aukštas", value: "3 / 5" },
      { label: "Būklė", value: "Įrengtas" },
    ],
    contact: {
      phone: "+370 600 00000",
      email: "sandra@pavyzdys.lt",
    },
  },
];

export function getClientBySlug(slug: string) {
  return clients.find((c) => c.slug === slug.toLowerCase());
}

/** Matterport embed nuoroda su išjungtu pavadinimu ir pagalbos langu. */
export function tourEmbedUrl(matterportId: string) {
  return `https://my.matterport.com/show/?m=${matterportId}&play=1&title=0&help=0&qs=1`;
}
