type CourseCardSkeletonProps = {
  variant?: "standard" | "wide";
};

/** Плейсхолдер до загрузки картинок карточки курса */
export default function CourseCardSkeleton({ variant = "standard" }: CourseCardSkeletonProps) {
  if (variant === "wide") {
    return (
      <div className="course-card-skeleton course-card-skeleton--wide" aria-hidden>
        <div className="course-card-skeleton__img" />
        <div className="course-card-skeleton__side">
          <div className="course-card-skeleton__line course-card-skeleton__line--title" />
          <div className="course-card-skeleton__line course-card-skeleton__line--short" />
          <div className="course-card-skeleton__tags">
            <span className="course-card-skeleton__pill" />
            <span className="course-card-skeleton__pill" />
            <span className="course-card-skeleton__pill" />
          </div>
          <div className="course-card-skeleton__line course-card-skeleton__line--text" />
          <div className="course-card-skeleton__line course-card-skeleton__line--text" />
          <div className="course-card-skeleton__footer">
            <div className="course-card-skeleton__prices">
              <div className="course-card-skeleton__line course-card-skeleton__line--price" />
              <div className="course-card-skeleton__line course-card-skeleton__line--small" />
            </div>
            <div className="course-card-skeleton__btn" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-card-skeleton" aria-hidden>
      <div className="course-card-skeleton__img" />
      <div className="course-card-skeleton__body">
        <div className="course-card-skeleton__line course-card-skeleton__line--title" />
        <div className="course-card-skeleton__line course-card-skeleton__line--short" />
        <div className="course-card-skeleton__tags">
          <span className="course-card-skeleton__pill" />
          <span className="course-card-skeleton__pill" />
        </div>
        <div className="course-card-skeleton__line course-card-skeleton__line--price" />
        <div className="course-card-skeleton__actions">
          <div className="course-card-skeleton__btn" />
          <div className="course-card-skeleton__btn course-card-skeleton__btn--circle" />
        </div>
      </div>
    </div>
  );
}
