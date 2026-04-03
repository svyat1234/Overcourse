"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";
import "./ProfitSection.scss";

type ProfitRangeInfoItem = {
  title: string;
  text: string;
};

type ProfitSectionData = {
  aboutText: string;
  profession: { label: string; value: string };
  salaryRange: { label: string; value: string };
  minSalary: number;
  maxSalary: number;
  rangeInfo: readonly ProfitRangeInfoItem[];
  /** Текст окупаемости для каждого уровня: junior, middle, senior */
  paybackTexts: Record<IconVariant, string>;
};

const PROFIT_SECTION_DATA: ProfitSectionData = {
  aboutText:
    "Вы можете рассчитать в калькуляторе, как будет расти ваш заработок вместе с опытом. А так же сколько времени потребуется, чтобы окупить вложения в образование.",
  profession: { label: "Профессия: ", value: "Бренд-менеджер" },
  salaryRange: { label: "Средняя З/П: ", value: "90 000 ₽ – 180 000 ₽" },
  minSalary: 20000,
  maxSalary: 100000,
  rangeInfo: [
    { title: "Junior", text: "Опыт до 1 года" },
    { title: "Middle", text: "Опыт 1-3 года" },
    { title: "Senior", text: "Опыт 3-5 лет" },
  ],
  paybackTexts: {
    junior: "1 месяц",
    middle: "2 месяца",
    senior: "3 месяца",
  },
};

/** Ползунок: 0 = слева (мин.), 100 = справа (макс.). */
function getSalaryForSlider(sliderValue: number): number {
  const { minSalary, maxSalary } = PROFIT_SECTION_DATA;
  return Math.round(
    minSalary + (sliderValue / 100) * (maxSalary - minSalary)
  );
}

export type IconVariant = "junior" | "middle" | "senior";

function getIconVariant(percent: number): IconVariant {
  if (percent <= 33) return "junior";
  if (percent <= 66) return "middle";
  return "senior";
}

function formatSalary(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export default function ProfitSection() {
  const data = PROFIT_SECTION_DATA;
  const [rangeValue, setRangeValue] = useState(20);
  const initialSalary = getSalaryForSlider(20);
  const [displaySalary, setDisplaySalary] = useState(initialSalary);

  const valueRef = useRef({ value: initialSalary });
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const percent = rangeValue / 100;
  const thumbOffset = (0.5 - percent) * 20;
  const iconVariant = getIconVariant(rangeValue);

  const animateTo = useCallback((target: number) => {
    const obj = valueRef.current;
    const { minSalary, maxSalary } = PROFIT_SECTION_DATA;
    const end = Math.max(minSalary, Math.min(maxSalary, target));

    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    tweenRef.current = gsap.to(obj, {
      value: end,
      duration: 0.25,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        setDisplaySalary(Math.round(obj.value));
      },
      onComplete: () => {
        tweenRef.current = null;
      },
    });
  }, []);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setRangeValue(value);
      animateTo(getSalaryForSlider(value));
    },
    [animateTo]
  );

  return (
    <section className="profit section container">
      <div className="profit__heading">
        <h2 className="profit__title section-title-default">
          Как быстро{" "}
          <span className="section-title-default--accent">
            окупится обучение
          </span>
        </h2>
        <div className="profit__desc">
          <p className="profit__about">{data.aboutText}</p>
          <div className="profit__info">
            <span className="profit__info-text">
              <span className="profit__info-text-bold">{data.profession.label}</span>
              {data.profession.value}
            </span>
            <span className="profit__info-text">
              <span className="profit__info-text-bold">{data.salaryRange.label}</span>
              {data.salaryRange.value}
            </span>
          </div>
        </div>
      </div>

      <div className="profit__range-wrap">
        <div className="profit__range-content">
          <input
            type="range"
            min={0}
            max={100}
            value={rangeValue}
            step={0.01}
            className="profit__range"
            onChange={handleInput}
            aria-label="Уровень опыта"
          />
          <div className="profit__range-dots">
            <div className="profit__range-dot" />
            <div className="profit__range-dot" />
            <div className="profit__range-dot" />
          </div>
          <div
            className="profit__range-text-wrap"
            style={{
              left: `calc(${percent * 100}% + ${thumbOffset}px)`,
            }}
          >
            <span className="profit__range-title">
              {formatSalary(displaySalary)}
            </span>
            <span className="profit__range-text">{data.paybackTexts[iconVariant]}</span>
          </div>
          <div
            className={`profit__range-icon profit__range-icon--${iconVariant}`}
            style={{
              left: `calc(${percent * 100}% + ${thumbOffset}px)`,
            }}
          />
          <div className="profit__range-line-wrap">
            <div
              className="profit__range-line"
              style={{ width: `${percent * 100}%` }}
            />
          </div>
        </div>

        <div className="profit__range-info">
          {data.rangeInfo.map((item) => (
            <div key={item.title} className="profit__range-info-item">
              <span className="profit__range-info-title">{item.title}</span>
              <span className="profit__range-info-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
