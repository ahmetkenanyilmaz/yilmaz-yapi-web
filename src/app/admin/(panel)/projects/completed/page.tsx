import { ProjectsIndex } from "@/app/admin/(panel)/projects/page";
import { getAdminProjects } from "@/lib/projects";

export default async function CompletedAdminPage() {
  const projects = await getAdminProjects("completed");
  return <ProjectsIndex title="Tamamlananlar" projects={projects} status="completed" />;
}
