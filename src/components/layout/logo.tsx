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
  const emblemHeight =
    variant === "home" ? 96 : variant === "header" ? 80 : 72;
  const lineHeight =
    variant === "home" ? 86 : variant === "header" ? 70 : 58;

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center overflow-visible ${className}`}
      aria-label={siteConfig.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-emblem.png?v=9"
        alt=""
        aria-hidden
        className="block shrink-0 object-contain object-center"
        style={{ height: emblemHeight, width: "auto", maxHeight: "none" }}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />

      <span
        className="mx-3 w-px shrink-0 bg-gradient-to-b from-transparent via-gold/70 to-transparent sm:mx-4 lg:mx-5"
        style={{ height: lineHeight }}
        aria-hidden
      />

      <span
        className={`logo-wordmark flex flex-col items-center leading-[1.08] ${
          variant === "home"
            ? "logo-wordmark--home"
            : variant === "header"
              ? "logo-wordmark--header"
              : "logo-wordmark--footer"
        }`}
      >
        <span>YILMAZ</span>
        <span>YAPI</span>
      </span>
    </Link>
  );
}
