import type { Metadata } from "next";
import Link from "next/link";

import { LogoMark } from "@/components/logo";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privatumo politika",
  description:
    "Kaip MPTurai renka, naudoja ir saugo asmens duomenis, pateiktus per svetainės užklausos formą.",
};

/**
 * Duomenų valdytojas. Jei dar neturite įmonės — pakanka vardo ir pavardės:
 * `code` ir `address` palikite tuščius ir jie tiesiog nebus rodomi.
 * Užsiregistravus, į `code` įrašykite individualios veiklos pažymos numerį
 * arba įmonės kodą.
 */
const company = {
  name: "Markas Mejus",
  code: "",
  address: "",
};

const updatedAt = "2026-08-20";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="m-0 text-[clamp(20px,2.2vw,24px)] leading-[1.2] font-medium tracking-[-0.02em] text-[#1C1C1A]">
        {title}
      </h2>
      <div className="mt-2 h-px w-10 bg-[#D4A24E]" />
      <div className="mt-4 space-y-3 text-[17px] leading-relaxed text-[#7A7566]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="relative w-full bg-[#EAE3D6] text-[#1C1C1A]">
      <header className="flex w-full items-center justify-center bg-[#EAE3D6] px-4 py-6 sm:px-8 sm:py-8">
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

      <main className="mx-auto max-w-[820px] px-5 pb-16 sm:px-8 sm:pb-24">
        <h1 className="m-0 text-[clamp(30px,4vw,44px)] leading-[1.1] font-medium tracking-[-0.03em]">
          Privatumo politika
        </h1>
        <p className="mt-3 font-mono text-xs tracking-[0.1em] text-[#9A8F73]">
          ATNAUJINTA {updatedAt}
        </p>

        <div
          className="mt-9 rounded-3xl bg-[#F1EBDE] p-6 sm:p-10"
          style={{
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.05)",
          }}
        >
          <Section title="Duomenų valdytojas">
            <p className="m-0">
              Jūsų asmens duomenis tvarko {company.name}
              {[
                company.code && `kodas ${company.code}`,
                company.address && `adresas ${company.address}`,
              ]
                .filter(Boolean)
                .map((part) => `, ${part}`)
                .join("")}
              .
            </p>
            <p className="m-0">
              El. paštas:{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#B8863C] underline underline-offset-2 hover:text-[#D4A24E]"
              >
                {siteConfig.contact.email}
              </a>
              , telefonas: {siteConfig.contact.phone}.
            </p>
          </Section>

          <Section title="Kokius duomenis renkame">
            <p className="m-0">
              Kai užpildote užklausos formą, gauname jūsų nurodytą vardą ir
              pavardę, el. pašto adresą arba telefono numerį, objekto adresą bei
              plotą ir pageidaujamą datą.
            </p>
            <p className="m-0">
              Svetainė nerenka duomenų automatiškai — nenaudojame analitikos,
              rinkodaros ar profiliavimo įrankių.
            </p>
          </Section>

          <Section title="Kodėl juos tvarkome">
            <p className="m-0">
              Duomenys naudojami tik tam, kad galėtume atsakyti į jūsų užklausą,
              pateikti pasiūlymą ir susitarti dėl paslaugos. Teisinis pagrindas
              — jūsų sutikimas, išreikštas pažymint varnelę prie formos, ir
              veiksmai jūsų prašymu prieš sudarant sutartį.
            </p>
            <p className="m-0">
              Nenaudojame duomenų kitiems tikslams ir neperduodame jų
              rinkodarai.
            </p>
          </Section>

          <Section title="Kiek laiko saugome">
            <p className="m-0">
              Užklausas saugome tol, kol jos reikalingos susirašinėjimui ir
              pasiūlymui pateikti, bet ne ilgiau kaip 12 mėnesių, jei nesudaroma
              sutartis. Sudarius sutartį, duomenys saugomi teisės aktų nustatytą
              terminą.
            </p>
          </Section>

          <Section title="Kam perduodame duomenis">
            <p className="m-0">
              Užklausos pasiekia mus el. paštu, kurį teikia Hostinger. 3D turai
              talpinami Matterport platformoje — atidarę turą, jungiatės prie
              Matterport serverių, todėl jiems taikoma jų pačių privatumo
              politika.
            </p>
            <p className="m-0">
              Duomenų neparduodame ir neperduodame tretiesiems asmenims,
              išskyrus atvejus, kai to reikalauja teisės aktai.
            </p>
          </Section>

          <Section title="Slapukai">
            <p className="m-0">
              Ši svetainė nenaudoja analitikos ar rinkodaros slapukų. Šriftai
              talpinami mūsų pačių serveryje, todėl naršyklė nesijungia prie
              trečiųjų šalių dėl jų.
            </p>
            <p className="m-0">
              Įkeltas Matterport 3D turas gali naudoti savo slapukus arba
              vietinę saugyklą — tai daroma Matterport, o ne mūsų iniciatyva.
            </p>
          </Section>

          <Section title="Jūsų teisės">
            <p className="m-0">
              Turite teisę susipažinti su savo duomenimis, prašyti juos
              ištaisyti ar ištrinti, apriboti jų tvarkymą, nesutikti su tvarkymu
              ir bet kada atšaukti duotą sutikimą.
            </p>
            <p className="m-0">
              Dėl bet kurios iš šių teisių rašykite{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-[#B8863C] underline underline-offset-2 hover:text-[#D4A24E]"
              >
                {siteConfig.contact.email}
              </a>
              . Jei manote, kad duomenis tvarkome netinkamai, galite pateikti
              skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt).
            </p>
          </Section>
        </div>

        <p className="mt-8 text-center">
          <Link
            href="/"
            className="font-mono text-xs tracking-[0.06em] text-[#7A7566] hover:text-[#B8863C]"
          >
            ← GRĮŽTI Į PRADŽIĄ
          </Link>
        </p>
      </main>
    </div>
  );
}
