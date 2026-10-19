import React from 'react';
import HeroSection from './components/HeroSection';
import PitchBentoSection from './components/PitchBentoSection';
import PhotoSelectionSection from './components/PhotoSelectionSection';
import DestinationTeaserSection from './components/DestinationTeaserSection';
import ContactStripSection from './components/ContactStripSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PitchBentoSection />
      <PhotoSelectionSection />
      <DestinationTeaserSection />
      <ContactStripSection />
    </>
  );
}