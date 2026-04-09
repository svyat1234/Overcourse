"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE_SLOW_LOAD_EVENT } from "@/lib/siteLoadFlags";

const VISIBLE_CLASS = "scroll-reveal--visible";

/** Совпадает с rootMargin у IntersectionObserver: линия на N px выше нижнего края вьюпорта */
const ZONE_BOTTOM_OFFSET_PX = 200;
const INITIAL_REVEAL_DELAY_MS = 40;

/** Аварийный таймер: если что-то пошло не так, показываем все заголовки */
const HARD_REVEAL_MS = 12000;

/** Дебаунс для MutationObserver (поток мутаций при смене страницы в Next.js) */
const MAIN_MUTATION_DEBOUNCE_MS = 50;

function isInRevealZone(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const zoneBottom = vh - ZONE_BOTTOM_OFFSET_PX;
  return rect.top < zoneBottom && rect.bottom > 0;
}

function getHeadingsInMain(): HTMLElement[] {
  const root = document.getElementById("main");
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>("h1, h2"));
}

function revealAllHeadingsInMain() {
  getHeadingsInMain().forEach((el) => el.classList.add(VISIBLE_CLASS));
}

function revealHeadingsInZoneInMain() {
  getHeadingsInMain().forEach((el) => {
    if (!el.classList.contains(VISIBLE_CLASS) && isInRevealZone(el)) {
      el.classList.add(VISIBLE_CLASS);
    }
  });
}

/**
 * Плавное появление всех h1/h2 внутри #main при скролле.
 * После клиентской навигации Next вставляет контент в #main позже одного rAF — без
 * MutationObserver setup успевал уйти с headings.length === 0 и заголовки оставались скрытыми.
 */
export default function ScrollRevealHeadings() {
  const pathname = usePathname();

  useEffect(() => {
    const onSlow = () => revealHeadingsInZoneInMain();
    window.addEventListener(SITE_SLOW_LOAD_EVENT, onSlow);
    return () => window.removeEventListener(SITE_SLOW_LOAD_EVENT, onSlow);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;
    let intersectionObserver: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let initialRevealId = 0;
    let hardRevealId = 0;
    let mutationDebounceId = 0;
    let startRafOuter = 0;
    let startRafInner = 0;
    let retryRaf = 0;

    const checkVisibleInViewport = () => {
      if (cancelled) return;
      revealHeadingsInZoneInMain();
    };

    window.addEventListener("scroll", checkVisibleInViewport, { passive: true });
    window.addEventListener("resize", checkVisibleInViewport);

    const scheduleSetupFromMainMutation = () => {
      if (cancelled) return;
      window.clearTimeout(mutationDebounceId);
      mutationDebounceId = window.setTimeout(() => {
        if (cancelled) return;
        setupIntersectionObservers(0);
      }, MAIN_MUTATION_DEBOUNCE_MS);
    };

    /**
     * Вешает IntersectionObserver на заголовки вне «зоны» и таймер на те, что уже в зоне.
     * Вызывается повторно при смене DOM в #main — перед этим снимаем старый observer.
     */
    function setupIntersectionObservers(attempt: number) {
      if (cancelled) return;

      intersectionObserver?.disconnect();
      intersectionObserver = null;
      if (initialRevealId) {
        window.clearTimeout(initialRevealId);
        initialRevealId = 0;
      }

      const headings = getHeadingsInMain();
      if (headings.length === 0) {
        if (attempt < 200) {
          retryRaf = requestAnimationFrame(() =>
            setupIntersectionObservers(attempt + 1)
          );
        }
        return;
      }

      const rootMargin = `0px 0px -${ZONE_BOTTOM_OFFSET_PX}px 0px`;
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add(VISIBLE_CLASS);
            intersectionObserver?.unobserve(entry.target);
          });
        },
        { root: null, rootMargin, threshold: 0 }
      );

      const inZoneHeadings: HTMLElement[] = [];
      headings.forEach((el) => {
        if (el.classList.contains(VISIBLE_CLASS)) return;
        if (isInRevealZone(el)) inZoneHeadings.push(el);
        else intersectionObserver?.observe(el);
      });

      initialRevealId = window.setTimeout(() => {
        if (cancelled) return;
        inZoneHeadings.forEach((el) => el.classList.add(VISIBLE_CLASS));
      }, INITIAL_REVEAL_DELAY_MS);

      checkVisibleInViewport();
    }

    const main = document.getElementById("main");
    if (main) {
      mutationObserver = new MutationObserver(scheduleSetupFromMainMutation);
      mutationObserver.observe(main, { childList: true, subtree: true });
    }

    startRafOuter = requestAnimationFrame(() => {
      startRafInner = requestAnimationFrame(() => {
        setupIntersectionObservers(0);
      });
    });

    const t0 = window.setTimeout(() => setupIntersectionObservers(0), 0);
    const t100 = window.setTimeout(() => setupIntersectionObservers(0), 100);
    const t350 = window.setTimeout(() => setupIntersectionObservers(0), 350);

    hardRevealId = window.setTimeout(() => {
      if (cancelled) return;
      revealAllHeadingsInMain();
    }, HARD_REVEAL_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(t0);
      window.clearTimeout(t100);
      window.clearTimeout(t350);
      window.clearTimeout(mutationDebounceId);
      cancelAnimationFrame(startRafOuter);
      cancelAnimationFrame(startRafInner);
      cancelAnimationFrame(retryRaf);
      if (initialRevealId) window.clearTimeout(initialRevealId);
      if (hardRevealId) window.clearTimeout(hardRevealId);
      window.removeEventListener("scroll", checkVisibleInViewport);
      window.removeEventListener("resize", checkVisibleInViewport);
      intersectionObserver?.disconnect();
      mutationObserver?.disconnect();
    };
  }, [pathname]);

  return null;
}
