'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from '@/utils/cn';

type NavLinkProps = {
  children: React.ReactNode;
  to: string;
};

export default function NavLink({ children, to }: NavLinkProps) {
  const pathname = usePathname();

  const arrayOfPathname = pathname.split('/');
  const currentPathname = `/${arrayOfPathname[1]}`;

  return (
    <div className="relative">
      <Link
        className={cn(
          'nav-link',

          currentPathname === to && 'nav-active',
        )}
        target={children?.toString() === 'About' ? '_blank' : ''}
        href={to}
      >
        {children}
      </Link>
    </div>
  );
}
