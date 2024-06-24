import {
  INFINITE_SCROLL_LARGE_PHOTO_INITIAL,
  INFINITE_SCROLL_LARGE_PHOTO_MULTIPLE,
  generateOgImageMetaForPhotos,
} from '@/photo';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { Metadata } from 'next/types';
import { cache } from 'react';
import { getPhotos, getPhotosMeta } from '@/photo/db/query';
import PhotosExtraLarge from '@/photo/PhotosExLarge';
import PhotosExtraLargeInfinite from '@/photo/PhotosExLargeInfinite';

export const dynamic = 'force-static';
export const maxDuration = 60;
  
const getPhotosCached = cache(() => getPhotos({
  limit: INFINITE_SCROLL_LARGE_PHOTO_INITIAL,
}));
  
export async function generateMetadata(): Promise<Metadata> {
  const photos = await getPhotosCached()
    .catch(() => []);
  return generateOgImageMetaForPhotos(photos);
}
  
export default async function FullPage() {
  const [
    photos,
    photosCount,
  ] = await Promise.all([
    getPhotosCached()
      .catch(() => []),
    getPhotosMeta()
      .then(({ count }) => count)
      .catch(() => 0),
  ]);
  
  return (
    photos.length > 0
      ? <div className="space-y-1">
        <PhotosExtraLarge {...{ photos }} />
        {photosCount > photos.length &&
            <PhotosExtraLargeInfinite
              initialOffset={INFINITE_SCROLL_LARGE_PHOTO_INITIAL}
              itemsPerPage={INFINITE_SCROLL_LARGE_PHOTO_MULTIPLE}
            />}
      </div>
      : <PhotosEmptyState />
  );
}
  