'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextArea } from '@/components/Input';
import { useAppDispatch } from '@/libs/redux/store';
import { useSession } from 'next-auth/react';
import asyncPostCommentThread from '@/libs/redux/slices/detail-thread/post-comment-thread-thunk';
import { unwrapResult } from '@reduxjs/toolkit';
import ButtonSubmitPostComment from './ButtonSubmitPostComment';

type FormPostCommentProps = {
  containerCommentRef: React.RefObject<HTMLDivElement>
};

const postCommentSchema = z.object({
  'post-comment': z.string().min(3, { message: 'Konten harus diisi! minimal 3 karakter' }),
});

type PostCommentValue = z.infer<typeof postCommentSchema>;

export default function FormPostComment({ containerCommentRef }: FormPostCommentProps) {
  const { status } = useSession();
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostCommentValue>({ resolver: zodResolver(postCommentSchema) });

  const handlePostComment = handleSubmit(async (data) => {
    const resultAction = await dispatch(asyncPostCommentThread({
      content: data['post-comment'],
    }));
    const originalPromiseResult = unwrapResult(resultAction);

    if (originalPromiseResult) {
      reset();
      containerCommentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });

      setTimeout(() => {
        containerCommentRef.current?.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }, 600);
    }
  });

  return status === 'authenticated' ? (
    <form
      onSubmit={handlePostComment}
      className="flex w-full flex-col gap-3"
    >
      <TextArea
        {...register('post-comment')}
        error={errors}
        id="post-comment"
        placeholder="Tulis komentar..."
        label="Tulis komentar"
      />

      <ButtonSubmitPostComment
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </form>
  ) : null;
}
