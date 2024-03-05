'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/libs/redux/store';
import { toast } from 'react-toastify';
import { asyncPostThread } from '@/libs/redux/slices/threads/post-thread';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSession } from 'next-auth/react';
import Input from '@/components/Input';
import TipTapEditor from '@/components/TipTap';
import ButtonSubmitPost from './ButtonSubmitPost';

const postThreadSchema = z.object({
  title: z.string()
    .max(100, { message: 'category maksimal 100 karakter' })
    .trim(),
  category: z.string()
    .max(20, { message: 'category maksimal 20 karakter' })
    .trim(),
  body: z.string()
    .min(3, { message: 'Konten minimal 3 karakter' })
    .trim(),
});

type PostThreadValue = z.infer<typeof postThreadSchema>;

export default function FormPostThread() {
  const [html, setHTML] = React.useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<PostThreadValue>({
    mode: 'onChange',
    resolver: zodResolver(postThreadSchema),
  });

  const handlePostThread = handleSubmit(async (data) => {
    if (status === 'unauthenticated') {
      toast.error('Silahkan login terlebih dahulu');
      return;
    }

    try {
      const resultAction = await dispatch(asyncPostThread({
        title: data.title,
        category: data.category,
        body: html,
      }));
      const originalPromiseResult = unwrapResult(resultAction);

      if (originalPromiseResult.status === 'success') {
        router.push('/'); //* /threads or '/' aka root pathname
        toast.success('Postingan diskusi berhasil ditambahkan');
      }
    } catch (error) {
      toast.error('Diskusi gagal diposting! file konten terlalu besar');
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

      <Controller
        name="body"
        control={control}
        rules={{
          required: { value: true, message: 'Konten harus diisi' },
          minLength: { value: 3, message: 'Konten minimal 3 karakter' },
        }}
        render={({ field }) => (
          <TipTapEditor
            id="body"
            label="Konten Diskusi"
            description=""
            ref={field.ref}
            error={errors}
            onChange={field.onChange}
            setHTML={setHTML}
          />
        )}
      />

      <ButtonSubmitPost
        errors={errors}
        isSubmitting={isSubmitting}
      />

    </form>
  );
}
