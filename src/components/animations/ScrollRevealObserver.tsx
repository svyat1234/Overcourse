"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Важно: откладываем добавление класса, чтобы React 
          // точно успел завершить гидратацию Suspense/динамических блоков.
          // Это исключает ошибку "Hydration Mismatch".
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              entry.target.classList.add("is-visible");
            });
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const observeElements = () => {
      document
        .querySelectorAll("h1:not(.is-visible), .section-title:not(.is-visible), .section-title-default:not(.is-visible)")
        .forEach((el) => observer.observe(el));
    };

    // Даем Next.js время спокойно отрисовать и гидратировать DOM
    let timeout = setTimeout(observeElements, 100);

    // При смене страницы или догрузке Suspense элементов — повторяем поиск
    const mutObserver = new MutationObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(observeElements, 100);
    });
    
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, []);

  return null;
}
