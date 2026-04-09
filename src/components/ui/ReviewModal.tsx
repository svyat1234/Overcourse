"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { ReviewCard } from "@/constants";
import ReviewModalSkeleton from "@/components/ui/ReviewModalSkeleton";
import "./ReviewModal.scss";

/** Плейсхолдер до загрузки фото в модалке: `false` — отключить одним переключателем */
const REVIEW_MODAL_SKELETON_ENABLED = true;

type ReviewModalProps = {
  /** Отзыв для отображения; при null модалка не рендерится */
  review: ReviewCard | null;
  onClose: () => void;
};

export default function ReviewModal({ review, onClose }: ReviewModalProps) {
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImgLoad = useCallback(() => setImgLoaded(true), []);
  const onImgError = useCallback(() => setImgLoaded(true), []);

  const handleClose = useCallback(() => {
    closingRef.current = true;
    setVisible(false);
  }, []);

  const handleTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "opacity") return;
      if (closingRef.current) {
        closingRef.current = false;
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!review) {
      setVisible(false);
      setImgLoaded(false);
      return;
    }
    closingRef.current = false;
    setVisible(false);
    setImgLoaded(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(id);
  }, [review]);

  useLayoutEffect(() => {
    if (!review) return;
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, [review?.img]);

  useEffect(() => {
    if (!review) return;
    const t = window.setTimeout(() => setImgLoaded(true), 15000);
    return () => clearTimeout(t);
  }, [review?.img]);

  useEffect(() => {
    if (!review) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [review, handleClose]);

  if (!review) return null;

  const showSkeleton = REVIEW_MODAL_SKELETON_ENABLED && !imgLoaded;

  /** Вне body fixed ломается внутри Swiper (transform на слайдах) */
  const modal = (
    <div
      className={`review-modal${visible ? " review-modal--visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="review-modal__panel">
        <button
          type="button"
          className="review-modal__close"
          aria-label="Закрыть"
          onClick={handleClose}
        />
        <div className="review-modal__card">
          {showSkeleton && <ReviewModalSkeleton />}
          <div className={showSkeleton ? "review-modal__content review-modal__content--hidden" : "review-modal__content"}>
            <div className="review-modal__row">
              <div className="review-modal__main">
                <div className="review-modal__heading">
                  <div className="review-modal__person">
                    <h3 id="review-modal-title" className="review-modal__name">
                      {review.name}
                    </h3>
                    <span className="review-modal__city">{review.city}</span>
                  </div>
                  <div className="review-modal__school">
                    <span className="review-modal__school-course">{review.course}</span>
                    <span className="review-modal__school-name">{review.school}</span>
                  </div>
                </div>
                <p className="review-modal__full-text">{review.text}</p>
                <Link
                  href={review.courseHref ?? "/courses"}
                  className="review-modal__course-link"
                  onClick={handleClose}
                >
                  Перейти к курсу
                </Link>
              </div>
              <div className="review-modal__img-wrap">
                <Image
                  ref={imgRef}
                  src={review.img}
                  alt=""
                  className="review-modal__img"
                  width={200}
                  height={236}
                  sizes="240px"
                  onLoad={onImgLoad}
                  onError={onImgError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
