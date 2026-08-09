"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/lib/config";

const tours = [
  {
    id: "jm5WwEA3HUN",
    src: "https://my.matterport.com/show/?m=jm5WwEA3HUN&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1",
  },
  { id: "SxQL3iGyoKN" },
  { id: "j5ZFuAKZWtR" },
];

const propertyTypes = [
  { label: "Butai", icon: "building" },
  { label: "Namai", icon: "house" },
  { label: "Biurai", icon: "laptop" },
  { label: "Komercinės", icon: "storefront" },
] as const;

const whyUs = [
  {
    title: "Greitas pristatymas",
    text: "Didžioji dauguma turų yra klientų rankose iki 2 dienų.",
    icon: "clock",
  },
  {
    title: "Paprasta pradžia",
    text: "Lengvai ir greitai susisieksime bei pradėsime darbus. Taupome jūsų laiką.",
    icon: "bolt",
  },
  {
    title: "Nuosava svetainė",
    text: "Jūsų 3D turui — stabili, nuosava svetainė.",
    icon: "stack",
  },
] as const;

const steps = [
  { n: "1", text: "Užsakymas — susisiekiate ir susitariame dėl vizito." },
  {
    n: "2",
    text: "Nuskenuojame — atliekame savo darbą nuskanuodami jūsų objektą ir sukurdami 3D turą.",
  },
  {
    n: "3",
    text: "Gaunatė galutinį produktą — per 24-48h gaunatė nuosavą nuorodą su 3D turu.",
  },
];

const pricing = [
  {
    tier: "STANDARTINIS",
    price: "80 €",
    features: [
      "Objektams iki 50m2",
      "Pilnas objekto 3D turas",
      "Nuosava nuoroda 3D turui",
      "1-2 dienų pristatymas",
    ],
  },
  {
    tier: "VIDUTINIS",
    price: "100 €",
    features: ["Visi standartinio privalumai", "Objektams 50m2-100m2"],
  },
  {
    tier: "MAX",
    price: "150+ €",
    features: ["Visi vidutinio privalumai", "Objektams nuo 100m2-200m2"],
  },
];

function WhyIcon({ icon }: { icon: (typeof whyUs)[number]["icon"] }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#D4A24E",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (icon === "clock") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }

  if (icon === "bolt") {
    return (
      <svg {...props}>
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M12 3 3 7.5 12 12l9-4.5L12 3Z" />
      <path d="m3 12 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </svg>
  );
}

function PropertyIcon({
  icon,
}: {
  icon: (typeof propertyTypes)[number]["icon"];
}) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#D4A24E",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (icon === "building") {
    return (
      <svg {...props}>
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <path d="M9 7h.01M12 7h.01M15 7h.01M9 11h.01M12 11h.01M15 11h.01M9 15h.01M12 15h.01M15 15h.01" />
      </svg>
    );
  }

  if (icon === "house") {
    return (
      <svg {...props}>
        <path d="M4 11 12 4l8 7" />
        <path d="M6 10v10h12V10" />
        <path d="M10 20v-6h4v6" />
      </svg>
    );
  }

  if (icon === "laptop") {
    return (
      <svg {...props}>
        <rect x="4" y="5" width="16" height="10" rx="1" />
        <path d="M2 19h20" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M4 4h16l1 5H3l1-5Z" />
      <path d="M4 9v11h16V9" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="h-px w-full"
      style={{
        background:
          "linear-gradient(to right, transparent, #30363d 20%, #30363d 80%, transparent)",
      }}
    />
  );
}

export default function HomePage() {
  const [tourIndex, setTourIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [ctaPop, setCtaPop] = useState(false);
  const [submitPop, setSubmitPop] = useState(false);

  const scrollAnimTokenRef = useRef<object | null>(null);

  useEffect(() => {
    const scrollKeys = new Set([
      "ArrowUp",
      "ArrowDown",
      "PageUp",
      "PageDown",
      "Home",
      "End",
      " ",
    ]);
    function cancelAutoScroll(e: Event) {
      if (e instanceof KeyboardEvent && !scrollKeys.has(e.key)) return;
      scrollAnimTokenRef.current = null;
    }
    window.addEventListener("wheel", cancelAutoScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScroll, {
      passive: true,
    });
    window.addEventListener("keydown", cancelAutoScroll);
    return () => {
      window.removeEventListener("wheel", cancelAutoScroll);
      window.removeEventListener("touchstart", cancelAutoScroll);
      window.removeEventListener("keydown", cancelAutoScroll);
    };
  }, []);

  const currentTour = tours[tourIndex];
  const currentTourSrc =
    currentTour.src ?? `https://my.matterport.com/show/?m=${currentTour.id}`;
  const currentTourShowUrl = `https://my.matterport.com/show/?m=${currentTour.id}`;

  function prevTour() {
    setTourIndex((i) => (i - 1 + tours.length) % tours.length);
  }

  function nextTour() {
    setTourIndex((i) => (i + 1) % tours.length);
  }

  function popCta() {
    setCtaPop(true);
    setTimeout(() => setCtaPop(false), 220);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitPop(true);
    setTimeout(() => setSubmitPop(false), 220);

    const form = e.currentTarget;
    const data = new FormData(form);
    setSendError(null);
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          details: data.get("details"),
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSendError("Nepavyko išsiųsti užklausos. Bandykite dar kartą.");
    } finally {
      setSending(false);
    }
  }

  function animateScrollTo(endY: number, duration = 3000) {
    const startY = window.scrollY;
    const clampedEndY = Math.max(
      0,
      Math.min(
        endY,
        document.documentElement.scrollHeight - window.innerHeight,
      ),
    );
    const startTime = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const token = {};
    scrollAnimTokenRef.current = token;

    function step(now: number) {
      if (scrollAnimTokenRef.current !== token) return;
      const t = Math.min(1, (now - startTime) / duration);
      window.scrollTo({
        top: startY + (clampedEndY - startY) * ease(t),
        behavior: "auto",
      });
      if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  function scrollToId(
    id: string,
    align: "start" | "center" = "start",
    duration?: number,
  ) {
    const target = document.getElementById(id);
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const targetTop = rect.top + window.scrollY;
    const endY =
      align === "center"
        ? targetTop - (window.innerHeight - rect.height) / 2
        : targetTop;
    animateScrollTo(endY, duration);
  }

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    duration?: number,
  ) {
    e.preventDefault();
    scrollToId(id, "start", duration);
  }

  function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    animateScrollTo(0);
  }

  return (
    <div className="relative w-full overflow-x-hidden bg-[#0D1117]">
      {/* Header */}
      <header
        className="flex w-full items-center justify-between gap-6 border-b border-[#21262d] px-8 py-7"
        style={{
          background:
            "linear-gradient(to bottom, #080B10 0%, #080B10 55%, rgba(8,11,16,0) 100%)",
        }}
      >
        <a
          href="#top"
          onClick={scrollToTop}
          className="flex items-center gap-4"
        >
          <div className="relative h-[50px] w-[50px] shrink-0">
            <Image
              src="/logo.png"
              alt="MPTurai logo"
              fill
              sizes="50px"
              className="object-contain"
              priority
            />
          </div>
          <span className="flex flex-col gap-0.5">
            <span className="text-[26px] font-extrabold tracking-[-0.02em] text-[#F0F0F0]">
              MPTurai
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.14em] text-[#D4A24E]">
              3D TURAI
            </span>
          </span>
        </a>
        <nav className="flex items-center gap-9">
          <a
            href="#apie-mus"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("apie-mus", "center", 1200);
            }}
            className="rounded-full px-4 py-2 text-sm text-[#8B949E] transition-colors hover:bg-[#21262d] hover:text-[#E8B860]"
          >
            Apie mus
          </a>
          <a
            href="#kainos"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("kainos", "center", 1200);
            }}
            className="rounded-full px-4 py-2 text-sm text-[#8B949E] transition-colors hover:bg-[#21262d] hover:text-[#E8B860]"
          >
            Kainos
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-14 px-8 py-16 md:grid-cols-2 md:py-24">
        <div id="top" className="relative min-w-0">
          <h1 className="animate-reveal m-0 max-w-[22ch] text-left text-[clamp(36px,5vw,60px)] leading-[1.05] font-medium tracking-[-0.035em] text-balance opacity-0">
            Parodykite savo objektą, prieš klientui atvykstant.
          </h1>
          <a
            href="#kontaktai"
            onClick={(e) => {
              popCta();
              handleNavClick(e, "kontaktai");
            }}
            className="mt-9 inline-block rounded-full bg-[#D4A24E] px-6.5 py-3.5 text-[15.5px] font-medium text-[#0D1117] transition-transform hover:bg-[#E8B860] active:scale-[0.93]"
            style={{ transform: ctaPop ? "scale(1.12)" : "scale(1)" }}
          >
            Susisiekite!
          </a>
        </div>

        <div className="relative min-w-0">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-16 -z-10 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(212,162,78,0.35), rgba(212,162,78,0) 70%)",
            }}
          />
          <div className="flex items-center gap-3.5">
            <button
              onClick={prevTour}
              aria-label="Ankstesnis turas"
              className="shrink-0 px-1 text-[28px] leading-none text-[#8B949E] hover:text-[#E8B860]"
            >
              ‹
            </button>
            <div className="relative aspect-[16/10] flex-1">
              <div className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-2xl border border-[#21262d] bg-[#161B22]" />
              <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl border border-[#21262d] bg-[#161B22]" />
              <div
                key={tourIndex}
                className="animate-tour-switch absolute inset-0 overflow-hidden rounded-2xl bg-[#161B22]"
                style={{
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.45)",
                }}
              >
                <iframe
                  src={currentTourSrc}
                  title="Matterport 3D turas"
                  allow="fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  className="block h-full w-full border-0"
                />
              </div>
            </div>
            <button
              onClick={nextTour}
              aria-label="Kitas turas"
              className="shrink-0 px-1 text-[28px] leading-none text-[#8B949E] hover:text-[#E8B860]"
            >
              ›
            </button>
          </div>
          <div className="mt-3.5 flex flex-wrap gap-5 px-10 font-mono text-[12.5px] tracking-[0.06em] text-[#8B949E]">
            <a
              href={currentTourShowUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[#8B949E] hover:text-[#E8B860]"
            >
              VISAME EKRANE ↗
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Apie mus */}
      <section
        id="apie-mus"
        className="mx-auto mt-10 max-w-[1440px] px-8 pt-9 pb-24"
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          <div>
            <h2 className="animate-reveal m-0 text-[clamp(26px,3.2vw,34px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
              Kuo užsiema MPTurai?
            </h2>
            <p className="mt-3.5 max-w-[60ch] text-[16.5px] leading-relaxed text-[#8B949E]">
              Skenuojame patalpas su Matterport, kurdami interaktyvius 3D turus,
              kurie leidžia apžiūrėti objektą bet kuriuo metu, iš bet kur.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#D4A24E]/40 bg-[#D4A24E]/10 px-4 py-2 text-sm font-medium text-[#D4A24E]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.3" />
              </svg>
              Nuo €80 už objektą
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {propertyTypes.map((type) => (
              <div
                key={type.label}
                className="flex flex-col gap-3 rounded-xl border border-[#21262d] bg-[#161B22] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4A24E]/10">
                  <PropertyIcon icon={type.icon} />
                </div>
                <h3 className="text-[15px] font-semibold text-[#F0F0F0]">
                  {type.label}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="animate-reveal m-0 text-[clamp(26px,3.2vw,34px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
            Kodel mes?
          </h2>
          <div className="mt-3.5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-3 rounded-xl border border-[#21262d] bg-[#161B22] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D4A24E]/10">
                  <WhyIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[#F0F0F0]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[#8B949E]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Kaip tai veikia */}
      <section className="mx-auto max-w-[1440px] px-8 pt-20">
        <div className="text-center">
          <h2 className="animate-reveal m-0 text-[clamp(32px,4vw,44px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
            Kaip tai veikia?
          </h2>
          <div className="mx-auto mt-6 h-px w-[120px] bg-[#21262d]" />
        </div>
        <div className="relative mt-7 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
          {steps.map((step) => (
            <div
              key={step.n}
              className="flex flex-col items-center px-6 text-center"
            >
              <p className="m-0 flex min-h-[78px] items-start text-base leading-relaxed text-[#8B949E]">
                {step.text}
              </p>
              <span className="mt-5 text-[56px] leading-none font-semibold tracking-[-0.02em] text-[#D4A24E]">
                {step.n}
              </span>
            </div>
          ))}
          <svg
            viewBox="0 0 1000 56"
            preserveAspectRatio="none"
            className="connector-path pointer-events-none absolute top-[98px] left-0 hidden h-14 w-full lg:block"
            fill="none"
            stroke="#D4A24E"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="9 9"
          >
            <path d="M166.7 30 C 245 10, 305 50, 375 24 C 410 14, 450 20, 486 25" />
            <path d="M514 25 C 550 30, 580 6, 650 22 C 700 40, 770 6, 833.3 26" />
          </svg>
        </div>
      </section>

      {/* Kainos */}
      <section id="kainos-wrap" className="mx-auto max-w-[1440px] px-8 py-24">
        <div id="kainos">
          <h2 className="animate-reveal m-0 text-[clamp(24px,2.8vw,30px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
            Kainos
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.tier}
                className="flex flex-col border border-[#21262d] p-8"
                style={{
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.65), 0 8px 20px rgba(0,0,0,0.45)",
                }}
              >
                <span className="font-mono text-xs tracking-[0.1em] text-[#8B949E]">
                  {plan.tier}
                </span>
                <div className="mt-3.5 text-[38px] font-semibold tracking-[-0.02em]">
                  {plan.price}
                </div>
                <ul className="mt-3.5 list-disc space-y-1 pl-4.5 text-[15px] leading-relaxed text-[#8B949E]">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-[#8B949E]">
            Galutinė kaina nuspresta susisiekus.
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* Kontaktai */}
      <section id="kontaktai" className="mx-auto max-w-[1440px] px-8 py-24">
        <div className="border border-[#21262d] p-10">
          <div className="flex items-center gap-5">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4A24E"
              strokeWidth="1.4"
              className="shrink-0"
            >
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="M3 6.5l9 6.5 9-6.5" />
            </svg>
            <h2 className="animate-reveal m-0 text-[clamp(26px,3.2vw,34px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
              Kad kiekviena diena būtu atvirų durų diena.
            </h2>
          </div>
          <p className="mt-3.5 mb-9 max-w-[50ch] text-[16.5px] leading-relaxed text-[#8B949E]">
            Atsakome per vieną darbo dieną.
          </p>

          {sent ? (
            <p className="m-0 text-[17px] text-[#E8B860]">
              Užklausa išsiųsta. Susisieksime per vieną darbo dieną.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="grid max-w-[660px] grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <input
                type="text"
                name="name"
                required
                placeholder="Vardas ir pavardė"
                className="w-full min-w-0 border-0 border-b border-[#30363d] bg-transparent py-2.5 text-base text-[#F0F0F0] outline-none focus:border-[#D4A24E]"
              />
              <input
                type="text"
                name="contact"
                required
                placeholder="El. paštas arba telefonas"
                className="w-full min-w-0 border-0 border-b border-[#30363d] bg-transparent py-2.5 text-base text-[#F0F0F0] outline-none focus:border-[#D4A24E]"
              />
              <textarea
                rows={3}
                name="details"
                placeholder="Objekto adresas, plotas ir norima data"
                className="mt-2.5 min-w-0 resize-y border-0 border-b border-[#30363d] bg-transparent text-base text-[#F0F0F0] outline-none focus:border-[#D4A24E] sm:col-span-2"
              />
              {sendError && (
                <p className="col-span-full m-0 text-sm text-red-400">
                  {sendError}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="col-span-full mt-2 justify-self-start rounded-full bg-[#D4A24E] px-6.5 py-3.5 text-[15.5px] font-medium text-[#0D1117] transition-transform hover:bg-[#E8B860] active:scale-[0.93] disabled:opacity-60"
                style={{ transform: submitPop ? "scale(1.12)" : "scale(1)" }}
              >
                {sending ? "Siunčiama…" : "Siųsti užklausą"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="flex w-full flex-col gap-6 px-8 pt-6 pb-10 font-mono text-xs tracking-[0.06em] text-[#8B949E]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,11,16,0) 0%, #080B10 35%, #080B10 100%)",
        }}
      >
        <a
          href="#top"
          onClick={scrollToTop}
          aria-label="Į viršų"
          className="flex h-9.5 w-9.5 items-center justify-center self-center rounded-full text-[#8B949E] transition-colors hover:bg-[#21262d] hover:text-[#E8B860]"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </a>
        <div className="flex flex-wrap items-start justify-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[15px] font-semibold text-[#F0F0F0]">
              KONTAKTAI
            </span>
            <div className="h-px w-full bg-[#30363d]" />
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-base text-[#8B949E] hover:text-[#E8B860]"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1z" />
                </svg>
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-2 text-base text-[#8B949E] hover:text-[#E8B860]"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <path d="M3 6.5l9 6.5 9-6.5" />
                </svg>
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <span>© 2026</span>
          <span>MPTURAI.LT</span>
        </div>
      </footer>
    </div>
  );
}
