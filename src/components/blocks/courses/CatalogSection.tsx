"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import CourseCard from "@/components/ui/CourseCard";
import Pagination from "@/components/ui/Pagination";
import FiltersModal from "@/components/ui/FiltersModal";
import type { Course } from "@/constants";
import "./CatalogSection.scss";

// ============================================================
// Константы для фильтров
// ============================================================
export const MAX_PRICE_DEFAULT = 288000;
export const MAX_DURATION_DEFAULT = 48;

const COURSES_CATEGORIES = [
  { label: "Популярные", isPopular: true },
  { label: "Со скидками", isPopular: false },
  { label: "В рассрочку", isPopular: false },
  { label: "Бесплатные", isPopular: false },
  { label: "Для новичков", isPopular: false }, 
  { label: "До 6 месяцев", isPopular: false },
  { label: "4.5 и выше", isPopular: false },
];

const CATEGORIES_DROPDOWN = [
  "1С бухгалтерия", "1С-аналитика", "1С-разработка", "3D-моделирование", 
  "Android-разработка", "C#-разработка", "C++-разработка", "Data Science",
  "Frontend-разработка", "FullStack-разработка", "Python-разработка"
];

const SORT_OPTIONS = [
  "Популярные", "Новые курсы", "Высокий рейтинг", "Подороже", "Подешевле"
];

const RATING_OPTIONS = ["Любой", "4.5 и выше", "4.0 и выше", "3.5 и выше"];

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
  const [viewMode, setViewMode] = useState<"single" | "expanded">("single");
  const [visiblePages, setVisiblePages] = useState(1);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  // Оптимистичные стейты для мгновенной реакции интерфейса
  const [optimisticCategory, setOptimisticCategory] = useState<string | null>(null);
  const [optimisticRating, setOptimisticRating] = useState<string | null>(null);
  const [optimisticSort, setOptimisticSort] = useState<string | null>(null);
  const [optimisticTags, setOptimisticTags] = useState<string[] | null>(null);

  // Сброс оптимистичных стейтов, когда URL реально обновляется
  useEffect(() => {
    setOptimisticCategory(null);
    setOptimisticRating(null);
    setOptimisticSort(null);
    setOptimisticTags(null);
  }, [searchParams]);

  // Локальный стейт для дропдауна цены
  const [localPriceRange, setLocalPriceRange] = useState({ min: 0, max: MAX_PRICE_DEFAULT });

  // ============================================================
  // Интеграция с API (Loading / Error states)
  // ============================================================
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  /*
  // Для полноценной работы с бэкендом (FastAPI) раскомментируйте этот useEffect
  useEffect(() => {
    let isMounted = true;
    const fetchCourses = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const query = searchParams.toString();
        const res = await fetch(`/api/courses?${query}`);
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();
        if (isMounted) {
          // Обновление стейта полученными данными
          // setCourses(data.items);
          // setTotalItems(data.total);
        }
      } catch (err) {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCourses();
    return () => { isMounted = false; };
  }, [searchParams]);
  */

  // Извлечение текущих значений из URL с учетом оптимистичного стейта
  const selectedCategory = optimisticCategory ?? (searchParams.get("category") || "Все категории");
  const selectedRating = optimisticRating ?? (searchParams.get("rating_gte") ? `${searchParams.get("rating_gte")} и выше` : "Любой");
  const minPrice = searchParams.get("min_price") ? Number(searchParams.get("min_price")) : 0;
  const maxPrice = searchParams.get("max_price") ? Number(searchParams.get("max_price")) : MAX_PRICE_DEFAULT;
  
  const sortParam = searchParams.get("sort_by");
  let urlSort = "Популярные";
  if (sortParam === "-created_at") urlSort = "Новые курсы";
  if (sortParam === "-rating") urlSort = "Высокий рейтинг";
  if (sortParam === "-price") urlSort = "Подороже";
  if (sortParam === "price") urlSort = "Подешевле";
  const selectedSort = optimisticSort ?? urlSort;

  const activeTags = searchParams.getAll("tags");
  const currentTags = optimisticTags ?? (activeTags.length === 0 ? ["Популярные"] : [...activeTags]);

  // Закрытие дропдаунов по клику вне
  useEffect(() => {
    const closeAll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Если клик был внутри любого дропдауна или по кнопке открытия — не закрываем
      if (
        target.closest('.courses-filters__dropdown') || 
        target.closest('.courses__menu-dropdown') ||
        target.closest('.courses-filters__main-button') ||
        target.closest('.courses-filters__list-button') ||
        target.closest('.courses__menu-category')
      ) {
        return;
      }
      
      setIsCategoriesOpen(false);
      setIsSortOpen(false);
      setIsRatingOpen(false);
      setIsPriceOpen(false);
    };
    document.addEventListener("click", closeAll);
    return () => document.removeEventListener("click", closeAll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ============================================================
  // Функция для сбора параметров из URL и локального стейта,
  // чтобы фильтры не сбрасывались при очень быстрых кликах
  // ============================================================
  const buildCurrentParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (optimisticCategory !== null) {
      if (optimisticCategory === "Все категории") params.delete("category");
      else params.set("category", optimisticCategory);
    }
    
    if (optimisticRating !== null) {
      if (optimisticRating === "Любой") params.delete("rating_gte");
      else {
        const match = optimisticRating.match(/[\d.]+/);
        if (match) params.set("rating_gte", match[0]);
      }
    }
    
    if (optimisticSort !== null) {
      let sortVal = "popularity";
      if (optimisticSort === "Новые курсы") sortVal = "-created_at";
      if (optimisticSort === "Высокий рейтинг") sortVal = "-rating";
      if (optimisticSort === "Подороже") sortVal = "-price";
      if (optimisticSort === "Подешевле") sortVal = "price";
      if (sortVal === "popularity") params.delete("sort_by");
      else params.set("sort_by", sortVal);
    }

    if (optimisticTags !== null) {
      params.delete("tags");
      const actualTags = optimisticTags.filter(t => t !== "Популярные");
      actualTags.forEach(t => params.append("tags", t));
    }
    
    return params;
  };

  const updateUrlParam = (key: string, value: string | null) => {
    const params = buildCurrentParams();
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1"); // Сброс пагинации при смене фильтров
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (cat: string) => {
    setOptimisticCategory(cat);
    updateUrlParam("category", cat === "Все категории" ? null : cat);
  };

  const handleRatingSelect = (ratingStr: string) => {
    setOptimisticRating(ratingStr);
    if (ratingStr === "Любой") {
      updateUrlParam("rating_gte", null);
    } else {
      const match = ratingStr.match(/[\d.]+/);
      if (match) updateUrlParam("rating_gte", match[0]);
    }
  };

  const handleSortSelect = (sortStr: string) => {
    setOptimisticSort(sortStr);
    let sortVal = "popularity";
    if (sortStr === "Новые курсы") sortVal = "-created_at";
    if (sortStr === "Высокий рейтинг") sortVal = "-rating";
    if (sortStr === "Подороже") sortVal = "-price";
    if (sortStr === "Подешевле") sortVal = "price";
    
    updateUrlParam("sort_by", sortVal === "popularity" ? null : sortVal);
  };

  const applyPriceFilter = () => {
    const params = buildCurrentParams();
    if (localPriceRange.min > 0) params.set("min_price", localPriceRange.min.toString());
    else params.delete("min_price");
    
    if (localPriceRange.max < MAX_PRICE_DEFAULT) params.set("max_price", localPriceRange.max.toString());
    else params.delete("max_price");

    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setIsPriceOpen(false);
  };

  const toggleTag = (label: string) => {
    // Вычисляем новые теги на основе самого свежего состояния (optimistic или url)
    const actualTags = currentTags.filter(t => t !== "Популярные");
    
    let newTags;
    if (actualTags.includes(label)) {
      newTags = actualTags.filter(t => t !== label);
    } else {
      newTags = [...actualTags, label];
    }
    
    // Мгновенное обновление UI до изменения URL
    setOptimisticTags(newTags.length === 0 ? ["Популярные"] : newTags);
    
    // Собираем параметры с учетом ВСЕХ других оптимистичных стейтов
    const params = buildCurrentParams();
    
    // Применяем именно новые теги поверх
    params.delete("tags");
    newTags.forEach(t => params.append("tags", t));
    
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Синхронизация локального стейта цены при открытии дропдауна
  useEffect(() => {
    if (isPriceOpen) {
      setLocalPriceRange({ min: minPrice, max: maxPrice });
    }
  }, [isPriceOpen, minPrice, maxPrice]);

  const effectiveLayout = isMobile ? "list" : layout;
  const isFull = variant === "full";
  const totalPages = Math.max(1, Math.ceil(courses.length / PAGE_SIZE));

  // ============================================================
  // Фейковая фильтрация для демонстрации на фронтенде
  // (В реальном проекте фильтрация происходит на бекенде)
  // ============================================================
  const filteredCourses = useMemo(() => {
    if (!isFull) return courses;
    let result = [...courses];
    
    // Имитация фильтрации: чтобы был виден результат работы кнопок,
    // просто отрезаем часть массива в зависимости от выбранных фильтров
    if (selectedCategory !== "Все категории") {
      // Оставляем каждый второй
      result = result.filter((_, i) => i % 2 === 0);
    }
    
    if (selectedRating !== "Любой") {
      result = result.slice(0, Math.floor(result.length * 0.7));
    }
    
    if (minPrice > 0 || maxPrice < MAX_PRICE_DEFAULT) {
      result = result.slice(0, Math.floor(result.length * 0.5));
    }
    
    if (selectedSort !== "Популярные") {
      result = result.reverse();
    }
    
    if (currentTags.length > 0 && !currentTags.includes("Популярные")) {
      result = result.slice(0, Math.floor(result.length * 0.8));
    }
    
    return result;
  }, [courses, isFull, selectedCategory, selectedRating, minPrice, maxPrice, selectedSort, currentTags]);

  const filteredTotalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));

  const currentPage = useMemo(() => {
    if (!isFull) return 1;
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    if (!Number.isFinite(page) || page < 1) return 1;
    return Math.min(page, filteredTotalPages);
  }, [isFull, searchParams, filteredTotalPages]);

  const setPage = (page: number) => {
    const params = buildCurrentParams();
    if (page === 1) params.delete("page");
    else params.set("page", page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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
    const nextVisible = Math.min(filteredTotalPages, visiblePages + 1);
    setVisiblePages(nextVisible);
    setViewMode("expanded");
    setPage(nextVisible);
  };

  const displayedCourses = isFull
    ? viewMode === "single"
      ? filteredCourses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
      : filteredCourses.slice(0, visiblePages * PAGE_SIZE)
    : filteredCourses;

  const TitleTag = isFull ? "h1" : "h2";

  let activeFiltersCount = 0;
  
  if (searchParams.getAll("directions").length > 0) activeFiltersCount++;
  if (searchParams.getAll("categories").length > 0) activeFiltersCount++;
  if (searchParams.getAll("schools").length > 0) activeFiltersCount++;
  
  const minP = searchParams.get("min_price");
  if (minP && minP !== "0" && minP !== "NaN" && minP !== "null") activeFiltersCount++;
  
  const maxP = searchParams.get("max_price");
  if (maxP && maxP !== MAX_PRICE_DEFAULT.toString() && maxP !== "NaN" && maxP !== "null") activeFiltersCount++;
  
  const minD = searchParams.get("min_duration");
  if (minD && minD !== "0" && minD !== "NaN" && minD !== "null") activeFiltersCount++;
  
  const maxD = searchParams.get("max_duration");
  if (maxD && maxD !== MAX_DURATION_DEFAULT.toString() && maxD !== "NaN" && maxD !== "null") activeFiltersCount++;
  
  const r = searchParams.get("rating_gte");
  if (r && r !== "0" && r !== "Любой" && r !== "NaN" && r !== "null") activeFiltersCount++;
  
  const lvl = searchParams.get("level");
  if (lvl === "новичок" || lvl === "специалист") activeFiltersCount++;
  
  const jh = searchParams.get("job_help");
  if (jh === "true" || jh === "false") activeFiltersCount++;
  
  const frm = searchParams.get("format");
  if (frm && frm !== "Онлайн" && frm !== "Любой" && frm !== "null") activeFiltersCount++;
  
  if (searchParams.get("is_free") === "true") activeFiltersCount++;
  if (searchParams.get("is_installment") === "true") activeFiltersCount++;
  
  const cat = searchParams.get("category");
  if (cat && cat !== "Все категории" && cat !== "null") activeFiltersCount++;

  const tgs = searchParams.getAll("tags");
  if (tgs.length > 0 && !(tgs.length === 1 && tgs[0] === "Популярные")) activeFiltersCount++;

  return (
    <section ref={sectionRef} className="courses section container">
      <TitleTag className="courses__title section-title">
        Лучшие курсы по&nbsp;направлениям
      </TitleTag>

      {isFull && (
        <div className="courses-filters">
          <div className="courses-filters__main-buttons">
            <button 
              type="button" 
              className="courses-filters__main-button courses-filters__main-button--filters"
              onClick={(e) => {
                e.stopPropagation();
                setIsFiltersOpen(true);
              }}
            >
              <span className="courses-filters__main-button-title courses-filters__text-icon courses-filters__text-icon--filters">
                Фильтры
              </span>
              {activeFiltersCount > 0 && (
                <span className="courses-filters__main-button-count">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <div className="courses-filters__main-button-wrapper" onClick={e => e.stopPropagation()}>
              <button 
                type="button" 
                className={`courses-filters__main-button courses-filters__main-button--categories ${isCategoriesOpen ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCategoriesOpen(!isCategoriesOpen);
                  setIsRatingOpen(false);
                  setIsPriceOpen(false);
                }}
              >
                <span className="courses-filters__main-button-subtitle">Направление</span>
                <span className="courses-filters__main-button-title">{selectedCategory}</span>
              </button>
              {isCategoriesOpen && (
                <div className="courses-filters__dropdown">
                  <button 
                    className="courses-filters__dropdown-item"
                    onClick={() => {
                      handleCategorySelect("Все категории");
                      setIsCategoriesOpen(false);
                    }}
                  >
                    Все категории
                  </button>
                  {CATEGORIES_DROPDOWN.map(cat => (
                    <button 
                      key={cat} 
                      className="courses-filters__dropdown-item"
                      onClick={() => {
                        handleCategorySelect(cat);
                        setIsCategoriesOpen(false);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="courses-filters__lists">
            <div className="courses-filters__list" onClick={e => e.stopPropagation()}>
              <button 
                type="button" 
                className={`courses-filters__list-button ${isRatingOpen ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRatingOpen(!isRatingOpen);
                  setIsCategoriesOpen(false);
                  setIsPriceOpen(false);
                }}
              >
                <span className="courses-filters__text-icon courses-filters__text-icon--rating">
                  Рейтинг {selectedRating}
                </span>
              </button>
              {isRatingOpen && (
                <div className="courses-filters__dropdown">
                  {RATING_OPTIONS.map(opt => (
                    <button 
                      key={opt} 
                      className="courses-filters__dropdown-item"
                      onClick={() => {
                        handleRatingSelect(opt);
                        setIsRatingOpen(false);
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="courses-filters__list" onClick={e => e.stopPropagation()}>
              <button 
                type="button" 
                className={`courses-filters__list-button ${isPriceOpen ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPriceOpen(!isPriceOpen);
                  setIsCategoriesOpen(false);
                  setIsRatingOpen(false);
                }}
              >
                <span className="courses-filters__text-icon courses-filters__text-icon--price">
                  {minPrice.toLocaleString("ru-RU")} ₽ - {maxPrice.toLocaleString("ru-RU")} ₽
                </span>
              </button>
              {isPriceOpen && (
                <div className="courses-filters__dropdown courses-filters__dropdown--price" onClick={e => e.stopPropagation()}>
                  <div className="courses-filters__price-popover">
                    <div className="courses-filters__price-inputs">
                      <div className="courses-filters__price-field">
                        <span>от</span>
                        <input 
                          type="number" 
                          value={localPriceRange.min || ""} 
                          onChange={(e) => setLocalPriceRange({ ...localPriceRange, min: +e.target.value })}
                        />
                      </div>
                      <div className="courses-filters__price-field">
                        <span>до</span>
                        <input 
                          type="number" 
                          value={localPriceRange.max || ""} 
                          onChange={(e) => setLocalPriceRange({ ...localPriceRange, max: +e.target.value })}
                        />
                      </div>
                    </div>
                    <button 
                      className="courses-filters__price-apply"
                      onClick={applyPriceFilter}
                    >
                      Применить
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="courses__menu" onClick={e => e.stopPropagation()}>
        <div className="courses__menu-categories">
          <div className="courses__menu-sort-wrapper">
            <button
              type="button"
              className={`courses__menu-category courses__menu-category--popular ${isSortOpen ? "active" : ""}`}
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsCategoriesOpen(false);
                setIsRatingOpen(false);
                setIsPriceOpen(false);
              }}
            >
              {selectedSort}
            </button>
            {isSortOpen && (
              <div className="courses__menu-dropdown">
                {SORT_OPTIONS.map(option => (
                  <button 
                    key={option} 
                    className="courses__menu-dropdown-item"
                    onClick={() => {
                      handleSortSelect(option);
                      setIsSortOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          {COURSES_CATEGORIES.slice(1).map(({ label }) => {
            // Кнопка "4.5 и выше" завязана на рейтинг (rating_gte), а не на теги (tags)
            if (label === "4.5 и выше") {
              const isActive = selectedRating === "4.5 и выше";
              return (
                <button
                  key={label}
                  type="button"
                  className={`courses__menu-category ${isActive ? "active" : ""}`}
                  onClick={() => {
                    handleRatingSelect(isActive ? "Любой" : "4.5 и выше");
                  }}
                >
                  {label}
                </button>
              );
            }
            
            // Остальные кнопки - это обычные теги
            return (
              <button
                key={label}
                type="button"
                className={`courses__menu-category ${currentTags.includes(label) ? "active" : ""}`}
                onClick={() => toggleTag(label)}
              >
                {label}
              </button>
            );
          })}
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

      {isLoading && (
        <div className="courses__loading-overlay">
          <div className="courses__spinner" />
        </div>
      )}

      {hasError && (
        <div className="courses__error-message" style={{ textAlign: 'center', margin: '40px 0', color: 'red' }}>
          Произошла ошибка при загрузке курсов. Пожалуйста, попробуйте позже.
        </div>
      )}

      {!hasError && (
        <div className={`courses__cards courses__cards--${effectiveLayout === "grid" ? "normal" : "wide"}`}>
          {displayedCourses.map((course, index) => (
            <CourseCard
              key={course.slug ?? `${course.title}-${index}`}
              course={course}
              variant={effectiveLayout === "list" ? "wide" : "standard"}
            />
          ))}
        </div>
      )}

      {isFull && filteredTotalPages > 1 && !hasError && (
        <Pagination
          totalItems={filteredCourses.length}
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={goToPage}
          showMoreButton={
            currentPage < filteredTotalPages
              ? { text: "Показать ещё", onClick: handleShowMore }
              : undefined
          }
        />
      )}
      <FiltersModal 
        isOpen={isFiltersOpen} 
        onClose={() => setIsFiltersOpen(false)} 
      />
    </section>
  );
}
