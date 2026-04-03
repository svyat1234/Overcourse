"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReviewCard } from "@/constants";
import ImpressionReviewCardSkeleton from "@/components/ui/ImpressionReviewCardSkeleton";
import "./ImpressionReviewCard.scss";

/** Плейсхолдер до загрузки фото: `false` — отключить одним переключателем */
const IMPRESSION_REVIEW_CARD_SKELETON_ENABLED = true;

const DEFAULT_PREVIEW_MAX = 150;

export function truncateImpressionPreview(text: string, max: number): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trimEnd() + "…";
}

type ImpressionReviewCardProps = {
  review: ReviewCard;
  /** Макс. длина превью текста до «…» */
  previewMax?: number;
  onReadFull: () => void;
  className?: string;
};

export default function ImpressionReviewCard({
  review,
  previewMax = DEFAULT_PREVIEW_MAX,
  onReadFull,
  className = "",
}: ImpressionReviewCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImgLoad = useCallback(() => setImgLoaded(true), []);
  const onImgError = useCallback(() => setImgLoaded(true), []);

  useEffect(() => {
    setImgLoaded(false);
  }, [review.img]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, [review.img]);

  useEffect(() => {
    const t = window.setTimeout(() => setImgLoaded(true), 15000);
    return () => clearTimeout(t);
  }, [review.img]);

  const assetsReady = imgLoaded;
  const showSkeleton = IMPRESSION_REVIEW_CARD_SKELETON_ENABLED && !assetsReady;

  const rootClass = [
    "impression-review-card",
    showSkeleton ? "impression-review-card--assets-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      {showSkeleton && <ImpressionReviewCardSkeleton />}
      <div className={showSkeleton ? "impression-review-card__inner impression-review-card__inner--hidden" : "impression-review-card__inner"}>
        <div className="impression-review-card__block">
          <div className="impression-review-card__content">
            <div className="impression-review-card__heading">
              <div className="impression-review-card__person">
                <h3 className="impression-review-card__name">{review.name}</h3>
                <span className="impression-review-card__city">{review.city}</span>
              </div>
              <div className="impression-review-card__school">
                <span className="impression-review-card__school-course">{review.course}</span>
                <span className="impression-review-card__school-name">{review.school}</span>
              </div>
            </div>
            <p className="impression-review-card__text">{truncateImpressionPreview(review.text, previewMax)}</p>
          </div>
          <div className="impression-review-card__img-wrap">
            <Image
              ref={imgRef}
              src={review.img}
              alt=""
              className="impression-review-card__img"
              width={200}
              height={236}
              sizes="200px"
              onLoad={onImgLoad}
              onLoadingComplete={onImgLoad}
              onError={onImgError}
            />
          </div>
        </div>
        <div className="impression-review-card__actions">
          <button type="button" className="impression-review-card__read-btn" onClick={onReadFull}>
            Прочитать полностью
          </button>
          <Link href={review.courseHref ?? "/courses"} className="impression-review-card__course-link">
            Перейти к курсу
          </Link>
        </div>
      </div>
    </div>
  );
}
