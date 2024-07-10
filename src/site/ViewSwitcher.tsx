/* eslint-disable max-len */
import Switcher from '@/components/Switcher';
import SwitcherItem from '@/components/SwitcherItem';
import IconFullFrame from '@/site/IconFullFrame';
import IconGrid from '@/site/IconGrid';
import { PATH_ADMIN_PHOTOS, PATH_FULL, PATH_GRID } from '@/site/paths';
import { BiLockAlt } from 'react-icons/bi';
import IconSearch from './IconSearch';
import { useAppState } from '@/state/AppState';
import IconFeed from './IconFeed';

export type SwitcherSelection = 'feed' | 'full-frame' | 'grid' | 'admin' ;

export default function ViewSwitcher({
  currentSelection,
  showAdmin,
}: {
  currentSelection?: SwitcherSelection
  showAdmin?: boolean
}) {
  const { setIsCommandKOpen } = useAppState();

  return (
    <div className="flex gap-1 sm:gap-2">
      <Switcher>
        <SwitcherItem
          icon={<IconFeed />}
          href="/"
          active={currentSelection === 'feed'}
          noPadding
        />
        <SwitcherItem
          icon={<IconFullFrame />}
          href={PATH_FULL}
          active={currentSelection === 'full-frame'}
          noPadding
        />
        <SwitcherItem
          icon={<IconGrid />}
          href={PATH_GRID}
          active={currentSelection === 'grid'}
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
