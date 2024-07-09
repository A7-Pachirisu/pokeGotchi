import Header from '@/components/Header';
import MenuBar from '@/components/MenuBar';
import React from 'react';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-screen w-[600px] flex-col font-dunggeunmo">
      <Header />
      <main className="grow overflow-auto">{children}</main>
      <MenuBar />
    </div>
  );
}

export default RootLayout;
