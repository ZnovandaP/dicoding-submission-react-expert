'use client';

import * as React from 'react';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '@/libs/redux/store';
import { useSession } from 'next-auth/react';
import { unwrapResult } from '@reduxjs/toolkit';
import asyncPostCommentThread from '@/libs/redux/slices/detail-thread/post-comment-thread-thunk';
import TipTapEditor from '@/components/TipTap';
import ButtonSubmitPostComment from './ButtonSubmitPostComment';

type FormPostCommentProps = {
  containerCommentRef: React.RefObject<HTMLDivElement>
};

const postCommentSchema = z.object({
  'post-comment': z.string().min(3, { message: 'Konten harus diisi! minimal 3 karakter' }).trim(),
});

type PostCommentValue = z.infer<typeof postCommentSchema>;

export default function FormPostComment({ containerCommentRef }: FormPostCommentProps) {
  const [html, setHTML] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { status } = useSession();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostCommentValue>({ resolver: zodResolver(postCommentSchema) });

  const handlePostComment = handleSubmit(async () => {
    try {
      const resultAction = await dispatch(asyncPostCommentThread({ content: html }));
      const originalPromiseResult = unwrapResult(resultAction);

      if (originalPromiseResult) {
        setIsSuccess(true);
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
        }, 600); // 600ms = 0.6s
      }
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setTimeout(() => {
        setIsSuccess(false);
      }, 300); // 300ms = 0.3s
    }
  });

  return status === 'authenticated' ? (
    <form
      onSubmit={handlePostComment}
      className="flex w-full flex-col gap-3"
    >
      <Controller
        name="post-comment"
        control={control}
        render={({ field }) => (
          <TipTapEditor
            id="body"
            isSuccess={isSuccess}
            label="Komentar Diskusi"
            description=""
            ref={field.ref}
            error={errors}
            onChange={field.onChange}
            setHTML={setHTML}
          />
        )}
      />

      <ButtonSubmitPostComment
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </form>
  ) : null;
}
