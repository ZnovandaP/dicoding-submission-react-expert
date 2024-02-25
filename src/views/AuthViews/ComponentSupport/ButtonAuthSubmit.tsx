'use client';

import * as React from 'react';
import Button from '@/components/Button';
import { ImSpinner9 } from 'react-icons/im';
import { useAppSelector } from '@/libs/redux/store';

type ButtonAuthSubmitProps = {
  isSubmitting: boolean
  label: string
};

export default function ButtonAuthSubmit({ isSubmitting, label }: ButtonAuthSubmitProps) {
  const { status, message } = useAppSelector((state) => state.register);

  return (
    <Button
      type="submit"
      variant="primary"
      className="center gap-3 mt-4 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isSubmitting || status === 'loading'}
    >
      {status === 'loading' && (
      <ImSpinner9 className="text-xl text-neutral-50 animate-spin" />
      )}
      {status === 'loading' ? message : label}
    </Button>
  );
}
