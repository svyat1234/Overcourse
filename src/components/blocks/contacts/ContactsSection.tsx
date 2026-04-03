"use client";

import Link from "next/link";
import "./ContactsSection.scss";

// Данные секции контактов (при необходимости вынести в constants)
const CONTACT_CARDS = [
  {
    title: "Адрес",
    items: [{ type: "text" as const, value: "ул. Жудро 88, Минск, Беларусь" }],
  },
  {
    title: "Контакты",
    items: [
      { type: "link" as const, value: "8 (800) 555-35-35", href: "tel:88005553535" },
      { type: "link" as const, value: "info@overcource.com", href: "mailto:info@overcource.com" },
    ],
  },
  {
    title: "Наши реквизиты",
    titleBr: true,
    items: [
      { type: "text" as const, value: "ООО «ПЕРСПЕКТИВА»" },
      { type: "text" as const, value: "ИНН: 5001136821" },
      { type: "text" as const, value: "ОГРН: 1205000108830" },
    ],
  },
  {
    title: "Время работы",
    titleBr: true,
    items: [{ type: "text" as const, value: "пн-пт, 9:00-18:00" }],
  },
];

const SOCIALS_LEFT = [
  { href: "#", text: "telegram" },
  { href: "#", text: "whatsapp" },
];
const SOCIALS_RIGHT = [
  { href: "#", text: "max" },
  { href: "#", text: "dzen" },
];

export default function ContactsSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="contacts section container">
      <div className="contacts__info">
        <h2 className="contacts__title section-title">
          Контактные <span className="section-title--accent">данные</span>
        </h2>

        <div className="contacts__cards">
          {CONTACT_CARDS.map((card) => (
            <div key={card.title} className="contacts__card">
              <h3 className="contacts__card-title">
                {card.titleBr ? (
                  <>
                    {card.title.split(" ")[0]}
                    <br />
                    {card.title.split(" ").slice(1).join(" ")}
                  </>
                ) : (
                  card.title
                )}
              </h3>
              <div className="contacts__card-info">
                {card.items.map((item) =>
                  item.type === "link" ? (
                    <Link
                      key={item.value}
                      href={item.href!}
                      className="contacts__card-text"
                    >
                      {item.value}
                    </Link>
                  ) : (
                    <span key={item.value} className="contacts__card-text">
                      {item.value}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="contacts__socials-card">
          <h3 className="contacts__card-title">Социальные сети</h3>
          <div className="contacts__socials-info">
            <div className="contacts__socials-info-left">
              {SOCIALS_LEFT.map((social) => (
                <a key={social.text} href={social.href} className="contacts__card-text">
                  {social.text}
                </a>
              ))}
            </div>
            <div className="contacts__socials-info-right">
              {SOCIALS_RIGHT.map((social) => (
                <a key={social.text} href={social.href} className="contacts__card-text">
                  {social.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="contacts__feedback">
        <h3 className="contacts__feednback-title section-title-default">
          Мы на связи <br />{" "}
          <span className="contacts__form-accent-title section-title-default--accent">задавайте вопросы</span>
        </h3>

        <form onSubmit={handleSubmit} className="contacts__form">
          <div className="contacts__form-inputs">
            <input
              type="text"
              className="contacts__input section-input"
              placeholder="Имя"
              aria-label="Имя"
            />
            <input
              type="text"
              className="contacts__input section-input"
              placeholder="Телефон"
              aria-label="Телефон"
            />
            <input
              type="email"
              className="contacts__input section-input"
              placeholder="E-mail"
              aria-label="E-mail"
            />
            <textarea
              name="question"
              className="contacts__input-text section-input"
              placeholder="Вопрос"
              aria-label="Вопрос"
              rows={4}
            />
          </div>
          <label htmlFor="contacts-checkbox" className="footer__checkbox-label">
            <input
              type="checkbox"
              id="contacts-checkbox"
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
    </section>
  );
}
