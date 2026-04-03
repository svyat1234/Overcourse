import Image from "next/image";
import Link from "next/link";

const REVIEWS_CARDS = [
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
  { rating: "4.8", school: "SkyPro", count: "1182 отзыва", img: "/images/reviews-card.png", href: "#" },
];

export default function ReviewsSection() {
  return (
    <section className="reviews section container">
      <h2 className="reviews__title section-title">
        Отзывы <span className="section-title--accent">о школах</span>
      </h2>
      <div className="reviews__cards">
        {REVIEWS_CARDS.map((card, i) => (
          <div key={i} className="reviews__card">
            <div className="reviews__card-heading">
              <span className="reviews__card-school">
                <span className="reviews__card-rating">{card.rating}</span> | {card.school}
              </span>
              <span className="reviews__card-count">{card.count}</span>
            </div>
            <div className="reviews__card-content">
              <Image
                src={card.img}
                alt=""
                className="reviews__card-img"
                width={160}
                height={50}
                sizes="160px"
              />
              <Link href={card.href} className="reviews__card-link" aria-label="Перейти к отзывам" />
            </div>
          </div>
        ))}
        <div className="reviews__card reviews__card--more">
          <span className="reviews__card-more-text">Более 15 392 отзывов</span>
          <Link href="#" className="reviews__card-more-link">
            Cмотреть все
          </Link>
        </div>
      </div>
    </section>
  );
}
