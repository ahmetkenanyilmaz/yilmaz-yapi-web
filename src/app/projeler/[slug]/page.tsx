import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactBar } from "@/components/layout/contact-bar";
import { getProjectBySlug, projects } from "@/lib/projects";
import { projectStatusLabels } from "@/types/project";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <SiteLayout currentPath="/projeler">
      <section className="relative h-[50vh] min-h-[320px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
          <aside className="rounded-sm border border-cream-dark bg-cream-dark/30 p-6">
            <h2 className="font-serif text-lg font-semibold text-charcoal">
              Proje Bilgileri
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <InfoRow label="Durum" value={projectStatusLabels[project.status]} />
              {project.units && <InfoRow label="Birim" value={project.units} />}
              {project.area && <InfoRow label="Alan" value={project.area} />}
              {project.year && <InfoRow label="Dönem" value={project.year} />}
            </dl>
            <Link
              href="/iletisim"
              className="mt-6 block w-full rounded-sm bg-gold py-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-gold-dark"
            >
              Bilgi Alın
            </Link>
          </aside>
        </div>
      </section>

      <ContactBar />
    </SiteLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-cream-dark pb-3">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium text-charcoal">{value}</dd>
    </div>
  );
}
