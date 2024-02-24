/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import * as React from 'react';
import StoreProvider from '@/libs/redux/store/StoreProvider';
import NextTopLoader from 'nextjs-toploader';
import Container from '../Container';
import Navbar from '../Navbar';
import NextThemesProvider from '../NextThemeProvider';

type AppShellProps = {
  children: React.ReactNode
};

export default function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = React.useState(false);

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
        <header className="inline">
          <Navbar open={open} setOpen={setOpen} />
        </header>

        <main onClick={() => setOpen(false)}>
          <Container className="mt-6">{children}</Container>
        </main>
      </NextThemesProvider>
    </StoreProvider>
  );
}
