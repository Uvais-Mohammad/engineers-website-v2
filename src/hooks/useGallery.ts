import { useEffect, useState } from 'react';
import { galleryService, type WebsiteGallery } from '../services/galleryService';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'We could not load the gallery right now. Please try again shortly.';
};

export const useGallery = () => {
  const [images, setImages] = useState<WebsiteGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGallery = async (isMounted?: () => boolean) => {
    setLoading(true);
    setError(null);

    try {
      const nextImages = await galleryService.getGalleryImages();

      if (isMounted && !isMounted()) {
        return;
      }

      setImages(nextImages);
    } catch (loadError) {
      if (isMounted && !isMounted()) {
        return;
      }

      setImages([]);
      setError(getErrorMessage(loadError));
    } finally {
      if (!isMounted || isMounted()) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    void loadGallery(() => mounted);

    return () => {
      mounted = false;
    };
  }, []);

  const refresh = async () => {
    await loadGallery();
  };

  return {
    error,
    images,
    loading,
    refresh,
  };
};
