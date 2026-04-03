import Image from "next/image";
import Link from "next/link";

const SCHOOLS_SLIDES = [
  { img: "/images/school1.png", alt: "Школа" },
  { img: "/images/school2.png", alt: "Школа", active: true },
  { img: "/images/school3.png", alt: "Школа" },
  { img: "/images/school1.png", alt: "Школа" },
  { img: "/images/school2.png", alt: "Школа" },
  { img: "/images/school3.png", alt: "Школа" },
];

export default function SchoolsSection() {
  return (
    <section className="schools section container">
      <div className="schools__content">
        <div className="schools__heading">
          <h2 className="schools__title section-title">
            <span className="schools__title--accent section-title--accent">2 150+ школ</span> уже на Overcourse&nbsp;— Ваш ход!
          </h2>
          <span className="schools__text">
            Присоединяйтесь к лидерам образования: опубликуйте курсы вашей школы и начните обучение новых студентов уже сейчас.
          </span>
          <Link href="#" className="schools__button button">
            Добавить курс
          </Link>
        </div>
        <div className="schools__slider-wrap">
          <div className="schools__slider">
            {SCHOOLS_SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`schools__slide${slide.active ? " schools__slide--active" : ""}`}
              >
                <Image
                  src={slide.img}
                  alt={slide.alt}
                  className="schools__slide-img"
                  width={249}
                  height={249}
                  sizes="249px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
