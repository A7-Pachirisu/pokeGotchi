import Header from '@/components/Header';
import MenuBar from '@/components/MenuBar';
import React from 'react';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto h-screen w-[600px]">
      <Header />

      <main className="h-screen">{children}</main>

      <MenuBar />
    </div>
  );
}

export default RootLayout;
