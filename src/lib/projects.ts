import { createServerSupabaseClient } from "@/lib/supabase/server";
import { mapProject, type MediaRow, type ProjectRow } from "@/lib/project-mappers";
import type { Project, ProjectStatus } from "@/types/project";

async function fetchMedia(projectIds: string[]) {
  if (projectIds.length === 0) return [] as MediaRow[];
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("project_media")
    .select(
      "id, project_id, type, url, storage_path, title, description, thumbnail_url, sort_order",
    )
    .in("project_id", projectIds)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as MediaRow[];
}

function attachMedia(rows: ProjectRow[], media: MediaRow[]): Project[] {
  return rows.map((row) =>
    mapProject(
      row,
      media.filter((item) => item.project_id === row.id),
    ),
  );
}

export async function getPublishedProjects(status?: ProjectStatus): Promise<Project[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("projects")
    .select(
      "id, name, slug, status, short_description, description, location, district, city, cover_image, published, featured, sort_order, features, created_at, updated_at",
    )
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error || !data) return [];

  const rows = data as ProjectRow[];
  const media = await fetchMedia(rows.map((row) => row.id));
  return attachMedia(rows, media);
}

export async function getOngoingProjects() {
  return getPublishedProjects("ongoing");
}

export async function getCompletedProjects() {
  return getPublishedProjects("completed");
}

export async function getFeaturedProjects(limit = 3) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, name, slug, status, short_description, description, location, district, city, cover_image, published, featured, sort_order, features, created_at, updated_at",
    )
    .eq("published", true)
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit);

  if (error || !data) return [];
  const rows = data as ProjectRow[];
  const media = await fetchMedia(rows.map((row) => row.id));
  return attachMedia(rows, media);
}

export async function getProjectBySlug(
  slug: string,
  options?: { includeUnpublished?: boolean },
): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  let query = supabase
    .from("projects")
    .select(
      "id, name, slug, status, short_description, description, location, district, city, cover_image, published, featured, sort_order, features, created_at, updated_at",
    )
    .eq("slug", slug);

  if (!options?.includeUnpublished) {
    query = query.eq("published", true);
  }

  const { data, error } = await query.maybeSingle();
  if (error || !data) return null;

  const row = data as ProjectRow;
  const media = await fetchMedia([row.id]);
  return mapProject(row, media);
}

export async function getAdminProjects(status?: ProjectStatus): Promise<Project[]> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return [];

  let query = supabase
    .from("projects")
    .select(
      "id, name, slug, status, short_description, description, location, district, city, cover_image, published, featured, sort_order, features, created_at, updated_at",
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error || !data) return [];

  const rows = data as ProjectRow[];
  const media = await fetchMedia(rows.map((row) => row.id));
  return attachMedia(rows, media);
}

export async function getAdminProjectById(id: string): Promise<Project | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, name, slug, status, short_description, description, location, district, city, cover_image, published, featured, sort_order, features, created_at, updated_at",
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  const row = data as ProjectRow;
  const media = await fetchMedia([row.id]);
  return mapProject(row, media);
}
