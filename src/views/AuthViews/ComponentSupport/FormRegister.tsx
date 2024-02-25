import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { asyncRegister } from '@/libs/redux/slices/auth/register';
import { useAppDispatch } from '@/libs/redux/store';
import Input from '@/components/Input';
import { useRouter } from 'next/navigation';
import { unwrapResult } from '@reduxjs/toolkit';
import ButtonAuthSubmit from './ButtonAuthSubmit';

const registerSchema = z.object({
  name: z.string()
    .min(3, { message: 'Nama minimal 3 karakter' })
    .max(50, { message: 'Nama maksimal 50 karakter' }),
  email: z.string()
    .email({ message: 'Format email tidak valid' }),
  password: z.string()
    .min(6, { message: 'Password minimal 6 karakter' })
    .max(15, { message: 'Password maksimal 15 karakter' }),
});

type RegisterValue = z.infer<typeof registerSchema>;
export default function FormRegister() {
  // const { status, message } = useAppSelector((state) => state.register);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<RegisterValue>({ resolver: zodResolver(registerSchema) });

  const handleRegister = handleSubmit(async (data) => {
    const resultAction = await dispatch(asyncRegister(data));
    const originalPromiseResult = unwrapResult(resultAction);

    if (originalPromiseResult.status === 'success') {
      router.push('/login');
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
        type="name"
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

      <ButtonAuthSubmit isSubmitting={isSubmitting} label="Register" />
    </form>
  );
}
