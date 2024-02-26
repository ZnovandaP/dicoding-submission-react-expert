'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { unwrapResult } from '@reduxjs/toolkit';
import { asyncLogin } from '@/libs/redux/slices/auth/login';
import { useAppDispatch } from '@/libs/redux/store';
import Input from '@/components/Input';
import ButtonAuthSubmit from './ButtonAuthSubmit';

const loginSchema = z.object({
  email: z.string()
    .email({ message: 'Format email tidak valid' }),
  password: z.string()
    .min(6, { message: 'Password minimal 6 karakter' })
    .max(15, { message: 'Password maksimal 15 karakter' }),
});

type LoginValue = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<LoginValue>({ resolver: zodResolver(loginSchema) });

  const handleLogin = handleSubmit(async (data) => {
    const resultAction = await dispatch(asyncLogin(data));
    const originalPromiseResult = unwrapResult(resultAction);

    if (originalPromiseResult.status === 'success') {
      router.push('/');
    }
  });

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleLogin}
    >
      <Input
        {...register('email')}
        label="Email"
        id="email"
        type="email"
        error={errors}
      />

      <Input
        {...register('password')}
        label="Password"
        id="password"
        type="password"
        error={errors}
      />

      <ButtonAuthSubmit errors={errors} isSubmitting={isSubmitting} label="Login" />
    </form>
  );
}
