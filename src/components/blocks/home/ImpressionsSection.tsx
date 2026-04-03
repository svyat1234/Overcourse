"use client";

import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { ReviewCard } from "@/constants";
import ImpressionReviewCard from "@/components/ui/ImpressionReviewCard";
import ReviewModal from "@/components/ui/ReviewModal";
import "./ImpressionsSection.scss";

const IMPRESSIONS_COUNT = 96;
const PREVIEW_MAX = 150;

const IMPRESSIONS_REVIEWS: ReviewCard[] = [
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Присоединяйтесь к лидерам образования: опубликуйте курсы вашей школы и начните обучение новых студентов уже сейчас. Мы проверяем материалы, помогаем с оформлением и даём понятную аналитику по откликам. Всё это в одном кабинете — без лишней бюрократии и с нормальной поддержкой.",
    img: "/images/impressions/impressions-review.png",
    courseHref: "/courses/course-0",
  },
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Второй отзыв — это как первый, но и не третий. Подробно расписываю свой опыт: курс дал структуру, ребята из кураторства отвечали быстро, домашки были по делу. После выпуска уже трудоустроилась и всё ещё пользуюсь конспектами.",
    img: "/images/impressions/impressions-review2.png",
    courseHref: "/courses/course-1",
  },
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Третий отзыв — это как второй, но и не четвёртый. Рекомендую тем, кто хочет системно зайти в профессию: много практики, разбор портфолио и нормальное комьюнити.",
    img: "/images/impressions/impressions-review.png",
    courseHref: "/courses/course-2",
  },
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Четвёртый отзыв — это как третий, но и не пятый. Длинный текст специально, чтобы в карточке обрезалось, а в модалке читался целиком.",
    img: "/images/impressions/impressions-review2.png",
    courseHref: "/courses/course-3",
  },
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Пятый отзыв — это как второй, но не как второй как первый, но и не третий, а как четвёртый, но и не шестой. Короче, курс огонь, лендинг школы нашла через Overcourse.",
    img: "/images/impressions/impressions-review.png",
    courseHref: "/courses/course-4",
  },
  {
    name: "Ольга Ф.",
    city: "Краснодар",
    course: "UX/UI-дизайнер Plus",
    school: "SkyPro",
    text: "Шестой отзыв — финальный абзац с достаточной длиной: хочется видеть в модалке полный текст без обрезки, а в слайдере — аккуратное превью до ста пятидесяти символов с многоточием в конце.",
    img: "/images/impressions/impressions-review2.png",
    courseHref: "/courses/course-5",
  },
];

export default function ImpressionsSection() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const [modalReview, setModalReview] = useState<ReviewCard | null>(null);

  useEffect(() => {
    const el = swiperRef.current;
    if (!el) return;

    swiperInstance.current = new Swiper(el, {
      modules: [Navigation],
      loop: true,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      speed: 400,
      navigation: {
        nextEl: ".impressions .swiper-button-next",
      },
      breakpoints: {
        0: { slidesPerView: 1, spaceBetween: 16 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1400: { slidesPerView: 2.5, spaceBetween: 24 },
      },
    });

    return () => {
      swiperInstance.current?.destroy(true, true);
      swiperInstance.current = null;
    };
  }, []);

  return (
    <section className="impressions section">
      <div className="impressions__heading container">
        <h2 className="impressions__title section-title">
          Впечатления <span className="section-title--accent">студентов</span>
        </h2>
        <div className="impressions__info">
          <span className="impressions__count-wrapper">
            <span className="impressions__count-text">отзывов/</span>
            <span className="impressions__count">{IMPRESSIONS_COUNT}</span>
          </span>
          <button type="button" className="swiper-button-next" aria-label="Следующий слайд" />
        </div>
      </div>

      <div className="impressions__swiper-outer">
        <div className="impressions__swiper-inner">
          <div ref={swiperRef} className="swiper impressions__swiper">
            <div className="swiper-wrapper">
              {IMPRESSIONS_REVIEWS.map((slide, i) => (
                <div key={i} className="swiper-slide impressions__slide">
                  <ImpressionReviewCard
                    review={slide}
                    previewMax={PREVIEW_MAX}
                    onReadFull={() => setModalReview(slide)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ReviewModal review={modalReview} onClose={() => setModalReview(null)} />
    </section>
  );
}
