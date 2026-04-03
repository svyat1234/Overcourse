"use client";

import { useState } from "react";
import "./QuestionCards.scss";

export type QuestionCardItem = {
  title: string;
  text: string;
};

type QuestionCardsProps = {
  items: QuestionCardItem[];
};

/**
 * Блок карточек-аккордеонов (вопрос–ответ).
 * Используется в секциях «Остались вопросы?» на главной и на странице курса.
 */
export default function QuestionCards({ items }: QuestionCardsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="question-cards">
      {items.map((item, index) => (
        <div
          key={index}
          role="button"
          tabIndex={0}
          className={`question-cards__card${activeIndex === index ? " question-cards__card--active" : ""}`}
          onClick={() => handleCardClick(index)}
          onKeyDown={(e) => e.key === "Enter" && handleCardClick(index)}
        >
          <div className="question-cards__card-heading">
            <h3 className="question-cards__card-title">{item.title}</h3>
            <div className="question-cards__card-subtitle-wrap">
              <p className="question-cards__card-text">{item.text}</p>
            </div>
          </div>
          <div className="question-cards__card-icon" aria-hidden />
        </div>
      ))}
    </div>
  );
}
