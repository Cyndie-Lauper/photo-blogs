import { Photo, PhotoDateRange } from '@/photo';
import FilmSimulationHeader from './FilmSimulationHeader';
import { FilmSimulation, FilmSimulations } from '@/simulation';
import { Cameras } from '@/camera';
import PhotoGridContainer from '@/photo/PhotoGridContainer';
import { TagsWithMeta } from '@/tag';

export default function FilmSimulationOverview({
  simulation,
  photos,
  count,
  dateRange,
  animateOnFirstLoadOnly,
  tags,
  cameras,
  simulations,
}: {
  simulation: FilmSimulation,
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
      cacheKey: `simulation-${simulation}`,
      photos,
      count,
      simulation,
      tags,
      cameras,
      simulations,
      header: <FilmSimulationHeader {...{
        simulation,
        photos,
        count,
        dateRange,
      }} />,
      animateOnFirstLoadOnly,
    }} />
  );
}
