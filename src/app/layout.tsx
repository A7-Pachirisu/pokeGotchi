import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import favicon from '@/assets/default ball.png';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokeGotchi',
  description: '포켓몬 다마고치',
  icons: {
    icon: favicon.src
  }
};

export default function HTMLLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
