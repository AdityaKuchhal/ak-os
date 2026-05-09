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
  title: 'Aditya Kuchhal — Software Developer',
  description:
    'Interactive OS-themed portfolio of Aditya Kuchhal — Software Developer based in Vaughan, ON. Experienced in Python, TypeScript, React, FastAPI, ML pipelines, and cloud infrastructure.',
  keywords: [
    'Aditya Kuchhal',
    'Software Developer',
    'Portfolio',
    'Python',
    'TypeScript',
    'React',
    'Next.js',
    'FastAPI',
    'Machine Learning',
    'Toronto',
    'Vaughan',
  ],
  authors: [{ name: 'Aditya Kuchhal' }],
  creator: 'Aditya Kuchhal',
  openGraph: {
    type: 'website',
    url: 'https://adityakuchhal.com',
    title: 'Aditya Kuchhal — Software Developer',
    description:
      'Interactive OS-themed portfolio. Python, TypeScript, React, ML pipelines, and cloud infrastructure.',
    siteName: 'AK-OS Portfolio',
    images: [
      {
        url: 'https://adityakuchhal.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AK-OS — Aditya Kuchhal Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Kuchhal — Software Developer',
    description:
      'Interactive OS-themed portfolio. Python, TypeScript, React, ML pipelines.',
    images: ['https://adityakuchhal.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://adityakuchhal.com'),
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
