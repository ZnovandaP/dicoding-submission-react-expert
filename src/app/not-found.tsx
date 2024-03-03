import * as React from 'react';
import NotFoundViews from '@/views/NotFoundViews';
import { Metadata } from 'next';
import METADATA from '@/constant/metadata';

export const metadata: Metadata = {
  title: `404 Not Found ${METADATA.exTitle}`,
  description: 'Halaman tidak ditemukan.',
};

export default function NotFoundPage() {
  return (
    <div className="relative mt-8 min-h-[80dvh] pb-8">
      <NotFoundViews
        message="Halaman tidak ditemukan! kembali ke halaman"
        href="/"
        hrefLabel="Threads"
      />
    </div>
  );
}
