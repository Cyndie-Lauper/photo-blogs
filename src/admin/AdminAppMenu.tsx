'use client';

import MoreMenu from '@/components/more/MoreMenu';
import { PATH_ADMIN_CONFIGURATION } from '@/site/paths';
import { useAppState } from '@/state/AppState';
import { BiCog } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { ImCheckboxUnchecked } from 'react-icons/im';

export default function AdminAppMenu() {
  const {
    selectedPhotoIds,
    setSelectedPhotoIds,
  } = useAppState();

  const isSelecting = selectedPhotoIds !== undefined;

  return (
    <MoreMenu
      items={[{
        label: 'App Config',
        icon: <BiCog className="text-[17px]" />,
        href: PATH_ADMIN_CONFIGURATION,
      }, {
        label: isSelecting
          ? 'Exit Select'
          : 'Select Multiple',
        icon: isSelecting
          ? <IoCloseSharp
            className="text-[18px] translate-y-[-0.5px]"
          />
          : <ImCheckboxUnchecked
            className="text-[0.75rem]"
          />,
        action: () => {
          if (isSelecting) {
            setSelectedPhotoIds?.(undefined);
          } else {
            setSelectedPhotoIds?.([]);
          }
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        },
        shouldPreventDefault: false,
      }]}
      ariaLabel="Admin Menu"
    />
  );
}