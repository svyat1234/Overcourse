"use client";

import Image from "next/image";
import Link from "next/link";
import type { SelectionCard } from "@/constants";

type SelectionCardProps = {
  card: SelectionCard;
};

export default function SelectionCard({ card }: SelectionCardProps) {
  return (
    <Link href={card.href} className="selection-card__link">
      <div className="selection-card__content">
        <div className="selection-card__tags">
          {card.tags.map((tag) => (
            <span key={tag.label} className="selection-card__tag">
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className="selection-card__title">{card.title}</h3>
      </div>
      <Image
        src={card.image}
        alt=""
        className="selection-card__img"
        width={400}
        height={520}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, (max-width: 1500px) 33vw, 25vw"
      />
    </Link>
  );
}
