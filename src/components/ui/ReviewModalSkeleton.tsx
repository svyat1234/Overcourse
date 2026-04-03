/** Плейсхолдер модалки отзыва до загрузки изображения (стили в globals.scss) */
export default function ReviewModalSkeleton() {
  return (
    <div className="review-modal-skeleton" aria-hidden>
      <div className="review-modal-skeleton__row">
        <div className="review-modal-skeleton__main">
          <div className="review-modal-skeleton__heading">
            <div className="review-modal-skeleton__col">
              <div className="review-modal-skeleton__line review-modal-skeleton__line--title" />
              <div className="review-modal-skeleton__line review-modal-skeleton__line--muted" />
            </div>
            <div className="review-modal-skeleton__col review-modal-skeleton__col--school">
              <div className="review-modal-skeleton__line review-modal-skeleton__line--muted" />
              <div className="review-modal-skeleton__line review-modal-skeleton__line--muted-short" />
            </div>
          </div>
          <div className="review-modal-skeleton__quote">
            <div className="review-modal-skeleton__line review-modal-skeleton__line--text" />
            <div className="review-modal-skeleton__line review-modal-skeleton__line--text" />
            <div className="review-modal-skeleton__line review-modal-skeleton__line--text-short" />
          </div>
          <div className="review-modal-skeleton__btn" />
        </div>
        <div className="review-modal-skeleton__img" />
      </div>
    </div>
  );
}
