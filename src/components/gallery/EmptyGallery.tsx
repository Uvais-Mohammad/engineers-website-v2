interface Props {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyGallery({ title, message, actionLabel, onAction }: Props) {
  return (
    <div className="gallery-empty-state" role="status">
      <div className="gallery-empty-state__icon">
        <i className="ri-image-line" aria-hidden="true"></i>
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction ? (
        <button type="button" className="btn" onClick={onAction}>
          {actionLabel} <i className="ri-refresh-line" aria-hidden="true"></i>
        </button>
      ) : null}
    </div>
  );
}
