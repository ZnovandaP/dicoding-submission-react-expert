'use client';

import * as React from 'react';
import Link from 'next/link';
import Container from '../Container';
import NavMenuDrawer from './NavMenu/NavMenuDrawer';
import NavMenu from './NavMenu/NavMenu';

type NavbarProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export default function Navbar({ open, setOpen }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 h-[72px] border-b-2 border-primary bg-neutral-50/10 backdrop-blur-xl">
      <Container className="relative flex h-full w-full items-center justify-between">
        <h1 className="font-kaushan text-xl">
          <Link href="/">Sharing Sepuh</Link>
        </h1>
        <NavMenu open={open} setOpen={setOpen} />
        <NavMenuDrawer open={open} />
      </Container>
    </nav>
  );
}
