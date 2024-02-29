/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import * as React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import Container from '../Container';
import Navbar from '../Navbar';
import Providers from '../Providers';

type AppShellProps = {
  children: React.ReactNode
};

export default function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Providers>
      <header className="inline">
        <LoadingBar style={{
          backgroundColor: '#c026d3',
          height: '3px',
          zIndex: 99999,
          position: 'fixed',
        }}
        />
        <Navbar open={open} setOpen={setOpen} />
      </header>

      <main onClick={() => setOpen(false)}>
        <Container className="mt-6">
          {children}
        </Container>
      </main>
    </Providers>
  );
}
