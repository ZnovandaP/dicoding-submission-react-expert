'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asyncRegister } from '@/libs/redux/slices/auth/register';
import { useAppDispatch } from '@/libs/redux/store';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import ButtonAuthSubmit from './ButtonAuthSubmit';

const registerSchema = z.object({
  name: z.string()
    .min(1, { message: 'Nama harus diisi' })
    .min(3, { message: 'Nama minimal 3 karakter' })
    .max(50, { message: 'Nama maksimal 50 karakter' }),
  email: z.string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Format email tidak valid' }),
  password: z.string()
    .min(1, { message: 'Password harus diisi' })
    .min(6, { message: 'Password minimal 6 karakter' })
    .max(15, { message: 'Password maksimal 15 karakter' }),
});

type RegisterValue = z.infer<typeof registerSchema>;
export default function FormRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<RegisterValue>({ resolver: zodResolver(registerSchema) });

  const handleRegister = handleSubmit(async (data) => {
    try {
      const resultAction = await dispatch(asyncRegister(data));
      const originalPromiseResult = unwrapResult(resultAction);

      if (originalPromiseResult.status === 'success') {
        toast.success('Registrasi sukses silahkan login');
        router.push('/login');
      }
    } catch (error) {
      toast.error('Registrasi gagal, email ini sudah terdaftar');
    }
  });

  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleRegister}
    >
      <Input
        {...register('name')}
        label="Nama"
        id="name"
        type="text"
        error={errors}
      />

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

      <ButtonAuthSubmit errors={errors} isSubmitting={isSubmitting} label="Register" />
    </form>
  );
}
