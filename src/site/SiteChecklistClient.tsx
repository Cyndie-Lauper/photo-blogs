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
  BiLockAlt,
  BiPencil,
} from 'react-icons/bi';
import Container from '@/components/Container';
import Checklist from '@/components/Checklist';
import { toastSuccess } from '@/toast';
import { ConfigChecklistStatus } from './config';
import StatusIcon from '@/components/StatusIcon';
import { labelForStorage } from '@/services/storage';
import { HiSparkles } from 'react-icons/hi';
import LoaderButton from '@/components/primitives/LoaderButton';
import { testConnectionsAction } from '@/admin/actions';
import ErrorNote from '@/components/ErrorNote';
import Spinner from '@/components/Spinner';
import WarningNote from '@/components/WarningNote';

export default function SiteChecklistClient({
  // Config checklist
  hasDatabase,
  isPostgresSslEnabled,
  hasVercelPostgres,
  hasVercelKv,
  hasStorageProvider,
  hasVercelBlobStorage,
  hasMultipleStorageProviders,
  currentStorage,
  hasAuthSecret,
  hasAdminUser,
  hasDomain,
  hasTitle,
  hasDescription,
  showRepoLink,
  showFilmSimulations,
  showExifInfo,
  isProModeEnabled,
  isStaticallyOptimized,
  arePagesStaticallyOptimized,
  areOGImagesStaticallyOptimized,
  arePhotosMatted,
  isBlurEnabled,
  isGeoPrivacyEnabled,
  showPhotoTitleFallbackText,
  isPriorityOrderEnabled,
  isAiTextGenerationEnabled,
  aiTextAutoGeneratedFields,
  hasAiTextAutoGeneratedFields,
  isPublicApiEnabled,
  isOgTextBottomAligned,
  gridAspectRatio,
  hasGridAspectRatio,
  gridDensity,
  hasGridDensityPreference,
  // Connection status
  databaseError,
  storageError,
  kvError,
  aiError,
  // Component props
  simplifiedView,
  isTestingConnections,
  secret,
  baseUrl,
  commitSha,
  commitMessage,
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
    connection?: { provider: string, error: string }
    message?: string
  }) =>
    <ErrorNote className="mt-2 mb-3">
      {connection && <>
        {connection.provider} connection error: {`"${connection.error}"`}
      </>}
      {message}
    </ErrorNote>;

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
    <div className="max-w-xl w-full">
      <div className="space-y-6">
        <Checklist
          title="Storage"
          icon={<BiData size={16} />}
        >
          <ChecklistRow
            title={hasDatabase && isTestingConnections
              ? 'Database connection'
              : 'Setup database'}
            status={hasDatabase}
            isPending={hasDatabase && isTestingConnections}
          >
            {databaseError && renderError({
              connection: { provider: 'Database', error: databaseError},
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
                    : 'Setup storage'}
            status={hasStorageProvider}
            isPending={hasStorageProvider && isTestingConnections}
          >
            {storageError && renderError({
              connection: { provider: 'Storage', error: storageError},
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
          title="Authentication"
          icon={<BiLockAlt size={16} />}
        >
          <ChecklistRow
            title={!hasAuthSecret && isTestingConnections
              ? 'Generating secret'
              : 'Setup auth'}
            status={hasAuthSecret}
            isPending={!hasAuthSecret && isTestingConnections}
          >
            Store auth secret in environment variable:
            {!hasAuthSecret &&
              <div className="overflow-x-auto">
                <Container className="my-1.5 inline-flex" padding="tight">
                  <div className={clsx(
                    'flex flex-nowrap items-center gap-2 leading-none -mx-1',
                  )}>
                    {secret ? <span>{secret}</span> : <Spinner />}
                    <div
                      className="flex items-center gap-0.5 translate-y-[-2px]"
                    >
                      {renderCopyButton('Secret', secret)}
                    </div>
                  </div>
                </Container>
              </div>}
            {renderEnvVars(['AUTH_SECRET'])}
          </ChecklistRow>
          <ChecklistRow
            title="Setup admin user"
            status={hasAdminUser}
          >
            Store admin email/password
            {' '}
            in environment variables:
            {renderEnvVars([
              'ADMIN_EMAIL',
              'ADMIN_PASSWORD',
            ])}
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
              renderWarning({message:
                'Not explicitly setting a domain may cause ' +
                'certain features to behave unexpectedly',
              })}
            Store in environment variable (displayed in top-right nav):
            {renderEnvVars(['NEXT_PUBLIC_SITE_DOMAIN'])}
          </ChecklistRow>
          <ChecklistRow
            title="Add title"
            status={hasTitle}
            optional
          >
            Store in environment variable (used in page titles):
            {renderEnvVars(['NEXT_PUBLIC_SITE_TITLE'])}
          </ChecklistRow>
          <ChecklistRow
            title="Add description"
            status={hasDescription}
            optional
          >
            Store in environment variable (mainly used for OG meta):
            {renderEnvVars(['NEXT_PUBLIC_SITE_DESCRIPTION'])}
          </ChecklistRow>
          <ChecklistRow
            title={`Grid density: ${gridDensity ? 'low' : 'high'}`}
            status={hasGridDensityPreference}
            optional
          >
              Set environment variable to {'"1"'} to ensure large thumbnails
              on photo grid views (if not configured, density is based on
              aspect ratio configuration):
            {renderEnvVars(['NEXT_PUBLIC_SHOW_LARGE_THUMBNAILS'])}
          </ChecklistRow>

        </Checklist>
        {!simplifiedView && <>
          <Checklist
            title="AI text generation"
            titleShort="AI"
            icon={<HiSparkles />}
            experimental
            optional
          >
            <ChecklistRow
              title={isAiTextGenerationEnabled && isTestingConnections
                ? 'Testing OpenAI connection'
                : 'Add OpenAI secret key'}
              status={isAiTextGenerationEnabled}
              isPending={isAiTextGenerationEnabled && isTestingConnections}
              optional
            >
              {aiError && renderError({
                connection: { provider: 'OpenAI', error: aiError},
              })}
              Store your OpenAI secret key in order to add experimental support
              for AI-generated text descriptions and enable an invisible field
              called {'"Semantic Description"'} used to support CMD-K search
              {renderEnvVars(['OPENAI_SECRET_KEY'])}
            </ChecklistRow>
            <ChecklistRow
              title={hasVercelKv && isTestingConnections
                ? 'Testing KV connection'
                : 'Enable rate limiting'}
              status={hasVercelKv}
              isPending={hasVercelKv && isTestingConnections}
              optional
            >
              {kvError && renderError({
                connection: { provider: 'Vercel KV', error: kvError},
              })}
              {renderLink(
                // eslint-disable-next-line max-len
                'https://vercel.com/docs/storage/vercel-kv/quickstart#create-a-kv-database',
                'Create Vercel KV store',
              )}
              {' '}
              and connect to project in order to enable rate limiting
            </ChecklistRow>
            <ChecklistRow
              // eslint-disable-next-line max-len
              title={`Auto-generated fields: ${aiTextAutoGeneratedFields.join(', ')}`}
              status={hasAiTextAutoGeneratedFields}
              optional
            >
              Comma-separated fields to auto-generate when
              uploading photos. Accepted values: title, caption,
              tags, description, all, or none (default is {'"all"'}).
              {renderEnvVars(['AI_TEXT_AUTO_GENERATED_FIELDS'])}
            </ChecklistRow>
          </Checklist>
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
              title="Static optimization"
              status={isStaticallyOptimized}
              optional
              experimental
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
              title="Photo matting"
              status={arePhotosMatted}
              optional
            >
              Set environment variable to {'"1"'} to constrain the size
              {' '}
              of each photo, and enable a surrounding border:
              {renderEnvVars(['NEXT_PUBLIC_MATTE_PHOTOS'])}
            </ChecklistRow>
            <ChecklistRow
              title="Image blur"
              status={isBlurEnabled}
              optional
            >
              Set environment variable to {'"1"'} to prevent
              image blur data being stored and displayed
              {renderEnvVars(['NEXT_PUBLIC_BLUR_DISABLED'])}
            </ChecklistRow>
            <ChecklistRow
              title="Geo privacy"
              status={isGeoPrivacyEnabled}
              optional
            >
              Set environment variable to {'"1"'} to disable
              collection/display of location-based data
              {renderEnvVars(['NEXT_PUBLIC_GEO_PRIVACY'])}
            </ChecklistRow>
            <ChecklistRow
              title="Show photo title fallback text"
              status={showPhotoTitleFallbackText}
              optional
            >
              Set environment variable to {'"1"'} to prevent
              showing {'"Untitled"'} for photos without titles:
              {renderEnvVars(['NEXT_PUBLIC_HIDE_TITLE_FALLBACK_TEXT'])}
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
              title="Show repo link"
              status={showRepoLink}
              optional
            >
              Set environment variable to {'"1"'} to hide footer link:
              {renderEnvVars(['NEXT_PUBLIC_HIDE_REPO_LINK'])}
            </ChecklistRow>
            <ChecklistRow
              title="Show Fujifilm simulations"
              status={showFilmSimulations}
              optional
            >
              Set environment variable to {'"1"'} to prevent
              simulations showing up in /grid sidebar and
              CMD-K results:
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
      </div>
      <div className="pl-11 pr-2 sm:pr-11 mt-4 md:mt-7">
        <div>
          Changes to environment variables require a redeploy
          or reboot of local dev server
        </div>
        {!simplifiedView &&
          <div className="text-dim before:content-['—']">
            <div className="flex whitespace-nowrap">
              <span className="font-bold">Domain</span>
              &nbsp;&nbsp;
              <span className="w-full flex overflow-x-auto">
                {baseUrl || 'Not Defined'}
              </span>
            </div>
            <div>
              <span className="font-bold">Commit</span>
              &nbsp;&nbsp;
              {commitSha
                ? <span title={commitMessage}>{commitSha}</span>
                : 'Not Found'}
            </div>
          </div>}
      </div>
    </div>
  );
}
