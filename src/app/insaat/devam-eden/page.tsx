import {
  ProjectsListingPage,
  createProjectsMetadata,
} from "@/components/projects/projects-listing-page";
import { getOngoingProjects } from "@/lib/projects";

export const metadata = createProjectsMetadata(
  "Devam Eden Projeler",
  "Yılmaz Yapı devam eden ve planlama aşamasındaki inşaat projeleri.",
);

export default function DevamEdenPage() {
  const projects = getOngoingProjects();

  return (
    <ProjectsListingPage
      title="Devam Eden Projeler"
      subtitle="İnşaat"
      description="Halihazırda inşa edilmekte olan ve planlama aşamasındaki projelerimiz."
      projects={projects}
      currentPath="/insaat/devam-eden"
    />
  );
}
