import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";
import { projectStatusLabels } from "@/types/project";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projeler/${project.slug}`}
      className="group block overflow-hidden rounded-sm bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-charcoal">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted">{project.location}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gold">
          <span>{projectStatusLabels[project.status]}</span>
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
