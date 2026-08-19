import Link from "next/link";
import { ProjectTable } from "@/components/admin/project-table";
import { getAdminProjects } from "@/lib/projects";
import type { ProjectStatus } from "@/types/project";
import { projectStatusLabels } from "@/types/project";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <ProjectsIndex
      title="Projeler"
      projects={projects}
    />
  );
}

export function ProjectsIndex({
  title,
  projects,
  status,
}: {
  title: string;
  projects: Awaited<ReturnType<typeof getAdminProjects>>;
  status?: ProjectStatus;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-charcoal">{title}</h1>
          {status && (
            <p className="mt-2 text-sm text-muted">{projectStatusLabels[status]}</p>
          )}
        </div>
        <Link
          href="/admin/projects/new"
          className="bg-charcoal px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#b8934a]"
        >
          Yeni Proje
        </Link>
      </div>
      <div className="mt-8">
        <ProjectTable projects={projects} />
      </div>
    </div>
  );
}
