import { useEffect, useState } from 'react';
import { configureSupabase } from '../../lib/supabase';
import { useGallery } from '../../hooks/useGallery';
import EmptyGallery from './EmptyGallery';
import GalleryCard from './GalleryCard';
import GallerySkeleton from './GallerySkeleton';

interface Props {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export default function GalleryGrid({ supabaseUrl, supabaseAnonKey }: Props) {
  configureSupabase({
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
  });

  const { images, loading, error, refresh } = useGallery();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      {loading ? <GallerySkeleton /> : null}

      {!loading && error ? (
        <EmptyGallery
          title="Gallery unavailable"
          message={error}
          actionLabel="Try again"
          onAction={() => {
            void refresh();
          }}
        />
      ) : null}

      {!loading && !error && images.length === 0 ? (
        <EmptyGallery
          title="Gallery coming soon"
          message="We are updating this gallery with recent project photos. Please check back shortly."
        />
      ) : null}

      {!loading && !error && images.length > 0 ? (
        <div className="project-page">
          <div className="row gy-40 justify-content-center" role="list">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="col-md-6 col-lg-4 gallery-reveal"
                role="listitem"
                style={{ '--gallery-delay': `${Math.min(index, 8) * 80}ms` } as React.CSSProperties}
              >
                <GalleryCard image={image} index={index} onPreview={setSelectedIndex} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {selectedImage ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            aria-label="Close image preview"
            onClick={() => setSelectedIndex(null)}
          >
            <i className="ri-close-line" aria-hidden="true"></i>
          </button>
          <div
            className="gallery-lightbox__content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.image_url}
              alt={`Expanded project gallery image ${selectedIndex + 1}`}
              loading="eager"
              decoding="async"
              width={1600}
              height={1200}
            />
          </div>
        </div>
      ) : null}

      <style>{`
        .gallery-reveal {
          animation: gallery-slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: var(--gallery-delay);
        }

        .gallery-project-card {
          position: relative;
          height: 100%;
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .gallery-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          min-height: 0;
          height: auto;
          overflow: hidden;
          background: transparent;
        }

        .gallery-card__media img {
          display: block;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.45s ease;
        }

        .gallery-project-card__thumb {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          min-height: 0;
        }

        .gallery-project-card:hover .gallery-card__media img,
        .gallery-project-card:focus-within .gallery-card__media img {
          transform: scale(1.06);
        }

        .gallery-card__preview {
          position: absolute;
          top: 50%;
          right: 50%;
          border: 0;
          border-radius: 0;
          background: var(--white-color);
          color: var(--theme-color);
          cursor: pointer;
          transform: translate(50%, -50%);
          z-index: 2;
          opacity: 0;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .gallery-project-card:hover .gallery-card__preview,
        .gallery-project-card:focus-within .gallery-card__preview {
          opacity: 1;
          transform: translate(50%, -50%);
        }

        .gallery-card--skeleton {
          animation: gallery-pulse 1.4s ease-in-out infinite;
        }

        .gallery-skeleton__media {
          background: linear-gradient(90deg, rgba(226, 232, 240, 0.75), rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.75));
          background-size: 200% 100%;
          animation: gallery-shimmer 1.6s linear infinite;
        }

        .gallery-empty-state {
          display: grid;
          justify-items: center;
          gap: 18px;
          padding: 56px 24px;
          border: 1px solid rgba(198, 40, 40, 0.12);
          border-radius: 28px;
          background: #fffaf5;
          text-align: center;
        }

        .gallery-empty-state__icon {
          display: grid;
          place-items: center;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: rgba(198, 40, 40, 0.1);
          color: #c62828;
          font-size: 30px;
        }

        .gallery-empty-state h3 {
          margin: 0;
          color: var(--title-color);
          font-size: 28px;
        }

        .gallery-empty-state p {
          max-width: 560px;
          margin: 0;
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(15, 23, 42, 0.84);
          backdrop-filter: blur(8px);
        }

        .gallery-lightbox__content {
          width: min(1100px, 100%);
        }

        .gallery-lightbox__content img {
          width: 100%;
          max-height: 86vh;
          border-radius: 24px;
          object-fit: contain;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
        }

        .gallery-lightbox__close {
          position: absolute;
          top: 24px;
          right: 24px;
          display: grid;
          place-items: center;
          width: 52px;
          height: 52px;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.14);
          color: #fff;
          font-size: 30px;
        }

        @keyframes gallery-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @keyframes gallery-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.82;
          }
        }

        @keyframes gallery-slide-up {
          from {
            opacity: 0;
            transform: translateY(42px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 991px) {
        }

        @media (max-width: 767px) {
          .gallery-empty-state {
            padding: 40px 20px;
          }

          .gallery-empty-state h3 {
            font-size: 24px;
          }

          .gallery-lightbox {
            padding: 16px;
          }

          .gallery-lightbox__close {
            top: 16px;
            right: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gallery-card__media img,
          .gallery-card__overlay,
          .gallery-card--skeleton,
          .gallery-skeleton__media,
          .gallery-reveal {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
