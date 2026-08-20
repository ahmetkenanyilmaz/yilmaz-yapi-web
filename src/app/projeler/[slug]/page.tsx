import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactBar } from "@/components/layout/contact-bar";
import { getAdminUser } from "@/lib/admin-auth";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";
import { coverFocusStyle } from "@/lib/cover-focus";
import { youtubeIdFromUrl } from "@/lib/slugify";
import { projectStatusLabels, type ProjectFeatures } from "@/types/project";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

const featureLabels: Record<Exclude<keyof ProjectFeatures, "coverFocus">, string> = {
  projectType: "Proje Türü",
  constructionYear: "Yapım Yılı",
  deliveryDate: "Teslim Tarihi",
  unitCount: "Bağımsız Bölüm",
  unitTypes: "Daire Tipleri",
  landArea: "Arsa Alanı",
  constructionArea: "İnşaat Alanı",
  floorCount: "Kat Sayısı",
  parking: "Otopark",
  elevator: "Asansör",
  technicalSpecs: "Teknik Özellikler",
  other: "Diğer",
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const admin = await getAdminUser();
  const project = await getProjectBySlug(slug, {
    includeUnpublished: Boolean(admin),
  });
  if (!project) notFound();

  const [callPhone, whatsappPhone] = siteConfig.phones;
  const gallery = project.media.filter((item) => item.type === "image");
  const videos = project.media.filter(
    (item) => item.type === "video" || item.type === "youtube",
  );
  const featureEntries = (
    Object.entries(project.features) as [Exclude<keyof ProjectFeatures, "coverFocus">, string | undefined][]
  ).filter(([, value]) => Boolean(value));
  const coverFocus = project.features.coverFocus;

  return (
    <SiteLayout currentPath="/projeler">
      <section className="relative h-[50vh] min-h-[320px] bg-cream-dark">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={coverFocusStyle(coverFocus)}
            priority
            sizes="100vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <Link
            href="/insaat/devam-eden"
            className="mb-4 inline-block text-sm text-white/80 hover:text-white"
          >
            ← Projeler
          </Link>
          <h1 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-white/80">{project.location}</p>
          <p className="mt-1 text-sm text-white/70">
            {projectStatusLabels[project.status]}
            {!project.published && " · Taslak"}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {project.summary && (
              <p className="text-lg leading-relaxed text-charcoal">{project.summary}</p>
            )}
            {project.description && (
              <p className="mt-6 leading-relaxed text-muted">{project.description}</p>
            )}

            {gallery.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl text-charcoal">Galeri</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {gallery.map((item) => (
                    <figure key={item.id} className="overflow-hidden bg-cream-dark">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.url}
                        alt={item.title || project.title}
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl text-charcoal">Videolar</h2>
                <div className="mt-6 space-y-8">
                  {videos.map((item) => (
                    <ProjectVideo key={item.id} url={item.url} type={item.type} title={item.title} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="border border-cream-dark bg-cream-dark/30 p-6">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Proje Bilgileri
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <InfoRow label="Durum" value={projectStatusLabels[project.status]} />
              {project.location && <InfoRow label="Konum" value={project.location} />}
              {featureEntries.map(([key, value]) => (
                <InfoRow key={key} label={featureLabels[key]} value={value ?? ""} />
              ))}
            </dl>
            <a
              href={whatsappPhone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full bg-gold py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-dark"
            >
              WhatsApp
            </a>
            <a
              href={callPhone.href}
              className="mt-3 block w-full border border-charcoal py-3 text-center text-sm font-semibold uppercase tracking-wide text-charcoal hover:border-[#b8934a] hover:text-[#b8934a]"
            >
              Bizi Arayın
            </a>
            <Link
              href="/iletisim"
              className="mt-3 block w-full py-3 text-center text-sm text-muted hover:text-[#b8934a]"
            >
              İletişim formu
            </Link>
          </aside>
        </div>
      </section>

      <ContactBar />
    </SiteLayout>
  );
}

function ProjectVideo({
  url,
  type,
  title,
}: {
  url: string;
  type: "image" | "video" | "youtube";
  title?: string | null;
}) {
  if (type === "youtube") {
    const id = youtubeIdFromUrl(url);
    if (!id) return null;
    return (
      <div>
        {title && <p className="mb-2 text-sm text-charcoal">{title}</p>}
        <div className="relative aspect-video overflow-hidden bg-cream-dark">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title || "Proje videosu"}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      {title && <p className="mb-2 text-sm text-charcoal">{title}</p>}
      <video
        src={url}
        controls
        preload="none"
        className="w-full bg-charcoal"
      />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-cream-dark pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-charcoal">{value}</dd>
    </div>
  );
}
