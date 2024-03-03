import METADATA from '@/constant/metadata';
import { getDetailThread } from '@/service/threads';
import { DetailThread } from '@/types/response/threads';
import DetailtThreadViews from '@/views/DetailThreadViews';
import { Metadata } from 'next/types';
import * as React from 'react';

type ThreadPageProps = {
  params: {
    slug: string
  }
};

export async function generateMetadata({ params }: ThreadPageProps): Promise<Metadata> {
  const { slug } = params;

  const { data } = await getDetailThread(slug);

  const thread = data.detailThread as DetailThread;

  return {
    title: `${thread?.title || 'Thread tidak ditemukan'} ${METADATA.exTitle}`,
    description: thread?.body || 'Deskripsi thread tidak ditemukan',
    openGraph: {
      url: `${process.env.DOMAIN}/thread/${thread?.id || ''}`,
      siteName: METADATA.openGraph.siteName,
      locale: METADATA.openGraph.locale,
      type: 'article',
    },
    keywords: thread?.title || 'Post Not Found',
    alternates: {
      canonical: `${process.env.DOMAIN}/thread/${thread?.id || ''}`,
    },
  };
}

export default function DetailThreadPage({ params: { slug } }: ThreadPageProps) {
  return (
    <DetailtThreadViews slug={slug} />
  );
}
