import * as React from 'react';

type BadgeProps = {
  children: React.ReactNode
};

export default function Badge({ children }: BadgeProps) {
  return (
    <div className="center text-xs px-4 py-1 ring-1 ring-primary rounded-full">
      {children}
    </div>
  );
}
