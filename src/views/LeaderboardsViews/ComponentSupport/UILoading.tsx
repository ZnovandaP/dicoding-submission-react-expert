import LeaderboardCardSkeleton from '@/components/Skeleton/LeaderboardCardSkeleton';
import * as React from 'react';

type LeadeboardLoadingProps = {
  status: 'loading'
};

export default function LeadeboardLoading({ status }: LeadeboardLoadingProps) {
  return status === 'loading' && Array.from(new Array(10).keys()).map((key) => (
    <div className="flex flex-col gap-6" key={key}>
      <LeaderboardCardSkeleton />
      <hr className="border-t-1 border-primary" />
    </div>
  ));
}
