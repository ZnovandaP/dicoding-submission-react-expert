'use client';

import * as React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useAppSelector } from '@/libs/redux/store';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import Button from '@/components/Button';
import DrawerBase from '@/components/Drawer';
import Avatar from '@/components/Avatar';

export default function ProfileNavMenu() {
  const [openProfile, setOpenProfile] = React.useState(false);

  return (
    <>
      <ProfileNavMenu.Head
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
      <ProfileNavMenu.Body openProfile={openProfile} />
    </>
  );
}

type HeadProps = {
  openProfile: boolean
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>
};

function Head({ openProfile, setOpenProfile }: HeadProps) {
  const { status } = useSession();
  const { data } = useAppSelector((state) => state.profile);

  const isAuth = status === 'authenticated';
  const avatarSrcPrefetch = data?.avatar ?? '/user.png';
  const avatarSrc = isAuth ? avatarSrcPrefetch : '/user.png';

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex w-3/4 items-center gap-3">
        <Avatar
          src={avatarSrc}
          alt="Avatar user"
        />
        <h2 className="line-clamp-1">
          {!openProfile && (
            <span className="animate-fade">
              {isAuth ? data?.email : 'Anda belum login'}
            </span>
          )}
          {openProfile && (
          <span className="animate-fade opacity-80">
            Profile anda
          </span>
          )}
        </h2>
      </div>

      {isAuth && (
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
      )}
    </div>
  );
}

function Body({ openProfile }: { openProfile: boolean }) {
  const { data } = useAppSelector((state) => state.profile);

  const handleLogout = () => {
    signOut();
  };

  return (
    <DrawerBase open={openProfile} className="flex flex-col justify-center items-center gap-4">
      <div className="mt-2 flex flex-col items-start self-start gap-1 text-left">
        <h2 className="line-clamp-1 hyphens-auto opacity-90">
          {data?.email}
        </h2>
        <h2 className="line-clamp-1 hyphens-auto opacity-60">
          {data?.name}
        </h2>
      </div>
      <Button
        type="button"
        variant="primary"
        className="center w-full gap-2"
        onClick={handleLogout}
        icon={<HiOutlineLogout className="text-2xl" />}
      >
        Logout
      </Button>
    </DrawerBase>
  );
}

ProfileNavMenu.Head = Head;
ProfileNavMenu.Body = Body;
