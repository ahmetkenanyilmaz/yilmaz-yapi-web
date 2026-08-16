import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/site-layout";
import { ContactBar } from "@/components/layout/contact-bar";
import { PageBanner } from "@/components/layout/page-banner";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types/project";

type ProjectsPageProps = {
  title: string;
  subtitle: string;
  description: string;
  projects: Project[];
  currentPath: string;
};

export function ProjectsListingPage({
  title,
  subtitle,
  description,
  projects,
  currentPath,
}: ProjectsPageProps) {
  return (
    <SiteLayout currentPath={currentPath}>
      <PageBanner title={title} subtitle={subtitle} description={description} />
      <section className="mx-auto max-w-7xl bg-cream px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {projects.length === 0 ? (
          <p className="text-center text-muted">Bu kategoride henüz proje bulunmuyor.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </section>
      <ContactBar />
    </SiteLayout>
  );
}

export function createProjectsMetadata(title: string, description: string): Metadata {
  return { title, description };
}
