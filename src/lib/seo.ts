import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  noIndex?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const pageDescription = description ?? siteConfig.description;
  const pageUrl = path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | İnşaat ve Kentsel Dönüşüm`;

  return {
    ...(title ? { title } : {}),
    description: pageDescription,
    alternates: {
      canonical: path === "/" ? "/" : path,
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: pageUrl,
      siteName: siteConfig.name,
      title: pageTitle,
      description: pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
