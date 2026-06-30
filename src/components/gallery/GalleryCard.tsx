import type { WebsiteGallery } from '../../services/galleryService';

interface Props {
  image: WebsiteGallery;
  index: number;
  onPreview: (index: number) => void;
}

const toTitleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getProjectTitle = (image: WebsiteGallery, index: number) => {
  const source = image.storage_path || image.image_url;
  const fileName = source.split('/').pop()?.split('?')[0] ?? '';
  const baseName = fileName.replace(/\.[^.]+$/, '');
  const normalized = baseName.replace(/[-_]+/g, ' ').trim();

  return normalized
    ? toTitleCase(normalized)
    : `Project Image ${String(index + 1).padStart(2, '0')}`;
};

export default function GalleryCard({ image, index, onPreview }: Props) {
  const projectTitle = getProjectTitle(image, index);

  return (
    <article className="gallery-project-card">
      <div className="gallery-project-card__thumb">
        <div className="gallery-card__media">
          <img
            src={image.image_url}
            alt={projectTitle}
            loading="lazy"
            decoding="async"
            width={1200}
            height={1200}
          />
        </div>
        <button
          type="button"
          className="icon-btn popup-image gallery-card__preview"
          onClick={() => onPreview(index)}
          aria-label={`Open ${projectTitle}`}
        >
          <i className="ri-eye-line" aria-hidden="true"></i>
        </button>
      </div>
    </article>
  );
}
