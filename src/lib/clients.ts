export type ClientDetail = {
  /** e.g. "Plotas" */
  label: string;
  /** e.g. "54 m²" */
  value: string;
};

export type Client = {
  /** Subdomain label, e.g. "smith" for smith.mpturai.lt. Visada mažosiomis raidėmis. */
  slug: string;
  /**
   * Kliento vardas, rodomas kontaktų bloke. Neprivalomas — jei nenurodytas,
   * puslapio apačioje rodomi MPTurai kontaktai.
   */
  name?: string;
  /** Matterport modelio ID iš Share > Copy link (my.matterport.com/show/?m=XXX). */
  matterportId: string;
  /** Objekto pavadinimas, pvz. "2 kambarių butas, Šeškinė". */
  title: string;
  /** Neprivaloma: adresas, rodomas po pavadinimu virš 3D turo. */
  address?: string;
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
export const clients: Client[] = [
  {
    slug: "paberzes6",
    matterportId: "didM2m6j6qJ",
    title: "2 kambarių butas, Šeškinė",
    address: "Paberžės g. 6, Šeškinė",
    description: `Tai būstas žmogui, kuris vertina estetiką, komfortą ir nenori savo laiko skirti remontui. Čia viskas jau sukurta - nuo funkcionalaus išplanavimo iki paskutinių interjero detalių. PARDUODAMAS SU BALDAIS, BUITINE TECHNIKA IR TELEVIZORIAIS - GALIMA ĮSIKELTI IR GYVENTI IŠ KARTO.`,
    details: [
      { label: "Plotas", value: "51 m²" },
      { label: "Kambariai", value: "2" },
    ],
    name: "Justina Petraitytė",
    contact: {
      phone: "+370 605 07 898",
      email: "justinuke99@gmail.com",
    },
  },
  {
    slug: "perkunkiemio",
    matterportId: "bi3viYyyDSR",
    title: "Vilnius, Pašilaičiai, Perkūnkiemio g.",
    description: `BŪSTO PRIVALUMAI:

- PARDUODAMA SU VISAIS BALDAIS IR BUITINE TECHNIKA
- FUNKCIONALUS IŠPLANAVIMAS, ERDVŪS KAMBARIAI
- 2 LIFTAI LAIPTINĖJE
- ŠALIA NAMO PARKAS, ŽAIDIMŲ SKVERAS
- STRATEGIŠKAI PUIKI VIETA (ŠALIA STOTELĖS, PARDUOTUVĖS, MOKYKLOS, DARŽELIAI, KAVINĖS)
- ERDVI TERASA – PUIKI VIETA POILSIUI, RYTINEI KAVAI AR JAUKIEMS VAKARAMS
- TAMSIUKAS – PATOGIAM PAPILDOMŲ DAIKTŲ LAIKYMUI
- SEIFAS – SAUGIAM SVARBIŲ DAIKTŲ LAIKYMUI
- PROJEKTORIAUS LAIKIKLIS IR Į LUBAS ĮLEIDŽIAMAS PROJEKCINIS EKRANAS – JAUKIEMS KINO VAKARAMS
- PARKINGAS UŽ PAPILDOMĄ MOKESTĮ
- YRA GALIMYBĖ ĮSIGYTI SANDĖLIUKĄ TAME PAČIAME AUKŠTE ŠALIA BUTO.`,
    details: [
      { label: "Plotas", value: "50 m²" },
      { label: "Kambariai", value: "2" },
    ],
    name: "Laurynas",
    contact: {
      phone: "+370 610 01 422",
      email: "urtemortunaite@gmail.com",
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
