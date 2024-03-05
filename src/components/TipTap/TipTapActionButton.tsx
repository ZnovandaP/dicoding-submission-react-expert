import * as React from 'react';
import cn from '@/utils/cn';

type TipTapActionButtonProps = {
  icon: React.ReactElement
  isActive: boolean
  disabled?: boolean

} & React.HTMLAttributes<HTMLButtonElement>;

export default function TipTapActionButton({
  icon, isActive, disabled, ...props
}: TipTapActionButtonProps) {
  return (
    <button
      {...props}
      type="button"
      disabled={disabled}
      aria-label="bold"
      className={cn(
        'ring-1 p-2 rounded-sm ring-primary text-xl hover:bg-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',

        isActive && 'bg-primary text-white',
      )}
    >
      {icon}
    </button>
  );
}
