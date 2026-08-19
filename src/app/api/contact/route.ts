import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  company?: string;
  kvkk?: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = hits.get(ip);

  if (!current || now > current.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "İletişim formu henüz yapılandırılmadı." },
      { status: 503 },
    );
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Çok fazla deneme yaptınız. Lütfen biraz sonra tekrar deneyin." },
      { status: 429 },
    );
  }

  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (body.company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (body.kvkk !== true) {
    return NextResponse.json(
      { error: "Devam etmek için KVKK aydınlatma metnini onaylamanız gerekir." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "İsim, e-posta ve mesaj zorunludur." },
      { status: 400 },
    );
  }

  if (
    name.length > MAX_NAME ||
    email.length > MAX_EMAIL ||
    message.length > MAX_MESSAGE
  ) {
    return NextResponse.json(
      { error: "Gönderilen bilgiler çok uzun. Lütfen kısaltıp tekrar deneyin." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `${siteConfig.name} — İletişim formu: ${name}`,
    text: [
      `İsim: ${name}`,
      `E-posta: ${email}`,
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
