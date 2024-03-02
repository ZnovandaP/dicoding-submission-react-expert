import * as React from 'react';
import { ThreadWrapper } from '../Thread/ThreadComponentSupport';
import {
  CommentThreadBody,
  CommentThreadCardProps,
  CommentThreadFooter,
  CommentThreadHead,
} from './CommentThreadComponentSupport';

export default function CommentThreadCard({ comment }: CommentThreadCardProps) {
  return (
    <>
      <ThreadWrapper>
        <CommentThreadHead comment={comment} />
        <CommentThreadBody comment={comment} />
        <CommentThreadFooter comment={comment} />
      </ThreadWrapper>

      <hr className="border-t-1 border-primary" />
    </>
  );
}
