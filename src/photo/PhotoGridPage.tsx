'use client';

import { TagsWithMeta } from '@/tag';
import { Photo } from '.';
import { Cameras } from '@/camera';
import { FilmSimulations } from '@/simulation';
import { PATH_GRID } from '@/site/paths';
import PhotoGridSidebar from './PhotoGridSidebar';
import PhotoGridContainer from './PhotoGridContainer';
import { useEffect } from 'react';
import { useAppState } from '@/state/AppState';

export default function PhotoGridPage({
  photos,
  photosCount,
  tags,
  cameras,
  simulations,
  // cacheKey,
  // sidebar,
}:{
  photos: Photo[]
  photosCount: number
  tags: TagsWithMeta
  cameras: Cameras
  simulations: FilmSimulations
  cacheKey?: string;
  sidebar?: React.ReactNode;
}) {
  const { setSelectedPhotoIds } = useAppState();
  
  useEffect(() => () => setSelectedPhotoIds?.([]), [setSelectedPhotoIds]);

  return (
    <PhotoGridContainer
      cacheKey={`page-${PATH_GRID}`}
      photos={photos}
      count={photosCount}
      sidebar={<div className="sticky top-4 space-y-4 mt-[-4px]">
        <PhotoGridSidebar {...{
          tags,
          cameras,
          simulations,
          photosCount,
        }} />
      </div>}
      canSelect
    />
  );
}