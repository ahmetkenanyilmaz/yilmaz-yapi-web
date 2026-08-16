export type ProjectStatus = "devam-ediyor" | "tamamlandi" | "planlama";

export type Project = {
  slug: string;
  title: string;
  location: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  image: string;
  featured: boolean;
  units?: string;
  area?: string;
  year?: string;
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  "devam-ediyor": "Devam Ediyor",
  tamamlandi: "Tamamlandı",
  planlama: "Planlama Aşamasında",
};
