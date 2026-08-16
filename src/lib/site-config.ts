export const siteConfig = {
  name: "Yılmaz Yapı",
  tagline: "Kentsel Dönüşüm ve Modern Yaşam Alanları",
  description:
    "İstanbul'da 20 yılı aşkın tecrübemizle güvenilir, kaliteli ve gelecek odaklı yaşam alanları inşa ediyoruz.",
  address: {
    line1: "Şirinevler Mahallesi, Cengiz Topel Caddesi No: 1-2",
    line2: "Bahçelievler / İstanbul",
    full: "Şirinevler Mahallesi, Cengiz Topel Caddesi No: 1-2, Bahçelievler, İstanbul",
    mapsQuery: "Şirinevler Mahallesi Cengiz Topel Caddesi No 1-2 Bahçelievler İstanbul",
    mapsEmbed:
      "https://maps.google.com/maps?q=Cengiz+Topel+Cad.+No+1-2+%C5%9Eirinevler+Bah%C3%A7elievler+%C4%B0stanbul&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  phones: [
    {
      label: "Bizi Arayın",
      number: "+90 532 732 90 60",
      href: "tel:+905327329060",
      whatsapp: "https://wa.me/905327329060",
    },
    {
      label: "WhatsApp",
      number: "+90 553 139 32 20",
      href: "tel:+905531393220",
      whatsapp: "https://wa.me/905531393220",
    },
  ],
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
  nav: [
    { href: "/", label: "Anasayfa" },
    {
      href: "/insaat/devam-eden",
      label: "İnşaat",
      children: [
        { href: "/insaat/devam-eden", label: "Devam Eden Projeler" },
        { href: "/insaat/tamamlanan", label: "Tamamlanan Projeler" },
      ],
    },
    { href: "/kentsel-donusum", label: "Kentsel Dönüşüm" },
    { href: "/hakkimizda", label: "Hakkımızda" },
    { href: "/iletisim", label: "İletişim" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];

export function isNavDropdown(
  item: NavItem,
): item is NavItem & { children: readonly { href: string; label: string }[] } {
  return "children" in item && Array.isArray(item.children);
}
