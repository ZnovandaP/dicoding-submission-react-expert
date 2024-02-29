'use client';

import * as React from 'react';
import { ThreadWithAuthor } from '@/types/response/threads';
import Avatar from '@/components/Avatar';
import { useParseTimeToNow } from '@/hooks/useFormatTime';
import parse from 'html-react-parser';
import Link from 'next/link';
import Badge from '@/components/Badge';
import { ButtonDownVote, ButtonUpVote, ButtonGoToComment } from '@/components/Button/ButtonThreadAction';

export type ThreadComponentSupportProps = {
  thread: ThreadWithAuthor;
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

export function ThreadHead({ thread }: ThreadComponentSupportProps) {
  const parseTimeToNow = useParseTimeToNow();

  return (
    <div className="flex justify-between ">
      <div className="flex gap-4 items-center">
        <Avatar
          src={thread.author.avatar ?? '/user.png'}
          alt={`Avatar ${thread.author.name ?? 'user'}`}
        />
        <div className="flex flex-col">
          <p className="line-clamp-1">
            {thread.author.name ?? 'Nama pengguna tidak ditemukan'}
          </p>
          <p className="text-sm opacity-50 line-clamp-1">
            {thread.author.email ?? 'Email pengguna tidak ditemukan'}
          </p>
        </div>
      </div>
      <p className="text-sm opacity-50 line-clamp-1 h-5">
        {parseTimeToNow(thread.createdAt)}
      </p>
    </div>
  );
}

export function ThreadBody({ thread }: ThreadComponentSupportProps) {
  return (
    <div className="ml-12 flex flex-col gap-3">
      <Link
        href={`/thread/${thread.id}`}
        className="text-lg text-primary dark:text-dark-primary underline-offset-8 decoration-wavy decoration-1 hover:underline"
      >
        {thread.title}
      </Link>

      <div className="line-clamp-5">
        {parse(thread.body)}
      </div>

      <div className="flex gap-2 items-center md:hidden mt-2">
        <Badge>
          {`#${thread.category}`}
        </Badge>
      </div>

    </div>
  );
}

export function ThreadFoot({ thread }: ThreadComponentSupportProps) {
  return (
    <div className="flex justify-center md:justify-between items-center mt-4 md:ml-12">
      <div className="flex items-center gap-3 ">
        <ButtonUpVote thread={thread} />

        <ButtonDownVote thread={thread} />

        <ButtonGoToComment commentCount={thread.totalComments} threadId={thread.id} />

      </div>

      <div className="hidden gap-2 items-center md:flex">
        <Badge>
          {`#${thread.category}`}
        </Badge>
      </div>
    </div>
  );
}
