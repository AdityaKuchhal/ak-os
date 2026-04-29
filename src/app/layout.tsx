import type { Metadata } from 'next';
import { VT323, Share_Tech_Mono } from 'next/font/google';
import './globals.css';

const vt323 = VT323({
  weight: '400',
  variable: '--font-terminal',
  subsets: ['latin'],
});

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'AK-OS',
  description: 'Interactive OS-themed portfolio for Aditya Kuchhal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="matrix"
      className={`${vt323.variable} ${shareTechMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
