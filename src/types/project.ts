export type ProjectStatus = "ongoing" | "completed" | "permit";

export type MediaType = "image" | "video" | "youtube";

export type ProjectFeatures = {
  projectType?: string;
  constructionYear?: string;
  deliveryDate?: string;
  unitCount?: string;
  unitTypes?: string;
  landArea?: string;
  constructionArea?: string;
  floorCount?: string;
  parking?: string;
  elevator?: string;
  technicalSpecs?: string;
  other?: string;
  /** Kapak/kart kırpımında görünen nokta, örn. "50% 35%" */
  coverFocus?: string;
};

export type ProjectMediaItem = {
  id: string;
  projectId: string;
  type: MediaType;
  url: string;
  storagePath?: string | null;
  title?: string | null;
  description?: string | null;
  thumbnailUrl?: string | null;
  sortOrder: number;
};

export type Project = {
  id: string;
  slug: string;
  name: string;
  title: string;
  location: string;
  district?: string | null;
  city?: string | null;
  status: ProjectStatus;
  summary: string;
  description: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  features: ProjectFeatures;
  media: ProjectMediaItem[];
  createdAt: string;
  updatedAt: string;
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  ongoing: "Devam Ediyor",
  completed: "Tamamlandı",
  permit: "Ruhsat / Hazırlık Aşamasında",
};

export const PROJECT_STATUSES: ProjectStatus[] = [
  "ongoing",
  "completed",
  "permit",
];
