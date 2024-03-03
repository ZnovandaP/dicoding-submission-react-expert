'use client';

import * as React from 'react';
import usePreload from '@/hooks/usePreload';
import { asyncDetailThread } from '@/libs/redux/slices/detail-thread';
import { asyncGetProfile } from '@/libs/redux/slices/users/get-own-profile';
import { useAppSelector } from '@/libs/redux/store';
import DetailThreadCard from '@/components/Card/DetailThread';
import CommentSection from './ComponentSupport/CommentSection';
import DetaliThreadLoading from './ComponentSupport/UILoading';

type DetailtThreadViewsProps = {
  slug: string;
};

export default function DetailtThreadViews({ slug }: DetailtThreadViewsProps) {
  usePreload([() => asyncDetailThread(slug), asyncGetProfile]);
  const { status, data } = useAppSelector((state) => state.thread);
  return (
    <section className="relative mt-8 min-h-[80dvh] pb-8">
      { status === 'success' && (
      <>
        <h2 className="title-page">
          { data?.title}
        </h2>
        <DetailThreadCard thread={data!} className="mt-6" />

        <CommentSection />
      </>
      )}

      <DetaliThreadLoading status={status as 'loading'} />
    </section>
  );
}
