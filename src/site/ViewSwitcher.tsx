/* eslint-disable max-len */
import Switcher from '@/components/Switcher';
import SwitcherItem from '@/components/SwitcherItem';
import IconFullFrame from '@/site/IconFullFrame';
import IconGrid from '@/site/IconGrid';
import {
  PATH_ADMIN_PHOTOS,
  PATH_FEED,
  PATH_GRID,
  PATH_ROOT,
  PATH_FULL
} from '@/site/paths';
import { BiLockAlt } from 'react-icons/bi';
import IconSearch from './IconSearch';
import { useAppState } from '@/state/AppState';
import IconFeed from './IconFeed';
import { GRID_HOMEPAGE_ENABLED } from './config';

export type SwitcherSelection = 'feed' | 'full-frame' | 'grid' | 'admin' ;

export default function ViewSwitcher({
  currentSelection,
  showAdmin,
}: {
  currentSelection?: SwitcherSelection
  showAdmin?: boolean
}) {
  const { setIsCommandKOpen } = useAppState();

  const renderItemFeed = () =>
    <SwitcherItem
      icon={<IconFeed />}
      href={GRID_HOMEPAGE_ENABLED ? PATH_FEED : PATH_ROOT}
      active={currentSelection === 'feed'}
      noPadding
    />;

  const renderItemGrid = () =>
    <SwitcherItem
      icon={<IconGrid />}
      href={GRID_HOMEPAGE_ENABLED ? PATH_ROOT : PATH_GRID}
      active={currentSelection === 'grid'}
      noPadding
    />;

  return (
    <div className="flex gap-1 sm:gap-2">
      <Switcher>
        {GRID_HOMEPAGE_ENABLED ? renderItemGrid() : renderItemFeed()}
        {GRID_HOMEPAGE_ENABLED ? renderItemFeed() : renderItemGrid()}
        <SwitcherItem
          icon={<IconFullFrame />}
          href={PATH_FULL}
          active={currentSelection === 'full-frame'}
          noPadding
        />
        {showAdmin &&
          <SwitcherItem
            icon={<BiLockAlt size={16} className="translate-y-[-0.5px]" />}
            href={PATH_ADMIN_PHOTOS}
            active={currentSelection === 'admin'}
          />}
      </Switcher>
      <Switcher type="borderless">
        <SwitcherItem
          icon={<IconSearch />}
          onClick={() => setIsCommandKOpen?.(true)}
        />
      </Switcher>
    </div>
  );
}
