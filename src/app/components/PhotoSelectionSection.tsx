'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { photos } from '@/config/site';

const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2'];

export default function PhotoSelectionSection() {
  const { t, locale } = useTranslation();
  const selected = photos?.slice(0, 4);

  return (
    <section className="bg-secondary pb-20 pt-14 md:pb-28 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <Reveal>
            <h2 className="font-display text-section-xl max-w-xl text-primary">{t('home.photosTitle')}</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t('home.photosNote')}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {selected?.map((p, i) => (
            <Reveal key={p?.id} delay={i * 120}>
              <Link
                href="/gallery"
                aria-label={t('gallery.open')}
                className={`group relative block overflow-hidden rounded-3xl border-4 border-card shadow-lg transition-transform duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.04] ${tilts?.[i]} ${
                  i % 2 === 1 ? 'md:mt-10' : ''
                }`}
              >
                <div className="relative h-56 w-full overflow-hidden bg-primary md:h-80">
                  <AppImage
                    src={p?.src}
                    alt={p?.alt?.[locale]}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}