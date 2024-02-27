'use client';

import * as React from 'react';
import cn from '@/utils/cn';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';

type ButtonNavAuthProps = React.HTMLProps<HTMLButtonElement> & {
  children?: React.ReactNode;
  to: string
};

export default function ButtonNavAuth({ children, to, ...props }: ButtonNavAuthProps) {
  const pathname = usePathname();

  const arrayOfPathname = pathname.split('/');
  const currentPathname = `/${arrayOfPathname[1]}`;

  return (
    <button
      {...props}
      type="button"
      onClick={() => {
        signIn();
      }}
      className="relative w-full text-left"
    >
      <span className={cn(
        'nav-link',

        currentPathname === to && 'nav-active',
      )}
      >
        {children}

      </span>
    </button>
  );
}
