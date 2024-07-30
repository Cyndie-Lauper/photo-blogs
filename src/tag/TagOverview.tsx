import { Photo, PhotoDateRange } from '@/photo';
import TagHeader from './TagHeader';
import PhotoGridContainer from '@/photo/PhotoGridContainer';
import { Cameras } from '@/camera';
import { FilmSimulations } from '@/simulation';
import { TagsWithMeta } from '@/tag';

export default function TagOverview({
  tag,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
  tags,
  cameras,
  simulations,
}: {
  tag: string,
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
      cacheKey: `tag-${tag}`,
      photos,
      count,
      tags,
      cameras,
      simulations,
      header: <TagHeader {...{
        tag,
        photos,
        count,
        dateRange,
      }} />,
      animateOnFirstLoadOnly,
    }} />
  );
}