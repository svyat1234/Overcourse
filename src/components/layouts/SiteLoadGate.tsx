"use client";

import { useLayoutEffect, useState } from "react";
import { SITE_SLOW_LOAD_EVENT } from "@/lib/siteLoadFlags";
import "./SiteLoadGate.scss";

/** Если загрузка дольше — помечаем html и шлём событие (отключение анимаций в CSS и т.д.) */
const SLOW_LOAD_MS = 4000;

/**
 * Заглушка «Загрузка…» по умолчанию видна с первого кадра, пока не сработает window.load
 * (если документ уже complete — убираем в useLayoutEffect до paint).
 */
export default function SiteLoadGate() {
  const [showOverlay, setShowOverlay] = useState(true);

  useLayoutEffect(() => {
    const markSlow = () => {
      if (document.documentElement.classList.contains("site-slow-load")) return;
      document.documentElement.classList.add("site-slow-load");
      window.dispatchEvent(new CustomEvent(SITE_SLOW_LOAD_EVENT));
    };

    const applyNavTimingIfSlow = () => {
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (!nav || nav.loadEventEnd <= 0 || nav.fetchStart <= 0) return;
      const total = nav.loadEventEnd - nav.fetchStart;
      if (total > SLOW_LOAD_MS) markSlow();
    };

    const finish = () => {
      window.clearTimeout(slowTimer);
      setShowOverlay(false);
      applyNavTimingIfSlow();
    };

    const slowTimer = window.setTimeout(markSlow, SLOW_LOAD_MS);

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.clearTimeout(slowTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!showOverlay) return null;

  return (
    <div className="site-load-gate" aria-busy="true" aria-live="polite" role="status">
      <div className="site-load-gate__box">
        <span className="site-load-gate__spinner" aria-hidden />
      </div>
    </div>
  );
}
