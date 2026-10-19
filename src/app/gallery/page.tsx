import React from 'react';
import type { Metadata } from 'next';
import GalleryClient from './components/GalleryClient';

export const metadata: Metadata = {
  title: 'Galerie — Camping de Oasis, Tighmert',
  description: 'Galerie photo du Camping de Oasis à Douar Tighmert, Guelmim.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return <GalleryClient />;
}