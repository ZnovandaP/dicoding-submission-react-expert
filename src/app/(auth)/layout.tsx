import * as React from 'react';
import Image from 'next/image';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="center relative mt-10">
      <Image
        src="/aurora.webp"
        alt="Pemandangan aurora"
        priority
        width={1000}
        height={1000}
        className="w-[100dvw] h-[80dvh] rounded-lg object-cover"
      />

      {children}
    </div>
  );
}
