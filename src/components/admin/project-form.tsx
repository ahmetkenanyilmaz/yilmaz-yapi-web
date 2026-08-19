"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject } from "@/app/admin/actions";
import { MAX_GALLERY_IMAGES, uploadProjectFile } from "@/lib/admin-upload";
import type { Project, ProjectStatus } from "@/types/project";
import { projectStatusLabels } from "@/types/project";
import { slugify } from "@/lib/slugify";

const fieldClass =
  "mt-1 w-full border border-cream-dark bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-[#b8934a]";

type ProjectFormProps = {
  project?: Project;
};

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [uploadNote, setUploadNote] = useState<string | null>(null);

  const features = project?.features ?? {};
  const isNew = !project;

  return (
    <form
      className="space-y-10"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setError(null);
        setSaved(false);
        setUploadNote(null);
        startTransition(async () => {
          if (isNew) {
            const result = await createProject(formData);
            if (result && "error" in result && result.error) {
              setError(result.error);
              return;
            }
            if (!result || !("id" in result)) {
              setError("Proje oluşturulamadı.");
              return;
            }

            const { id, slug: createdSlug } = result;
            const uploadError = await uploadDraftMedia({
              projectId: id,
              slug: createdSlug,
              coverFile,
              galleryFiles,
              videoFiles,
              onNote: setUploadNote,
            });
            if (uploadError) {
              setError(uploadError);
              router.push(`/admin/projects/${id}/edit`);
              return;
            }
            router.push(`/admin/projects/${id}/edit`);
            return;
          }

          const result = await updateProject(project.id, formData);
          if (result && "error" in result && result.error) {
            setError(result.error);
            return;
          }
          setSaved(true);
        });
      }}
    >
      {isNew ? (
        <DraftMediaFields
          coverFile={coverFile}
          galleryFiles={galleryFiles}
          videoFiles={videoFiles}
          onCover={setCoverFile}
          onGallery={setGalleryFiles}
          onVideos={setVideoFiles}
        />
      ) : null}

      <section>
        <h2 className="font-serif text-xl text-charcoal">Temel Bilgiler</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-sm text-charcoal">Proje Adı</span>
            <input
              name="name"
              required
              defaultValue={project?.name}
              className={fieldClass}
              onChange={(event) => {
                if (isNew) setSlug(slugify(event.target.value));
              }}
            />
          </label>
          <input type="hidden" name="slug" value={slug} />
          <label>
            <span className="text-sm text-charcoal">Proje Durumu</span>
            <select
              name="status"
              defaultValue={project?.status ?? "ongoing"}
              className={fieldClass}
            >
              {(Object.keys(projectStatusLabels) as ProjectStatus[]).map((status) => (
                <option key={status} value={status}>
                  {projectStatusLabels[status]}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="text-sm text-charcoal">Konum</span>
            <input name="location" defaultValue={project?.location} className={fieldClass} />
          </label>
          <label>
            <span className="text-sm text-charcoal">İlçe</span>
            <input name="district" defaultValue={project?.district ?? ""} className={fieldClass} />
          </label>
          <label>
            <span className="text-sm text-charcoal">Şehir</span>
            <input name="city" defaultValue={project?.city ?? "İstanbul"} className={fieldClass} />
          </label>
          <label>
            <span className="text-sm text-charcoal">Sıra</span>
            <input
              name="sort_order"
              type="number"
              defaultValue={project?.sortOrder ?? 0}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm text-charcoal">Kısa Açıklama</span>
            <textarea
              name="short_description"
              rows={2}
              defaultValue={project?.summary}
              className={fieldClass}
            />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm text-charcoal">Detaylı Açıklama</span>
            <textarea
              name="description"
              rows={6}
              defaultValue={project?.description}
              className={fieldClass}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm text-charcoal">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              defaultChecked={project?.published}
            />
            Yayında
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured}
            />
            Öne çıkan proje
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-charcoal">Proje Özellikleri</h2>
        <p className="mt-1 text-sm text-muted">Tüm alanlar isteğe bağlıdır.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <OptionalField name="projectType" label="Proje Türü" defaultValue={features.projectType} />
          <OptionalField name="constructionYear" label="Yapım Yılı" defaultValue={features.constructionYear} />
          <OptionalField name="deliveryDate" label="Teslim Tarihi" defaultValue={features.deliveryDate} />
          <OptionalField name="unitCount" label="Bağımsız Bölüm Sayısı" defaultValue={features.unitCount} />
          <OptionalField name="unitTypes" label="Daire Tipleri" defaultValue={features.unitTypes} />
          <OptionalField name="landArea" label="Arsa Alanı" defaultValue={features.landArea} />
          <OptionalField name="constructionArea" label="İnşaat Alanı" defaultValue={features.constructionArea} />
          <OptionalField name="floorCount" label="Kat Sayısı" defaultValue={features.floorCount} />
          <OptionalField name="parking" label="Otopark" defaultValue={features.parking} />
          <OptionalField name="elevator" label="Asansör" defaultValue={features.elevator} />
          <label className="sm:col-span-2">
            <span className="text-sm text-charcoal">Teknik Özellikler</span>
            <textarea name="technicalSpecs" rows={3} defaultValue={features.technicalSpecs} className={fieldClass} />
          </label>
          <label className="sm:col-span-2">
            <span className="text-sm text-charcoal">Diğer özellikler</span>
            <textarea name="other" rows={3} defaultValue={features.other} className={fieldClass} />
          </label>
        </div>
      </section>

      {error && <p className="text-sm text-red-700">{error}</p>}
      {uploadNote && <p className="text-sm text-muted">{uploadNote}</p>}
      {saved && <p className="text-sm text-[#b8934a]">Kaydedildi.</p>}

      <button
        type="submit"
        disabled={pending}
        className="bg-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#b8934a] disabled:opacity-60"
      >
        {pending ? "Kaydediliyor..." : project ? "Değişiklikleri Kaydet" : "Projeyi Kaydet"}
      </button>
    </form>
  );
}

function DraftMediaFields({
  coverFile,
  galleryFiles,
  videoFiles,
  onCover,
  onGallery,
  onVideos,
}: {
  coverFile: File | null;
  galleryFiles: File[];
  videoFiles: File[];
  onCover: (file: File | null) => void;
  onGallery: (files: File[]) => void;
  onVideos: (files: File[]) => void;
}) {
  return (
    <section className="border border-[#b8934a]/40 bg-white p-5">
      <h2 className="font-serif text-xl text-charcoal">Fotoğraf ve video</h2>
      <p className="mt-1 text-sm text-muted">
        Kapak tek fotoğraf. Galeri en fazla {MAX_GALLERY_IMAGES} fotoğraf.
        Video sayısı serbest; her video en fazla 5 GB.
      </p>
      <div className="mt-6 grid gap-6">
        <FilePick
          label="Kapak fotoğrafı (1 adet)"
          hint="Sitede projenin ana görseli. Yalnızca bir tane."
          accept="image/*"
          fileName={coverFile?.name}
          onFiles={(files) => onCover(files[0] ?? null)}
        />
        <FilePick
          label={`Galeri fotoğrafları (${galleryFiles.length}/${MAX_GALLERY_IMAGES})`}
          hint="Aynı anda birden fazla seçin. En fazla 10."
          accept="image/*"
          multiple
          disabled={galleryFiles.length >= MAX_GALLERY_IMAGES}
          fileName={
            galleryFiles.length
              ? galleryFiles.map((file) => file.name).join(", ")
              : undefined
          }
          onFiles={(files) => {
            const next = [...galleryFiles, ...files].slice(0, MAX_GALLERY_IMAGES);
            onGallery(next);
          }}
        />
        <FilePick
          label={`Videolar (${videoFiles.length})`}
          hint="Birden fazla video ekleyebilirsiniz. Her biri en fazla 5 GB."
          accept="video/mp4,video/webm,video/quicktime,video/*"
          multiple
          fileName={
            videoFiles.length
              ? videoFiles.map((file) => file.name).join(", ")
              : undefined
          }
          onFiles={(files) => onVideos([...videoFiles, ...files])}
        />
      </div>
    </section>
  );
}

function FilePick({
  label,
  hint,
  accept,
  multiple,
  disabled,
  fileName,
  onFiles,
}: {
  label: string;
  hint?: string;
  accept: string;
  multiple?: boolean;
  disabled?: boolean;
  fileName?: string;
  onFiles: (files: File[]) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-charcoal">{label}</p>
      {hint ? <p className="mt-1 text-xs text-muted">{hint}</p> : null}
      <label
        className={`mt-2 flex items-center justify-between gap-3 border border-cream-dark bg-cream px-4 py-3 text-sm text-charcoal ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-[#b8934a]"
        }`}
      >
        <span className="min-w-0 truncate">{fileName || "Dosya seç"}</span>
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-[#b8934a]">
          Seç
        </span>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => {
            onFiles(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
      </label>
    </div>
  );
}

async function uploadDraftMedia({
  projectId,
  slug,
  coverFile,
  galleryFiles,
  videoFiles,
  onNote,
}: {
  projectId: string;
  slug: string;
  coverFile: File | null;
  galleryFiles: File[];
  videoFiles: File[];
  onNote: (note: string) => void;
}) {
  if (coverFile) {
    onNote("Kapak yükleniyor...");
    const result = await uploadProjectFile({
      file: coverFile,
      slug,
      folder: "cover",
      projectId,
      type: "image",
      setAsCover: true,
    });
    if (result.error) return result.error;
  }

  for (const [index, file] of galleryFiles.slice(0, MAX_GALLERY_IMAGES).entries()) {
    onNote(`Galeri yükleniyor (${index + 1}/${Math.min(galleryFiles.length, MAX_GALLERY_IMAGES)})...`);
    const result = await uploadProjectFile({
      file,
      slug,
      folder: "gallery",
      projectId,
      type: "image",
    });
    if (result.error) return result.error;
  }

  for (const [index, file] of videoFiles.entries()) {
    onNote(`Video yükleniyor (${index + 1}/${videoFiles.length})...`);
    const result = await uploadProjectFile({
      file,
      slug,
      folder: "videos",
      projectId,
      type: "video",
      title: file.name,
    });
    if (result.error) return result.error;
  }

  return null;
}

function OptionalField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  return (
    <label>
      <span className="text-sm text-charcoal">{label}</span>
      <input name={name} defaultValue={defaultValue ?? ""} className={fieldClass} />
    </label>
  );
}
