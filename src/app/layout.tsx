import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Camping de Oasis — Camping-cars à Tighmert, Guelmim',
  description:
    'Camping de Oasis à Douar Tighmert, Guelmim : emplacements pour camping-cars et campeurs. Demandez une disponibilité par formulaire ou WhatsApp.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Camping de Oasis — Tighmert, Guelmim',
    description: 'Emplacements pour camping-cars à Douar Tighmert.',
    images: ['/assets/images/app_logo.png'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </LanguageProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fcampingoas1824back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.21" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.3" /></body>
    </html>
  );
}