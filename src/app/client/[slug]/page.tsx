import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LogoMark } from "@/components/logo";
import { clients, getClientBySlug, tourEmbedUrl } from "@/lib/clients";
import { siteConfig } from "@/lib/config";

type Block =
  { type: "paragraph"; text: string } | { type: "list"; items: string[] };

/**
 * Aprašymas skaidomas į pastraipas ir sąrašus:
 * tuščia eilutė = nauja pastraipa, eilutė, prasidedanti „- “ = sąrašo punktas.
 */
function toBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({
      type: "paragraph",
      text: paragraph.join(" ").replace(/\s+/g, " ").trim(),
    });
    paragraph = [];
  };

  const flushList = () => {
    if (items.length === 0) return;
    blocks.push({ type: "list", items });
    items = [];
  };

  for (const rawLine of text.trim().split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    const bullet = line.match(/^[-–—•]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      items.push(bullet[1].trim());
    } else {
      flushList();
      paragraph.push(line);
    }
  }

  flushParagraph();
  flushList();
  return blocks;
}

/** Pirmas tekstas be sąrašų — naudojamas <meta description>. */
function toPlainSummary(text: string) {
  const first = toBlocks(text).find((block) => block.type === "paragraph");
  return first?.text;
}

/**
 * Nežinomas subdomenas (pvz. suklysta kliento pavardėje) grąžina tikrą 404,
 * o ne 200 su „nerasta“ turiniu. Naujas klientas atsiranda po perkūrimo.
 */
export const dynamicParams = false;

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
    description: toPlainSummary(client.description) ?? siteConfig.description,
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
  const blocks = toBlocks(client.description);

  // Jei klientas pateikė bent vieną savo kontaktą, rodomi tik jo duomenys.
  // Jei nepateikė nieko — rodomi MPTurai kontaktai, kad apačia neliktų tuščia.
  const hasOwnContact = Boolean(
    client.contact?.phone || client.contact?.email || client.name,
  );
  const contactName = hasOwnContact ? client.name : siteConfig.name;
  const contactPhone = hasOwnContact
    ? client.contact?.phone
    : siteConfig.contact.phone;
  const contactEmail = hasOwnContact
    ? client.contact?.email
    : siteConfig.contact.email;

  return (
    <div className="relative w-full bg-[#EAE3D6] text-[#1C1C1A]">
      {/* Header */}
      <header className="flex w-full items-center justify-center gap-3 bg-[#EAE3D6] px-4 py-4 sm:gap-6 sm:px-8 sm:py-7">
        <div className="flex items-center gap-2 sm:gap-4">
          <LogoMark className="h-9 w-9 shrink-0 sm:h-[50px] sm:w-[50px]" />
          <span className="text-lg font-extrabold tracking-[-0.02em] sm:text-[26px]">
            <span className="text-[#D4A24E]">MP</span>
            <span className="text-[#1C1C1A]">Turai</span>
          </span>
        </div>
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
          {client.address && (
            <p className="m-0 mt-3 text-[18px] text-[#9A9C93]">
              {client.address}
            </p>
          )}

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
      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="animate-reveal m-0 text-[clamp(24px,2.8vw,30px)] leading-[1.1] font-medium tracking-[-0.03em] opacity-0">
          Apie objektą
        </h2>
        <div className="mt-2 h-px w-10 bg-[#D4A24E]" />

        <div
          className="mt-7 rounded-2xl bg-[#F1EBDE] p-6 sm:p-8"
          style={{
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:gap-12">
            <div className="max-w-[68ch] lg:flex-1">
              {blocks.map((block, index) =>
                block.type === "list" ? (
                  <ul
                    key={index}
                    className="m-0 mb-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-[#7A7566] marker:text-[#D4A24E] last:mb-0"
                  >
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={index}
                    className="m-0 mb-4 text-[17px] leading-relaxed text-[#7A7566] last:mb-0"
                  >
                    {block.text}
                  </p>
                ),
              )}
            </div>

            {client.details && client.details.length > 0 && (
              <dl className="m-0 flex flex-wrap gap-x-12 gap-y-5 border-t border-[#1C1C1A]/10 pt-6 lg:w-[190px] lg:shrink-0 lg:flex-col lg:gap-y-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
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
            )}
          </div>
        </div>
      </section>

      {/* Footer — kliento kontaktai */}
      <div className="w-full bg-[#182019]">
        <footer className="mx-auto flex max-w-[1200px] flex-col items-center gap-3 px-5 py-12 text-center sm:px-8">
          <span className="font-mono text-xs tracking-[0.1em] text-[#D4A24E]">
            KONTAKTAI
          </span>
          {contactName && (
            <span className="text-[22px] tracking-[-0.02em] text-[#F3EFE3]">
              {contactName}
            </span>
          )}
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
            {contactPhone && (
              <a
                href={`tel:${contactPhone.replace(/\s/g, "")}`}
                className="text-[17px] text-[#9A9C93] hover:text-[#E8B860]"
              >
                {contactPhone}
              </a>
            )}
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="text-[17px] text-[#9A9C93] hover:text-[#E8B860]"
              >
                {contactEmail}
              </a>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
