import * as React from 'react';
import type { Metadata } from 'next';
import { Inter, Kaushan_Script } from 'next/font/google';
import cn from '@/utils/cn';
import AppShell from '@/components/AppShell';

import './globals.css';
import ToastifyContainer from '@/components/Container/ToastifyContainer';
import METADATA from '@/constant/metadata';

// * next/font
const kaushanScript = Kaushan_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kaushan',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000' : process.env.DOMAIN || ''),
  title: `Threads ${METADATA.exTitle}`,
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={cn(inter.variable, kaushanScript.variable)}
      suppressHydrationWarning
    >
      <body className="font-inter font-medium bg-neutral-50 dark:bg-neutral-950" suppressHydrationWarning>
        <AppShell>
          <ToastifyContainer />
          {children}
        </AppShell>
      </body>
    </html>
  );
}
