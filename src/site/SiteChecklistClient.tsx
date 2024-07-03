/* eslint-disable max-len */
'use client';

import {
  ComponentProps,
  ReactNode,
} from 'react';
import { clsx } from 'clsx/lite';
import ChecklistRow from '../components/ChecklistRow';
import { FiExternalLink } from 'react-icons/fi';
import {
  BiCog,
  BiCopy,
  BiData,
  BiPencil,
} from 'react-icons/bi';
import Checklist from '@/components/Checklist';
import { toastSuccess } from '@/toast';
import { ConfigChecklistStatus } from './config';
import StatusIcon from '@/components/StatusIcon';
import { labelForStorage } from '@/services/storage';
import LoaderButton from '@/components/primitives/LoaderButton';
import { testConnectionsAction } from '@/admin/actions';
import ErrorNote from '@/components/ErrorNote';
import WarningNote from '@/components/WarningNote';

export default function SiteChecklistClient({
  // Config checklist
  hasDatabase,
  isPostgresSslEnabled,
  hasVercelPostgres,
  hasStorageProvider,
  hasVercelBlobStorage,
  hasMultipleStorageProviders,
  currentStorage,
  hasDomain,
  hasTitle,
  hasDescription,
  showFilmSimulations,
  showExifInfo,
  isProModeEnabled,
  isStaticallyOptimized,
  arePagesStaticallyOptimized,
  areOGImagesStaticallyOptimized,
  arePhotosMatted,
  isBlurEnabled,
  isPriorityOrderEnabled,
  isPublicApiEnabled,
  isOgTextBottomAligned,
  gridAspectRatio,
  hasGridAspectRatio,
  // Connection status
  databaseError,
  storageError,
  // Component props
  simplifiedView,
  isTestingConnections,
  baseUrl,
  commitSha,
}: ConfigChecklistStatus &
  Partial<Awaited<ReturnType<typeof testConnectionsAction>>> & {
  simplifiedView?: boolean
  isTestingConnections?: boolean
  secret?: string
}) {
  const renderLink = (href: string, text: string, external = true) =>
    <>
      <a {...{
        href,
        ...external && { target: '_blank', rel: 'noopener noreferrer' },
        className: clsx(
          'underline hover:no-underline',
        ),
      }}>
        {text}
      </a>
      {external &&
        <>
          &nbsp;
          <FiExternalLink
            size={14}
            className='inline translate-y-[-1.5px]'
          />
        </>}
    </>;

  const renderCopyButton = (label: string, text?: string, subtle?: boolean) =>
    <LoaderButton
      icon={<BiCopy size={15} />}
      className={clsx(
        'translate-y-[2px]',
        subtle && 'text-gray-300 dark:text-gray-700',
      )}
      onClick={text
        ? () => {
          navigator.clipboard.writeText(text);
          toastSuccess(`${label} copied to clipboard`);
        }
        : undefined}
      styleAs="link"
      disabled={!text}
    />;

  const renderEnvVar = (
    variable: string,
    minimal?: boolean,
  ) =>
    <div
      key={variable}
      className={clsx(
        'overflow-x-auto overflow-y-hidden',
        minimal && 'inline-flex',
      )}
    >
      <span className="inline-flex items-center gap-1">
        <span className={clsx(
          'text-[11px] font-medium tracking-wider',
          'px-0.5 py-[0.5px]',
          'rounded-[5px]',
          'bg-gray-100 dark:bg-gray-800',
        )}>
          `{variable}`
        </span>
        {!minimal && renderCopyButton(variable, variable, true)}
      </span>
    </div>;

  const renderEnvVars = (variables: string[]) =>
    <div className="pt-1 space-y-1">
      {variables.map(envVar => renderEnvVar(envVar))}
    </div>;

  const renderSubStatus = (
    type: ComponentProps<typeof StatusIcon>['type'],
    label: ReactNode,
    iconClassName?: string,
  ) =>
    <div className="flex gap-2 translate-x-[-3px]">
      <span className={iconClassName}>
        <StatusIcon {...{ type }} />
      </span>
      <span className="min-w-0">
        {label}
      </span>
    </div>;

  const renderError = ({
    connection,
    message,
  }: {
    connection?: { provider: string; error: string };
    message?: string;
  }) => (
    <ErrorNote className="mt-2 mb-3">
      {connection && (
        <>
          {connection.provider} connection error: {`"${connection.error}"`}
        </>
      )}
      {message}
    </ErrorNote>
  );

  const renderWarning = ({
    connection,
    message,
  }: {
    connection?: { provider: string, error: string }
    message?: string
  }) =>
    <WarningNote className="mt-2 mb-3">
      {connection && <>
        {connection.provider} connection error: {`"${connection.error}"`}
      </>}
      {message}
    </WarningNote>;

  return (
    <div className="max-w-xl space-y-6 w-full">
      <Checklist
        title="Storage"
        icon={<BiData size={16} />}
      >
        <ChecklistRow
          title={hasDatabase && isTestingConnections
            ? 'Testing database connection'
            : 'Database'}
          status={hasDatabase}
          isPending={hasDatabase && isTestingConnections}
        >
          {databaseError && renderError({
            connection: { provider: 'Database', error: databaseError },
          })}
          {hasVercelPostgres
            ? renderSubStatus('checked', 'Vercel Postgres: connected')
            : renderSubStatus('optional', <>
              Vercel Postgres:
              {' '}
              {renderLink(
                // eslint-disable-next-line max-len
                'https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database',
                'create store',
              )}
              {' '}
              and connect to project
            </>)}
          {hasDatabase && !hasVercelPostgres &&
            renderSubStatus('checked', <>
              Postgres-compatible: connected
              {' '}
              (SSL {isPostgresSslEnabled ? 'enabled' : 'disabled'})
            </>)}
        </ChecklistRow>
        <ChecklistRow
          title={
            hasStorageProvider && isTestingConnections
              ? 'Testing storage connection'
              : !hasStorageProvider
                ? 'Setup storage (one of the following)'
                : hasMultipleStorageProviders
                  // eslint-disable-next-line max-len
                  ? `Setup storage (new uploads go to: ${labelForStorage(currentStorage)})`
                  : 'Storage'}
          status={hasStorageProvider}
          isPending={hasStorageProvider && isTestingConnections}
        >
          {storageError && renderError({
            connection: { provider: 'Storage', error: storageError },
          })}
          {hasVercelBlobStorage
            ? renderSubStatus('checked', 'Vercel Blob: connected')
            : renderSubStatus('optional', <>
              {labelForStorage('vercel-blob')}:
              {' '}
              {renderLink(
                // eslint-disable-next-line max-len
                'https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-blob-store',
                'create store',
              )}
              {' '} 
              and connect to project
            </>
            )}
        </ChecklistRow>
      </Checklist>
      <Checklist
        title="Content"
        icon={<BiPencil size={16} />}
      >
        <ChecklistRow
          title="Configure domain"
          status={hasDomain}
          showWarning
        >
          {!hasDomain &&
            renderWarning({
              message:
                'Not explicitly setting a domain may cause ' +
                'certain features to behave unexpectedly',
            })}
          https://photo-blogs.vercel.app
          {renderEnvVars(['NEXT_PUBLIC_SITE_DOMAIN'])}
        </ChecklistRow>
        <ChecklistRow
          title="Title"
          status={hasTitle}
          optional
        >
          My Photos
          {renderEnvVars(['NEXT_PUBLIC_SITE_TITLE'])}
        </ChecklistRow>
        <ChecklistRow
          title="Description"
          status={hasDescription}
          optional
        >
          A website for sharing photos
          {renderEnvVars(['NEXT_PUBLIC_SITE_DESCRIPTION'])}
        </ChecklistRow>
        
      </Checklist>
      {!simplifiedView && <>
        <Checklist
          title="Settings"
          icon={<BiCog size={16} />}
          optional
        >
          <ChecklistRow
            title="Pro mode"
            status={isProModeEnabled}
            optional
          >
            Set environment variable to {'"1"'} to enable
            higher quality image storage:
            {renderEnvVars(['NEXT_PUBLIC_PRO_MODE'])}
          </ChecklistRow>
          <ChecklistRow
            title="Static Optimization"
            status={isStaticallyOptimized}
            optional
            // experimental
          >
            Set environment variable to {'"1"'} to enable static optimization,
            i.e., rendering pages and images at build time:
            {renderSubStatus(
              arePagesStaticallyOptimized ? 'checked' : 'optional',
              renderEnvVars(['NEXT_PUBLIC_STATICALLY_OPTIMIZE_PAGES']),
              'translate-y-[3.5px]',
            )}
            {renderSubStatus(
              areOGImagesStaticallyOptimized ? 'checked' : 'optional',
              renderEnvVars(['NEXT_PUBLIC_STATICALLY_OPTIMIZE_OG_IMAGES']),
              'translate-y-[3.5px]',
            )}
          </ChecklistRow>
          <ChecklistRow
            title="Photo Matting"
            status={arePhotosMatted}
            optional
          >
            Set environment variable to {'"1"'} to constrain the size
            {' '}
            of each photo, and enable a surrounding border:
            {renderEnvVars(['NEXT_PUBLIC_MATTE_PHOTOS'])}
          </ChecklistRow>
          <ChecklistRow
            title="Image Blur"
            status={isBlurEnabled}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            image blur data being stored and displayed
            {renderEnvVars(['NEXT_PUBLIC_BLUR_DISABLED'])}
          </ChecklistRow>
          <ChecklistRow
            title="Priority order"
            status={isPriorityOrderEnabled}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            priority order photo field affecting photo order
            {renderEnvVars(['NEXT_PUBLIC_IGNORE_PRIORITY_ORDER'])}
          </ChecklistRow>
          <ChecklistRow
            title="Public API"
            status={isPublicApiEnabled}
            optional
          >
            Set environment variable to {'"1"'} to enable
            a public API available at <code>/api</code>:
            {renderEnvVars(['NEXT_PUBLIC_PUBLIC_API'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show Fujifilm simulations"
            status={showFilmSimulations}
            optional
          >
            Set environment variable to {'"1"'} to prevent
            simulations showing up in /grid sidebar and
            CMD-K search results:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_FILM_SIMULATIONS'])}
          </ChecklistRow>
          <ChecklistRow
            title="Show EXIF data"
            status={showExifInfo}
            optional
          >
            Set environment variable to {'"1"'} to hide EXIF data:
            {renderEnvVars(['NEXT_PUBLIC_HIDE_EXIF_DATA'])}
          </ChecklistRow>
          <ChecklistRow
            title={`Grid aspect ratio: ${gridAspectRatio}`}
            status={hasGridAspectRatio}
            optional
          >
            Set environment variable to any number to enforce aspect ratio
            {' '}
            (default is {'"1"'}, i.e., square)—set to {'"0"'} to disable:
            {renderEnvVars(['NEXT_PUBLIC_GRID_ASPECT_RATIO'])}
          </ChecklistRow>
          <ChecklistRow
            title="Legacy OG text alignment"
            status={isOgTextBottomAligned}
            optional
          >
            Set environment variable to {'"BOTTOM"'} to
            keep OG image text bottom aligned (default is {'"top"'}):
            {renderEnvVars(['NEXT_PUBLIC_OG_TEXT_ALIGNMENT'])}
          </ChecklistRow>
        </Checklist>
      </>}
      <div className="pl-11 pr-2 sm:pr-11 mt-4 md:mt-7">
        <div>
        Changes to environment variables require a redeploy
        or reboot of local dev server
        </div>
        {!simplifiedView &&
          <div className="text-dim">
            <div>Domain: {baseUrl || 'Not Defined'}</div>
            <div>
              <span className="font-bold">Commit</span>
              &nbsp;&nbsp;
              {commitSha || 'No commit'}
            </div>
          </div>}
      </div>
    </div>
  );
}
