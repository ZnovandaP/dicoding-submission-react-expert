import cn from '@/utils/cn';
import * as React from 'react';

type AuthWrapperProps = {
  children: React.ReactNode;
  position?: 'left' | 'right';
};

export default function AuthWrapper({ children, position = 'left' }: AuthWrapperProps) {
  return (
    <div
      className={cn(
        'absolute left-1/2 top-1/2 flex w-[85%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-md bg-neutral-200 p-8 dark:bg-neutral-800 md:top-0 md:h-full md:w-2/3 md:-translate-x-0 md:-translate-y-0 md:justify-center lg:w-1/2 transition-all duration-300 animate-fade',

        position === 'left' && 'md:left-0 md:animate-half-slide-left',

        position === 'right' && 'md:right-0 md:animate-half-slide-right',
      )}
    >
      {children}
    </div>
  );
}
