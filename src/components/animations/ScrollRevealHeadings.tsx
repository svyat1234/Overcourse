"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { SITE_SLOW_LOAD_EVENT } from "@/lib/siteLoadFlags";

const VISIBLE_CLASS = "scroll-reveal--visible";

/** Совпадает с rootMargin у IntersectionObserver: линия на N px выше нижнего края вьюпорта */
const ZONE_BOTTOM_OFFSET_PX = 200;
const INITIAL_REVEAL_DELAY_MS = 40;

/** Аварийный таймер: если что-то пошло не так, показываем все заголовки */
const HARD_REVEAL_MS = 12000;

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
 * Срабатывание: когда верх заголовка доходит до линии на 200px выше нижнего края вьюпорта
 * (аналог GSAP start: "top bottom-=200px").
 *
 * Для первого рендера после навигации ждём кадр + при пустом #main повторяем поиск заголовков.
 */
export default function ScrollRevealHeadings() {
  const pathname = usePathname();

  useEffect(() => {
    const onSlow = () => revealHeadingsInZoneInMain();
    window.addEventListener(SITE_SLOW_LOAD_EVENT, onSlow);
    return () => window.removeEventListener(SITE_SLOW_LOAD_EVENT, onSlow);
  }, []);

  /**
   * useLayoutEffect: после клиентской навигации контент в #main уже в DOM до paint.
   * Раньше setTimeout(0) после rAF иногда срабатывал до вставки новой страницы — headings.length === 0 и observer не вешался.
   */
  useLayoutEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let initialRevealId = 0;
    let hardRevealId = 0;
    let retryRaf = 0;
    let startRaf = 0;

    const checkVisibleInViewport = () => {
      if (cancelled) return;
      revealHeadingsInZoneInMain();
    };

    const setup = (attempt = 0) => {
      if (cancelled) return;

      const headings = getHeadingsInMain();
      if (headings.length === 0) {
        if (attempt < 30) {
          retryRaf = requestAnimationFrame(() => setup(attempt + 1));
        }
        return;
      }

      const rootMargin = `0px 0px -${ZONE_BOTTOM_OFFSET_PX}px 0px`;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add(VISIBLE_CLASS);
            observer?.unobserve(entry.target);
          });
        },
        { root: null, rootMargin, threshold: 0 }
      );

      const inZoneHeadings: HTMLElement[] = [];
      headings.forEach((el) => {
        if (el.classList.contains(VISIBLE_CLASS)) return;
        if (isInRevealZone(el)) inZoneHeadings.push(el);
        else observer?.observe(el);
      });

      initialRevealId = window.setTimeout(() => {
        if (cancelled) return;
        inZoneHeadings.forEach((el) => el.classList.add(VISIBLE_CLASS));
      }, INITIAL_REVEAL_DELAY_MS);

      window.addEventListener("scroll", checkVisibleInViewport, { passive: true });
      window.addEventListener("resize", checkVisibleInViewport);

      hardRevealId = window.setTimeout(() => {
        if (cancelled) return;
        revealAllHeadingsInMain();
      }, HARD_REVEAL_MS);
    };

    startRaf = requestAnimationFrame(() => setup(0));

    return () => {
      cancelled = true;
      cancelAnimationFrame(startRaf);
      cancelAnimationFrame(retryRaf);
      if (initialRevealId) window.clearTimeout(initialRevealId);
      if (hardRevealId) window.clearTimeout(hardRevealId);
      window.removeEventListener("scroll", checkVisibleInViewport);
      window.removeEventListener("resize", checkVisibleInViewport);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
