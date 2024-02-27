'use client';

import * as React from 'react';
import StoreProvider from '@/libs/redux/store/StoreProvider';
import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import NextThemesProvider from './NextThemeProvider';

type ProvidersProps = {
  children: React.ReactNode
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <NextTopLoader
        color="#c026d3"
      />
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="sharing-sepuh-theme"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextThemesProvider>
    </StoreProvider>
  );
}
