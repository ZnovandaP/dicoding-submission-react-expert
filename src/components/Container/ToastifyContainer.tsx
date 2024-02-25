'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/ReactToastify.css';

export default function ToastifyContainer() {
  const { theme } = useTheme();

  const initialThemeForToasttify = theme === 'system' ? 'dark' : theme;

  return (
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={initialThemeForToasttify}
    />
  );
}
