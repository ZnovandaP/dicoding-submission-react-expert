'use client';

import * as React from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '.';

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = React.useRef<AppStore>();

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}
