import type {
  MediaType,
  Project,
  ProjectFeatures,
  ProjectMediaItem,
  ProjectStatus,
} from "@/types/project";

export type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
  short_description: string | null;
  description: string | null;
  location: string | null;
  district: string | null;
  city: string | null;
  cover_image: string | null;
  published: boolean;
  featured: boolean;
  sort_order: number;
  features: ProjectFeatures | null;
  created_at: string;
  updated_at: string;
};

export type MediaRow = {
  id: string;
  project_id: string;
  type: MediaType;
  url: string;
  storage_path: string | null;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  sort_order: number;
};

export function mapMedia(row: MediaRow): ProjectMediaItem {
  return {
    id: row.id,
    projectId: row.project_id,
    type: row.type,
    url: row.url,
    storagePath: row.storage_path,
    title: row.title,
    description: row.description,
    thumbnailUrl: row.thumbnail_url,
    sortOrder: row.sort_order,
  };
}

export function mapProject(row: ProjectRow, media: MediaRow[] = []): Project {
  const locationParts = [row.district, row.city].filter(Boolean);
  const location =
    row.location?.trim() ||
    (locationParts.length > 0 ? locationParts.join(", ") : "");

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    title: row.name,
    location,
    district: row.district,
    city: row.city,
    status: row.status,
    summary: row.short_description ?? "",
    description: row.description ?? "",
    image: row.cover_image,
    featured: row.featured,
    published: row.published,
    sortOrder: row.sort_order,
    features: row.features ?? {},
    media: media
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapMedia),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
