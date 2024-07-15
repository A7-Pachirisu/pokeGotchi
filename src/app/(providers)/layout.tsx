import { AuthProvider } from '@/contexts/auth.context/auth.context';
import React from 'react';
import QueryProvider from './_providers/QueryProvider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}

export default ProvidersLayout;
