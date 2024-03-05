'use client';

import * as React from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function NotFoundThreads() {
  const searchParams = useSearchParams();

  const getAllCategories = searchParams.getAll('category');
  return (
    <div
      className="center w-full h-full flex-col "
    >
      <Image
        src="/not-found.svg"
        alt="404"
        width={800}
        height={800}
        priority
        className=" animate-fade"
      />
      <div className="center gap-2 w-full">
        <p className="text-center text-pretty text-xl italic">
          Thread tidak ditemukan
          {' '}
          {getAllCategories.length > 0 ? `dengan kategori: ${getAllCategories.join(',')}` : ''}
        </p>
      </div>
    </div>
  );
}
