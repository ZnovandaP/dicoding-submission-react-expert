import * as React from 'react';

type AuthTitleProps = {
  title: string
};

export default function AuthTitle({ title }: AuthTitleProps) {
  return (
    <h2 className="text-center text-xl md:text-2xl">
      {title}
      {' '}
      <span className="font-kaushan">Sharing Sepuh</span>
    </h2>
  );
}
