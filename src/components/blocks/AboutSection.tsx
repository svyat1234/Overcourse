import "./AboutSection.scss";

type AboutInfoCard = {
  num: string;
  icon: "search";
  accentText: string;
  text: string;
};

type AboutStatisticCard = {
  count: string;
  countSmall?: string;
  info: string;
  text: string;
};

const TITLE_ACCENT = "Overcourse ";
const TITLE_SUFFIX = "— ваш гид в мире обучения";

const INFO_CARDS: AboutInfoCard[] = [
  { num: "/01", icon: "search", accentText: "Умный поиск", text: " — нейропомощник облегчит подбор программ" },
  { num: "/02", icon: "search", accentText: "Умный поиск", text: " — нейропомощник облегчит подбор программ" },
  { num: "/03", icon: "search", accentText: "Умный поиск", text: " — нейропомощник облегчит подбор программ" },
];

const STATISTIC_CARDS: AboutStatisticCard[] = [
  { count: "13 000+", info: "курсов", text: "Постоянно обновляем базу каталога" },
  { count: "350", countSmall: "тыс", info: "учеников", text: "Каждый 3-й возвращается к нам за новым курсом" },
  { count: "100%", info: "прозрачности", text: "Мы не накручиваем рейтинги — только честные оценки студентов" },
];

type AboutSectionProps = {

  // ===============================================================================
  // Секция состоит из 2х вариантов. "first-section" нужен, если секция идёт первой,
  // у неё слегка другие стили
  // ===============================================================================

  variant?: "default" | "first-section";
};

export default function AboutSection({ variant = "default" }: AboutSectionProps) {
  return (
    <section className={`about section${variant === "first-section" ? " about--first-section" : ""}`}>
      <div className="about__wrap">
        <div className="container">
          <h2 className="about__title section-title">
            <span className="section-title--accent">{TITLE_ACCENT}</span>
            {TITLE_SUFFIX}
          </h2>
          <div className="about__cards">
            {INFO_CARDS.map((card) => (
              <div key={card.num} className="about__info-card">
                <div className="about__info-card-heading">
                  <span className="about__info-card-num">{card.num}</span>
                  <div
                    className={`about__info-card-icon about__info-card-icon--${card.icon}`}
                    aria-hidden
                  />
                </div>
                <p className="about__info-card-text">
                  <span className="about__info-card-text--accent">{card.accentText}</span>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
          <div className="about__cards">
            {STATISTIC_CARDS.map((card) => (
              <div key={card.info} className="about__statistic-card">
                <h3 className="about__statistic-card-count">
                  {card.count}
                  {card.countSmall != null && (
                    <span className="about__statistic-card-count--small">{card.countSmall}</span>
                  )}
                  {card.countSmall != null ? " +" : null}
                </h3>
                <span className="about__statistic-card-info">{card.info}</span>
                <p className="about__statistic-card-text">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
