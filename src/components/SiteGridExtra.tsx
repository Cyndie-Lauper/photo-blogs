import { clsx } from 'clsx/lite';
import { RefObject } from 'react';

export default function SiteGridExtra({
  containerRef,
  className,
  contentMain,
  contentSide,
  sideFirstOnMobile,
  sideHiddenOnMobile,
}: {
  containerRef?: RefObject<HTMLDivElement>
  className?: string
  contentMain: JSX.Element
  contentSide?: JSX.Element
  sideFirstOnMobile?: boolean
  sideHiddenOnMobile?: boolean
}) {
  return (
    <div
      ref={containerRef}
      className={clsx(
        className,
        'grid',
        'grid-cols-1 md:grid-cols-12',
        'gap-x-4 lg:gap-x-6',
        'gap-y-4',
        'max-w-full',
      )}
    >
      <div className={clsx(
        'col-span-1 md:col-span-12',
        sideFirstOnMobile && 'order-2 md:order-none',
      )}>
        {contentMain}
      </div>
      {contentSide &&
        <div className={clsx(
          'col-span-1 md:col-span-12',
          sideFirstOnMobile && 'order-1 md:order-none',
          sideHiddenOnMobile && 'hidden md:block',
        )}>
          {contentSide}
        </div>}
    </div>
  );
};
