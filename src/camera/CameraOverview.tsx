import { Photo, PhotoDateRange } from '@/photo';
import { Camera, Cameras, createCameraKey } from '.';
import CameraHeader from './CameraHeader';
import PhotoGridPage from '@/photo/PhotoGridPage';
import { FilmSimulations } from '@/simulation';
import { TagsWithMeta } from '@/tag';
import PhotoGridContainer from '@/photo/PhotoGridContainer';

export default function CameraOverview({
  camera,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
  tags,
  cameras,
  simulations,
}: {
  camera: Camera,
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
      cacheKey: `camera-${createCameraKey(camera)}`,
      photos,
      count,
      tags,
      cameras,
      simulations,
      header: <CameraHeader {...{
        camera,
        photos,
        count,
        dateRange,
      }} />,
      animateOnFirstLoadOnly,
    }} />
  );
}
