"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./MobileMenu.scss";

type NavLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  infoLinks: NavLink[];
  logoSrc: string;
};

const CONTACTS = {
  address: "г. Жуковский, ул. Королёва. 11. 23",
  email: "helloworld@gmail.com",
  phone: "+ 7 999 999 99 99",
};

const SOCIALS = [
  { label: "Telegram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Pinterest", href: "#" },
];

export default function MobileMenu({ isOpen, onClose, links, infoLinks, logoSrc }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onEsc);
      };
    }
  }, [isOpen, onClose]);

  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}>
      <div className="mobile-menu__overlay" onClick={onClose} />
      <div className="mobile-menu__container">
        <div className="mobile-menu__header">
          <Link href="/" onClick={onClose}>
            <Image src={logoSrc} alt="Overcourse" width={150} height={26} className="mobile-menu__logo" />
          </Link>
          <button className="mobile-menu__close" onClick={onClose} aria-label="Закрыть">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mobile-menu__nav">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="mobile-menu__nav-link" onClick={onClose}>
              {link.label}
            </Link>
          ))}
          {infoLinks.map((link) => (
            <Link key={link.label} href={link.href} className="mobile-menu__nav-link" onClick={onClose}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu__footer">
          <div className="mobile-menu__section">
            <h4 className="mobile-menu__section-title">Адрес</h4>
            <p className="mobile-menu__text">{CONTACTS.address}</p>
          </div>

          <div className="mobile-menu__section">
            <h4 className="mobile-menu__section-title">Контакты</h4>
            <a href={`mailto:${CONTACTS.email}`} className="mobile-menu__link">{CONTACTS.email}</a>
            <a href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`} className="mobile-menu__link">{CONTACTS.phone}</a>
          </div>

          <div className="mobile-menu__section">
            <h4 className="mobile-menu__section-title">Соцсети</h4>
            <div className="mobile-menu__socials">
              {SOCIALS.map((social) => (
                <a key={social.label} href={social.href} className="mobile-menu__link">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
