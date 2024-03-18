/* eslint-disable react/button-has-type */
import * as React from 'react';
import cn from '@/utils/cn';

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  icon?: React.ReactElement;
  children?: React.ReactNode;
  variant?: 'primary' | 'icon' | 'ghost' | 'outline' | 'secondary'
  type: 'button' | 'submit';
  className?: string;
};

export default function Button({
  icon,
  children,
  type = 'button',
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'cursor-pointer rounded-md px-4 py-2 transition-all duration-500 center gap-2',

        variant === 'primary'
          && 'bg-primary hover:bg-primary/70 text-neutral-50 active:scale-105 active:bg-primary/50',

        variant === 'icon'
          && 'ring-1 ring-primary hover:bg-primary/30 active:scale-105 active:bg-primary/50',

        variant === 'ghost'
          && 'hover:bg-primary/30 active:scale-105 active:bg-primary/50',

        variant === 'outline'
          && 'ring-1 ring-primary hover:bg-primary/30 active:scale-105 active:bg-primary/50',

        variant === 'secondary'
          && 'bg-primary/30 hover:bg-primary/30 active:scale-105 active:bg-primary/50',

        className ?? '',
      )}
    >
      {icon}

      {children}
    </button>
  );
}
