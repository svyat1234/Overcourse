"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/constants";
import CourseCardSkeleton from "@/components/ui/CourseCardSkeleton";
import "./CourseCard.scss";

/** Плейсхолдер до загрузки картинок: `false` — скрыть скелетон одним переключением (компонент и стили не трогаем). */
const COURSE_CARD_SKELETON_ENABLED = true;

export type CourseCardVariant = "standard" | "wide";

type CourseCardProps = {
  course: Course;
  variant?: CourseCardVariant;
};

/**
 * Карточка курса. Переиспользуемый блок course-card (БЭМ).
 * variant="standard" — стандартная (по умолчанию, вертикальная сетка).
 * variant="wide"     — широкая (горизонтальная, для top-courses и т.п.).
 */
export default function CourseCard({ course, variant = "standard" }: CourseCardProps) {
  const {
    slug,
    rating,
    schoolLogo,
    image,
    title,
    duration,
    lessonsCount,
    tags,
    text,
    pricePerMonth,
    priceTotal,
    priceOld,
  } = course;

  const courseHref = slug ? `/courses/${slug}` : "#";

  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const assetsReady = imageLoaded && logoLoaded;

  const imageRef = useRef<HTMLImageElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const onImageLoad = useCallback(() => setImageLoaded(true), []);
  const onLogoLoad = useCallback(() => setLogoLoaded(true), []);
  const onImageError = useCallback(() => setImageLoaded(true), []);
  const onLogoError = useCallback(() => setLogoLoaded(true), []);

  useEffect(() => {
    setImageLoaded(false);
    setLogoLoaded(false);
  }, [course.slug, image, schoolLogo]);

  /** next/image не всегда вызывает onLoad при кэше; дублируем проверку в useLayoutEffect (img.complete) */
  useLayoutEffect(() => {
    const img = imageRef.current;
    const logo = logoRef.current;
    if (img?.complete && img.naturalWidth > 0) setImageLoaded(true);
    if (logo?.complete && logo.naturalWidth > 0) setLogoLoaded(true);
  }, [course.slug, image, schoolLogo]);

  /** Страховка от зависшего запроса / редких гонок, чтобы скелетон не оставался бесконечно */
  useEffect(() => {
    const t = window.setTimeout(() => {
      setImageLoaded(true);
      setLogoLoaded(true);
    }, 15000);
    return () => clearTimeout(t);
  }, [course.slug, image, schoolLogo]);

  if (variant === "wide") {
    return (
      <article className="course-card--wide">
        {COURSE_CARD_SKELETON_ENABLED && !assetsReady && <CourseCardSkeleton variant="wide" />}
        <div className="course-card--wide__img-wrap">
          <Image
            ref={imageRef}
            src={image}
            alt=""
            className="course-card--wide__img"
            fill
            sizes="(max-width: 992px) 100vw, 443px"
            onLoad={onImageLoad}
            onError={onImageError}
          />
          <div className="course-card--wide__rating">{rating}</div>
          <div className="course-card--wide__company">
            <Image
              ref={logoRef}
              src={schoolLogo}
              alt=""
              className="course-card--wide__company-img"
              width={120}
              height={38}
              onLoad={onLogoLoad}
              onError={onLogoError}
            />
          </div>
        </div>
        <div className="course-card--wide__content">
          <div className="course-card--wide__heading">
            <h3 className="course-card--wide__title">{title}</h3>
            <div className="course-card--wide__info">
              <span>
                <span className="course-card--wide__time">{duration} мес</span>
                {lessonsCount != null && (
                  <> | <span className="course-card--wide__count">{lessonsCount}</span> уроков</>
                )}
              </span>
            </div>
            <div className="course-card--wide__tags">
              {tags.map((tag) => (
                <Link key={tag.label} href={tag.href} className="course-card--wide__tag">
                  {tag.label}
                </Link>
              ))}
            </div>
            {text && <p className="course-card--wide__text">{text}</p>}
          </div>
          <div className="course-card--wide__prices-buttons">
            <div className="course-card--wide__prices">
              <span className="course-card--wide__installments">{pricePerMonth} ₽ в месяц</span>
              <div className="course-card--wide__prices-wrap">
                <span className="course-card--wide__price">{priceTotal} ₽</span>
                <span className="course-card--wide__price-old">{priceOld} ₽</span>
              </div>
            </div>
            <div className="course-card--wide__buttons">
              <Link href={courseHref} className="course-card--wide__button button">
                Перейти на сайт
              </Link>
              <button
                type="button"
                className={`button-favorite${isFavorite ? " button-favorite--active" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="course-card">
      {COURSE_CARD_SKELETON_ENABLED && !assetsReady && <CourseCardSkeleton variant="standard" />}
      <div className="course-card__img-wrap">
        <Image
          ref={imageRef}
          src={image}
          alt=""
          className="course-card__img"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1500px) 33vw, 25vw"
          onLoad={onImageLoad}
          onError={onImageError}
        />
        <div className="course-card__info">
          <div className="course-card__rating">{rating}</div>
          <div className="course-card__company">
            <Image
              ref={logoRef}
              src={schoolLogo}
              alt=""
              className="course-card__company-img"
              width={120}
              height={38}
              onLoad={onLogoLoad}
              onError={onLogoError}
            />
          </div>
        </div>
      </div>
      <div className="course-card__content">
        <div className="course-card__heading">
          <h3 className="course-card__title">{title}</h3>
          <span className="course-card__time">{duration} мес</span>
          <div className="course-card__tags">
            {tags.map((tag) => (
              <Link key={tag.label} href={tag.href} className="course-card__tag">
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="course-card__actions">
          <span className="course-card__installments">{pricePerMonth} ₽ в месяц</span>
          <div className="course-card__price-wrap">
            <span className="course-card__price">{priceTotal} ₽</span>
            <span className="course-card__price-old">{priceOld} ₽</span>
          </div>
          <div className="course-card__buttons">
            <Link href={courseHref} className="course-card__link button">
              Перейти на сайт
            </Link>
            <button
              type="button"
              className={`button-favorite${isFavorite ? " button-favorite--active" : ""}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label={isFavorite ? "Убрать из избранного" : "В избранное"}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
