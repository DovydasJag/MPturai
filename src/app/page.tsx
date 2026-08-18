"use client";

import { useEffect, useRef, useState } from "react";

import { LogoMark } from "@/components/logo";
import { siteConfig } from "@/lib/config";

const tours = [
  {
    id: "sgUejtUptyy",
    src: "https://my.matterport.com/show/?m=sgUejtUptyy&log=0&help=0&nt=0&play=1&qs=0&brand=1&dh=1&tour=1&gt=1&hr=1&mls=0&mt=1&tagNav=1&pin=1&portal=1&f=1&fp=1&nozoom=0&search=1&wh=1&kb=1&lp=0&title=0&tourcta=1&vr=1",
  },
];

const whyUs = [
  {
    text: "Didžioji dauguma turų yra klientų rankose iki 2 dienų.",
    icon: "clock",
  },
  {
    text: "Lengvai ir greitai susisieksime bei pradėsime darbus. Taupome jūsų laiką.",
    icon: "bolt",
  },
  {
    text: "Nuosava svetainė jūsų 3D turui.",
    icon: "link",
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

function WhyIcon({ icon }: { icon: (typeof whyUs)[number]["icon"] }) {
  const props = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#D4A24E",
    strokeWidth: 1.8,
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
      <path d="M9 15 15 9" />
      <path d="M11 6h7v7" />
      <path d="M6 13v5h5" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A24E"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3H3v6" />
      <path d="M15 21h6v-6" />
      <path d="M21 3l-7 7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

export default function HomePage() {
  const [tourIndex] = useState(0);
  const [ctaPop, setCtaPop] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const [quoteSending, setQuoteSending] = useState(false);
  const [quotePop, setQuotePop] = useState(false);

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

  function popCta() {
    setCtaPop(true);
    setTimeout(() => setCtaPop(false), 220);
  }

  async function sendInquiry(
    payload: {
      name: FormDataEntryValue | null;
      contact: FormDataEntryValue | null;
      details: string;
    },
    setters: {
      setSending: (v: boolean) => void;
      setSent: (v: boolean) => void;
      setError: (v: string | null) => void;
    },
  ) {
    setters.setError(null);
    setters.setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setters.setSent(true);
    } catch {
      setters.setError("Nepavyko išsiųsti užklausos. Bandykite dar kartą.");
    } finally {
      setters.setSending(false);
    }
  }

  async function onQuoteSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuotePop(true);
    setTimeout(() => setQuotePop(false), 220);

    const data = new FormData(e.currentTarget);
    const object = ((data.get("object") as string) ?? "").trim();
    const date = ((data.get("date") as string) ?? "").trim();
    const details = [
      object && `Objektas: ${object}`,
      date && `Norima data: ${date}`,
    ]
      .filter(Boolean)
      .join("\n");

    await sendInquiry(
      { name: data.get("name"), contact: data.get("contact"), details },
      {
        setSending: setQuoteSending,
        setSent: setQuoteSent,
        setError: setQuoteError,
      },
    );
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
    <div className="relative w-full bg-[#EAE3D6] text-[#1C1C1A]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-3 bg-[#EAE3D6] px-4 py-4 sm:gap-6 sm:px-8 sm:py-7">
        <a
          href="#top"
          onClick={scrollToTop}
          className="flex items-center gap-2 sm:gap-4"
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-[50px] sm:w-[50px]" />
          <span className="text-lg font-extrabold tracking-[-0.02em] sm:text-[26px]">
            <span className="text-[#D4A24E]">MP</span>
            <span className="text-[#1C1C1A]">Turai</span>
          </span>
        </a>
        <nav className="flex items-center gap-2 sm:gap-9">
          <a
            href="#apie-mus"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("apie-mus", "center", 1200);
            }}
            className="rounded-full border border-[#1C1C1A]/15 px-3 py-1.5 text-xs text-[#7A7566] transition-colors hover:border-transparent hover:bg-[#182019] hover:text-[#D4A24E] sm:px-4 sm:py-2 sm:text-sm"
          >
            Apie mus
          </a>
          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("footer", "start", 1200);
            }}
            className="rounded-full border border-[#1C1C1A]/15 px-3 py-1.5 text-xs text-[#7A7566] transition-colors hover:border-transparent hover:bg-[#182019] hover:text-[#D4A24E] sm:px-4 sm:py-2 sm:text-sm"
          >
            Kontaktai
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="w-full bg-[#182019]">
        <div
          id="top"
          className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 py-12 sm:gap-14 sm:px-8 sm:py-16 md:grid-cols-2 md:py-24"
        >
          <div className="relative min-w-0">
            <h1 className="animate-reveal m-0 max-w-[22ch] text-left text-[clamp(36px,5vw,60px)] leading-[1.05] font-medium tracking-[-0.035em] text-balance text-[#F3EFE3] opacity-0">
              Parodykite savo objektą, prieš klientui atvykstant.
            </h1>
            <a
              href="#pasiulymas"
              onClick={(e) => {
                popCta();
                handleNavClick(e, "pasiulymas");
              }}
              className="mt-9 inline-block rounded-full bg-[#D4A24E] px-6.5 py-3.5 text-[15.5px] font-medium text-[#182019] transition-transform hover:bg-[#E8B860] active:scale-[0.93]"
              style={{ transform: ctaPop ? "scale(1.12)" : "scale(1)" }}
            >
              Susisiekite!
            </a>
          </div>

          <div className="relative min-w-0">
            <div className="relative aspect-[16/10] w-full">
              <div
                key={tourIndex}
                className="animate-tour-switch absolute inset-0 overflow-hidden rounded-2xl border border-[#00000014] bg-[#EFE9DC]"
                style={{
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)",
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
            <div className="mt-3.5 flex flex-wrap gap-5 px-2 font-mono text-[12.5px] tracking-[0.06em] text-[#9A9C93] sm:px-10">
              <a
                href={currentTourShowUrl}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-[#9A9C93] hover:text-[#E8B860]"
              >
                VISAME EKRANE ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistika — kodėl 3D turai parduoda */}
      <section className="mx-auto max-w-[1440px] px-5 pt-14 pb-2 sm:px-8 sm:pt-20 sm:pb-4">
        <div className="text-center">
          <h2 className="animate-reveal m-0 mx-auto max-w-[22ch] text-[clamp(26px,3.4vw,40px)] leading-[1.1] font-medium tracking-[-0.03em] text-balance opacity-0">
            Su 3D turu parduosite greičiau ir brangiau
          </h2>
          <div className="mx-auto mt-5 h-px w-[90px] bg-[#D4A24E]" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { value: "9%", label: "aukštesnė pardavimo kaina" },
            { value: "31%", label: "greitesnis pardavimas" },
            { value: "87%", label: "daugiau skelbimo peržiūrų" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl bg-[#F1EBDE] px-6 py-9 text-center"
              style={{
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#D4A24E]">
                IKI
              </span>
              <div className="mt-1.5 text-[clamp(44px,5vw,60px)] leading-none font-semibold tracking-[-0.02em] text-[#1C1C1A]">
                {stat.value}
              </div>
              <p className="mt-3 max-w-[18ch] text-[16px] leading-snug text-[#7A7566]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[68ch] text-center text-[16px] leading-relaxed text-[#7A7566]">
          Atskiras kontroliuojamas tyrimas parodė, kad būstai su 3D skaitmeniniu
          dvyniu parduodami{" "}
          <span className="font-medium text-[#1C1C1A]">20% greičiau</span> ir{" "}
          <span className="font-medium text-[#1C1C1A]">4,8% brangiau</span>.
        </p>
      </section>

      {/* Apie mus */}
      <section
        id="apie-mus"
        className="mx-auto mt-6 max-w-[1440px] px-5 pt-9 pb-16 sm:mt-10 sm:px-8 sm:pb-24"
      >
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl bg-[#F1EBDE] p-6 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A24E]/40 bg-[#EAE3D6]">
              <ExpandIcon />
            </div>
            <h2 className="animate-reveal m-0 mt-5 text-[clamp(26px,3vw,34px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
              Kuo užsiema MPTurai?
            </h2>
            <p className="mt-4 max-w-[52ch] text-[18px] leading-relaxed text-[#7A7566]">
              Skenuojame butus, namus, biurus ir komercines patalpas su
              Matterport, kurdami interaktyvius 3D turus, kurie leidžia
              apžiūrėti objektą bet kuriuo metu, iš bet kur.
            </p>
          </div>

          <div className="rounded-3xl bg-[#F1EBDE] p-6 sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4A24E]/40 bg-[#EAE3D6] text-lg font-semibold text-[#D4A24E]">
              ?
            </div>
            <h2 className="animate-reveal m-0 mt-5 text-[clamp(26px,3vw,34px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
              Kodel mes?
            </h2>
            <div className="mt-3 h-px w-10 bg-[#D4A24E]" />
            <ul className="mt-5 flex flex-col gap-4">
              {whyUs.map((item) => (
                <li
                  key={item.text}
                  className="flex items-start gap-3 text-[17px] leading-relaxed text-[#7A7566]"
                >
                  <span className="mt-1.5 shrink-0">
                    <WhyIcon icon={item.icon} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Kaip tai veikia */}
      <section className="mx-auto max-w-[1440px] px-5 pb-8 sm:px-8">
        <div className="rounded-3xl bg-[#182019] px-5 py-12 sm:px-8 sm:py-16 md:py-20">
          <div className="text-center">
            <h2 className="animate-reveal m-0 text-[clamp(32px,4vw,44px)] leading-[1.1] font-medium tracking-[-0.03em] text-[#F3EFE3] opacity-0">
              Kaip tai veikia?
            </h2>
            <div className="mx-auto mt-6 h-px w-[120px] bg-[#D4A24E]" />
          </div>
          <div className="relative mt-7 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            {steps.map((step) => (
              <div
                key={step.n}
                className="flex flex-col items-center px-6 text-center"
              >
                <p className="m-0 flex min-h-[78px] items-start text-[18px] leading-relaxed text-[#9A9C93]">
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
        </div>
      </section>

      {/* Pasiūlymas — individuali užklausa vietoj fiksuotų kainų */}
      <section
        id="pasiulymas-wrap"
        className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24"
      >
        <div id="pasiulymas" className="mx-auto max-w-[760px]">
          <h2 className="animate-reveal m-0 text-center text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
            Gaukite pasiūlymą
          </h2>
          <div className="mx-auto mt-4 h-px w-[90px] bg-[#D4A24E]" />
          <p className="mx-auto mt-5 max-w-[52ch] text-center text-[17px] leading-relaxed text-[#7A7566]">
            Kaina priklauso nuo objekto dydžio ir poreikių. Palikite užklausą ir
            per vieną darbo dieną atsiųsime jums individualų pasiūlymą.
          </p>

          <div
            className="mt-9 rounded-3xl bg-[#F1EBDE] p-6 sm:p-10"
            style={{
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            {quoteSent ? (
              <p className="m-0 text-center text-[19px] text-[#B8863C]">
                Užklausa išsiųsta. Pasiūlymą atsiųsime per vieną darbo dieną.
              </p>
            ) : (
              <form
                onSubmit={onQuoteSubmit}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Vardas ir pavardė"
                  className="w-full min-w-0 border-0 border-b border-[#1C1C1A]/15 bg-transparent py-2.5 text-lg text-[#1C1C1A] outline-none placeholder:text-[#9A8F73] focus:border-[#D4A24E]"
                />
                <input
                  type="text"
                  name="contact"
                  required
                  placeholder="El. paštas arba telefonas"
                  className="w-full min-w-0 border-0 border-b border-[#1C1C1A]/15 bg-transparent py-2.5 text-lg text-[#1C1C1A] outline-none placeholder:text-[#9A8F73] focus:border-[#D4A24E]"
                />
                <input
                  type="text"
                  name="object"
                  placeholder="Objekto adresas ir plotas (m²)"
                  className="w-full min-w-0 border-0 border-b border-[#1C1C1A]/15 bg-transparent py-2.5 text-lg text-[#1C1C1A] outline-none placeholder:text-[#9A8F73] focus:border-[#D4A24E] sm:col-span-2"
                />
                <input
                  type="text"
                  name="date"
                  placeholder="Norima data"
                  className="w-full min-w-0 border-0 border-b border-[#1C1C1A]/15 bg-transparent py-2.5 text-lg text-[#1C1C1A] outline-none placeholder:text-[#9A8F73] focus:border-[#D4A24E] sm:col-span-2"
                />
                {quoteError && (
                  <p className="col-span-full m-0 text-sm text-red-500">
                    {quoteError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={quoteSending}
                  className="col-span-full mt-2 justify-self-start rounded-full bg-[#D4A24E] px-7 py-4 text-[17px] font-medium text-[#182019] transition-transform hover:bg-[#E8B860] active:scale-[0.93] disabled:opacity-60"
                  style={{ transform: quotePop ? "scale(1.12)" : "scale(1)" }}
                >
                  {quoteSending ? "Siunčiama…" : "Gauti pasiūlymą"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div id="footer" className="w-full bg-[#182019]">
        {/* Footer */}
        <footer className="flex w-full flex-col gap-6 px-5 pt-6 pb-10 font-mono text-xs tracking-[0.06em] text-[#9A9C93] sm:px-8">
          <a
            href="#top"
            onClick={scrollToTop}
            aria-label="Į viršų"
            className="flex h-9.5 w-9.5 items-center justify-center self-center rounded-full text-[#9A9C93] transition-colors hover:bg-[#20291F] hover:text-[#E8B860]"
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
              <span className="text-[15px] font-semibold text-[#F3EFE3]">
                KONTAKTAI
              </span>
              <div className="h-px w-full bg-[#D4A24E]" />
              <div className="flex flex-wrap justify-center gap-5">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-base text-[#9A9C93] hover:text-[#E8B860]"
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
                  className="flex items-center gap-2 text-base text-[#9A9C93] hover:text-[#E8B860]"
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
    </div>
  );
}
