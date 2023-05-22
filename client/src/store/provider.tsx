'use client';

import { persistedStore, store } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from 'providers/auth-provider/AuthProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <AuthProvider>{children}</AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
