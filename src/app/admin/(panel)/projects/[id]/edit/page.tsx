import { notFound } from "next/navigation";
import { MediaManager } from "@/components/admin/media-manager";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProjectById } from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = await getAdminProjectById(id);
  if (!project) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-charcoal">{project.name}</h1>
      <p className="mt-2 text-sm text-muted">Sitedeki sayfa: /projeler/{project.slug}</p>
      <div className="mt-8">
        <MediaManager project={project} />
      </div>
      <div className="mt-12">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
