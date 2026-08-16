import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "İletişim formu henüz yapılandırılmadı." },
      { status: 503 },
    );
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !message) {
    return NextResponse.json(
      { error: "İsim ve mesaj zorunludur." },
      { status: 400 },
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Yılmaz Yapı <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email || undefined,
    subject: `${siteConfig.name} — İletişim formu: ${name}`,
    text: [
      `İsim: ${name}`,
      email ? `E-posta: ${email}` : "E-posta: (belirtilmedi)",
      "",
      "Mesaj:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Contact form email failed:", error);
    return NextResponse.json(
      { error: "Mesaj gönderilemedi. Lütfen telefon ile ulaşın." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
