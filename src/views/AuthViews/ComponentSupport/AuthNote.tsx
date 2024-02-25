import Link from 'next/link';
import * as React from 'react';

type AuthNoteProps = {
  message: string;
  to: string
  messageLink: string
};

export default function AuthNote({ message, messageLink, to }: AuthNoteProps) {
  return (
    <p className="text-center">
      {message}
      {' '}
      <Link href={to} className="text-fuchsia-600 dark:text-fuchsia-400">
        {messageLink}
      </Link>
    </p>
  );
}
