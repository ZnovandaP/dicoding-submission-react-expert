import ThreadSkeleton from '@/components/Skeleton/ThreadSkeleton';
import * as React from 'react';

type UILoadingProps = {
  status: 'loading'
};

export function ThreadsLoading({ status }: UILoadingProps) {
  return status === 'loading' && (
  <div className="mt-8 flex flex-col gap-4 lg:w-[60%]">
    {Array.from(new Array(5).keys()).map((key) => (
      <React.Fragment key={key}>
        <ThreadSkeleton />
        <hr className="border-t-1 border-primary" />
      </React.Fragment>
    ))}
  </div>
  );
}

export function CatgeoryLoading({ status }: UILoadingProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {
        status === 'loading' && Array.from(new Array(8).keys()).map((key) => (
          <div key={key} className="bg-neutral-400 w-24 h-7 px-3 rounded-full animate-pulse" />
        ))
      }
    </div>
  );
}
