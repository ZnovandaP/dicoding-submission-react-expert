import cn from '@/utils/cn';
import * as React from 'react';

type BadgeProps = {
  children: React.ReactNode
  size?: 'sm' | 'md',
  className?: string
};

export default function Badge({ children, size = 'sm', className }: BadgeProps) {
  return (
    <div className={cn(
      size === 'sm' && 'center text-xs px-4 py-1 ring-1 ring-primary rounded-full',

      size === 'md' && 'center text-base px-4 py-2 ring-1 ring-primary rounded-full',

      className ?? '',
    )}
    >
      {children}
    </div>
  );
}
