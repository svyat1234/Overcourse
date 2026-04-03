type NewsArticleCardSkeletonProps = {
  variant: "featured" | "compact";
};

/** Плейсхолдер карточки новости (стили в globals.scss) */
export default function NewsArticleCardSkeleton({ variant }: NewsArticleCardSkeletonProps) {
  if (variant === "featured") {
    return (
      <div
        className="news-article-card-skeleton news-article-card-skeleton--featured"
        aria-hidden
      >
        <div className="news-article-card-skeleton__img news-article-card-skeleton__img--featured" />
        <div className="news-article-card-skeleton__body">
          <div className="news-article-card-skeleton__tags">
            <span className="news-article-card-skeleton__pill" />
            <span className="news-article-card-skeleton__pill" />
            <span className="news-article-card-skeleton__pill" />
          </div>
          <div className="news-article-card-skeleton__line news-article-card-skeleton__line--title-lg" />
          <div className="news-article-card-skeleton__line news-article-card-skeleton__line--title-lg-short" />
          <div className="news-article-card-skeleton__excerpt">
            <div className="news-article-card-skeleton__line news-article-card-skeleton__line--text" />
            <div className="news-article-card-skeleton__line news-article-card-skeleton__line--text" />
            <div className="news-article-card-skeleton__line news-article-card-skeleton__line--text-short" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-article-card-skeleton news-article-card-skeleton--compact" aria-hidden>
      <div className="news-article-card-skeleton__img news-article-card-skeleton__img--compact" />
      <div className="news-article-card-skeleton__body">
        <div className="news-article-card-skeleton__tags">
          <span className="news-article-card-skeleton__pill" />
          <span className="news-article-card-skeleton__pill" />
        </div>
        <div className="news-article-card-skeleton__line news-article-card-skeleton__line--title" />
        <div className="news-article-card-skeleton__line news-article-card-skeleton__line--title-short" />
      </div>
    </div>
  );
}
