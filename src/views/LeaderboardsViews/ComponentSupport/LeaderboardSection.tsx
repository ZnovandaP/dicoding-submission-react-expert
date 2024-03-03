import LeaderboardCard from '@/components/Card/LeaderboardCard';
import { UserLeaderboards } from '@/types/response/users';
import * as React from 'react';

type LeaderboardSectionProps = {
  leaderboards: UserLeaderboards
};

export default function LeaderboardSection({ leaderboards }: LeaderboardSectionProps) {
  return (
    <div className="flex flex-col gap-6">
      {leaderboards && leaderboards?.map((leaderboard) => (
        <LeaderboardCard key={leaderboard.user.id} leaderboard={leaderboard} />
      ))}
    </div>
  );
}
