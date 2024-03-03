import * as React from 'react';

export default function LeaderboardCardSkeleton() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <div
          className="w-9 h-9 bg-neutral-400 rounded-full animate-pulse"
        />
        <div className="flex flex-col gap-2">
          <div className="bg-neutral-400 w-36 h-3 rounded-md animate-pulse" />
          <div className="bg-neutral-400 w-44 h-3 rounded-md animate-pulse" />
        </div>
      </div>
      <div className=" bg-neutral-400 w-16 h-10 rounded-md animate-pulse" />
    </div>
  );
}
