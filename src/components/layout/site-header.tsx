"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { isNavDropdown, siteConfig } from "@/lib/site-config";

type SiteHeaderProps = {
  currentPath: string;
};

const SHOW_THRESHOLD = 120;
const HIDE_THRESHOLD = 24;

type PinMotion = "idle" | "enter" | "exit";

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const isHome = currentPath === "/";
  const [pinned, setPinned] = useState(false);
  const [motion, setMotion] = useState<PinMotion>("idle");

  useEffect(() => {
    let ticking = false;
    let isPinned = false;

    const update = () => {
      const y = window.scrollY;

      if (!isPinned && y > SHOW_THRESHOLD) {
        isPinned = true;
        setPinned(true);
        setMotion("enter");
      } else if (isPinned && y < HIDE_THRESHOLD) {
        isPinned = false;
        setPinned(false);
        setMotion("exit");
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showPinnedBar = pinned || motion === "exit";

  const pinnedClass =
    motion === "enter"
      ? "header-slide-down pointer-events-auto"
      : motion === "exit"
        ? "header-slide-up pointer-events-none"
        : pinned
          ? "translate-y-0 pointer-events-auto"
          : "-translate-y-full pointer-events-none";

  return (
    <>
      <header className="shrink-0 bg-cream">
        {isHome ? (
          <HomeHeaderBar currentPath={currentPath} />
        ) : (
          <HeaderBar currentPath={currentPath} isHome={false} />
        )}
      </header>

      {showPinnedBar && (
        <header
          className={`fixed top-0 right-0 left-0 z-50 bg-cream/98 shadow-sm backdrop-blur-[2px] ${pinnedClass}`}
          aria-hidden={!pinned}
          onAnimationEnd={() => setMotion("idle")}
        >
          <HeaderBar currentPath={currentPath} isHome={isHome} />
        </header>
      )}
    </>
  );
}

function HomeHeaderBar({ currentPath }: { currentPath: string }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-4 pb-2 sm:px-6 lg:px-8 lg:pt-5 lg:pb-3">
      <div className="mb-2.5 flex justify-end lg:mb-3">
        <PhoneRow />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Logo priority variant="home" />
        <DesktopNav currentPath={currentPath} />
        <MobileNav currentPath={currentPath} />
      </div>
    </div>
  );
}

function HeaderBar({
  currentPath,
  isHome,
}: {
  currentPath: string;
  isHome: boolean;
}) {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-3.5">
      <Logo priority={isHome} variant="header" />
      <DesktopNav currentPath={currentPath} />
      <MobileNav currentPath={currentPath} />
    </div>
  );
}

function PhoneRow() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1 text-[13px] text-charcoal lg:text-sm">
      {siteConfig.phones.map((phone, i) => (
        <span key={phone.number} className="flex items-center">
          {i > 0 && (
            <span className="mx-2 text-muted select-none lg:mx-3" aria-hidden>
              \
            </span>
          )}
          <a
            href={phone.href}
            className="font-medium hover:text-gold lg:text-[15px] lg:font-semibold"
          >
            {phone.number}
          </a>
        </span>
      ))}
    </div>
  );
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="hidden shrink-0 items-center lg:flex">
      {siteConfig.nav.map((item, index) => {
        if (isNavDropdown(item)) {
          return (
            <NavDropdown
              key={item.label}
              item={item}
              currentPath={currentPath}
              showDivider={index > 0}
            />
          );
        }

        const isActive =
          item.href === "/"
            ? currentPath === "/"
            : currentPath.startsWith(item.href);

        return (
          <NavItemWrapper key={item.href} showDivider={index > 0}>
            <NavLink href={item.href} active={isActive}>
              {item.label}
            </NavLink>
          </NavItemWrapper>
        );
      })}
    </nav>
  );
}

function NavLink({
  href,
  active,
  children,
  className = "",
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  if (active) {
    return (
      <span
        className={`inline-block bg-charcoal px-4 py-1.5 text-white ${className}`}
        style={{ transform: "skewX(-12deg)" }}
      >
        <span
          className="block text-[13px] font-semibold uppercase tracking-[0.08em]"
          style={{ transform: "skewX(12deg)" }}
        >
          {children}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`px-3 py-1.5 text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition-colors hover:text-gold ${className}`}
    >
      {children}
    </Link>
  );
}

function NavItemWrapper({
  children,
  showDivider,
}: {
  children: React.ReactNode;
  showDivider: boolean;
}) {
  return (
    <div className="flex items-center">
      {showDivider && <NavDivider />}
      {children}
    </div>
  );
}

function NavDivider() {
  return (
    <span className="mx-1.5 text-muted select-none" aria-hidden>
      \
    </span>
  );
}

function NavDropdown({
  item,
  currentPath,
  showDivider,
}: {
  item: {
    href: string;
    label: string;
    children: readonly { href: string; label: string }[];
  };
  currentPath: string;
  showDivider: boolean;
}) {
  const isActive = currentPath.startsWith("/insaat");

  return (
    <div className="group relative flex items-center">
      {showDivider && <NavDivider />}
      {isActive ? (
        <span
          className="inline-flex items-center gap-1 bg-charcoal px-4 py-1.5 text-white"
          style={{ transform: "skewX(-12deg)" }}
        >
          <span
            className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em]"
            style={{ transform: "skewX(12deg)" }}
          >
            {item.label}
            <ChevronIcon />
          </span>
        </span>
      ) : (
        <Link
          href={item.href}
          className="flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition-colors hover:text-gold"
        >
          {item.label}
          <ChevronIcon />
        </Link>
      )}

      <div className="invisible absolute top-full right-0 z-50 mt-1 min-w-[220px] border border-cream-dark bg-cream py-2 opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            className={`block px-5 py-2.5 text-sm transition-colors ${
              currentPath === child.href
                ? "font-semibold text-gold"
                : "text-muted hover:text-charcoal"
            }`}
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <details className="relative lg:hidden">
      <summary className="cursor-pointer list-none border border-cream-dark px-3 py-2 text-sm font-medium uppercase tracking-wider text-charcoal">
        Menü
      </summary>
      <nav className="absolute right-0 z-50 mt-2 w-56 border border-cream-dark bg-cream py-2 shadow-lg">
        {siteConfig.nav.map((item) => {
          if (isNavDropdown(item)) {
            return (
              <div key={item.label}>
                <p className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={`block px-5 py-2 pl-8 text-sm ${
                      currentPath === child.href
                        ? "font-semibold text-gold"
                        : "text-muted"
                    }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-5 py-2.5 text-sm uppercase tracking-wide ${
                currentPath === item.href ||
                (item.href !== "/" && currentPath.startsWith(item.href))
                  ? "font-semibold text-gold"
                  : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className="mt-2 border-t border-cream-dark px-5 py-3">
          {siteConfig.phones.map((phone) => (
            <a
              key={phone.number}
              href={phone.href}
              className="block py-1 text-sm text-charcoal hover:text-gold"
            >
              {phone.number}
            </a>
          ))}
        </div>
      </nav>
    </details>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export const HEADER_OFFSET = "";
