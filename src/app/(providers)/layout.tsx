import React from 'react';
import QueryProvider from './_providers/QueryProvider';

function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default ProvidersLayout;
