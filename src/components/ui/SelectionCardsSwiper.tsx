"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import type { SelectionCard } from "@/constants";
import SelectionCardComponent from "./SelectionCard";

type SelectionCardsSwiperProps = {
  cards: SelectionCard[];
  /** Селектор секции для привязки кнопок навигации, например ".selection" или ".selection--course" */
  navScope: string;
  children?: ReactNode;
};

const SWIPER_OPTIONS = {
  modules: [Navigation],
  direction: "horizontal" as const,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  watchSlidesProgress: true,
  breakpoints: {
    768: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
    1500: { slidesPerView: 4 },
  },
};

export default function SelectionCardsSwiper({
  cards,
  navScope,
  children,
}: SelectionCardsSwiperProps) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperInstance.current = new Swiper(swiperRef.current, {
      ...SWIPER_OPTIONS,
      navigation: {
        nextEl: `${navScope} .swiper-button-next`,
        prevEl: `${navScope} .swiper-button-prev`,
      },
    });

    return () => {
      swiperInstance.current?.destroy();
      swiperInstance.current = null;
    };
  }, [navScope]);

  return (
    <div ref={swiperRef} className="selection__swiper swiper">
      {children}
      <div className="swiper-wrapper">
        {cards.map((card, i) => (
          <div key={i} className="swiper-slide selection-card">
            <SelectionCardComponent card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
