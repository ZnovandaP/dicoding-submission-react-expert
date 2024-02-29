/* eslint-disable no-return-assign */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { LiaCommentSolid } from 'react-icons/lia';
import {
  BiDislike,
  BiLike,
  BiSolidDislike,
  BiSolidLike,
} from 'react-icons/bi';
import {
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  asyncUpVoteThread,
} from '@/libs/redux/slices/threads/get-threads';
import { useAppDispatch, useAppSelector } from '@/libs/redux/store';
import { ThreadWithAuthor } from '@/types/response/threads';
import Button from '.';

type ButtonVote = {
  thread: ThreadWithAuthor
};

type ButtonGoToCommentProps = {
  commentCount: number;
  threadId: string;
};

export function ButtonGoToComment({ commentCount, threadId }:ButtonGoToCommentProps) {
  return (
    <Link
      href={`/thread/${threadId}`}
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary rounded-md px-4 py-2 transition-all duration-500 ring-1 ring-primary dark:ring-dark-primary hover:bg-primary/30 active:scale-105 active:bg-primary/50"
    >
      <LiaCommentSolid className="text-xl" />
      <span>{commentCount}</span>
    </Link>
  );
}

export function ButtonUpVote({ thread }: ButtonVote) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const isVoted = thread.upVotesBy.includes(profile?.id as string);
  const handleUpVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncUpVoteThread(thread.id));
    }
  };
  return (
    <Button
      type="button"
      variant="icon"
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary dark:ring-dark-primary"
      onClick={handleUpVote}
    >
      {isVoted
        ? (<BiSolidLike className="text-xl" />)
        : (<BiLike className="text-xl" />)}
      <span>{thread.upVotesBy.length}</span>
    </Button>
  );
}
export function ButtonDownVote({ thread }: ButtonVote) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const isVoted = thread.downVotesBy.includes(profile?.id as string);
  const handleDownVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
    }

    if (isVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncDownVoteThread(thread.id));
    }
  };

  return (
    <Button
      type="button"
      variant="icon"
      onClick={handleDownVote}
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary dark:ring-dark-primary"
    >
      {isVoted
        ? (<BiSolidDislike className="text-xl" />)
        : (<BiDislike className="text-xl" />)}
      <span>{thread.downVotesBy.length}</span>
    </Button>
  );
}
