import AnimateItems from '@/components/AnimateItems';
import { Photo } from '.';
import { RevalidatePhoto } from './InfinitePhotoScroll';
import PhotoExtraLarge from './PhotoExLarge';

export default function PhotosExtraLarge({
  photos,
  animate = true,
  prefetchFirstPhotoLinks,
  onLastPhotoVisible,
  revalidatePhoto,
}: {
  photos: Photo[]
  animate?: boolean
  prefetchFirstPhotoLinks?: boolean
  onLastPhotoVisible?: () => void
  revalidatePhoto?: RevalidatePhoto
}) {
  return (
    <AnimateItems
      className="space-y-1"
      type={animate ? 'scale' : 'none'}
      duration={0.7}
      staggerDelay={0.15}
      distanceOffset={0}
      staggerOnFirstLoadOnly
      items={photos.map((photo, index) =>
        <PhotoExtraLarge
          key={photo.id}
          photo={photo}
          priority={index <= 1}
          prefetchRelatedLinks={prefetchFirstPhotoLinks && index === 0}
          revalidatePhoto={revalidatePhoto}
          onVisible={index === photos.length - 1
            ? onLastPhotoVisible
            : undefined}
        />)}
      itemKeys={photos.map(photo => photo.id)}
    />
  );
}
