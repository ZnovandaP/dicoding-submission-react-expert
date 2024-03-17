'use client';

import * as React from 'react';
import { ErrorMessage } from '@hookform/error-message';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  id: string
  error: object
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label, id, error, type, ...props
}, ref) => (
  <>
    <label htmlFor={id} className="flex flex-col gap-2">
      {' '}
      {label}
      <input
        {...props}
        ref={ref}
        type={type}
        name={id}
        id={id}
        className="rounded-md bg-transparent p-3 ring-1 ring-primary/60 focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </label>

    <ErrorMessage
      name={id}
      errors={error}
      render={({ message }) => <p className="text-red-600 dark:text-red-500">{message}</p>}
    />
  </>
));

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  id: string
  error: object
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    label, id, error, ...props
  }, ref) => (
    <>
      <label htmlFor={id} className="flex flex-col gap-2">
        {label}
        <textarea
          {...props}
          ref={ref}
          name={id}
          id={id}
          required
          className="rounded-md bg-transparent p-3 ring-1 ring-primary/60 h-44 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>

      <ErrorMessage
        name={id}
        errors={error}
        render={({ message }) => <p className="text-red-600 dark:text-red-500">{message}</p>}
      />
    </>
  ),
);

export default Input;
