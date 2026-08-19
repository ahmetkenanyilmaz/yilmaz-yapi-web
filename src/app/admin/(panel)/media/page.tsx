import Link from "next/link";
import { getAdminProjects } from "@/lib/projects";

export default async function AdminMediaPage() {
  const projects = await getAdminProjects();
  const media = projects.flatMap((project) =>
    project.media.map((item) => ({ ...item, projectName: project.name, projectId: project.id })),
  );

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Medya</h1>
      <p className="mt-2 text-sm text-muted">
        Kapak, fotoğraf ve video yüklemek için soldan Yeni Proje veya bir projenin Düzenle
        sayfasını açın. Bu liste yalnızca yüklenmiş dosyaları gösterir.
      </p>
      {media.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Henüz yüklenmiş medya yok.</p>
      ) : (
        <ul className="mt-8 divide-y divide-cream-dark border border-cream-dark bg-white">
          {media.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
              <div className="min-w-0">
                <p className="truncate text-charcoal">{item.title || item.url}</p>
                <p className="text-xs text-muted">
                  {item.projectName} · {item.type}
                </p>
              </div>
              <Link
                href={`/admin/projects/${item.projectId}/edit`}
                className="shrink-0 text-xs uppercase tracking-wider text-[#b8934a]"
              >
                Düzenle
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
