import * as React from 'react';
import {
  ThreadBody,
  type ThreadComponentSupportProps,
  ThreadFoot,
  ThreadHead,
  ThreadWrapper,
} from './ThreadComponentSupport';

export default function ThreadCard({ thread }: ThreadComponentSupportProps) {
  return (
    <>
      <ThreadWrapper>
        <ThreadHead thread={thread} />
        <ThreadBody thread={thread} />
        <ThreadFoot thread={thread} />
      </ThreadWrapper>

      <hr className="border-t-1 border-primary" />
    </>
  );
}
