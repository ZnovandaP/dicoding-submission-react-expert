'use client';

import * as React from 'react';
import { useAppSelector } from '@/libs/redux/store';
import { useSearchParams } from 'next/navigation';
import ThreadCard from '@/components/Card/Thread';
import NotFoundThreads from '@/views/NotFoundViews/NotFoundThreads';
import { ThreadsLoading } from './UILoading';

export default function ThreadList() {
  const searchParams = useSearchParams();
  const { status, data } = useAppSelector((state) => state.threads);

  const getAllCategories = searchParams.getAll('category');

  const threadsBasedOnCategories = data?.filter(
    (thread) => (getAllCategories.length > 0 ? getAllCategories.includes(thread.category) : thread),
  )!;
  return (
    <>
      <ThreadsLoading status={status as 'loading'} />

      {status === 'success' && (
      <div className="relative mt-8 flex flex-col gap-4 lg:w-[60%]">
        {threadsBasedOnCategories?.length > 0 && threadsBasedOnCategories?.map((thread) => (
          <ThreadCard thread={thread} key={thread.id} />
        ))}

        {threadsBasedOnCategories.length < 1 && (<NotFoundThreads />)}
      </div>
      )}
    </>
  );
}
