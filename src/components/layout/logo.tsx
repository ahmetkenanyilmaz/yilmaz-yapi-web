import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type LogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "header" | "home" | "footer";
};

export function Logo({
  className = "",
  priority = false,
  variant = "header",
}: LogoProps) {
  return (
    <Link
      href="/"
      className={`logo-mark inline-flex min-w-0 max-w-full items-center gap-2 overflow-hidden bg-transparent lg:max-w-none lg:gap-3.5 ${className}`}
      aria-label={siteConfig.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-emblem.png?v=13"
        alt=""
        aria-hidden
        className={`logo-emblem logo-emblem--${variant} block shrink-0 object-contain object-center`}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      <span className={`logo-wordmark logo-wordmark--${variant}`}>
        YILMAZ YAPI
      </span>
    </Link>
  );
}
