import * as React from 'react';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import DrawerBase from '@/components/Drawer';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { HiOutlineLogout } from 'react-icons/hi';

export default function ProfileNavMenu() {
  const [openProfile, setOpenProfile] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-3/4 items-center gap-3">
          <Avatar
            src="https://ui-avatars.com/api/?name=DimasSaputra&background=random"
            alt="avatar"
          />

          <h2 className="line-clamp-1">
            {!openProfile && (
            <span className="animate-fade">Dimas Saputra Nugraha Saykozi</span>
            )}
            {openProfile && <span className="animate-fade opacity-80">Profile User</span>}
          </h2>
        </div>

        <Button
          type="button"
          variant="ghost"
          className="center h-10 w-10 rounded-full p-0"
          onClick={() => setOpenProfile(!openProfile)}
          icon={
            openProfile ? (
              <IoIosArrowUp className="animate-fade text-2xl" />
            ) : (
              <IoIosArrowDown className="animate-fade text-2xl" />
            )
        }
        />
      </div>
      <DrawerBase open={openProfile} className="flex flex-col justify-center items-center gap-4">
        <div className="mt-2 flex flex-col items-start gap-1 text-left">
          <h2 className="line-clamp-1 hyphens-auto opacity-90">
            DimasSaputra@gmail.com
          </h2>
          <h2 className="line-clamp-1 hyphens-auto opacity-60">
            Dimas Saputra Nugraha Saykozi
          </h2>
        </div>
        <Button
          type="button"
          variant="primary"
          className="center w-full gap-2"
          icon={<HiOutlineLogout className="text-2xl" />}
        >
          Logout
        </Button>
      </DrawerBase>
    </>
  );
}
