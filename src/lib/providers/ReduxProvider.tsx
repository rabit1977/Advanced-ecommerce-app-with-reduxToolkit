'use client';

import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from '@/lib/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactNode, useEffect } from 'react';
import { loadUsers } from '@/lib/store/slices/userSlice';

export function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
