"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { slugify } from "@/lib/slugify";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProjectFeatures, ProjectStatus } from "@/types/project";
import { PROJECT_STATUSES } from "@/types/project";
import { normalizeCoverFocus } from "@/lib/cover-focus";

function revalidateProjectPaths(slug?: string) {
  revalidatePath("/insaat/devam-eden");
  revalidatePath("/insaat/tamamlanan");
  revalidatePath("/site-haritasi");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  if (slug) revalidatePath(`/projeler/${slug}`);
}

function parseStatus(value: FormDataEntryValue | null): ProjectStatus {
  const status = String(value ?? "");
  if (PROJECT_STATUSES.includes(status as ProjectStatus)) {
    return status as ProjectStatus;
  }
  return "ongoing";
}

function parseFeatures(formData: FormData, existing?: ProjectFeatures | null): ProjectFeatures {
  const get = (key: string) => {
    const value = String(formData.get(key) ?? "").trim();
    return value || undefined;
  };

  return {
    projectType: get("projectType"),
    constructionYear: get("constructionYear"),
    deliveryDate: get("deliveryDate"),
    unitCount: get("unitCount"),
    unitTypes: get("unitTypes"),
    landArea: get("landArea"),
    constructionArea: get("constructionArea"),
    floorCount: get("floorCount"),
    parking: get("parking"),
    elevator: get("elevator"),
    technicalSpecs: get("technicalSpecs"),
    other: get("other"),
    coverFocus: existing?.coverFocus,
  };
}

async function uniqueSlug(base: string, excludeId?: string) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) throw new Error("Supabase yapılandırılmamış.");

  let slug = slugify(base) || "proje";
  let n = 2;
  while (true) {
    let query = supabase.from("projects").select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.maybeSingle();
    if (!data) return slug;
    slug = `${slugify(base) || "proje"}-${n}`;
    n += 1;
  }
}

export async function signInAdmin(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase henüz bağlanmadı. .env.local dosyasını kontrol edin." };
  }

  const identifier = String(formData.get("username") ?? formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!identifier || !password) {
    return { error: "Kullanıcı adı ve şifre gerekli." };
  }

  const email =
    identifier.includes("@")
      ? identifier
      : identifier.toLowerCase() === "admin"
        ? "admin@yilmazyapi.ltd"
        : identifier;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) {
    return { error: "Giriş başarısız. Bilgilerinizi kontrol edin." };
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "Bu hesap yönetici değil." };
  }

  redirect("/admin");
}

export async function signOutAdmin() {
  const supabase = await createServerSupabaseClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function createProject(
  formData: FormData,
): Promise<{ error: string } | { id: string; slug: string }> {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Proje adı gerekli." };

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = await uniqueSlug(requestedSlug || name);

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name,
      slug,
      status: parseStatus(formData.get("status")),
      short_description: String(formData.get("short_description") ?? "").trim() || null,
      description: String(formData.get("description") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      district: String(formData.get("district") ?? "").trim() || null,
      city: String(formData.get("city") ?? "").trim() || "İstanbul",
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
      features: parseFeatures(formData),
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Proje oluşturulamadı." };
  }

  revalidateProjectPaths(slug);
  return { id: data.id, slug };
}

export async function updateProject(projectId: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Proje adı gerekli." };

  const requestedSlug = String(formData.get("slug") ?? "").trim();
  const slug = await uniqueSlug(requestedSlug || name, projectId);

  const { data: existing } = await supabase
    .from("projects")
    .select("features")
    .eq("id", projectId)
    .maybeSingle();

  const { error } = await supabase
    .from("projects")
    .update({
      name,
      slug,
      status: parseStatus(formData.get("status")),
      short_description: String(formData.get("short_description") ?? "").trim() || null,
      description: String(formData.get("description") ?? "").trim() || null,
      location: String(formData.get("location") ?? "").trim() || null,
      district: String(formData.get("district") ?? "").trim() || null,
      city: String(formData.get("city") ?? "").trim() || "İstanbul",
      published: formData.get("published") === "on",
      featured: formData.get("featured") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
      features: parseFeatures(formData, (existing?.features as ProjectFeatures | null) ?? null),
    })
    .eq("id", projectId);

  if (error) return { error: error.message };

  revalidateProjectPaths(slug);
  return { success: true };
}

export async function togglePublished(projectId: string, published: boolean) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data, error } = await supabase
    .from("projects")
    .update({ published })
    .eq("id", projectId)
    .select("slug")
    .single();

  if (error) return { error: error.message };
  revalidateProjectPaths(data?.slug);
  return { success: true };
}

export async function deleteProject(projectId: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data: media } = await supabase
    .from("project_media")
    .select("storage_path")
    .eq("project_id", projectId);

  const { data: project } = await supabase
    .from("projects")
    .select("slug, cover_image")
    .eq("id", projectId)
    .maybeSingle();

  const paths = (media ?? [])
    .map((item) => item.storage_path)
    .filter((path): path is string => Boolean(path));

  if (project?.cover_image?.includes("/project-media/")) {
    const marker = "/project-media/";
    const index = project.cover_image.indexOf(marker);
    if (index >= 0) {
      paths.push(decodeURIComponent(project.cover_image.slice(index + marker.length)));
    }
  }

  if (paths.length > 0) {
    await supabase.storage.from("project-media").remove(paths);
  }

  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) return { error: error.message };

  revalidateProjectPaths(project?.slug);
  redirect("/admin/projects");
}

export async function saveMediaRecord(input: {
  projectId: string;
  type: "image" | "video";
  url: string;
  storagePath: string;
  title?: string;
  thumbnailUrl?: string;
}) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data: last } = await supabase
    .from("project_media")
    .select("sort_order")
    .eq("project_id", input.projectId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("project_media").insert({
    project_id: input.projectId,
    type: input.type,
    url: input.url,
    storage_path: input.storagePath,
    title: input.title || null,
    thumbnail_url: input.thumbnailUrl || null,
    sort_order: (last?.sort_order ?? 0) + 1,
  });

  if (error) return { error: error.message };
  revalidatePath(`/admin/projects/${input.projectId}/edit`);
  return { success: true };
}

export async function setCoverImage(projectId: string, url: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data, error } = await supabase
    .from("projects")
    .update({ cover_image: url })
    .eq("id", projectId)
    .select("slug")
    .single();

  if (error) return { error: error.message };
  revalidateProjectPaths(data?.slug);
  revalidatePath(`/admin/projects/${projectId}/edit`);
  return { success: true };
}

export async function updateCoverFocus(projectId: string, coverFocus: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data: existing, error: readError } = await supabase
    .from("projects")
    .select("slug, features")
    .eq("id", projectId)
    .maybeSingle();

  if (readError || !existing) {
    return { error: readError?.message ?? "Proje bulunamadı." };
  }

  const features = {
    ...((existing.features as ProjectFeatures | null) ?? {}),
    coverFocus: normalizeCoverFocus(coverFocus),
  };

  const { data, error } = await supabase
    .from("projects")
    .update({ features })
    .eq("id", projectId)
    .select("slug")
    .single();

  if (error) return { error: error.message };
  revalidateProjectPaths(data?.slug);
  revalidatePath(`/admin/projects/${projectId}/edit`);
  return { success: true };
}

export async function deleteMedia(mediaId: string, projectId: string) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  const { data: media } = await supabase
    .from("project_media")
    .select("storage_path, url")
    .eq("id", mediaId)
    .maybeSingle();

  if (media?.storage_path) {
    await supabase.storage.from("project-media").remove([media.storage_path]);
  }

  const { data: project } = await supabase
    .from("projects")
    .select("cover_image")
    .eq("id", projectId)
    .maybeSingle();

  if (project?.cover_image && media?.url && project.cover_image === media.url) {
    await supabase.from("projects").update({ cover_image: null }).eq("id", projectId);
  }

  const { error } = await supabase.from("project_media").delete().eq("id", mediaId);
  if (error) return { error: error.message };

  revalidatePath(`/admin/projects/${projectId}/edit`);
  return { success: true };
}

export async function reorderMedia(projectId: string, orderedIds: string[]) {
  await requireAdmin();
  const supabase = await createServerSupabaseClient();
  if (!supabase) return { error: "Supabase yapılandırılmamış." };

  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("project_media").update({ sort_order: index }).eq("id", id),
    ),
  );

  revalidatePath(`/admin/projects/${projectId}/edit`);
  return { success: true };
}
