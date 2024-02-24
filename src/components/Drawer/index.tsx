import cn from '@/utils/cn';
import * as React from 'react';

type DrawerBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  open: boolean;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
};

export default function DrawerBase({ children, className, open }: DrawerBaseProps) {
  return (
    open && (
      <div className={cn('flex animate-fade items-center rounded-md transition-all duration-500', className ?? '')}>
        {children}
      </div>
    )
  );
}
