import METADATA from '@/constant/metadata';
import LoginViews from '@/views/AuthViews/LoginViews';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: `Login ${METADATA.exTitle}`,
  description: 'Login Applikasi Sharing Sepuh',
  keywords: 'Login Sharing Sepuh',
  alternates: {
    canonical: `${process.env.DOMAIN}/login`,
  },
};

export default function LoginPage() {
  return <LoginViews />;
}
