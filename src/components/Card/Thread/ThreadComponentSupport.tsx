'use client';

import * as React from 'react';
import { DetailThreadWithEmailOwner, ThreadWithOwner } from '@/types/response/threads';
import Avatar from '@/components/Avatar';
import parse from 'html-react-parser';
import Link from 'next/link';
import Badge from '@/components/Badge';
import { useParseTimeToNow, useFormatDate } from '@/hooks/useFormatTime';
import { ButtonGoToComment } from '@/components/Button/ButtonThreadAction';
import {
  ButtonVotesThreads, ButtonVotesDetailThread,
} from '@/components/Button/ButtonVotesThread';

export type ThreadComponentSupportProps = {
  thread: ThreadWithOwner | DetailThreadWithEmailOwner;
};

export function ThreadWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col gap-3 lg:pr-4 "
    >
      {children}
    </div>
  );
}

export function ThreadHead({ thread, isDetailThread = false }
: ThreadComponentSupportProps & { isDetailThread?: boolean }) {
  const parseTimeToNow = useParseTimeToNow();
  const formatDate = useFormatDate();

  return (
    <div className="flex justify-between ">
      <div className="flex gap-4 items-center">
        <Avatar
          src={thread.owner.avatar ?? '/user.png'}
          alt={`Avatar ${thread.owner.name ?? 'user'}`}
        />
        <div className="flex flex-col">
          <p className="line-clamp-1">
            {thread.owner.name ?? 'Nama pengguna tidak ditemukan'}
          </p>
          <p className="text-sm opacity-50 line-clamp-1">
            {thread.owner.email ?? 'Email pengguna tidak ditemukan'}
          </p>
        </div>
      </div>
      <p className="text-sm opacity-50 line-clamp-1 h-5">
        {
          !isDetailThread ? parseTimeToNow(thread.createdAt) : formatDate(thread.createdAt)
        }
      </p>
    </div>
  );
}

export function ThreadBody({ thread, isDetailThread = false }
: ThreadComponentSupportProps & { isDetailThread?: boolean }) {
  return (
    <div className="ml-12 flex flex-col gap-3">
      {!isDetailThread && (
      <Link
        href={`/thread/${thread.id}`}
        className="text-lg text-primary dark:text-dark-primary underline-offset-8 decoration-wavy decoration-1 first-letter:uppercase hover:underline"
      >
        {thread.title}
      </Link>
      )}

      {isDetailThread ? (
        <div className="">
          {parse(thread.body)}
        </div>
      ) : (
        <div className="line-clamp-5">
          {parse(thread.body)}
        </div>
      )}

      <div className="flex gap-2 items-center md:hidden mt-2">
        <Badge size="md">
          {`#${thread.category}`}
        </Badge>
      </div>

    </div>
  );
}

export function ThreadFoot(
  { thread, isDetailThread = false }: ThreadComponentSupportProps & { isDetailThread?: boolean },
) {
  return (
    <div className="flex justify-center md:justify-between items-center mt-4 md:ml-12">
      <div className="flex items-center gap-3 ">

        {!isDetailThread && <ButtonVotesThreads thread={thread} /> }
        {isDetailThread && <ButtonVotesDetailThread thread={thread} /> }

        <ButtonGoToComment
          commentCount={thread.totalComments}
          threadId={thread.id}
        />

      </div>

      <div className="hidden gap-2 items-center md:flex">
        <Badge size="md">
          {`#${thread.category}`}
        </Badge>
      </div>
    </div>
  );
}
