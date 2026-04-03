/** Событие: сайт помечен как «долго грузился» — можно отключать анимации */
export const SITE_SLOW_LOAD_EVENT = "site-slow-load";

export function isSiteSlowLoad(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("site-slow-load");
}
