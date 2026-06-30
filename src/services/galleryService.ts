import { getSupabaseBrowserClient } from '../lib/supabase';

export interface WebsiteGallery {
  id: string;
  image_url: string;
  storage_path: string;
  created_at: string;
  display_order: number | null;
}

interface WebsiteGalleryRow {
  id: unknown;
  image_url: unknown;
  storage_path: unknown;
  created_at: unknown;
  display_order: unknown;
}

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const getPublicGalleryUrl = (storagePath: string, getPublicUrl: (path: string) => string) => {
  const normalizedPath = storagePath.replace(/^gallery\//, '').trim();

  if (!normalizedPath) {
    return '';
  }

  return getPublicUrl(normalizedPath);
};

const resolveImageUrl = (row: WebsiteGalleryRow, getPublicUrl: (path: string) => string) => {
  if (isNonEmptyString(row.image_url)) {
    return row.image_url.trim();
  }

  if (isNonEmptyString(row.storage_path)) {
    return getPublicGalleryUrl(row.storage_path, getPublicUrl);
  }

  return '';
};

const toWebsiteGallery = (row: WebsiteGalleryRow, getPublicUrl: (path: string) => string): WebsiteGallery | null => {
  if (
    !isNonEmptyString(row.id) ||
    !isNonEmptyString(row.created_at) ||
    (!isNonEmptyString(row.image_url) && !isNonEmptyString(row.storage_path))
  ) {
    return null;
  }

  const imageUrl = resolveImageUrl(row, getPublicUrl);
  const storagePath = isNonEmptyString(row.storage_path) ? row.storage_path.trim() : '';
  const displayOrder = typeof row.display_order === 'number' ? row.display_order : null;

  if (!imageUrl) {
    return null;
  }

  return {
    id: row.id.trim(),
    image_url: imageUrl,
    storage_path: storagePath,
    created_at: row.created_at.trim(),
    display_order: displayOrder,
  };
};

export const galleryService = {
  async getGalleryImages(): Promise<WebsiteGallery[]> {
    const clientResult = getSupabaseBrowserClient();

    if ('error' in clientResult) {
      throw new Error(clientResult.error);
    }

    const { client } = clientResult;
    const { data, error } = await client
      .from('website_gallery')
      .select('id, image_url, storage_path, created_at, display_order')
      .order('display_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error('We could not load the gallery right now. Please try again shortly.');
    }

    if (!data || data.length === 0) {
      return [];
    }

    const getPublicUrl = (path: string) => client.storage.from('gallery').getPublicUrl(path).data.publicUrl;
    const images = (data as WebsiteGalleryRow[])
      .map((row) => toWebsiteGallery(row, getPublicUrl))
      .filter((row): row is WebsiteGallery => row !== null);

    if (images.length === 0) {
      throw new Error('Gallery data is currently unavailable. Please check back shortly.');
    }

    return images;
  },
};
