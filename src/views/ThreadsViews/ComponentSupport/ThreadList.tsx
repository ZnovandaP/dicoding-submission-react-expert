'use client';

import * as React from 'react';
import { useAppSelector } from '@/libs/redux/store';
import { useSearchParams } from 'next/navigation';
import ThreadCard from '@/components/Card/Thread';
import { ThreadsLoading } from './UILoading';

export default function ThreadList() {
  const searchParams = useSearchParams();
  const { status, data } = useAppSelector((state) => state.threads);

  const getAllCategories = searchParams.getAll('category');

  return (
    <>
      <ThreadsLoading status={status as 'loading'} />

      {status === 'success' && (
        <div className="mt-8 flex flex-col gap-4 lg:w-[60%]">
          {data && data?.map((thread) => {
            if (getAllCategories.length > 0) {
              if (searchParams.getAll('category')?.includes(thread.category)) {
                return (
                  <ThreadCard thread={thread} key={thread.id} />
                );
              }

              return null;
            }
            return <ThreadCard thread={thread} key={thread.id} />;
          })}
        </div>
      )}
    </>
  );
}
