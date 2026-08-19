import * as tus from "tus-js-client";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { uniqueFileName } from "@/lib/slugify";
import { saveMediaRecord, setCoverImage } from "@/app/admin/actions";

export const MAX_VIDEO_BYTES = 5 * 1024 * 1024 * 1024;
export const MAX_GALLERY_IMAGES = 10;
const STANDARD_UPLOAD_MAX = 6 * 1024 * 1024;
const TUS_CHUNK = 6 * 1024 * 1024;

type UploadInput = {
  file: File;
  slug: string;
  folder: "cover" | "gallery" | "videos";
  projectId: string;
  type: "image" | "video";
  title?: string;
  setAsCover?: boolean;
  onProgress?: (percent: number) => void;
};

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export async function uploadProjectFile({
  file,
  slug,
  folder,
  projectId,
  type,
  title,
  setAsCover,
  onProgress,
}: UploadInput) {
  const supabase = createBrowserSupabaseClient();
  const env = getSupabasePublicEnv();
  if (!supabase || !env) {
    return { error: "Supabase tarayıcıda yapılandırılmamış." };
  }

  const path = `projects/${slug}/${folder}/${uniqueFileName(file.name)}`;
  onProgress?.(1);

  if (file.size > STANDARD_UPLOAD_MAX) {
    const tusError = await resumableUpload({
      file,
      path,
      supabaseUrl: env.url,
      getAccessToken: async () => {
        const { data } = await supabase.auth.getSession();
        return data.session?.access_token ?? null;
      },
      anonKey: env.anonKey,
      onProgress,
    });
    if (tusError) return { error: tusError };
  } else {
    const { error } = await supabase.storage.from("project-media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) return { error: error.message };
  }

  onProgress?.(100);

  const {
    data: { publicUrl },
  } = supabase.storage.from("project-media").getPublicUrl(path);

  if (setAsCover) {
    const coverResult = await setCoverImage(projectId, publicUrl);
    if (coverResult?.error) return coverResult;
    return { success: true };
  }

  return saveMediaRecord({
    projectId,
    type,
    url: publicUrl,
    storagePath: path,
    title,
  });
}

function resumableUpload({
  file,
  path,
  supabaseUrl,
  getAccessToken,
  anonKey,
  onProgress,
}: {
  file: File;
  path: string;
  supabaseUrl: string;
  getAccessToken: () => Promise<string | null>;
  anonKey: string;
  onProgress?: (percent: number) => void;
}) {
  return new Promise<string | null>((resolve) => {
    void (async () => {
      const token = await getAccessToken();
      if (!token) {
        resolve("Oturum bulunamadı. Admin olarak tekrar giriş yapın.");
        return;
      }

      const upload = new tus.Upload(file, {
        endpoint: `${supabaseUrl}/storage/v1/upload/resumable`,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        headers: {
          authorization: `Bearer ${token}`,
          apikey: anonKey,
        },
        uploadDataDuringCreation: true,
        removeFingerprintOnSuccess: true,
        metadata: {
          bucketName: "project-media",
          objectName: path,
          contentType: file.type || "video/mp4",
          cacheControl: "3600",
        },
        chunkSize: TUS_CHUNK,
        onError(error) {
          resolve(error.message);
        },
        onProgress(bytesUploaded, bytesTotal) {
          if (!bytesTotal) return;
          onProgress?.(Math.max(1, Math.round((bytesUploaded / bytesTotal) * 100)));
        },
        onSuccess() {
          resolve(null);
        },
      });

      upload.start();
    })();
  });
}
