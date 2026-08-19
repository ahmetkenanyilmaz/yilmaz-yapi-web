"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { isNavDropdown, siteConfig } from "@/lib/site-config";

const SHOW_THRESHOLD = 120;
const HIDE_THRESHOLD = 24;

type PinMotion = "idle" | "enter" | "exit";

type HeaderProps = {
  currentPath: string;
};

export function Header({ currentPath }: HeaderProps) {
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
      <header className="relative z-30 shrink-0 bg-[#f8f6f2]">
        <HeaderBar currentPath={currentPath} />
      </header>

      {showPinnedBar && (
        <header
          className={`fixed top-0 right-0 left-0 z-30 bg-[#f8f6f2]/98 shadow-sm backdrop-blur-[2px] ${pinnedClass}`}
          aria-hidden={!pinned}
          onAnimationEnd={() => setMotion("idle")}
        >
          <HeaderBar currentPath={currentPath} compact />
        </header>
      )}
    </>
  );
}

export const SiteHeader = Header;

function HeaderBar({
  currentPath,
  compact = false,
}: {
  currentPath: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="site-header-bar mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8 lg:py-4">
        <Logo priority variant="header" />
        <DesktopNav currentPath={currentPath} />
        <MenuButton currentPath={currentPath} />
      </div>
    );
  }

  return (
    <div className="site-header-bar mx-auto max-w-7xl px-4 pt-5 pb-3 sm:px-6 lg:px-8 lg:pt-6 lg:pb-4">
      <div className="desktop-only mb-2.5 flex justify-end lg:mb-3">
        <PhoneRow />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Logo priority variant="home" />
        <DesktopNav currentPath={currentPath} />
        <MenuButton currentPath={currentPath} />
      </div>
    </div>
  );
}

function PhoneRow() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1 text-xs text-[#9a9590]">
      {siteConfig.phones.map((phone, i) => (
        <span key={phone.number} className="flex items-center">
          {i > 0 && (
            <span className="mx-3 text-[#c4bfb8] select-none" aria-hidden>
              \
            </span>
          )}
          <a href={phone.href} className="hover:text-gold">
            {phone.number}
            <span className="ml-1.5">- {phone.name}</span>
          </a>
        </span>
      ))}
    </div>
  );
}

function DesktopNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="desktop-nav hidden items-center">
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
          <div key={item.href} className="flex items-center">
            {index > 0 && <NavDivider />}
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`header-nav-link ${isActive ? "header-nav-link--active" : ""}`}
            >
              {item.label}
            </Link>
          </div>
        );
      })}
    </nav>
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
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={`header-nav-link ${isActive ? "header-nav-link--active" : ""}`}
      >
        {item.label}
        <svg className="h-2.5 w-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
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

function MenuButton({ currentPath }: { currentPath: string }) {
  const isMenuPage = currentPath === "/menu";

  return (
    <Link
      href={isMenuPage ? "/" : "/menu"}
      aria-label={isMenuPage ? "Kapat" : "Menü"}
      className="mobile-menu-btn"
    >
      <span className="mobile-menu-btn__lines" aria-hidden>
        <span className={isMenuPage ? "is-close-top" : ""} />
        <span className={isMenuPage ? "is-close-mid" : ""} />
        <span className={isMenuPage ? "is-close-bot" : ""} />
      </span>
    </Link>
  );
}

export const HEADER_OFFSET = "";
