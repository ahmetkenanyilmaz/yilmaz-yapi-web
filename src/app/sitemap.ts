import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getPublishedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublishedProjects();
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["/hakkimizda", "/insaat/devam-eden", "/insaat/tamamlanan", "/kentsel-donusum"].map(
      (path) => ({
        url: `${siteConfig.url}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }),
    ),
    {
      url: `${siteConfig.url}/iletisim`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...["/kvkk", "/gizlilik", "/site-haritasi"].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projeler/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...projectPages];
}
