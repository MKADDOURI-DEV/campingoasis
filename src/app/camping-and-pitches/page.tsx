import React from 'react';
import type { Metadata } from 'next';
import PitchesHeroClient from './components/PitchesHeroClient';
import PitchDetails from './components/PitchDetails';
import PitchGallery from './components/PitchGallery';

export const metadata: Metadata = {
  title: 'Camping et emplacements — Camping de Oasis, Tighmert',
  description:
    'Emplacements pour camping-cars à Douar Tighmert, Guelmim. Détails confirmés par l’établissement ; demandez une disponibilité.',
  alternates: { canonical: '/camping-and-pitches' },
};

export default function CampingAndPitchesPage() {
  return (
    <>
      <PitchesHeroClient />
      <PitchDetails />
      <PitchGallery />
    </>
  );
}