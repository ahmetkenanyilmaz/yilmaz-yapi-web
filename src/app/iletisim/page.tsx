import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function IletisimPage() {
  const [primary, secondary] = siteConfig.phones;

  return (
    <SiteLayout currentPath="/iletisim">
      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* AKİ tarzı çerçeveli iletişim kutusu */}
          <div className="border-2 border-charcoal/80 bg-cream p-6 sm:p-10">
            <h1 className="text-center font-serif text-2xl font-semibold uppercase tracking-wide text-charcoal sm:text-3xl">
              Yeni Bir Yaşam İçin Bize Ulaşın
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {/* Sol: Form */}
              <div>
                <ContactForm />
              </div>

              {/* Sağ: Bilgiler */}
              <div className="space-y-8">
                <ContactInfoBlock
                  icon={<LocationIcon />}
                  title="Adres"
                  content={
                    <>
                      {siteConfig.address.line1}
                      <br />
                      {siteConfig.address.line2}
                    </>
                  }
                />

                <ContactInfoBlock
                  icon={<PhoneIcon />}
                  title="Telefon"
                  content={
                    <div className="space-y-1">
                      <a href={primary.href} className="block hover:text-gold">
                        {primary.number}
                      </a>
                      <a href={secondary.href} className="block hover:text-gold">
                        {secondary.number}
                      </a>
                    </div>
                  }
                />

                <ContactInfoBlock
                  icon={<WhatsAppIcon />}
                  title="WhatsApp"
                  content={
                    <div className="space-y-1">
                      {siteConfig.phones.map((phone) => (
                        <a
                          key={phone.number}
                          href={phone.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:text-gold"
                        >
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  }
                />

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">
                    Sosyal Medya
                  </p>
                  <div className="flex gap-3">
                    <SocialLink href={siteConfig.social.facebook} label="Facebook">
                      f
                    </SocialLink>
                    <SocialLink href={siteConfig.social.instagram} label="Instagram">
                      in
                    </SocialLink>
                    <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
                      li
                    </SocialLink>
                  </div>
                </div>
              </div>
            </div>

            {/* Harita */}
            <div className="mt-10 border-2 border-charcoal">
              <iframe
                title="Yılmaz Yapı konum haritası"
                src={siteConfig.address.mapsEmbed}
                className="h-[320px] w-full sm:h-[400px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactInfoBlock({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">
          {title}
        </p>
        <div className="mt-2 text-sm leading-relaxed text-muted">{content}</div>
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-white transition-colors hover:bg-gold"
    >
      {children}
    </a>
  );
}

function LocationIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
