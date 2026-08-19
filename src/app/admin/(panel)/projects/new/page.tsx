import { ProjectForm } from "@/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-charcoal">Yeni Proje</h1>
      <p className="mt-2 text-sm text-muted">
        Kapak fotoğrafı, galeri ve videoyu bu sayfadan bilgisayarınızdan seçin.
        YouTube veya başka bir link yok.
      </p>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
