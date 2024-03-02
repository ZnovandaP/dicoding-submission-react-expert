/* eslint-disable no-return-assign */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { LiaCommentSolid } from 'react-icons/lia';
import {
  BiDislike,
  BiLike,
  BiSolidDislike,
  BiSolidLike,
} from 'react-icons/bi';
import Button from '.';

type ButtonVote = {
  isVoted: boolean;
  onClick: () => void;
  countVote: number;
};

type ButtonGoToCommentProps = {
  commentCount: number;
  threadId: string;
};

export function ButtonGoToComment({ commentCount, threadId }:ButtonGoToCommentProps) {
  return (
    <Link
      href={`/thread/${threadId}/#post-comment`}
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary rounded-md px-4 py-2 transition-all duration-500 ring-1 ring-primary dark:ring-dark-primary hover:bg-primary/30 active:scale-105 active:bg-primary/50"
    >
      <LiaCommentSolid className="text-xl" />
      <span>{commentCount}</span>
    </Link>
  );
}

export function ButtonUpVote({ onClick, isVoted, countVote }: ButtonVote) {
  return (
    <Button
      type="button"
      variant="icon"
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary dark:ring-dark-primary"
      onClick={onClick}
    >
      {isVoted
        ? (<BiSolidLike className="text-xl" />)
        : (<BiLike className="text-xl" />)}
      <span>{countVote}</span>
    </Button>
  );
}
export function ButtonDownVote({ onClick, isVoted, countVote }: ButtonVote) {
  return (
    <Button
      type="button"
      variant="icon"
      onClick={onClick}
      className="flex items-end gap-1 text-xs text-primary dark:text-dark-primary dark:ring-dark-primary"
    >
      {isVoted
        ? (<BiSolidDislike className="text-xl" />)
        : (<BiDislike className="text-xl" />)}
      <span>{countVote}</span>
    </Button>
  );
}
