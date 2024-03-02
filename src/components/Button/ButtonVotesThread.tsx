import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/libs/redux/store';
import {
  asyncNeutralVoteThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
} from '@/libs/redux/slices/threads/vote-threads-thunk';
import {
  asyncNeutralVoteDetailThread,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
} from '@/libs/redux/slices/detail-thread/vote-detail-thread-thunk';
import { ThreadWithOwner, DetailThreadWithEmailOwner } from '@/types/response/threads';
import { toast } from 'react-toastify';
import { ButtonUpVote, ButtonDownVote } from './ButtonThreadAction';

export function ButtonVotesThreads({ thread }:
{ thread: ThreadWithOwner | DetailThreadWithEmailOwner }) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const isUpVoted = thread.upVotesBy.includes(profile?.id as string);
  const handleUpVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(thread?.id));
    } else {
      dispatch(asyncUpVoteThread(thread.id));
    }
  };

  const isDownVoted = thread.downVotesBy.includes(profile?.id as string);
  const handleDownVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncDownVoteThread(thread.id));
    }
  };
  return (
    <>
      <ButtonUpVote
        onClick={handleUpVote}
        countVote={thread.upVotesBy.length}
        isVoted={isUpVoted}
      />
      <ButtonDownVote
        onClick={handleDownVote}
        countVote={thread.downVotesBy.length}
        isVoted={isDownVoted}
      />
    </>
  );
}
export function ButtonVotesDetailThread({ thread }:
{ thread: ThreadWithOwner | DetailThreadWithEmailOwner }) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const isUpVoted = thread.upVotesBy.includes(profile?.id as string);
  const handleUpVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isUpVoted) {
      dispatch(asyncNeutralVoteDetailThread(thread?.id));
    } else {
      dispatch(asyncUpVoteDetailThread(thread.id));
    }
  };

  const isDownVoted = thread.downVotesBy.includes(profile?.id as string);
  const handleDownVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isDownVoted) {
      dispatch(asyncNeutralVoteDetailThread(thread.id));
    } else {
      dispatch(asyncDownVoteDetailThread(thread.id));
    }
  };

  return (
    <>
      <ButtonUpVote
        onClick={handleUpVote}
        countVote={thread.upVotesBy.length}
        isVoted={isUpVoted}
      />
      <ButtonDownVote
        onClick={handleDownVote}
        countVote={thread.downVotesBy.length}
        isVoted={isDownVoted}
      />
    </>
  );
}
