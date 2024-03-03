import * as React from 'react';
import METADATA from '@/constant/metadata';
import { Metadata } from 'next';
import LeaderboardsViews from '@/views/LeaderboardsViews';

export const metadata: Metadata = {
  title: `Leaderboards ${METADATA.exTitle}`,
  description: 'Leaderboards para sepuh dalam Sharing Sepuh.',
  keywords: 'Leaderboards Sharing Sepuh, leaderboards Sharing Sepuh, Rankings Sharing Sepuh',
  alternates: {
    canonical: `${process.env.DOMAIN}/leaderboards`,
  },
};

export default function LeaderboardsPage() {
  return (
    <LeaderboardsViews />
  );
}
