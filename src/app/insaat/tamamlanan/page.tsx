import {
  ProjectsListingPage,
  createProjectsMetadata,
} from "@/components/projects/projects-listing-page";
import { getCompletedProjects } from "@/lib/projects";

export const metadata = createProjectsMetadata(
  "Tamamlanan Projeler",
  "Yılmaz Yapı tarafından tamamlanan inşaat projeleri.",
);

export default function TamamlananPage() {
  const projects = getCompletedProjects();

  return (
    <ProjectsListingPage
      title="Tamamlanan Projeler"
      subtitle="İnşaat"
      description="Başarıyla tamamladığımız ve teslim ettiğimiz projelerimiz."
      projects={projects}
      currentPath="/insaat/tamamlanan"
    />
  );
}
