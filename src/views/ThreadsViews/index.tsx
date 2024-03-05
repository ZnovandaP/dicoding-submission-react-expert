'use client';

import * as React from 'react';
import usePreload from '@/hooks/usePreload';
import { useAppSelector } from '@/libs/redux/store';
import { asyncGetProfile } from '@/libs/redux/slices/users/get-own-profile';
import { asyncGetThreadsWithAuthor } from '@/libs/redux/slices/threads/get-threads';
import ThreadsContent from './ComponentSupport/ThreadsContent';
import ButtonCreatePost from './ComponentSupport/ButtonCreatePost';

export default function ThreadsViews() {
  usePreload([asyncGetThreadsWithAuthor, asyncGetProfile]);
  const { data } = useAppSelector((state) => state.threads);

  return (
    <section className="mt-8 relative min-h-[70dvh]">
      <h2 className="font-kaushan font-semibold text-3xl md:text-4xl">
        Diskusi/Thread yang tersedia
        <span className="text-primary dark:text-dark-primary ml-2">
          {`(${data?.length ?? '0'})`}
        </span>
      </h2>

      <ThreadsContent />
      <ButtonCreatePost />
    </section>

  );
}
