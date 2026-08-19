import { ProjectsIndex } from "@/app/admin/(panel)/projects/page";
import { getAdminProjects } from "@/lib/projects";

export default async function PermitAdminPage() {
  const projects = await getAdminProjects("permit");
  return (
    <ProjectsIndex
      title="Ruhsat Aşamasındakiler"
      projects={projects}
      status="permit"
    />
  );
}
