import ReviewCard from "@/components/ui/ReviewCard";
import { REVIEWS, REVIEWS_BY_STARS } from "@/constants";
import type { ReviewItem } from "@/constants";
import "./ReviewsMainSection.scss";

function getReviewWord(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 14) return "отзывов";
  switch (n % 10) {
    case 1:
      return "отзыв";
    case 2:
    case 3:
    case 4:
      return "отзыва";
    default:
      return "отзывов";
  }
}

export default function ReviewsMainSection() {
  const totalReviews = REVIEWS_BY_STARS.reduce((sum, row) => sum + row.count, 0);

  return (
    <section className="reviews-main section container">
      <div className="reviews-main__filters">
        Тут будут фильтры?
      </div>
      <div className="reviews-main__content">
        <div className="reviews-main__heading">
          <h2 className="reviews-main__title section-title-default">Отзывы</h2>
          <span className="reviews-main__sum-reviews">
            {totalReviews} {getReviewWord(totalReviews)}
          </span>
        </div>

        <div className="reviews-main__cards">
          {REVIEWS.map((review: ReviewItem, i: number) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
