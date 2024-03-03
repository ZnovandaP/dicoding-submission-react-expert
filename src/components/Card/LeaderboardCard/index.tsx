/* eslint-disable @typescript-eslint/no-use-before-define */
import Avatar from '@/components/Avatar';
import { useAppSelector } from '@/libs/redux/store';
import { UserWithScore } from '@/types/response/users';
import * as React from 'react';

type LeaderboardCardProps = {
  leaderboard: UserWithScore
};

export default function LeaderboardCard({ leaderboard }: LeaderboardCardProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <LeaderboardProfile leaderboard={leaderboard} />
        <LeaderboardPoint leaderboard={leaderboard} />
      </div>
      <hr className="border-t-1 border-primary" />
    </>
  );
}

function LeaderboardProfile({ leaderboard }: LeaderboardCardProps) {
  const { data } = useAppSelector((state) => state.profile);

  const isOwnProfile = data?.id === leaderboard.user.id;

  const userOwnIndicator = isOwnProfile ? `${leaderboard.user.name} (Anda)` : leaderboard.user.name;

  return (
    <div className="flex gap-2 items-center md:gap-4">
      <Avatar
        src={leaderboard.user.avatar ?? '  /user.png'}
        alt={`Avatar user ${leaderboard.user.email}`}
        size="sm"
      />

      <div className="flex flex-col">
        <h3 className="font-medium h-6 line-clamp-1">
          {userOwnIndicator ?? 'Nama tidak ditemukan'}
        </h3>
        <h4 className="text-sm opacity-70">
          {leaderboard.user.email ?? 'Email tidak ditemukan'}
        </h4>
      </div>
    </div>
  );
}

function LeaderboardPoint({ leaderboard }: LeaderboardCardProps) {
  return (
    <div className="flex gap-1 items-center">
      <h3 className="text-2xl font-medium">
        {leaderboard.score ?? '-'}
      </h3>
      <p className="text-sm opacity-70 mt-3">
        pts
      </p>
    </div>
  );
}
