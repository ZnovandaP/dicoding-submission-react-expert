import * as React from 'react';
import cn from '@/utils/cn';
import { DetailThreadWithEmailOwner } from '@/types/response/threads';
import {
  ThreadWrapper, ThreadHead, ThreadBody, ThreadFoot,
} from '../Thread/ThreadComponentSupport';

type DetailThreadCardProps = {
  thread: DetailThreadWithEmailOwner
  className?: string
};

export default function DetailThreadCard({ thread, className = '' }: DetailThreadCardProps) {
  return (
    <div className={cn(
      'flex flex-col gap-6',

      className,
    )}
    >
      <ThreadWrapper>
        <ThreadHead thread={thread} isDetailThread />
        <ThreadBody thread={thread} isDetailThread />
        <ThreadFoot thread={thread} isDetailThread />
      </ThreadWrapper>
      <hr className="border-t-1 border-primary" />
    </div>
  );
}
