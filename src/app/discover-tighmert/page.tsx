import React from 'react';
import type { Metadata } from 'next';
import DiscoverClient from './components/DiscoverClient';

export const metadata: Metadata = {
  title: 'Découvrir Tighmert — Camping de Oasis, Guelmim',
  description:
    'Tighmert, village d’oasis de la région de Guelmim : environnement, localisation et accès au Camping de Oasis.',
  alternates: { canonical: '/discover-tighmert' },
};

export default function DiscoverTighmertPage() {
  return <DiscoverClient />;
}