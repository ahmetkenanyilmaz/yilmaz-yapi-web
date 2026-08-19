"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMedia, reorderMedia, setCoverImage } from "@/app/admin/actions";
import {
  formatFileSize,
  MAX_GALLERY_IMAGES,
  MAX_VIDEO_BYTES,
  uploadProjectFile,
} from "@/lib/admin-upload";
import type { Project, ProjectMediaItem } from "@/types/project";

type MediaManagerProps = {
  project: Project;
};

export function MediaManager({ project }: MediaManagerProps) {
  const images = project.media.filter((item) => item.type === "image");
  const videos = project.media.filter((item) => item.type === "video");

  return (
    <section className="space-y-10 border border-[#b8934a]/40 bg-white p-5">
      <div>
        <h2 className="font-serif text-2xl text-charcoal">Fotoğraf ve video</h2>
        <p className="mt-1 text-sm text-muted">
          Kapak 1 fotoğraf. Galeri en fazla {MAX_GALLERY_IMAGES} fotoğraf.
          Video sayısı serbest; her video en fazla 5 GB.
        </p>
      </div>
      <CoverUploader project={project} />
      <GalleryManager projectId={project.id} slug={project.slug} coverUrl={project.image} items={images} />
      <VideoManager projectId={project.id} slug={project.slug} items={videos} />
    </section>
  );
}

function CoverUploader({ project }: { project: Project }) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <h2 className="font-serif text-xl text-charcoal">Kapak görseli</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="relative h-40 w-full overflow-hidden bg-cream-dark sm:w-64">
          {preview || project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview || project.image || ""}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              Kapak yok
            </div>
          )}
        </div>
        <div>
          <label className="flex cursor-pointer items-center justify-between gap-3 border border-cream-dark bg-cream px-4 py-3 text-sm text-charcoal hover:border-[#b8934a]">
            <span>{pending ? "Yükleniyor..." : "Kapak fotoğrafı seç"}</span>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#b8934a]">
              Seç
            </span>
            <input
              type="file"
              accept="image/*"
              disabled={pending}
              className="sr-only"
              onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setPreview(URL.createObjectURL(file));
              setError(null);
              startTransition(async () => {
                const result = await uploadProjectFile({
                  file,
                  slug: project.slug,
                  folder: "cover",
                  projectId: project.id,
                  type: "image",
                  setAsCover: true,
                });
                if (result.error) setError(result.error);
                else router.refresh();
              });
            }}
            />
          </label>
          <p className="mt-2 text-xs text-muted">
            Yalnızca 1 kapak. Yenisini seçerseniz eskisi değişir.
          </p>
          {pending && <p className="mt-2 text-xs text-muted">Yükleniyor...</p>}
          {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
        </div>
      </div>
    </div>
  );
}

function GalleryManager({
  projectId,
  slug,
  coverUrl,
  items,
}: {
  projectId: string;
  slug: string;
  coverUrl: string | null;
  items: ProjectMediaItem[];
}) {
  const router = useRouter();
  const [ordered, setOrdered] = useState(items);
  const [dragId, setDragId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setOrdered(items);
  }, [items]);

  return (
    <div>
      <h2 className="font-serif text-xl text-charcoal">
        Galeri ({ordered.length}/{MAX_GALLERY_IMAGES})
      </h2>
      <p className="mt-1 text-sm text-muted">
        En fazla {MAX_GALLERY_IMAGES} fotoğraf. Aynı anda birden fazla seçebilirsiniz.
        Sıralamak için sürükleyin.
      </p>
      <label
        className={`mt-4 flex items-center justify-between gap-3 border border-cream-dark bg-cream px-4 py-3 text-sm text-charcoal ${
          pending || ordered.length >= MAX_GALLERY_IMAGES
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-[#b8934a]"
        }`}
      >
        <span>
          {pending
            ? "Yükleniyor..."
            : ordered.length >= MAX_GALLERY_IMAGES
              ? "Galeri doldu (10/10)"
              : "Galeri fotoğrafları seç"}
        </span>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#b8934a]">
          Seç
        </span>
        <input
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          disabled={pending || ordered.length >= MAX_GALLERY_IMAGES}
          onChange={(event) => {
            const selected = Array.from(event.target.files ?? []);
            event.target.value = "";
            const remaining = MAX_GALLERY_IMAGES - ordered.length;
            const files = selected.slice(0, remaining);
            if (files.length === 0) return;
            if (selected.length > remaining) {
              setError(
                `Galeri en fazla ${MAX_GALLERY_IMAGES} fotoğraf alabilir. ${remaining} fotoğraf eklendi.`,
              );
            } else {
              setError(null);
            }
            startTransition(async () => {
              for (const file of files) {
                const result = await uploadProjectFile({
                  file,
                  slug,
                  folder: "gallery",
                  projectId,
                  type: "image",
                });
                if (result.error) {
                  setError(result.error);
                  break;
                }
              }
              router.refresh();
            });
          }}
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {ordered.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDragId(item.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (!dragId || dragId === item.id) return;
              const next = [...ordered];
              const from = next.findIndex((row) => row.id === dragId);
              const to = next.findIndex((row) => row.id === item.id);
              const [moved] = next.splice(from, 1);
              next.splice(to, 0, moved);
              setOrdered(next);
              setDragId(null);
              startTransition(async () => {
                await reorderMedia(projectId, next.map((row) => row.id));
              });
            }}
            className="border border-cream-dark bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.url} alt="" className="h-28 w-full object-cover" />
            <div className="flex flex-wrap gap-2 px-2 py-2 text-[11px]">
              {coverUrl === item.url ? (
                <span className="text-[#b8934a]">Kapak</span>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    startTransition(async () => {
                      await setCoverImage(projectId, item.url);
                      router.refresh();
                    })
                  }
                >
                  Kapak yap
                </button>
              )}
              <button
                type="button"
                className="text-red-700"
                onClick={() => {
                  if (!confirm("Bu görseli silmek istediğinize emin misiniz?")) return;
                  startTransition(async () => {
                    await deleteMedia(item.id, projectId);
                    router.refresh();
                  });
                }}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
      {pending && <p className="mt-2 text-xs text-muted">İşleniyor...</p>}
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

function VideoManager({
  projectId,
  slug,
  items,
}: {
  projectId: string;
  slug: string;
  items: ProjectMediaItem[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-serif text-xl text-charcoal">Videolar ({items.length})</h2>
      <p className="mt-1 text-sm text-muted">
        Birden fazla video ekleyebilirsiniz. Her dosya en fazla {formatFileSize(MAX_VIDEO_BYTES)}.
        Büyük dosyalarda sayfayı kapatmayın.
      </p>

      <div className="mt-4">
        <label className="flex cursor-pointer items-center justify-between gap-3 border border-cream-dark bg-cream px-4 py-3 text-sm text-charcoal hover:border-[#b8934a]">
          <span>
            {pending
              ? `Video yükleniyor${progress != null ? `… %${progress}` : "…"}`
              : "Video dosyaları seç"}
          </span>
          <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#b8934a]">
            Seç
          </span>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            multiple
            disabled={pending}
            className="sr-only"
            onChange={async (event) => {
              const files = Array.from(event.target.files ?? []);
              event.target.value = "";
              if (files.length === 0) return;
              const tooBig = files.find((file) => file.size > MAX_VIDEO_BYTES);
              if (tooBig) {
                setError(
                  `${tooBig.name} ${formatFileSize(MAX_VIDEO_BYTES)} sınırını aşıyor (${formatFileSize(tooBig.size)}).`,
                );
                return;
              }
              setError(null);
              setPending(true);
              for (const [index, file] of files.entries()) {
                setProgress(0);
                const result = await uploadProjectFile({
                  file,
                  slug,
                  folder: "videos",
                  projectId,
                  type: "video",
                  title: file.name,
                  onProgress: setProgress,
                });
                if (result.error) {
                  setError(
                    files.length > 1
                      ? `${index + 1}. video: ${result.error}`
                      : result.error,
                  );
                  break;
                }
              }
              setPending(false);
              setProgress(null);
              router.refresh();
            }}
          />
        </label>
        {pending && (
          <p className="mt-2 text-xs text-muted">
            Video yükleniyor{progress != null ? `… %${progress}` : "…"}
          </p>
        )}
      </div>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.id} className="border border-cream-dark bg-white p-3">
            <video
              src={item.url}
              controls
              preload="metadata"
              className="mb-2 w-full bg-charcoal"
            />
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="truncate text-charcoal">
                {item.title || "Proje videosu"}
              </span>
              <button
                type="button"
                className="shrink-0 text-red-700"
                onClick={() => {
                  if (!confirm("Bu videoyu silmek istediğinize emin misiniz?")) return;
                  void (async () => {
                    await deleteMedia(item.id, projectId);
                    router.refresh();
                  })();
                }}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
