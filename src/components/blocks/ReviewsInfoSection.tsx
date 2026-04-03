"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { ReviewItem, ReviewsByStar } from "@/constants";
import { REVIEWS_BY_STARS } from "@/constants";
import ReviewCard from "@/components/ui/ReviewCard";
import "./ReviewsInfoSection.scss";

export type ReviewsInfoSectionData = {
  reviews: ReviewItem[];
  byStars?: ReviewsByStar;
  leaveReviewHref?: string;
  showAllHref?: string;
};

function getReviewWord(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 14) return "отзывов";
  switch (n % 10) {
    case 1:
      return "отзыв";
    case 2:
    case 3:
    case 4:
      return "отзыва";
    default:
      return "отзывов";
  }
}

export default function ReviewsInfoSection({
  data,
}: {
  data: ReviewsInfoSectionData;
}) {
  const { reviews, byStars = REVIEWS_BY_STARS, leaveReviewHref = "#", showAllHref = "#" } = data;
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  const totalReviews = byStars.reduce((sum, row) => sum + row.count, 0);
  const averageRating =
    totalReviews > 0
      ? (byStars.reduce((sum, row) => sum + row.stars * row.count, 0) / totalReviews).toFixed(1)
      : "0";
  const roundedAverage = Math.round(parseFloat(averageRating));

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      modules: [Navigation],
      direction: "horizontal",
      loop: reviews.length > 1,
      slidesPerView: 1,
      spaceBetween: 10,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".reviews-info__swiper .swiper-button-next",
        prevEl: ".reviews-info__swiper .swiper-button-prev",
      },
      breakpoints: {
        1200: {
          slidesPerView: 2,
        },
      },
    });

    return () => {
      swiperInstance.current?.destroy();
      swiperInstance.current = null;
    };
  }, [reviews.length]);

  return (
    <section className="reviews-info section container">
      <div className="reviews-info__about">
        <div className="reviews-info__heading">
          <h2 className="reviews-info__title section-title-default">Отзывы</h2>
          <span className="reviews-info__sum-reviews">
            {totalReviews} {getReviewWord(totalReviews)}
          </span>
        </div>

        <div className="reviews-info__statistic">
          <div className="reviews-info__statistic-heading">
            <span className="reviews-info__middle-pass">{averageRating}</span>
            <div className="reviews-info__middle-stars">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`reviews-info__middle-star${i <= roundedAverage ? " reviews-info__middle-star--active" : ""}`}
                />
              ))}
            </div>
          </div>

          <div className="reviews-info__statistic-items">
            {byStars.map((row) => (
              <div key={row.stars} className="reviews-info__statistic-item">
                <div className="reviews-info__stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`reviews-info__star${i <= row.stars ? " reviews-info__star--active" : ""}`}
                    />
                  ))}
                </div>
                <div className="reviews-info__scale-wrap">
                  <div
                    className="reviews-info__scale"
                    style={{
                      width: totalReviews > 0 ? `${(row.count / totalReviews) * 100}%` : "0%",
                    }}
                  />
                </div>
                <span className="reviews-info__quantity-reviews">{row.count}</span>
              </div>
            ))}
          </div>

          <Link href={leaveReviewHref} className="reviews-info__link button button--accent">
            Оставить отзыв
          </Link>
        </div>
      </div>

      <div ref={swiperRef} className="swiper reviews-info__swiper">
        <div className="reviews-info__nav-wrap">
          <Link href={showAllHref} className="reviews-info__slider-link button">
            Показать все
          </Link>
          <div className="reviews-info__slider-buttons">
            <button type="button" className="swiper-button-prev" aria-label="Предыдущий слайд" />
            <button type="button" className="swiper-button-next" aria-label="Следующий слайд" />
          </div>
        </div>

        <div className="reviews-info__slider swiper-wrapper">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} className="swiper-slide" />
          ))}
        </div>
      </div>
    </section>
  );
}
