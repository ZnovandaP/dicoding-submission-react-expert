import * as React from 'react';

type CategoryWrapperProps = {
  children: React.ReactNode
};

export default function CategoryWrapper({ children }: CategoryWrapperProps) {
  return (
    <div className="flex flex-col gap-4 z-10 sticky top-16 h-full pb-4 bg-neutral-50 dark:bg-neutral-950 lg:w-[40%]">
      {children}
    </div>
  );
}

export function CategoryHead() {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xl font-medium mt-8">
        Kategori Threads:
      </h3>
      <p className="text-sm text-pink-500 dark:text-pink-400">
        *Sorting thread berdasarkan kategori
      </p>
    </div>
  );
}
