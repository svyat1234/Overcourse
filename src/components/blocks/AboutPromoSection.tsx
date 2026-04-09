"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import "./AboutPromoSection.scss";

const SHARE_SOCIALS = [
  { id: "vk", label: "VK", icon: "/images/socials/vk.svg", href: "#" },
  { id: "tg", label: "Telegram", icon: "/images/socials/telegram.svg", href: "#" },
  { id: "wa", label: "WhatsApp", icon: "/images/socials/whatsapp.svg", href: "#" },
  { id: "pi", label: "Pinterest", icon: "/images/socials/pinterest.svg", href: "#" },
];

export type AboutPromoTag = {
  label: string;
  href: string;
};

export type AboutPromoInfoCard = {
  title: string;
  value: string;
  subText?: string;
  subTextStrike?: boolean;
  /** Выделенная карточка (например зелёный фон) */
  highlight?: boolean;
};

export type AboutPromoSectionData = {
  company: {
    logo: string;
    logoAlt?: string;
    rating: string;
  };
  tags: AboutPromoTag[];
  title: string;
  descriptionParagraphs: string[];
  primaryButton: { href: string; text: string };
  image: { src: string; alt: string };
  infoCards: AboutPromoInfoCard[];
};

type AboutPromoSectionProps = {
  data: AboutPromoSectionData;
  /** Показывать кнопки «в избранное» и «поделиться» */
  showFavoriteShare?: boolean;
};

export default function AboutPromoSection({
  data,
  showFavoriteShare = true,
}: AboutPromoSectionProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopied, setIsFavoriteCopied] = useState(false);
  const shareWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleCopy = useCallback(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setIsFavoriteCopied(true);
      setTimeout(() => setIsFavoriteCopied(false), 2000);
    });
  }, []);

  useEffect(() => {
    if (!isShareOpen) {
      setIsFavoriteCopied(false);
    }
  }, [isShareOpen]);

  useEffect(() => {
    if (!isShareOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        shareWrapperRef.current &&
        !shareWrapperRef.current.contains(event.target as Node)
      ) {
        setIsShareOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShareOpen]);

  const {
    company,
    tags,
    title,
    descriptionParagraphs,
    primaryButton,
    image,
    infoCards,
  } = data;

  return (
    <section className="about-promo section container">
      <div className="about-promo__content">
        <div className="about-promo__content-wrap">
          <div className="about-promo__company">
            <Image
              src={company.logo}
              alt={company.logoAlt ?? "Логотип компании"}
              className="about-promo__company-img"
              width={130}
              height={25}
            />
            <span className="about-promo__rating">{company.rating}</span>
          </div>

          <div className="about-promo__tags tags">
            {tags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="about-promo__tag tag"
              >
                {tag.label}
              </Link>
            ))}
          </div>

          <h1 className="about-promo__title section-title-default">{title}</h1>

          <div className="about-promo__text-wrap">
            {descriptionParagraphs.map((paragraph, i) => (
              <p key={i} className="about-promo__text">
                {paragraph}
              </p>
            ))}
          </div>
          
        </div>

        <div className="about-promo__buttons" ref={shareWrapperRef}>
          <Link href={primaryButton.href} className="about-promo__button button">
            {primaryButton.text}
          </Link>
          {showFavoriteShare && (
            <>
              <button
                type="button"
                className={`about-promo__button-favorite button-favorite${isFavorite ? " button-favorite--active" : ""}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
              />
              <button
                type="button"
                className="about-promo__button-share button-share"
                aria-label="Поделиться"
                onClick={() => setIsShareOpen(!isShareOpen)}
              />
              {isShareOpen && (
                <div className="about-promo__share-modal">
                  <div className="about-promo__share-list">
                    {SHARE_SOCIALS.map((social) => (
                      <a
                        key={social.id}
                        href={social.href}
                        className="about-promo__share-item"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image src={social.icon} alt={social.label} fill />
                      </a>
                    ))}
                    <button
                      type="button"
                      className="about-promo__share-item about-promo__share-item--copy"
                      onClick={handleCopy}
                    >
                      <div className="about-promo__share-copy-icon">
                        <Image 
                          src={isCopied ? "/images/socials/confirm.svg" : "/images/socials/copy.svg"} 
                          alt="Копировать" 
                          width={20} 
                          height={20} 
                        />
                      </div>
                      {isCopied && <span className="about-promo__share-tooltip">Скопировано!</span>}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="about-promo__info">
        <div className="about-promo__img-wrap">
          <Image
            src={image.src}
            alt={image.alt}
            className="about-promo__img"
            width={920}
            height={520}
            sizes="(max-width: 1200px) 100vw, 920px"
          />
        </div>

        <div className="about-promo__info-cards">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className={`about-promo__info-card${card.highlight ? " about-promo__info-card--highlight" : ""}`}
            >
              <span className="about-promo__info-card-title">
                {card.title}
              </span>
              <div className="about-promo__info-card-content">
                <span className="about-promo__info-card-value">
                  {card.value}
                </span>
                {card.subText && (
                  <span
                    className={
                      card.subTextStrike
                        ? "about-promo__info-card-text about-promo__info-card-text--strike"
                        : "about-promo__info-card-text"
                    }
                  >
                    {card.subText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
