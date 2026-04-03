/** Плейсхолдер карточки отзыва в слайдере «Впечатления» (стили в globals.scss) */
export default function ImpressionReviewCardSkeleton() {
  return (
    <div className="impression-review-card-skeleton" aria-hidden>
      <div className="impression-review-card-skeleton__block">
        <div className="impression-review-card-skeleton__content">
          <div className="impression-review-card-skeleton__heading">
            <div className="impression-review-card-skeleton__col">
              <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--title" />
              <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--muted" />
            </div>
            <div className="impression-review-card-skeleton__col impression-review-card-skeleton__col--school">
              <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--muted" />
              <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--muted-short" />
            </div>
          </div>
          <div className="impression-review-card-skeleton__quote">
            <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--text" />
            <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--text" />
            <div className="impression-review-card-skeleton__line impression-review-card-skeleton__line--text-short" />
          </div>
        </div>
        <div className="impression-review-card-skeleton__img" />
      </div>
      <div className="impression-review-card-skeleton__actions">
        <div className="impression-review-card-skeleton__read" />
        <div className="impression-review-card-skeleton__cta" />
      </div>
    </div>
  );
}
