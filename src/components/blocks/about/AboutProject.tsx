import "./AboutProject.scss";
import Image from "next/image";

const TEXTS = [
  { text: "Overcourse — это сервис, который помогает найти подходящий курс для вас. Мы собираем информацию о курсах от различных компаний и предоставляем вам возможность сравнить их и выбрать лучший вариант." },
  { text: "Мы собираем информацию о курсах от различных компаний и предоставляем вам возможность сравнить их и выбрать лучший вариант." },
  { text: "В рамках освоения курса по бренд-менеджменту вы научитесь эффективно использовать показатели для развития бренда и проводить запуск маркетинговых кампаний. Курс отлично подойдет маркетологам для развития навыков по работе с рекламой и получения новых знаний в маркетинге." },
  { text: "Курс отлично подойдет маркетологам для развития навыков по работе с рекламой и получения новых знаний в маркетинге." },
] as const;

const CONTACTS = [
  { href: "#", text: "Telegram" },
  { href: "#", text: "WhatsApp" },
  { href: "mailto:helloworld@gmail.com", text: "helloworld@gmail.com" },
] as const;

export default function AboutProject() {
  return (
    <section className="about-project section container">
      <div className="about-project__content">
        <h1 className="section-title-default">О сервисе</h1>
        <div className="about-project__texts">
          {TEXTS.map((text) => (
            <p className="about-project__text main-text" key={text.text}>{text.text}</p>
          ))}
        </div>

        <h3 className="about-project__title">Наши контакты</h3>

        <div className="about-project__contacts">
          {CONTACTS.map((contact) => (
            <a href={contact.href} className="about-project__contact" key={contact.text}>
              {contact.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
