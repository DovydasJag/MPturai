import Link from "next/link";

import { LogoMark } from "@/components/logo";
import { siteConfig } from "@/lib/config";

export default function NotFound() {
  return (
    <div className="flex min-h-full w-full flex-1 flex-col bg-[#EAE3D6] text-[#1C1C1A]">
      <header className="flex w-full items-center justify-center px-4 py-6 sm:px-8 sm:py-8">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-4"
          aria-label={siteConfig.name}
        >
          <LogoMark className="h-9 w-9 shrink-0 sm:h-[50px] sm:w-[50px]" />
          <span className="text-lg font-extrabold tracking-[-0.02em] sm:text-[26px]">
            <span className="text-[#D4A24E]">MP</span>
            <span className="text-[#1C1C1A]">Turai</span>
          </span>
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-[640px] flex-1 flex-col items-center justify-center px-5 pb-20 text-center sm:px-8">
        <span className="font-mono text-[64px] leading-none font-semibold tracking-[-0.02em] text-[#D4A24E] sm:text-[88px]">
          404
        </span>
        <div className="mt-5 h-px w-10 bg-[#D4A24E]" />

        <h1 className="m-0 mt-6 text-[clamp(24px,3vw,32px)] leading-[1.15] font-medium tracking-[-0.03em]">
          Puslapis nerastas
        </h1>
        <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-[#7A7566]">
          Šis puslapis šiuo metu neveikia arba adresas įvestas neteisingai.
          Patikrinkite nuorodą — jei ją gavote iš mūsų, parašykite ir atsiųsime
          veikiančią.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-[#D4A24E] px-6.5 py-3.5 text-[15.5px] font-medium text-[#182019] transition-colors hover:bg-[#E8B860]"
          >
            Grįžti į pradžią
          </Link>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[15.5px] text-[#7A7566] underline underline-offset-4 hover:text-[#B8863C]"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </main>
    </div>
  );
}
