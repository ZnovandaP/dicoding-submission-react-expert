import * as React from 'react';
import Button from '@/components/Button';
import { ImSpinner9 } from 'react-icons/im';
import { FieldErrors } from 'react-hook-form';

type ButtonSubmitPostCommmentProps = {
  isSubmitting: boolean
  errors: FieldErrors
};

export default function ButtonSubmitPostComment(
  { errors, isSubmitting }: ButtonSubmitPostCommmentProps,
) {
  const checkinInputValidationIsError = Object.keys(errors).length > 0;
  const isDisable = isSubmitting || checkinInputValidationIsError;

  return (
    <Button
      type="submit"
      variant="primary"
      className="center gap-3 mt-4 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={isDisable}
    >
      {isSubmitting && (
        <ImSpinner9 className="text-xl text-neutral-50 animate-spin" />
      )}
      {isSubmitting ? 'Loading...' : 'Posting Komentar'}
    </Button>
  );
}
