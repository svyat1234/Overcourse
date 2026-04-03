"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CourseCard from "@/components/ui/CourseCard";
import Pagination from "@/components/ui/Pagination";
import type { Course } from "@/constants";
import "./CatalogSection.scss";

const COURSES_CATEGORIES = [
  { label: "Популярные", isPopular: true },
  { label: "Со скидками", isPopular: false },
  { label: "В рассрочку", isPopular: false },
  { label: "Бесплатные", isPopular: false },
  { label: "Для новчиков", isPopular: false },
  { label: "До 6 месяцев", isPopular: false },
  { label: "4.5 и выше", isPopular: false },
];

type Layout = "grid" | "list";

export type CatalogSectionVariant = "small" | "full";

type CatalogSectionProps = {
  courses: Course[];
  variant?: CatalogSectionVariant;
};

const PAGE_SIZE = 16;

export default function CatalogSection({
  courses,
  variant = "full",
}: CatalogSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldScrollAfterPageChangeRef = useRef(false);
  const [layout, setLayout] = useState<Layout>("grid");
  const [isMobile, setIsMobile] = useState(false);
  /** Режим: по номеру страницы показываем только её (16 карточек), по «Показать ещё» — накапливаем страницы */
  const [viewMode, setViewMode] = useState<"single" | "expanded">("single");
  /** Сколько страниц «раскрыто» кнопкой «Показать ещё» (минимум 1) */
  const [visiblePages, setVisiblePages] = useState(1);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const effectiveLayout = isMobile ? "list" : layout;

  const isFull = variant === "full";
  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));

  const currentPage = useMemo(() => {
    if (!isFull) return 1;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    if (!Number.isFinite(page) || page < 1) return 1;
    return Math.min(page, totalPages);
  }, [isFull, searchParams, totalPages]);

  const setPage = (page: number) => {
    const url = page === 1 ? pathname : `${pathname}?page=${page}`;
    router.replace(url, { scroll: false });
  };

  const goToPage = (page: number) => {
    shouldScrollAfterPageChangeRef.current = true;
    setViewMode("single");
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

  const handleShowMore = () => {
    const nextVisible = Math.min(totalPages, visiblePages + 1);
    setVisiblePages(nextVisible);
    setViewMode("expanded");
    setPage(nextVisible);
  };

  const displayedCourses = isFull
    ? viewMode === "single"
      ? courses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
      : courses.slice(0, visiblePages * PAGE_SIZE)
    : courses;

  const TitleTag = isFull ? "h1" : "h2";

  return (
    <section ref={sectionRef} className="courses section container">
      <TitleTag className="courses__title section-title">
        Лучшие курсы по&nbsp;направлениям
      </TitleTag>

      {isFull && (
        <div className="courses-filters">
          <div className="courses-filters__main-buttons">
            <button type="button" className="courses-filters__main-button courses-filters__main-button--filters">
              <span className="courses-filters__main-button-title courses-filters__text-icon courses-filters__text-icon--filters">
                Фильтры
              </span>
              <span className="courses-filters__main-button-count">1</span>
            </button>
            <button type="button" className="courses-filters__main-button courses-filters__main-button--categories">
              <span className="courses-filters__main-button-subtitle">Программирование</span>
              <span className="courses-filters__main-button-title">Все категории</span>
            </button>
          </div>
          <div className="courses-filters__lists">
            <div className="courses-filters__list">
              <button type="button" className="courses-filters__list-button">
                Инструменты все
              </button>
            </div>
            <div className="courses-filters__list">
              <button type="button" className="courses-filters__list-button">
                <span className="courses-filters__text-icon courses-filters__text-icon--rating">
                  Рейтинг любой
                </span>
              </button>
            </div>
            <div className="courses-filters__list">
              <button type="button" className="courses-filters__list-button">
                <span className="courses-filters__text-icon courses-filters__text-icon--price">
                  0 ₽ - 288 000 ₽
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="courses__menu">
        <div className="courses__menu-categories">
          {COURSES_CATEGORIES.map(({ label, isPopular }) => (
            <button
              key={label}
              type="button"
              className={`courses__menu-category${isPopular ? " courses__menu-category--popular" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
        {!isMobile && (
          <div className="courses__menu-layout-buttons">
            <button
              type="button"
              aria-label="Сетка"
              className={[
                "courses__menu-layout-button",
                "courses__menu-layout-button--grid",
                layout === "grid" && "courses__menu-layout-button--grid-active",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setLayout("grid")}
            />
            <button
              type="button"
              aria-label="Список"
              className={[
                "courses__menu-layout-button",
                "courses__menu-layout-button--list",
                layout === "list" && "courses__menu-layout-button--list-active",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setLayout("list")}
            />
          </div>
        )}
      </div>

      <div className={`courses__cards courses__cards--${effectiveLayout === "grid" ? "normal" : "wide"}`}>
        {displayedCourses.map((course, index) => (
          <CourseCard
            key={course.slug ?? `${course.title}-${index}`}
            course={course}
            variant={effectiveLayout === "list" ? "wide" : "standard"}
          />
        ))}
      </div>

      {isFull && totalPages > 1 && (
        <Pagination
          totalItems={courses.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={goToPage}
          showMoreButton={
            currentPage < totalPages
              ? { text: "Показать ещё", onClick: handleShowMore }
              : undefined
          }
        />
      )}
    </section>
  );
}
