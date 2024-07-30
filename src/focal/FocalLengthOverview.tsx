import { Photo, PhotoDateRange } from '@/photo';
import FocalLengthHeader from './FocalLengthHeader';
import { Cameras } from '@/camera';
import PhotoGridContainer from '@/photo/PhotoGridContainer';
import { FilmSimulations } from '@/simulation';
import { TagsWithMeta } from '@/tag';


export default function FocalLengthOverview({
  focal,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
  tags,
  cameras,
  simulations,
}: {
  focal: number,
  photos: Photo[],
  count: number,
  dateRange?: PhotoDateRange,
  animateOnFirstLoadOnly?: boolean,
  tags: TagsWithMeta,
  cameras: Cameras,
  simulations: FilmSimulations,
}) {
  return (
    <PhotoGridContainer {...{
      cacheKey: `focal-${focal}`,
      photos,
      count,
      focal,
      tags,
      cameras,
      simulations,
      header: <FocalLengthHeader {...{
        focal,
        photos,
        count,
        dateRange,
      }} />,
      animateOnFirstLoadOnly,
    }} />
  );
}
