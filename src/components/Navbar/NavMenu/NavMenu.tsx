'use client';

import ButtonNavAuth from '@/components/Button/ButtonNavAuth';
import ButtonNavMenu from '@/components/Button/ButtonNavMenu';
import NavLink from '@/components/Navbar/NavLink';
import dataNavbar from '@/constant/data-nav';
import { useSession } from 'next-auth/react';
import * as React from 'react';

type NavMenuProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function NavMenu({ open, setOpen }: NavMenuProps) {
  const { status } = useSession();

  const isNotAuth = status === 'unauthenticated';
  return (
    <>
      <ul className="hidden md:flex items-center justify-evenly gap-6">
        {dataNavbar.map((data) => {
          if (data.name === 'Login') {
            return isNotAuth && (
            <li key={data.name}>
              <ButtonNavAuth to={data.to}>{data.name}</ButtonNavAuth>
            </li>
            );
          }

          if (data.name === 'Register') {
            return isNotAuth && (
            <li key={data.name}>
              <NavLink to={data.to}>{data.name}</NavLink>
            </li>
            );
          }

          return (
            <li key={data.name}>
              <NavLink to={data.to}>{data.name}</NavLink>
            </li>
          );
        })}
        <li>
          <ButtonNavMenu open={open} setOpen={setOpen} />
        </li>
      </ul>

      <div className="md:hidden">
        <ButtonNavMenu open={open} setOpen={setOpen} />
      </div>
    </>
  );
}
