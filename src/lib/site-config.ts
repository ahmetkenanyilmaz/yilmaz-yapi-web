export const siteConfig = {
  name: "Yılmaz Yapı",
  legalName:
    "Öz-Yılmaz Orman Ürünleri İnşaat Mobilya Nakliye San. ve Tic. Ltd. Şti.",
  url: "https://yilmazyapi.ltd",
  email: "info@yilmazyapi.ltd",
  tagline: "Kentsel Dönüşüm ve Modern Yaşam Alanları",
  description:
    "1977'ye uzanan üretim tecrübemizle İstanbul'da güvenilir, kaliteli ve gelecek odaklı yaşam alanları inşa ediyoruz.",
  address: {
    line1: "Şirinevler, Yakut 2 Sk No: 1",
    line2: "34188 Bahçelievler / İstanbul",
    full: "Şirinevler, Yakut 2 Sk No: 1, 34188 Bahçelievler, İstanbul",
    postalCode: "34188",
    geo: {
      latitude: 40.9995529,
      longitude: 28.8488859,
    },
    googlePlaceId: "ChIJq-6AIACluxQRMTJ8LmKm50U",
    mapsQuery:
      "YILMAZ YAPI İNANOĞLU MOBİLYA, Yakut 2 Sk No 1, Şirinevler, Bahçelievler, İstanbul",
    mapsLink:
      "https://www.google.com/maps/place/YILMAZ+YAPI+-+%C4%B0NANO%C4%9ELU+MOB%C4%B0LYA/@40.9995529,28.8488859,17z/data=!3m1!4b1!4m6!3m5!1s0x14caa50008eae62b:0x4597a62e51fc6131!8m2!3d40.9995529!4d28.8488859!16s%2Fg%2F11xdtrxl1h",
    mapsEmbed:
      "https://maps.google.com/maps?q=40.9995529,28.8488859&hl=tr&z=17&output=embed",
  },
  phones: [
    {
      label: "Bizi Arayın",
      name: "Kadir YILMAZ",
      number: "+90 532 732 90 60",
      href: "tel:+905327329060",
      whatsapp: "https://wa.me/905327329060",
    },
    {
      label: "WhatsApp",
      name: "Ahmet Kenan YILMAZ",
      number: "+90 553 139 32 20",
      href: "tel:+905531393220",
      whatsapp: "https://wa.me/905531393220",
    },
  ],
  social: {
    instagram: "https://www.instagram.com/yilmazyapiresmi/",
    instagramHandle: "@yilmazyapiresmi",
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
