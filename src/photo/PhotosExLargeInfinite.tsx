'use client';

import { PATH_ROOT } from '@/site/paths';
import InfinitePhotoScroll from './InfinitePhotoScroll';
import PhotosExtraLarge from './PhotosExLarge';

export default function PhotosExtraLargeInfinite({
  initialOffset,
  itemsPerPage,
}: {
  initialOffset: number
  itemsPerPage: number
}) {
  return (
    <InfinitePhotoScroll
      cacheKey={`page-${PATH_ROOT}`}
      initialOffset={initialOffset}
      itemsPerPage={itemsPerPage}
      wrapMoreButtonInGrid
    >
      {({ photos, onLastPhotoVisible, revalidatePhoto }) =>
        <PhotosExtraLarge
          photos={photos}
          onLastPhotoVisible={onLastPhotoVisible}
          revalidatePhoto={revalidatePhoto}
        />}
    </InfinitePhotoScroll>
  );
}
