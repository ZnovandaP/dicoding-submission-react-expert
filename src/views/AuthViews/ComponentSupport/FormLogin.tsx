'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { asyncLogin } from '@/libs/redux/slices/auth/login';
import { useAppDispatch } from '@/libs/redux/store';
import Input from '@/components/Input';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import ButtonAuthSubmit from './ButtonAuthSubmit';

const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z.string()
    .min(1, { message: 'Password harus diisi' })
    .min(6, { message: 'Password minimal 6 karakter' })
    .max(15, { message: 'Password maksimal 15 karakter' }),
});

type LoginValue = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<LoginValue>({ resolver: zodResolver(loginSchema) });

  const handleLogin = handleSubmit(async (data) => {
    // * authentication with next auth have to integration with redux
    try {
      dispatch(asyncLogin(data));
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
        callbackUrl,
      });

      if (res?.ok) {
        router.push(callbackUrl);
      }
    } catch (error: any) {
      toast.error(error.message as string);
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
