"use client";

import "./Pagination.scss";

export type PaginationProps = {
  /** Общее количество элементов (карточек и т.п.) */
  totalItems: number;
  /** Сколько элементов показывать на одной странице */
  pageSize: number;
  /** Текущая страница (1-based) */
  currentPage: number;
  /** Колбэк при смене страницы (стрелки или клик по номеру) */
  onPageChange?: (page: number) => void;
  /**
   * Опциональная кнопка «Показать ещё».
   * При нажатии вызывается onClick — родитель добавляет следующую порцию элементов (pageSize).
   * Если не передать — кнопка не рендерится (например, когда уже показаны все).
   */
  showMoreButton?: {
    text: string;
    onClick: () => void;
  };
};

const ELLIPSIS_THRESHOLD = 5; // троеточие, если страниц больше этого числа
const WINDOW_RADIUS = 1; // сколько номеров слева/справа от текущей показывать (итого в центре до 3)

/**
 * Строит компактный ряд номеров: первая, последняя и маленькое «окно» вокруг текущей.
 * Пример для 13 страниц: на 5-й → 1 ... 4 5 6 ... 13 (ряд не раздувается).
 */
function buildPageItems(currentPage: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= ELLIPSIS_THRESHOLD) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const items: (number | "ellipsis")[] = [];
  const showLeft = Math.max(1, currentPage - WINDOW_RADIUS);
  const showRight = Math.min(totalPages, currentPage + WINDOW_RADIUS);

  if (showLeft > 1) {
    items.push(1);
    if (showLeft > 2) items.push("ellipsis");
  }
  for (let i = showLeft; i <= showRight; i++) {
    items.push(i);
  }
  if (showRight < totalPages) {
    if (showRight < totalPages - 1) items.push("ellipsis");
    items.push(totalPages);
  }
  return items;
}

export default function Pagination({
  totalItems,
  pageSize,
  currentPage,
  onPageChange,
  showMoreButton,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageItems = buildPageItems(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrev = () => hasPrev && onPageChange?.(currentPage - 1);
  const handleNext = () => hasNext && onPageChange?.(currentPage + 1);
  const handlePage = (page: number) => page !== currentPage && onPageChange?.(page);

  return (
    <div className="pagination">
      <div className="pagination__content">
        <button
          type="button"
          className="pagination__arrow pagination__arrow--prev"
          aria-label="Предыдущая страница"
          disabled={!hasPrev}
          onClick={handlePrev}
        />
        <div className="pagination__pages">
          {pageItems.map((item, i) =>
            item === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="pagination__ellipsis" aria-hidden>
                ...
              </span>
            ) : (
              <button
                key={item}
                type="button"
                className={`pagination__page${item === currentPage ? " pagination__page--active" : ""}`}
                onClick={() => handlePage(item)}
                aria-current={item === currentPage ? "page" : undefined}
                aria-label={`Страница ${item}`}
              >
                {item}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          className="pagination__arrow pagination__arrow--next"
          aria-label="Следующая страница"
          disabled={!hasNext}
          onClick={handleNext}
        />
      </div>
      {showMoreButton != null && (
        <button
          type="button"
          className="pagination__link button"
          onClick={showMoreButton.onClick}
        >
          {showMoreButton.text}
        </button>
      )}
    </div>
  );
}
