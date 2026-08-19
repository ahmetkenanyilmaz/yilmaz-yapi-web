"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { deleteProject, togglePublished } from "@/app/admin/actions";
import { projectStatusLabels, type Project } from "@/types/project";

export function ProjectTable({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <p className="border border-cream-dark bg-white px-4 py-8 text-center text-sm text-muted">
        Bu listede henüz proje yok.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-cream-dark bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-cream-dark bg-cream/80 text-[11px] uppercase tracking-wider text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Proje</th>
            <th className="px-4 py-3 font-medium">Durum</th>
            <th className="px-4 py-3 font-medium">Yayın</th>
            <th className="px-4 py-3 font-medium">Tarih</th>
            <th className="px-4 py-3 font-medium">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <tr className="border-b border-cream-dark last:border-b-0">
      <td className="px-4 py-3">
        <p className="font-medium text-charcoal">{project.name}</p>
        <p className="text-xs text-muted">/{project.slug}</p>
      </td>
      <td className="px-4 py-3 text-muted">{projectStatusLabels[project.status]}</td>
      <td className="px-4 py-3">
        <span className={project.published ? "text-[#b8934a]" : "text-muted"}>
          {project.published ? "Yayında" : "Taslak"}
        </span>
      </td>
      <td className="px-4 py-3 text-muted">
        {new Date(project.createdAt).toLocaleDateString("tr-TR")}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-3 text-xs">
          <Link href={`/projeler/${project.slug}`} className="text-muted hover:text-[#b8934a]">
            Görüntüle
          </Link>
          <Link
            href={`/admin/projects/${project.id}/edit`}
            className="text-charcoal hover:text-[#b8934a]"
          >
            Düzenle
          </Link>
          <button
            type="button"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await togglePublished(project.id, !project.published);
              })
            }
            className="text-charcoal hover:text-[#b8934a]"
          >
            {project.published ? "Yayından Kaldır" : "Yayınla"}
          </button>
          {confirming ? (
            <span className="text-muted">
              Emin misiniz?{" "}
              <button
                type="button"
                className="text-red-700"
                onClick={() =>
                  startTransition(async () => {
                    await deleteProject(project.id);
                  })
                }
              >
                Sil
              </button>{" "}
              /{" "}
              <button type="button" onClick={() => setConfirming(false)}>
                Vazgeç
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="text-red-700 hover:underline"
            >
              Sil
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
