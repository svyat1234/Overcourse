import "./OwnersSection.scss";

const TEXTS = [
  {
    text: "Здесь будет текст для владельцев курсов: как разместить программу, какие форматы мы поддерживаем и как быстро попасть в каталог.",
  },
  {
    text: "Пока это заглушка — позже сюда подставят реальные условия сотрудничества и краткое описание процесса модерации.",
  },
  {
    text: "Если у вас уже есть материалы и готовность к запуску, можно оставить заявку через контакты ниже — ответим в рабочее время.",
  },
] as const;

const CONTACTS = [
  { href: "#", text: "Telegram" },
  { href: "#", text: "WhatsApp" },
  { href: "mailto:helloworld@gmail.com", text: "helloworld@gmail.com" },
] as const;

const USEFUL_LINKS = [
  { href: "#", text: "Правила размещения" },
  { href: "#", text: "Тарифы и условия" },
  { href: "#", text: "Материалы для партнёров" },
  { href: "#", text: "API и выгрузки" },
] as const;

export default function OwnersSection() {
  return (
    <section className="owners-section section container">
      <div className="owners-section__content">
        <h1 className="section-title-default">Владельцам курсов</h1>
        <div className="owners-section__texts">
          {TEXTS.map((item) => (
            <p className="owners-section__text main-text" key={item.text}>
              {item.text}
            </p>
          ))}
        </div>

        <h3 className="owners-section__title">Наши контакты</h3>
        <div className="owners-section__contacts">
          {CONTACTS.map((contact) => (
            <a
              href={contact.href}
              className="owners-section__contact"
              key={contact.text}
            >
              {contact.text}
            </a>
          ))}
        </div>

        <h3 className="owners-section__title">Полезные ссылки</h3>
        <div className="owners-section__links">
          {USEFUL_LINKS.map((link) => (
            <a
              href={link.href}
              className="owners-section__link"
              key={link.text}
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
