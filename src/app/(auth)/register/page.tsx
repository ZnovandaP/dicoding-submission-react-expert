import METADATA from '@/constant/metadata';
import RegisterViews from '@/views/AuthViews/RegisterViews';
import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: `Registrasi ${METADATA.exTitle}`,
  description: 'Registrasi Applikasi Sharing Sepuh',
  keywords: 'Registrasi Sharing Sepuh, registration Sharing Sepuh, register Sharing Sepuh',
  alternates: {
    canonical: `${process.env.DOMAIN}/register`,
  },
};

export default function Register() {
  return (<RegisterViews />);
}
