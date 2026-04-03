"use client";

import Link from "next/link";
import type { SelectionCard } from "@/constants";
import SelectionCardsSwiper from "@/components/ui/SelectionCardsSwiper";
import "./SelectionSection.scss";

// =======================================
// Для секци используется также 2 варианта
// =======================================
export type SelectionSectionVariant = "home" | "main";

type SelectionSectionProps = {
  cards: SelectionCard[];
  variant?: SelectionSectionVariant;
};

const TITLE_CLASS = {
  home: { title: "section-title", accent: "section-title--accent" },
  main: { title: "section-title-default", accent: "section-title-default--accent" },
} as const;

export default function SelectionSection({ cards, variant = "home" }: SelectionSectionProps) {
  const isHome = variant === "home";
  const titleClass = TITLE_CLASS[variant];
  const navScope = isHome ? ".selection" : ".selection--main";
  const sectionClassName = isHome ? "selection section container" : "selection selection--main section container";

  return (
    <section className={sectionClassName}>
      <SelectionCardsSwiper cards={cards} navScope={navScope}>
        <div className="selection__heading">
          <h2 className={`selection__title ${titleClass.title}`}>
            Подборки<span className={titleClass.accent}> курсов</span>
          </h2>
          <div className="selection__interaction">
            {isHome && (
              <span className={`${titleClass.title} ${titleClass.accent}`}>от overcourse</span>
            )}
            <div className="selection__interaction-wrap">
              <Link href="/selection" className="selection__link button">
                Все подборки
              </Link>
              <div className="selection__buttons">
                <button type="button" className="swiper-button-prev" aria-label="Предыдущий слайд" />
                <button type="button" className="swiper-button-next" aria-label="Следующий слайд" />
              </div>
            </div>
          </div>
        </div>
      </SelectionCardsSwiper>
    </section>
  );
}
