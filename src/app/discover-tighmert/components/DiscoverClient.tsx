'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig, photos } from '@/config/site';

export default function DiscoverClient() {
  const { t, locale } = useTranslation();
  const { lat, lng } = siteConfig?.geo;
  const delta = 0.12;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
  const img = photos?.[2];

  return (
    <>
      <PageHero eyebrow={t('nav.discover')} title={t('discover.title')} lead={t('discover.lead')} />

      <section className="bg-background pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="font-display text-section-xl text-primary">{t('discover.natureTitle')}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {t('discover.natureBody')}
            </p>
            <div className="relative mt-10 h-72 overflow-hidden rounded-t-[10rem] rounded-b-3xl bg-primary md:h-[26rem]">
              <AppImage
                src={img?.src}
                alt={img?.alt?.[locale]}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <aside className="flex h-full flex-col gap-6 lg:sticky lg:top-28">
              <div className="rounded-[2rem] border border-border bg-card p-8">
                <Icon name="MapPinIcon" size={28} className="text-accent" />
                <h3 className="font-display mt-4 text-2xl text-primary">{t('discover.accessTitle')}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {t('discover.accessBody')}
                </p>
              </div>
              <div className="rounded-[2rem] bg-secondary p-8">
                <Icon name="ExclamationTriangleIcon" size={28} className="text-warning" />
                <h3 className="font-display mt-4 text-2xl text-primary">{t('discover.noticeTitle')}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {t('discover.noticeBody')}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary pb-20 pt-14 md:pb-28 md:pt-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <Reveal>
            <h2 className="font-display text-section-xl text-primary">{t('discover.mapTitle')}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {t('discover.mapNote')}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-card">
              <iframe
                title={t('discover.mapTitle')}
                src={mapSrc}
                loading="lazy"
                className="h-[360px] w-full border-0 md:h-[460px]"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}