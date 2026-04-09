"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsCard } from "@/constants";
import { NEWS_ARTICLE_HREF_PLACEHOLDER } from "@/constants";
import NewsArticleCardSkeleton from "@/components/ui/NewsArticleCardSkeleton";
import "./NewsArticleCard.scss";

/** Плейсхолдер до загрузки обложки: `false` — отключить одним переключателем */
const NEWS_ARTICLE_CARD_SKELETON_ENABLED = true;

export type NewsArticleCardLayout = "featured" | "compact";

export type NewsArticleCardProps = {
  card: NewsCard;
  /** Крупная карточка с лидом или компактная строка в списке */
  layout: NewsArticleCardLayout;
  className?: string;
};

export default function NewsArticleCard({
  card,
  layout,
  className = "",
}: NewsArticleCardProps) {
  const articleHref = card.articleHref ?? NEWS_ARTICLE_HREF_PLACEHOLDER;
  const isFeatured = layout === "featured";

  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onImgLoad = useCallback(() => setImgLoaded(true), []);
  const onImgError = useCallback(() => setImgLoaded(true), []);

  useEffect(() => {
    setImgLoaded(false);
  }, [card.image]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setImgLoaded(true);
  }, [card.image]);

  useEffect(() => {
    const t = window.setTimeout(() => setImgLoaded(true), 15000);
    return () => clearTimeout(t);
  }, [card.image]);

  const showSkeleton = NEWS_ARTICLE_CARD_SKELETON_ENABLED && !imgLoaded;
  const skeletonVariant = isFeatured ? "featured" : "compact";

  const rootClass = [
    "news-article-card",
    isFeatured ? "news-article-card--featured" : "news-article-card--compact",
    showSkeleton ? "news-article-card--assets-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const innerClass = [
    "news-article-card__inner",
    showSkeleton ? "news-article-card__inner--hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const imageEl = (
    <Image
      ref={imgRef}
      src={card.image}
      alt=""
      className="news-article-card__img"
      width={785}
      height={isFeatured ? 520 : 160}
      sizes={isFeatured ? "785px" : "250px"}
      onLoad={onImgLoad}
      onError={onImgError}
    />
  );

  return (
    <Link href={articleHref} className={rootClass} aria-label={card.title}>
      {showSkeleton && <NewsArticleCardSkeleton variant={skeletonVariant} />}
      <div className={innerClass}>
        <div className="news-article-card__img-wrap">{imageEl}</div>
        <div className="news-article-card__info">
          <div className="news-article-card__tags">
            {card.tags.map((tag) => (
              <span key={tag.label} className="news-article-card__tag">
                {tag.label}
              </span>
            ))}
          </div>
          <h3 className="news-article-card__title">{card.title}</h3>
          <p className="news-article-card__text">{card.text}</p>
        </div>
      </div>
    </Link>
  );
}
