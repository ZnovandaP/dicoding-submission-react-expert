import * as React from 'react';
import Image from 'next/image';

export default function LeaderboardHeadSection() {
  return (
    <div className="relative h-64 w-full rounded-lg shadow-md shadow-neutral-400 dark:shadow-neutral-300">
      <Image
        src="/rank.webp"
        alt="rank of medals image"
        width={800}
        height={600}
        priority
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="center absolute bottom-0 left-0 right-0 top-0 rounded-lg bg-neutral-950/40">
        <h2 className="text-balance rounded-md bg-neutral-50/10 p-4 font-kaushan text-3xl font-medium text-white backdrop-blur-lg md:text-4xl lg:text-5xl">
          Ranking Para Sepuh
        </h2>
      </div>
    </div>
  );
}
