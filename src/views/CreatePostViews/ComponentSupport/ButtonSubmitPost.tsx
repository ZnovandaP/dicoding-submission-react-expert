import * as React from 'react';
import Button from '@/components/Button';
import { ImSpinner9 } from 'react-icons/im';
import { useAppSelector } from '@/libs/redux/store';
import { FieldErrors } from 'react-hook-form';

type ButtonSubmitPostProps = {
  isSubmitting: boolean
  errors: FieldErrors
};

export default function ButtonSubmitPost({ errors, isSubmitting }: ButtonSubmitPostProps) {
  const postThread = useAppSelector((state) => state.postThread);

  const checkinInputValidationIsError = Object.keys(errors).length > 0;
  const isLoading = postThread.status === 'loading';
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
      {isLoading ? 'Loading...' : 'Posting Diskusi'}
    </Button>
  );
}
