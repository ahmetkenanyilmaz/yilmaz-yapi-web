import type { Project } from "@/types/project";

const placeholderImages = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
  "https://images.unsplash.com/photo-1605276374101-dee0a782c10?w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6981b9570f?w=1200&q=80",
];

export const projects: Project[] = [
  {
    slug: "zumrut-vadi-rezidans",
    title: "Zümrüt Vadi Rezidans",
    location: "Kağıthane, İstanbul",
    status: "devam-ediyor",
    summary: "Modern yaşamın tüm konforunu sunan, yeşil alanlarla çevrili rezidans projesi.",
    description:
      "Zümrüt Vadi Rezidans, İstanbul'un yükselen değer bölgelerinden Kağıthane'de konumlanmaktadır. Proje; geniş balkonlar, sosyal donatı alanları ve güvenli otopark imkânlarıyla aileler için ideal bir yaşam alanı sunmaktadır.",
    image: placeholderImages[0],
    featured: true,
    units: "84 daire",
    area: "12.500 m²",
    year: "2024–2026",
  },
  {
    slug: "nova-park-evleri",
    title: "Nova Park Evleri",
    location: "Başakşehir, İstanbul",
    status: "tamamlandi",
    summary: "Tamamlanan, park manzaralı modern konut projesi.",
    description:
      "Nova Park Evleri, Başakşehir'in sakin ve planlı yerleşim alanında hayata geçirilmiştir. Proje teslim edilmiş olup, site sakinleri konforlu yaşam alanlarına kavuşmuştur.",
    image: placeholderImages[1],
    featured: true,
    units: "56 daire",
    area: "8.200 m²",
    year: "2022",
  },
  {
    slug: "yesil-tepe-konaklari",
    title: "Yeşil Tepe Konakları",
    location: "Ümraniye, İstanbul",
    status: "devam-ediyor",
    summary: "Kentsel dönüşüm kapsamında yenilenen yaşam alanı.",
    description:
      "Yeşil Tepe Konakları, kentsel dönüşüm sürecinde güvenli ve şeffaf bir yaklaşımla hayata geçirilmektedir. Deprem yönetmeliğine uygun yapı sistemi ve modern mimari anlayış bir arada.",
    image: placeholderImages[2],
    featured: true,
    units: "120 daire",
    area: "18.000 m²",
    year: "2025–2027",
  },
  {
    slug: "altin-port-residence",
    title: "Altın Port Residence",
    location: "Kartal, İstanbul",
    status: "planlama",
    summary: "Deniz manzaralı lüks konut projesi — planlama aşamasında.",
    description:
      "Altın Port Residence, Kartal sahil şeridine yakın konumuyla dikkat çeken yeni nesil bir konut projesidir. Proje detayları yakında paylaşılacaktır.",
    image: placeholderImages[3],
    featured: false,
    units: "96 daire",
    area: "14.800 m²",
    year: "2027",
  },
  {
    slug: "bahce-kent-evleri",
    title: "Bahçe Kent Evleri",
    location: "Pendik, İstanbul",
    status: "tamamlandi",
    summary: "Geniş bahçeli, düşük katlı konut projesi.",
    description:
      "Bahçe Kent Evleri, ailelerin tercih ettiği sakin bir mahallede tamamlanmıştır. Her dairede özel bahçe ve otopark imkânı sunulmaktadır.",
    image: placeholderImages[4],
    featured: false,
    units: "32 daire",
    area: "6.400 m²",
    year: "2021",
  },
  {
    slug: "merkez-plaza-konutlari",
    title: "Merkez Plaza Konutları",
    location: "Maltepe, İstanbul",
    status: "devam-ediyor",
    summary: "Merkezi konumda, ulaşım avantajlı konut projesi.",
    description:
      "Merkez Plaza Konutları, metro ve ana ulaşım hatlarına yakın konumuyla yatırımcıların ve ailelerin ilgisini çekmektedir.",
    image: placeholderImages[5],
    featured: false,
    units: "72 daire",
    area: "11.200 m²",
    year: "2024–2026",
  },
  {
    slug: "gunes-vadi-sitesi",
    title: "Güneş Vadi Sitesi",
    location: "Sancaktepe, İstanbul",
    status: "tamamlandi",
    summary: "Spor alanları ve çocuk parkıyla donatılmış site projesi.",
    description:
      "Güneş Vadi Sitesi, sosyal donatı alanlarıyla öne çıkan tamamlanmış bir projedir. Yüzme havuzu, fitness salonu ve çocuk oyun alanları mevcuttur.",
    image: placeholderImages[6],
    featured: false,
    units: "108 daire",
    area: "16.500 m²",
    year: "2020",
  },
  {
    slug: "elit-yasam-residence",
    title: "Elit Yaşam Residence",
    location: "Ataşehir, İstanbul",
    status: "devam-ediyor",
    summary: "Prestijli lokasyonda yüksek standartlı konut projesi.",
    description:
      "Elit Yaşam Residence, Ataşehir'in en değerli bölgelerinden birinde yükselmektedir. Akıllı ev sistemleri ve premium malzeme kullanımı ön plandadır.",
    image: placeholderImages[7],
    featured: false,
    units: "64 daire",
    area: "10.800 m²",
    year: "2025–2026",
  },
  {
    slug: "vadi-istanbul-evleri",
    title: "Vadi İstanbul Evleri",
    location: "Sarıyer, İstanbul",
    status: "planlama",
    summary: "Doğa ile iç içe, butik ölçekli konut projesi.",
    description:
      "Vadi İstanbul Evleri, yeşil alanlarla çevrili butik bir proje olarak planlanmaktadır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.",
    image: placeholderImages[8],
    featured: false,
    units: "24 daire",
    area: "5.600 m²",
    year: "2028",
  },
  {
    slug: "deniz-yildizi-konutlari",
    title: "Deniz Yıldızı Konutları",
    location: "Tuzla, İstanbul",
    status: "devam-ediyor",
    summary: "Sahil bandına yakın, modern mimari konut projesi.",
    description:
      "Deniz Yıldızı Konutları, Tuzla'nın gelişen bölgesinde inşa edilmektedir. Deniz manzaralı daire seçenekleri ve geniş teras alanları sunulmaktadır.",
    image: placeholderImages[9],
    featured: false,
    units: "48 daire",
    area: "9.100 m²",
    year: "2024–2025",
  },
  {
    slug: "park-cadde-residence",
    title: "Park Cadde Residence",
    location: "Beylikdüzü, İstanbul",
    status: "tamamlandi",
    summary: "Cadde üzerinde ticari+konut karma proje.",
    description:
      "Park Cadde Residence, zemin katında ticari alanlar, üst katlarda konut birimleri barındıran karma kullanımlı bir projedir.",
    image: placeholderImages[10],
    featured: false,
    units: "40 daire + 8 dükkan",
    area: "7.800 m²",
    year: "2019",
  },
  {
    slug: "yildiz-tepe-villalari",
    title: "Yıldız Tepe Villaları",
    location: "Çekmeköy, İstanbul",
    status: "planlama",
    summary: "Müstakil villa konseptinde lüks yaşam projesi.",
    description:
      "Yıldız Tepe Villaları, İstanbul'un doğusunda müstakil villa konseptiyle planlanmaktadır. Her villa özel bahçe ve havuz imkânına sahip olacaktır.",
    image: placeholderImages[11],
    featured: false,
    units: "12 villa",
    area: "15.000 m²",
    year: "2028",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getOngoingProjects(): Project[] {
  return projects.filter(
    (p) => p.status === "devam-ediyor" || p.status === "planlama",
  );
}

export function getCompletedProjects(): Project[] {
  return projects.filter((p) => p.status === "tamamlandi");
}
