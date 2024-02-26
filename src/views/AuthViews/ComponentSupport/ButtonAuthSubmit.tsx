'use client';

import * as React from 'react';
import Button from '@/components/Button';
import { ImSpinner9 } from 'react-icons/im';
import { useAppSelector } from '@/libs/redux/store';
import { FieldErrors } from 'react-hook-form';

type ButtonAuthSubmitProps = {
  isSubmitting: boolean
  label: string
  errors: FieldErrors
};

export default function ButtonAuthSubmit({ isSubmitting, label, errors }: ButtonAuthSubmitProps) {
  const register = useAppSelector((state) => state.register);
  const login = useAppSelector((state) => state.login);

  const checkinInputValidationIsError = Object.keys(errors).length > 0;
  const isLoading = register.status === 'loading' || login.status === 'loading';
  const isDisable = isSubmitting || isLoading || checkinInputValidationIsError;

  return (
    <Button
      type="submit"
      variant="primary"
      className="center gap-3 mt-4 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isDisable}
    >
      {isLoading && (
      <ImSpinner9 className="text-xl text-neutral-50 animate-spin" />
      )}
      {isLoading ? 'Loading...' : label}
    </Button>
  );
}
