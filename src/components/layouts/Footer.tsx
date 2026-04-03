"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  footerVariantByPath,
  defaultFooterVariant,
} from "@/config/footerVariant";

const CONTACT_GROUPS = [
  {
    title: "Адрес",
    items: [
      { href: "#", text: "ул. Королёва. 11. 23" },
      { href: "mailto:helloworld@gmail.com", text: "helloworld@gmail.com" },
      { href: "tel:+79999999999", text: "+ 7 999 999 99 99" },
    ],
  },
  {
    title: "Соцсети",
    items: [
      { href: "#", text: "Telegram" },
      { href: "#", text: "Twitter" },
      { href: "#", text: "Pinterest" },
    ],
  },
  {
    title: "Ссылки",
    items: [
      { href: "#", text: "О нас" },
      { href: "#", text: "О нас" },
      { href: "#", text: "О нас" },
    ],
  },
  {
    title: "Ссылки",
    items: [
      { href: "#", text: "О нас" },
      { href: "#", text: "О нас" },
      { href: "#", text: "О нас" },
    ],
  },
] as const;

const INFO_LINKS = [
  { href: "#", text: "Политика конфиденциальности" },
] as const;

// =====================================================================================================
// Футер имеет 2 варианта - светлый и тёмный, они задаются в @/config/headerVariant.ts по пути страницы.
// =====================================================================================================

export default function Footer() {
  const pathname = usePathname();
  const variant = footerVariantByPath[pathname] ?? defaultFooterVariant;
  const isLight = variant === "light";

  return (
    <footer
      className={`footer section ${isLight ? "footer--light" : ""}`}
      role="contentinfo"
    >
      <div className="footer__wrap">
        <div className="container">
          <div className="footer__content">
            <div className="footer__heading">
              <h2 className="footer__title">
                Новости курсов <br />
                <span className="footer__title--accent section-title--accent">
                  {" "}
                  вам на почту
                </span>
              </h2>
              <form action="#" className="footer__form" onSubmit={(e) => e.preventDefault()}>
                <div className="footer__inputs">
                  <input
                    type="text"
                    className="footer__input"
                    placeholder="Имя"
                    required
                    aria-label="Имя"
                  />
                  <input
                    type="tel"
                    className="footer__input"
                    placeholder="Телефон"
                    required
                    aria-label="Телефон"
                  />
                </div>
                <label htmlFor="footer-checkbox" className="footer__checkbox-label">
                  <input
                    type="checkbox"
                    id="footer-checkbox"
                    className="footer__checkbox"
                    required
                  />
                  <span className="footer__checkbox-custom" aria-hidden />
                  <span className="footer__checkbox-text">
                    Даю согласие на обработку{" "}
                    <Link href="#" className="footer__checkbox-link">
                      Персональных данных
                    </Link>
                  </span>
                </label>
                <div className="footer__buttons">
                  <button type="submit" className="footer__button footer__button--request">
                    Оставить заявку
                  </button>
                  <button type="button" className="footer__button footer__button--telegram">
                    telegram
                  </button>
                </div>
              </form>
            </div>
            <div className="footer__contacts">
              <h3 className="footer__contacts-title">Контакты</h3>
              <div className="footer__contacts-cards">
                {CONTACT_GROUPS.map((group, i) => (
                  <div key={`${group.title}-${i}`} className="footer__contacts-card">
                    <h4 className="footer__contacts-card-title">{group.title}</h4>
                    <div className="footer__contacts-items">
                      {group.items.map((item, j) => (
                        <Link
                          key={j}
                          href={item.href}
                          className="footer__contacts-item"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="footer__info">
            <div className="footer__info-links">
              {INFO_LINKS.map((link) => (
                <Link key={link.text} href={link.href} className="footer__info-link">
                  {link.text}
                </Link>
              ))}
            </div>
            <div className="footer__info-blocks">
              <button type="button" className="footer__info-button">
                добавить курс
              </button>
              <span className="footer__info-made">Made by overcourse</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
