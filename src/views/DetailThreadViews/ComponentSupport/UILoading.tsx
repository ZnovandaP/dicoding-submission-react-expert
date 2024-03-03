import * as React from 'react';
import CommentSkeleton from '@/components/Skeleton/CommentSkeleton';
import ThreadSkeleton from '@/components/Skeleton/ThreadSkeleton';

type DetaliThreadLoadingProps = {
  status: 'loading'
};

export default function DetaliThreadLoading({ status }: DetaliThreadLoadingProps) {
  return status === 'loading' && (
  <>
    <div className="w-[80%] h-9 md:h-12 lg:h-14 rounded-lg bg-neutral-400 animate-pulse mb-12" />

    <ThreadSkeleton />
    <hr className="my-6 border-t-1 border-primary" />

    <div className="w-40 h-6 md:h-19 rounded-lg bg-neutral-400 animate-pulse mb-6" />

    {Array.from(new Array(4).keys()).map((key) => (
      <CommentSkeleton key={key} />
    ))}
  </>
  );
}
