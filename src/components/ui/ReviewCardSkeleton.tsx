/** Плейсхолдер до загрузки изображений карточки отзыва (стили в globals.scss) */
export default function ReviewCardSkeleton() {
  return (
    <div className="review-card-skeleton" aria-hidden>
      <div className="review-card-skeleton__heading">
        <div className="review-card-skeleton__person">
          <div className="review-card-skeleton__avatar" />
          <div className="review-card-skeleton__meta">
            <div className="review-card-skeleton__line review-card-skeleton__line--name" />
            <div className="review-card-skeleton__line review-card-skeleton__line--date" />
          </div>
        </div>
        <div className="review-card-skeleton__stars">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="review-card-skeleton__star" />
          ))}
        </div>
      </div>
      <div className="review-card-skeleton__body">
        <div className="review-card-skeleton__line review-card-skeleton__line--text" />
        <div className="review-card-skeleton__line review-card-skeleton__line--text" />
        <div className="review-card-skeleton__line review-card-skeleton__line--text-short" />
        <div className="review-card-skeleton__line review-card-skeleton__line--link" />
      </div>
      <div className="review-card-skeleton__footer">
        <div className="review-card-skeleton__logo" />
        <div className="review-card-skeleton__votes">
          <span className="review-card-skeleton__pill" />
          <span className="review-card-skeleton__pill" />
        </div>
      </div>
    </div>
  );
}
