import * as React from 'react';
import parse from 'html-react-parser';
import Avatar from '@/components/Avatar';
import { CommentWithEmailOwner } from '@/types/response/comment';
import { useParseTimeToNow } from '@/hooks/useFormatTime';
import ButtonVotesCommentThread from '@/components/Button/ButtonVotesCommentThread';

export type CommentThreadCardProps = {
  comment: CommentWithEmailOwner
};

export function CommentThreadHead({ comment } : CommentThreadCardProps) {
  const parseTimeToNow = useParseTimeToNow();

  return (
    <div className="flex justify-between ">
      <div className="flex gap-4 items-center">
        <Avatar
          src={comment.owner.avatar ?? '/user.png'}
          alt={`Avatar ${comment.owner.name ?? 'user'}`}
        />
        <div className="flex flex-col">
          <p className="line-clamp-1">
            {comment.owner.name ?? 'Nama pengguna tidak ditemukan'}
          </p>
          <p className="text-sm opacity-50 line-clamp-1">
            {comment.owner.email ?? 'Email pengguna tidak ditemukan'}
          </p>
        </div>
      </div>
      <p className="text-sm opacity-50 line-clamp-1 h-5">
        {parseTimeToNow(comment.createdAt) }
      </p>
    </div>
  );
}

export function CommentThreadBody({ comment }: CommentThreadCardProps) {
  return (
    <div className="ml-12">
      <div>
        {parse(comment.content)}
      </div>
    </div>
  );
}

export function CommentThreadFooter({ comment }: CommentThreadCardProps) {
  return (
    <div className="flex justify-end md:justify-start items-center mt-4 md:ml-12">
      <div className="flex items-center gap-3 ">
        <ButtonVotesCommentThread comment={comment} />
      </div>
    </div>
  );
}
