import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getClientBySlug } from "@/lib/clients";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  return { title: client ? client.name : "3D turas" };
}

export default async function ClientTourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const client = getClientBySlug(slug);
  if (!client) notFound();

  const tourSrc = `https://my.matterport.com/show/?m=${client.matterportId}`;

  return (
    <div className="flex min-h-full flex-col bg-[#EAE3D6]">
      <header className="flex items-center justify-center gap-3 px-6 py-6">
        <div className="relative h-9 w-9 shrink-0">
          <Image
            src="/logo-beige.png"
            alt="MPTurai logo"
            fill
            sizes="36px"
            className="object-contain"
            priority
          />
        </div>
        <span className="text-lg font-semibold tracking-[-0.02em] text-[#1C1C1A]">
          {client.name}
        </span>
      </header>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 pb-8">
        <div
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#00000014] bg-[#F1EBDE]"
          style={{
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <iframe
            src={tourSrc}
            title={`${client.name} — 3D turas`}
            allow="fullscreen; xr-spatial-tracking"
            allowFullScreen
            className="block h-full w-full border-0"
          />
        </div>
      </main>

      <footer className="flex justify-center pb-8">
        <a
          href={siteConfig.url}
          className="font-mono text-xs tracking-[0.06em] text-[#7A7566] hover:text-[#B8863C]"
        >
          Sukurkite savo 3D turą su MPTurai ↗
        </a>
      </footer>
    </div>
  );
}
