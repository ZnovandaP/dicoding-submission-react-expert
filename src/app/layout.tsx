import * as React from 'react';
import type { Metadata } from 'next';
import { Inter, Kaushan_Script } from 'next/font/google';
import './globals.css';
import cn from '@/utils/cn';
import AppShell from '@/components/AppShell';

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
  title: 'Sharing Sepuh',
  description: 'Website applikasi diskusi berbagai hal',
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
      <body className="h-[3000px] font-inter font-medium bg-neutral-50 dark:bg-neutral-950" suppressHydrationWarning>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
