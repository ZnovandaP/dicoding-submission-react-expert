/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import * as React from 'react';
import NextTopLoader from 'nextjs-toploader';
import LoadingBar from 'react-redux-loading-bar';
import StoreProvider from '@/libs/redux/store/StoreProvider';
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
          <LoadingBar style={{
            backgroundColor: '#c026d3',
            height: '3px',
            zIndex: 99999,
            marginLeft: '10px',
          }}
          />
          <Navbar open={open} setOpen={setOpen} />
        </header>

        <main onClick={() => setOpen(false)}>
          <Container className="mt-6">
            {children}
          </Container>
        </main>
      </NextThemesProvider>
    </StoreProvider>
  );
}
