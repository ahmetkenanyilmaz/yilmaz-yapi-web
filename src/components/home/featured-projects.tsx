import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types/project";

type FeaturedProjectsProps = {
  projects: Project[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="border-t border-cream-dark bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-3xl font-semibold text-charcoal sm:text-4xl">
            Öne Çıkan Projeler
          </h2>
          <Link
            href="/projeler"
            className="hidden text-sm font-medium text-gold hover:text-gold-dark sm:block"
          >
            Tümünü Gör →
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="text-muted">Projelerimiz yakında burada.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projeler"
            className="text-sm font-medium text-gold hover:text-gold-dark"
          >
            Tüm Projeleri Gör →
          </Link>
        </div>
      </div>
    </section>
  );
}
