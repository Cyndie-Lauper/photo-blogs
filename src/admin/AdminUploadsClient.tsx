'use client';

import { StorageListResponse } from '@/services/storage';
import AdminAddAllUploads from './AdminAddAllUploads';
import AdminUploadsTable from './AdminUploadsTable';
import { useState } from 'react';
import { TagsWithMeta } from '@/tag';


export type AddedUrlStatus = {
  url: string
  uploadedAt?: Date
  status?: 'waiting' | 'adding' | 'added'
  statusMessage?: string
  progress?: number
};

export default function AdminUploadsClient({
  urls,
  uniqueTags,
}: {
  urls: StorageListResponse
  uniqueTags?: TagsWithMeta
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [addedUrlStatuses, setAddedUrlStatuses] =
    useState<AddedUrlStatus[]>(urls.map(({ url, uploadedAt }) => ({
      url,
      uploadedAt,
      status: 'waiting',
    })));

  return (
    <div className="space-y-4">
      {urls.length > 1 &&
        <AdminAddAllUploads
          storageUrls={urls.map(({ url }) => url)}
          uniqueTags={uniqueTags}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          setAddedUrlStatuses={setAddedUrlStatuses}
        />}
      <AdminUploadsTable {...{ isAdding, urls: addedUrlStatuses }} />
    </div>
  );
}
