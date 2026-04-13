"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { NEWS_CARDS } from "@/constants";
import NewsArticleCard from "@/components/ui/NewsArticleCard";
import Pagination from "@/components/ui/Pagination";
import "./NewsSection.scss";

const DISPLAY_COUNT = 5;
const PAGE_SIZE_FULL = 5;

// ==================================================================================
// Секция: вариант preview (по умолчанию) — последние 5 новостей; full — все + пагинация
// ==================================================================================
type NewsSectionVariant = "preview" | "full";
type NewsSectionProps = {
  variant?: NewsSectionVariant;
};

export default function NewsSection({ variant = "preview" }: NewsSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldScrollAfterPageChangeRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const isFull = variant === "full";

  const totalPages = Math.max(1, Math.ceil(NEWS_CARDS.length / PAGE_SIZE_FULL));
  const currentPage = useMemo(() => {
    if (!isFull) return 1;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    if (!Number.isFinite(page) || page < 1) return 1;
    return Math.min(page, totalPages);
  }, [isFull, searchParams, totalPages]);

  const displayed = useMemo(() => {
    if (isFull) {
      return NEWS_CARDS.slice(
        (currentPage - 1) * PAGE_SIZE_FULL,
        currentPage * PAGE_SIZE_FULL
      );
    }
    return NEWS_CARDS.slice(-DISPLAY_COUNT);
  }, [isFull, currentPage]);

  const featuredCard = displayed[0];
  const listCards = displayed.slice(1, 5);

  const setPage = (page: number) => {
    const url = page === 1 ? pathname : `${pathname}?page=${page}`;
    router.replace(url, { scroll: false });
  };

  const goToPage = (page: number) => {
    shouldScrollAfterPageChangeRef.current = true;
    setPage(page);
  };

  useEffect(() => {
    if (!isFull || !shouldScrollAfterPageChangeRef.current) return;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!shouldScrollAfterPageChangeRef.current) return;
        shouldScrollAfterPageChangeRef.current = false;
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [currentPage, isFull]);

  return (
    <section ref={sectionRef} className="news section container">
      <h2 className="news__title section-title">
        Новости<span className="section-title--accent"> и статьи</span>
      </h2>

      <div className="news__content">
        {!isMobile && featuredCard && (
          <NewsArticleCard card={featuredCard} layout="featured" priority />
        )}

        <div className="news__cards-wrap">
          <div className={`news__cards${isMobile ? " news__cards--mobile" : ""}`}>
            {isMobile
              ? displayed.map((card, index) => (
                  <NewsArticleCard
                    key={`${card.title}-${index}`}
                    card={card}
                    layout="featured"
                    priority={index === 0}
                  />
                ))
              : listCards.map((card, index) => (
                  <NewsArticleCard
                    key={`${card.title}-${index}`}
                    card={card}
                    layout="compact"
                  />
                ))}
          </div>
          {isFull ? (
            totalPages > 1 && (
              <Pagination
                totalItems={NEWS_CARDS.length}
                pageSize={PAGE_SIZE_FULL}
                currentPage={currentPage}
                onPageChange={goToPage}
              />
            )
          ) : (
            <Link href="/news" className="news__link">
              Все подборки
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
