interface Props {
  count?: number;
}

export default function GallerySkeleton({ count = 8 }: Props) {
  return (
    <div className="row gy-40 justify-content-center" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="portfolio-card style2 gallery-project-card gallery-card--skeleton">
            <div className="portfolio-card-thumb">
              <div className="gallery-card__media gallery-skeleton__media" />
            </div>
            <div className="portfolio-card-details">
              <div className="gallery-skeleton__line gallery-skeleton__line--short" />
              <div className="gallery-skeleton__line gallery-skeleton__line--title" />
              <div className="gallery-skeleton__line gallery-skeleton__line--text" />
              <div className="gallery-skeleton__button" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
