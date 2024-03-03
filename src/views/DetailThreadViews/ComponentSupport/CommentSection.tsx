import * as React from 'react';
import { LiaComment } from 'react-icons/lia';
import CommentThreadCard from '@/components/Card/CommentThread';
import { useAppSelector } from '@/libs/redux/store';
import cn from '@/utils/cn';
import FormPostComment from './FormPostComment';

function CommentSectionTitle({ totalComments }: { totalComments: number }) {
  return (
    <h3 className="flex gap-2 items-center">
      <LiaComment className="text-2xl md:text-3xl text-primary dark:text-dark-primary" />
      <span className="text-xl font-medium md:text-2xl">
        {`Komentar (${totalComments})`}
      </span>
    </h3>
  );
}

export default function CommentSection() {
  const { data } = useAppSelector((state) => state.thread);

  const containerCommentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="mt-6 flex flex-col gap-6">
      <CommentSectionTitle totalComments={data?.totalComments!} />

      <div
        ref={containerCommentRef}
        className={cn(
          'flex flex-col gap-6',

          data?.totalComments! > 4 ? 'h-[40rem] overflow-y-auto' : 'h-auto',
        )}
      >
        {data?.totalComments! > 0 && data?.comments?.map((comment) => (
          <CommentThreadCard comment={comment} key={comment.id} />
        ))}

        {data?.totalComments! === 0 && (
        <p className="text-center text-xl italic opacity-70">
          Belum ada komentar!
        </p>
        )}
      </div>

      <FormPostComment containerCommentRef={containerCommentRef} />
    </div>
  );
}
