"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReviewItem, ReviewCard as ReviewModalReview } from "@/constants";
import { reviewItemToModalReview } from "@/constants";
import ReviewCardSkeleton from "@/components/ui/ReviewCardSkeleton";
import ReviewModal from "./ReviewModal";
import "./ReviewCard.scss";

/** Плейсхолдер до загрузки картинок: `false` — отключить одним переключателем */
const REVIEW_CARD_SKELETON_ENABLED = true;

type ReviewCardProps = {
  review: ReviewItem;
  className?: string;
};

type LocalVote = "good" | "bad" | null;

export default function ReviewCard({ review, className = "" }: ReviewCardProps) {
  const [modalReview, setModalReview] = useState<ReviewModalReview | null>(null);
  const [activeVote, setActiveVote] = useState<LocalVote>(null);
  const modalData = reviewItemToModalReview(review);

  const avatarSrc = review.avatar ?? "/images/review-person.png";
  const hasFooterLogo = Boolean(review.sourceLink && review.sourceLogo);

  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(!hasFooterLogo);
  const assetsReady = avatarLoaded && logoLoaded;

  const avatarRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const onAvatarLoad = useCallback(() => setAvatarLoaded(true), []);
  const onLogoLoad = useCallback(() => setLogoLoaded(true), []);
  const onAvatarError = useCallback(() => setAvatarLoaded(true), []);
  const onLogoError = useCallback(() => setLogoLoaded(true), []);

  useEffect(() => {
    setAvatarLoaded(false);
    setLogoLoaded(!hasFooterLogo);
  }, [avatarSrc, review.sourceLogo, hasFooterLogo]);

  useEffect(() => {
    setActiveVote(null);
  }, [review.authorName, review.date, review.text]);

  useLayoutEffect(() => {
    const img = avatarRef.current;
    const logo = logoRef.current;
    if (img?.complete && img.naturalWidth > 0) setAvatarLoaded(true);
    if (hasFooterLogo && logo?.complete && logo.naturalWidth > 0) setLogoLoaded(true);
  }, [avatarSrc, review.sourceLogo, hasFooterLogo]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setAvatarLoaded(true);
      setLogoLoaded(true);
    }, 15000);
    return () => clearTimeout(t);
  }, [avatarSrc, review.sourceLogo, hasFooterLogo]);

  const rootClass = [
    "review-card",
    REVIEW_CARD_SKELETON_ENABLED && !assetsReady ? "review-card--assets-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const baseGood = review.voteGood ?? 0;
  const baseBad = review.voteBad ?? 0;
  const goodCount = baseGood + (activeVote === "good" ? 1 : 0);
  const badCount = baseBad + (activeVote === "bad" ? 1 : 0);

  /** Повторный клик по той же кнопке снимает голос (−1 к счётчику); другая кнопка переключает выбор */
  const onVoteGood = useCallback(() => {
    setActiveVote((prev) => (prev === "good" ? null : "good"));
  }, []);

  const onVoteBad = useCallback(() => {
    setActiveVote((prev) => (prev === "bad" ? null : "bad"));
  }, []);

  return (
    <>
      <div className={rootClass}>
        {REVIEW_CARD_SKELETON_ENABLED && !assetsReady && <ReviewCardSkeleton />}
        <div className="review-card__heading">
          <div className="review-card__person">
            <div className="review-card__person-img-wrap">
              <Image
                ref={avatarRef}
                src={avatarSrc}
                alt=""
                className="review-card__img"
                width={50}
                height={50}
                onLoad={onAvatarLoad}
                onLoadingComplete={onAvatarLoad}
                onError={onAvatarError}
              />
            </div>
            <div className="review-card__person-info">
              <span className="review-card__person-name">{review.authorName}</span>
              <span className="review-card__person-date">{review.date}</span>
            </div>
          </div>
          <div className="review-card__stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`review-card__star${star <= review.rating ? " review-card__star--active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="review-card__text-wrap">
          <p className="review-card__text">{review.text}</p>
          {modalData && (
            <button
              type="button"
              className="review-card__link"
              onClick={() => setModalReview(modalData)}
            >
              Прочитать полностью
            </button>
          )}
          {!modalData && review.readMoreHref && (
            <Link href={review.readMoreHref} className="review-card__link">
              Прочитать полностью
            </Link>
          )}
        </div>

        <div className="review-card__footer">
          {review.sourceLink && review.sourceLogo && (
            <Link href={review.sourceLink} className="review-card__footer-link">
              <Image
                ref={logoRef}
                src={review.sourceLogo}
                alt=""
                className="review-card__company-img"
                width={100}
                height={30}
                onLoad={onLogoLoad}
                onLoadingComplete={onLogoLoad}
                onError={onLogoError}
              />
            </Link>
          )}
          {/* Форма для бэкенда */}
          <form
            className="review-card__vote"
            aria-label="Оценка отзыва"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="hidden" name="reviewKey" value={`${review.authorName}|${review.date}`} />
            <input type="hidden" name="vote" value={activeVote ?? ""} />
            {review.voteGood != null && (
              <button
                type="button"
                className={`review-card__vote-button review-card__vote-button--good${activeVote === "good" ? " review-card__vote-button--good-active" : ""}`}
                aria-pressed={activeVote === "good"}
                aria-label="Полезный отзыв"
                onClick={onVoteGood}
              >
                {goodCount}
              </button>
            )}
            {review.voteBad != null && (
              <button
                type="button"
                className={`review-card__vote-button review-card__vote-button--bad${activeVote === "bad" ? " review-card__vote-button--bad-active" : ""}`}
                aria-pressed={activeVote === "bad"}
                aria-label="Бесполезный отзыв"
                onClick={onVoteBad}
              >
                {badCount}
              </button>
            )}
          </form>
        </div>
      </div>

      <ReviewModal review={modalReview} onClose={() => setModalReview(null)} />
    </>
  );
}
