import * as React from 'react';
import { useSession } from 'next-auth/react';
import {
  asyncUpVoteCommentThread,
  asyncDownVoteCommentThread,
  asyncNeutralVoteCommentThread,
} from '@/libs/redux/slices/detail-thread/vote-comment-thread';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/libs/redux/store';
import { CommentWithEmailOwner } from '@/types/response/comment';
import { ButtonUpVote, ButtonDownVote } from './ButtonThreadAction';

export default function ButtonVotesCommentThread({ comment }: { comment: CommentWithEmailOwner }) {
  const { status } = useSession();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);

  const isUpVoted = comment.upVotesBy.includes(profile?.id as string);
  const handleUpVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isUpVoted) {
      dispatch(asyncNeutralVoteCommentThread(comment?.id));
    } else {
      dispatch(asyncUpVoteCommentThread(comment.id));
    }
  };

  const isDownVoted = comment.downVotesBy.includes(profile?.id as string);
  const handleDownVote = () => {
    if (status === 'unauthenticated') {
      toast.error('Anda harus login terlebih dahulu');
      return;
    }

    if (isDownVoted) {
      dispatch(asyncNeutralVoteCommentThread(comment.id));
    } else {
      dispatch(asyncDownVoteCommentThread(comment.id));
    }
  };
  return (
    <>
      <ButtonUpVote
        onClick={handleUpVote}
        countVote={comment.upVotesBy.length}
        isVoted={isUpVoted}
      />
      <ButtonDownVote
        onClick={handleDownVote}
        countVote={comment.downVotesBy.length}
        isVoted={isDownVoted}
      />
    </>
  );
}
