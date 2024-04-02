/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import * as React from 'react';
import LoadingBar from 'react-redux-loading-bar';
import Container from '../Container';
import Navbar from '../Navbar';
import Providers from '../Providers';
import Footer from './Footer';

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
          height: '7px',
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

      <footer
        onClick={() => setOpen(false)}
        className="bg-gradient-to-r from-primary via-purple-400 to-primary text-white h-56 mt-10 py-4"
      >
        <Footer />
      </footer>
    </Providers>
  );
}
