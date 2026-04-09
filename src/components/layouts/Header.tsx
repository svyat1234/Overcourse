"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SearchModal from "@/components/ui/SearchModal";
import MobileMenu from "@/components/layouts/MobileMenu";
import {
  headerVariantByPath,
  defaultHeaderVariant,
} from "@/config/headerVariant";

const LOGO_LIGHT = "/images/logo-light.svg";
const LOGO_DARK = "/images/logo.svg";
const SCROLL_THRESHOLD = 600;

const HEADER_LINKS: { href: string; label: string; modifier?: string }[] = [
  { href: "/courses", label: "Все курсы", modifier: "header__link--courses" },
  { href: "/schools", label: "Школы" },
  { href: "/news", label: "Новости" },
];

const INFO_LINKS = [
  { href: "/about", label: "О сервисе" },
  { href: "/owners", label: "Владельцам курсов" },
  { href: "/contacts", label: "Контакты" },
] as const;

// =====================================================================================================
// Хедер имеет 2 варианта - светлый и тёмный, они задаются в @/config/headerVariant.ts по пути страницы.
// =====================================================================================================

export default function Header() {
  const pathname = usePathname();
  const variant = headerVariantByPath[pathname] ?? defaultHeaderVariant;
  const isLightVariant = variant === "light";
  const [isScrollActive, setIsScrollActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const infoWrapperRef = useRef<HTMLDivElement | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollActiveRef = useRef(false);
  const isExitingRef = useRef(false);
  isScrollActiveRef.current = isScrollActive;
  isExitingRef.current = isExiting;

  useEffect(() => {
    function updateHeader() {
      const scrollTop = window.scrollY;

      if (scrollTop > SCROLL_THRESHOLD) {
        if (exitTimeoutRef.current) {
          clearTimeout(exitTimeoutRef.current);
          exitTimeoutRef.current = null;
        }
        setIsExiting(false);
        setIsScrollActive(true);
      } else {
        if (isScrollActiveRef.current && !isExitingRef.current) {
          setIsExiting(true);
          exitTimeoutRef.current = setTimeout(() => {
            setIsScrollActive(false);
            setIsExiting(false);
            exitTimeoutRef.current = null;
          }, 300);
        }
      }
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    return () => {
      window.removeEventListener("scroll", updateHeader);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isInfoOpen &&
        infoWrapperRef.current &&
        !infoWrapperRef.current.contains(event.target as Node)
      ) {
        setIsInfoOpen(false);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsInfoOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isInfoOpen]);

  const showLight =
    isLightVariant && !isScrollActive && !isExiting;
  const logoSrc = showLight ? LOGO_LIGHT : LOGO_DARK;

  const headerClasses = [
    "header",
    isLightVariant && showLight && "header--light",
    (isScrollActive || isExiting) && "header--active",
    isExiting && "header--hidden",
  ]
    .filter(Boolean)
    .join(" ");

  const headerContent = (
    <>
      <div className="header__content">
        <Link href="/" aria-label="Overcourse — на главную">
          <Image
            src={logoSrc}
            alt="Overcourse"
            className="logo"
            width={200}
            height={34}
            priority
          />
        </Link>
        <nav className="header__nav" aria-label="Основная навигация">
          {HEADER_LINKS.filter(
            ({ modifier }) => modifier !== "header__link--info"
          ).map(({ href, label, modifier }) => (
            <Link
              key={label}
              href={href}
              className={`header__link${modifier ? ` ${modifier}` : ""}`}
            >
              {label}
            </Link>
          ))}

          <div
            ref={infoWrapperRef}
            className={`header__link-wrapper header__link-wrapper--info${
              isInfoOpen ? " header__link-wrapper--info-open" : ""
            }`}
          >
            <button
              type="button"
              className="header__link header__link--info"
              onClick={() => setIsInfoOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={isInfoOpen}
            >
              Информация
            </button>
            <div className="header__info-dropdown" role="menu">
              {INFO_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="header__info-link"
                  role="menuitem"
                  onClick={() => setIsInfoOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
      <div className="header__interaction">
        <button
          type="button"
          className="header__search"
          aria-label="Поиск"
          onClick={() => setIsSearchOpen(true)}
        />
        <button
          type="button"
          className="header__menu-button"
          aria-label="Открыть меню"
          onClick={() => setIsMenuOpen(true)}
        >
          <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect width="21" height="3" rx="1.5" fill="currentColor" />
            <rect y="7" width="17" height="3" rx="1.5" fill="currentColor" />
            <rect y="14" width="21" height="3" rx="1.5" fill="currentColor" />
          </svg>
        </button>
      </div>
    </>
  );

  return (
    <>
      <header className={headerClasses}>{headerContent}</header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        links={HEADER_LINKS}
        infoLinks={INFO_LINKS as unknown as { href: string; label: string }[]}
        logoSrc={LOGO_DARK}
      />
    </>
  );
}
