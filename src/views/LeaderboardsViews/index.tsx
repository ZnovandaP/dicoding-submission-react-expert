'use client';

import * as React from 'react';
import usePreload from '@/hooks/usePreload';
import { useAppSelector } from '@/libs/redux/store';
import { asyncGetLeaderboards } from '@/libs/redux/slices/leaderboards';
import { asyncGetProfile } from '@/libs/redux/slices/users/get-own-profile';
import LeaderboardSection from './ComponentSupport/LeaderboardSection';
import LeaderboardHeadSection from './ComponentSupport/LeaderboardHeadSection';
import LeadeboardLoading from './ComponentSupport/UILoading';
import ButtonCreatePost from '../ThreadsViews/ComponentSupport/ButtonCreatePost';

export default function LeaderboardsViews() {
  usePreload([asyncGetLeaderboards, asyncGetProfile]);
  const { status, data } = useAppSelector((state) => state.leaderboards);
  return (
    <div className="flex flex-col gap-8 mt-8 min-h-[80dvh] pb-8">
      <LeaderboardHeadSection />

      {status === 'success' && (
      <LeaderboardSection leaderboards={data!} />
      )}

      <LeadeboardLoading status={status as 'loading'} />
      <ButtonCreatePost />
    </div>
  );
}
