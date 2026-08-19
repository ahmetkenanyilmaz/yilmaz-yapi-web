import Link from "next/link";
import { getAdminProjects } from "@/lib/projects";

export default async function AdminDashboardPage() {
  const projects = await getAdminProjects();
  const published = projects.filter((item) => item.published).length;
  const drafts = projects.length - published;
  const ongoing = projects.filter((item) => item.status === "ongoing").length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-charcoal">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">
        Proje içeriklerini buradan yönetin. Taslaklar sitede görünmez.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Toplam proje" value={projects.length} />
        <Stat label="Yayında" value={published} />
        <Stat label="Taslak" value={drafts} />
      </div>
      <p className="mt-4 text-sm text-muted">{ongoing} devam eden proje</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="bg-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#b8934a]"
        >
          Yeni Proje
        </Link>
        <Link
          href="/admin/projects"
          className="border border-charcoal px-5 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal hover:border-[#b8934a] hover:text-[#b8934a]"
        >
          Tüm Projeler
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-cream-dark bg-white px-5 py-6">
      <p className="font-serif text-4xl text-[#b8934a]">{value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}
