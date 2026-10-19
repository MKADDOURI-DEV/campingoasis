'use client';

import React from 'react';
import AppImage from '@/components/ui/AppImage';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { photos } from '@/config/site';

/*
 * BENTO GRID AUDIT
 * STEP 1 — Array has 3 cards: [photo p2, photo p6, photo p1]
 * STEP 2 — Cell map (md: 3 cols):
 *   Row 1: [col-1: p2 cs-2] [col-2: p2 (span)] [col-3: p6 cs-1]
 *   Row 2: [col-1: p1 cs-3 full]
 * STEP 3 — Placed 3/3 cards ✓ (sm: 1 col stacked → 3/3 ✓)
 */
export default function PitchGallery() {
  const { t, locale } = useTranslation();
  const [a, b, c] = [photos?.[1], photos?.[5], photos?.[0]];

  return (
    <section className="bg-secondary pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="font-display text-section-xl mb-10 text-primary">{t('pitches.galleryTitle')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="relative h-72 overflow-hidden rounded-[2rem] bg-primary md:h-96">
              <AppImage src={a?.src} alt={a?.alt?.[locale]} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-1">
            <div className="relative h-72 overflow-hidden rounded-[2rem] bg-primary md:h-96">
              <AppImage src={b?.src} alt={b?.alt?.[locale]} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-3">
            <div className="relative h-64 overflow-hidden rounded-[2rem] bg-primary md:h-80">
              <AppImage src={c?.src} alt={c?.alt?.[locale]} fill sizes="100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}