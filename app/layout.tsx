import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CyberDrishti | Network Attack Forecasting',
  description:
    'AI-based temporal network attack forecasting for the National SOC Node.',
  openGraph: {
    title: 'CyberDrishti',
    description: 'AI-Based Network Attack Forecasting',
    type: 'website',
    images: [{ url: '/og.png', width: 1672, height: 939, alt: 'CyberDrishti — AI-Based Network Attack Forecasting' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CyberDrishti',
    description: 'AI-Based Network Attack Forecasting',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
