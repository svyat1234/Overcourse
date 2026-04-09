"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COURSES } from "@/constants";
import "./SearchModal.scss";

// ============================================================
// Временная заглушка для популярных курсов: берем последние 3 курса из констант
// ============================================================
const POPULAR_COURSES = COURSES.slice(-3).map(c => ({
  id: c.slug || Math.random().toString(),
  title: c.title,
  category: c.tags[0]?.label || "Курс",
  price: `от ${c.pricePerMonth} ₽/мес`
}));

type SearchResult = {
  id: string;
  title: string;
  category: string;
  price: string;
};

type SearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ============================================================
  // Демонстрационная фильтрация на клиенте.
  // ============================================================
  const filteredResults = query.trim() 
    ? POPULAR_COURSES.filter(r => r.title.toLowerCase().includes(query.toLowerCase()))
    : POPULAR_COURSES;

  return (
    <div className="search-modal">
      <div className="search-modal__overlay" onClick={onClose} />
      <div className="search-modal__container">
        <div className="search-modal__header">
          <div className="search-modal__input-wrap">
            <input
              type="text"
              className="search-modal__input"
              placeholder="Поиск курсов, школ или направлений..."
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                className="search-modal__clear" 
                onClick={() => setQuery("")} 
                aria-label="Очистить поиск"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button className="search-modal__close" onClick={onClose} aria-label="Закрыть">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="search-modal__results">
          <div className="search-modal__results-inner">
            <h4 className="search-modal__results-title">
              {query.trim() ? "Результаты поиска" : "Популярные запросы"}
            </h4>
            <div className="search-modal__list">
              {filteredResults.map((result) => (
                <Link 
                  key={result.id} 
                  href={`/courses/${result.id}`} 
                  className="search-modal__item"
                  onClick={onClose}
                >
                  <div className="search-modal__item-info">
                    <span className="search-modal__item-category">{result.category}</span>
                    <span className="search-modal__item-title">{result.title}</span>
                  </div>
                  <span className="search-modal__item-price">{result.price}</span>
                </Link>
              ))}
              {filteredResults.length === 0 && (
                <p className="search-modal__empty">Ничего не найдено по запросу «{query}»</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
