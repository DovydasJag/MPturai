import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LogoMark } from "@/components/logo";
import { clients, getClientBySlug, tourEmbedUrl } from "@/lib/clients";
import { siteConfig } from "@/lib/config";

/** Tuščia eilutė aprašyme = nauja pastraipa. Įtraukos iš šablono pašalinamos. */
function toParagraphs(text: string) {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

export async function generateStaticParams() {
  return clients.map((client) => ({ slug: client.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) return { title: "3D turas" };

  return {
    title: client.title,
    description: toParagraphs(client.description)[0] ?? siteConfig.description,
  };
}

export default async function ClientTourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) notFound();

  const tourSrc = tourEmbedUrl(client.matterportId);
  const showUrl = `https://my.matterport.com/show/?m=${client.matterportId}`;
  const paragraphs = toParagraphs(client.description);

  return (
    <div className="relative w-full bg-[#EAE3D6] text-[#1C1C1A]">
      {/* Header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between gap-3 bg-[#EAE3D6] px-4 py-4 sm:gap-6 sm:px-8 sm:py-7">
        <a
          href={siteConfig.url}
          className="flex items-center gap-2 sm:gap-4"
          aria-label={siteConfig.name}
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-[50px] sm:w-[50px]" />
          <span className="text-lg font-extrabold tracking-[-0.02em] sm:text-[26px]">
            <span className="text-[#D4A24E]">MP</span>
            <span className="text-[#1C1C1A]">Turai</span>
          </span>
        </a>
        <span className="rounded-full border border-[#1C1C1A]/15 px-3 py-1.5 text-xs text-[#7A7566] sm:px-4 sm:py-2 sm:text-sm">
          {client.name}
        </span>
      </header>

      {/* Turas */}
      <section className="w-full bg-[#182019]">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <span className="font-mono text-xs tracking-[0.1em] text-[#D4A24E]">
            3D TURAS
          </span>
          <h1 className="animate-reveal m-0 mt-3 max-w-[24ch] text-[clamp(30px,4.2vw,48px)] leading-[1.08] font-medium tracking-[-0.035em] text-balance text-[#F3EFE3] opacity-0">
            {client.title}
          </h1>

          <div
            className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#00000014] bg-[#EFE9DC]"
            style={{
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <iframe
              src={tourSrc}
              title={`${client.title} — 3D turas`}
              allow="fullscreen; xr-spatial-tracking"
              allowFullScreen
              className="block h-full w-full border-0"
            />
          </div>

          <div className="mt-3.5 flex px-2 font-mono text-[12.5px] tracking-[0.06em] text-[#9A9C93]">
            <a
              href={showUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto text-[#9A9C93] hover:text-[#E8B860]"
            >
              VISAME EKRANE ↗
            </a>
          </div>
        </div>
      </section>

      {/* Aprašymas */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="animate-reveal m-0 text-[clamp(24px,2.8vw,30px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
          Apie objektą
        </h2>
        <div className="mt-2 h-px w-10 bg-[#D4A24E]" />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div
            className="rounded-2xl bg-[#F1EBDE] p-6 sm:p-8"
            style={{
              boxShadow:
                "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="m-0 mb-4 text-[17px] leading-relaxed text-[#7A7566] last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {client.details && client.details.length > 0 && (
            <div
              className="rounded-2xl bg-[#F1EBDE] p-6 sm:p-8"
              style={{
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
              }}
            >
              <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
                {client.details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="font-mono text-xs tracking-[0.1em] text-[#D4A24E]">
                      {detail.label.toUpperCase()}
                    </dt>
                    <dd className="m-0 mt-1.5 text-[22px] font-semibold tracking-[-0.02em] text-[#1C1C1A]">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {client.contact && (client.contact.phone || client.contact.email) && (
          <div className="mt-6 rounded-2xl bg-[#182019] px-6 py-7 sm:px-8">
            <span className="font-mono text-xs tracking-[0.1em] text-[#D4A24E]">
              SUSISIEKITE
            </span>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
              <span className="text-[19px] text-[#F3EFE3]">{client.name}</span>
              {client.contact.phone && (
                <a
                  href={`tel:${client.contact.phone.replace(/\s/g, "")}`}
                  className="text-[17px] text-[#9A9C93] hover:text-[#E8B860]"
                >
                  {client.contact.phone}
                </a>
              )}
              {client.contact.email && (
                <a
                  href={`mailto:${client.contact.email}`}
                  className="text-[17px] text-[#9A9C93] hover:text-[#E8B860]"
                >
                  {client.contact.email}
                </a>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <div className="w-full bg-[#182019]">
        <footer className="flex w-full items-center justify-center px-5 py-8 font-mono text-xs tracking-[0.06em] text-[#9A9C93] sm:px-8">
          <a href={siteConfig.url} className="hover:text-[#E8B860]">
            Sukurkite savo 3D turą su MPTurai ↗
          </a>
        </footer>
      </div>
    </div>
  );
}
