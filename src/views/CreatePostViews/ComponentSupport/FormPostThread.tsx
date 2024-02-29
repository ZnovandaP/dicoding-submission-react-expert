'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/libs/redux/store';
import Input, { TextArea } from '@/components/Input';
import { toast } from 'react-toastify';
import { asyncPostThread } from '@/libs/redux/slices/threads/post-thread';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSession } from 'next-auth/react';
import ButtonSubmitPost from './ButtonSubmitPost';

const postThreadSchema = z.object({
  title: z.string(),
  category: z.string()
    .max(20, { message: 'category maksimal 20 karakter' }),
  body: z.string()
    .min(3, { message: 'Konten minimal 3 karakter' }),
});

type PostThreadValue = z.infer<typeof postThreadSchema>;

export default function FormPostThread() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PostThreadValue>({
    resolver: zodResolver(postThreadSchema),
  });

  const handlePostThread = handleSubmit(async (data) => {
    if (status === 'unauthenticated') {
      toast.error('Silahkan login terlebih dahulu');
      return;
    }

    const resultAction = await dispatch(asyncPostThread(data));
    const originalPromiseResult = unwrapResult(resultAction);

    if (originalPromiseResult.status === 'success') {
      router.push('/threads'); //* /threads or '/' aka root pathname
      toast.success('Postingan diskusi berhasil ditambahkan');
    }
  });

  return (
    <form
      onSubmit={handlePostThread}
      className="flex flex-col gap-6 p-6 mt-8 w-full bg-neutral-100 dark:bg-neutral-900 rounded-md shadow-md shadow-neutral-500/60 md:w-[85%] lg:w-[70%] xl:w-[60%]"
    >
      <Input
        {...register('title')}
        label="Judul Diskusi"
        type="text"
        id="title"
        placeholder="Judul Postingan Diskusi..."
        error={errors}
      />

      <Input
        {...register('category')}
        label="Kategori Diskusi"
        type="text"
        id="category"
        placeholder="Kategori Postingan Diskusi..."
        error={errors}

      />

      <TextArea
        {...register('body')}
        id="body"
        label="Konten Diskusi"
        placeholder="Diskusi apa hari ini..."
        error={errors}

      />

      <ButtonSubmitPost
        errors={errors}
        isSubmitting={isSubmitting}
      />

    </form>
  );
}
