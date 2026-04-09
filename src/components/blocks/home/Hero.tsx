"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PromoLoopGlass from "@/components/ui/PromoLoopGlass";

const PROMO_REQUESTS = [
  { href: "#", text: "Хочу выучить английский язык" },
  { href: "#", text: "Мечтаю стать программистом" },
  { href: "#", text: "Курсы по веб-дизайну" },
];

const PROMO_TAGS = [
  { href: "#", text: "Иностранные языки" },
  { href: "#", text: "Бизнес" },
  { href: "#", text: "Развитие личности" },
  { href: "#", text: "Развитие личности" },
  { href: "#", text: "Продажи" },
  { href: "#", text: "Разработка игр" },
  { href: "#", text: "Разработка игр" },
  { href: "#", text: "Красота и здоровье" },
  { href: "#", text: "Творчество" },
  { href: "#", text: "Творчество" },
  { href: "#", text: "ИТ" },
];

export default function Hero() {
  const promoRef = useRef<HTMLElement | null>(null);
  const loopWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = promoRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll(".promo__scroll-fade");

    const markVisible = (el: Element) => el.classList.add("promo__scroll-fade--visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(markVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markVisible(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "0px", threshold: 0 }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="promo" ref={promoRef}>
      <div className="promo__wrap">
        <div className="promo__content">
          <div className="promo__info">
            <div className="promo__heading">
              <h1 className="promo__title">
                Все онлайн курсы на одной{" "}
                <span className="section-title--accent">платформе</span>
              </h1>
              <form className="promo__form promo__scroll-fade" onSubmit={(e) => e.preventDefault()}>
                <div className="promo__input-wrapper">
                  <input
                    type="text"
                    className="promo__input"
                    placeholder="Введите запрос"
                    aria-label="Поиск курсов"
                  />
                  <button
                    type="submit"
                    className="promo__button"
                    aria-label="Найти"
                  >
                    <svg
                      width="36"
                      height="37"
                      viewBox="0 0 36 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <rect
                        y="0.583984"
                        width="36"
                        height="36"
                        rx="9"
                        fill="#AFE982"
                      />
                      <path
                        d="M10.1045 10.1016L15.2993 13.2304V23.7377L10.1045 26.8665V10.1016Z"
                        fill="white"
                      />
                      <path
                        d="M29.7773 15.5332L24.4891 18.5013L15.3563 13.3055L15.2055 7.24308L29.7773 15.5332Z"
                        fill="white"
                      />
                      <path
                        d="M29.7773 21.6348L24.4891 18.6667L15.3563 23.8625L15.2055 29.9249L29.7773 21.6348Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
                <div className="promo__form-icon" aria-hidden />
                <span className="promo__form-text">
                  Подберем курс с помощью ИИ асистента
                </span>
              </form>
              <div className="promo__requests promo__scroll-fade">
                {PROMO_REQUESTS.map((item) => (
                  <Link
                    key={item.text}
                    href={item.href}
                    className="promo__request-link"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="promo__tags promo__scroll-fade">
              {PROMO_TAGS.map((item, index) => (
                <Link
                  key={`${item.text}-${index}`}
                  href={item.href}
                  className="promo__tag"
                >
                  {item.text}
                </Link>
              ))}
              <Link href="/courses" className="promo__tag promo__tag--more">
                Смотреть все
              </Link>
            </div>
          </div>
          <div className="promo__img-anim-wrap promo__scroll-fade">
          <span className="promo__img-text">78 543 курса</span>
            <div className="promo__img-books-wrap">
              <Image
                src="/images/books.png"
                alt="Книги"
                className="promo__img-books"
                fill
                sizes="(max-width: 1450px) 50vw, 754px"
              />
            </div>
            <PromoLoopGlass />
          </div>
          {/* <div className="promo__img-wrap">
            <span className="promo__img-text">78 543 курса</span>
            <Image
              src="/images/promo.png"
              alt="Платформа онлайн-курсов"
              className="promo__img"
              width={754}
              height={639}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
