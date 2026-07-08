interface Props {
  count?: number;
}

export default function GallerySkeleton({ count = 8 }: Props) {
  return (
    <div className="row gy-40 justify-content-center" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="col-md-6 col-lg-4">
          <div className="gallery-project-card gallery-card--skeleton">
            <div className="gallery-project-card__thumb gallery-skeleton__media" />
          </div>
        </div>
      ))}
    </div>
  );
}
