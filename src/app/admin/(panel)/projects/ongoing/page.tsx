import { ProjectsIndex } from "@/app/admin/(panel)/projects/page";
import { getAdminProjects } from "@/lib/projects";

export default async function OngoingAdminPage() {
  const projects = await getAdminProjects("ongoing");
  return <ProjectsIndex title="Devam Edenler" projects={projects} status="ongoing" />;
}
