import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/config";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const contact = typeof body?.contact === "string" ? body.contact.trim() : "";
  const details = typeof body?.details === "string" ? body.details.trim() : "";

  if (!name || !contact) {
    return Response.json(
      { error: "Trūksta privalomų laukų." },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error("Contact form: SMTP env vars are not configured.");
    return Response.json(
      { error: "Užklausų siuntimas šiuo metu nepasiekiamas." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"${siteConfig.name} svetainė" <${user}>`,
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email,
      replyTo: contact,
      subject: `Nauja užklausa iš ${siteConfig.name} svetainės — ${name}`,
      text: [
        `Vardas ir pavardė: ${name}`,
        `El. paštas arba telefonas: ${contact}`,
        "",
        "Objekto adresas, plotas ir norima data:",
        details || "(nenurodyta)",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return Response.json(
      { error: "Nepavyko išsiųsti užklausos. Bandykite dar kartą." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
