import { siteConfig } from "@/lib/site-config";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SiteJsonLd() {
  const [primaryPhone] = siteConfig.phones;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo-emblem.png`,
    email: siteConfig.email,
    telephone: primaryPhone.href.replace("tel:", ""),
    sameAs: [siteConfig.social.instagram],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yakut 2 Sk No: 1",
      addressLocality: "Bahçelievler",
      addressRegion: "İstanbul",
      postalCode: siteConfig.address.postalCode,
      addressCountry: "TR",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "tr-TR",
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}/images/logo-emblem.png`,
    telephone: primaryPhone.href.replace("tel:", ""),
    email: siteConfig.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Şirinevler, Yakut 2 Sk No: 1",
      addressLocality: "Bahçelievler",
      addressRegion: "İstanbul",
      postalCode: siteConfig.address.postalCode,
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.address.geo.latitude,
      longitude: siteConfig.address.geo.longitude,
    },
    areaServed: {
      "@type": "City",
      name: "İstanbul",
    },
    sameAs: [siteConfig.social.instagram],
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
      <JsonLdScript data={localBusiness} />
    </>
  );
}
