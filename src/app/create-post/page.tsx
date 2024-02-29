import * as React from 'react';
import { Metadata } from 'next';
import CreatePostViews from '@/views/CreatePostViews';
import METADATA from '@/constant/metadata';

export const metadata: Metadata = {
  title: `Membuat Post ${METADATA.exTitle}`,
  description: 'Membuat atau posting diskusi untuk berbagai hal topik yang sedang happening banget.',
  keywords: 'Posting Sharing Sepuh, post Sharing Sepuh, post Sharing Sepuh',
  alternates: {
    canonical: `${process.env.DOMAIN}/create-post`,
  },
};

export default function CreatePostPage() {
  return (
    <CreatePostViews />
  );
}
