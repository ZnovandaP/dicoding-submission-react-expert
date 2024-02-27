'use client';

import * as React from 'react';
import DrawerBase from '@/components/Drawer';
import NavLink from '@/components/Navbar/NavLink';
import dataNavbar from '@/constant/data-nav';
import ButtonNavAuth from '@/components/Button/ButtonNavAuth';
import { useSession } from 'next-auth/react';
import ProfileNavMenu from './ProfileNavMenu';
import ThemesMenu from './ThemesMenu';

type NavMenuProps = {
  open: boolean
};

export default function NavMenuDrawer({ open }: NavMenuProps) {
  const { status } = useSession();

  const isNotAuth = status === 'unauthenticated';

  return (
    <DrawerBase
      open={open}
      className="absolute right-8 top-24 w-72 p-6 ring-1 ring-primary bg-neutral-100 dark:bg-neutral-900 max-h-[580px] overflow-auto"
    >
      <ul className="flex w-full flex-col gap-4">
        <li>
          <ProfileNavMenu />
        </li>
        {dataNavbar.map((data) => {
          if (data.name === 'Login') {
            return isNotAuth && (
            <li key={data.name} className="md:hidden">
              <ButtonNavAuth to={data.to}>{data.name}</ButtonNavAuth>
            </li>
            );
          }

          if (data.name === 'Register') {
            return isNotAuth && (
            <li key={data.name} className="md:hidden">
              <NavLink to={data.to}>{data.name}</NavLink>
            </li>
            );
          }

          return (
            <li key={data.name} className="md:hidden">
              <NavLink to={data.to}>{data.name}</NavLink>
            </li>
          );
        })}
        <li>
          <ThemesMenu />
        </li>
      </ul>
    </DrawerBase>
  );
}
