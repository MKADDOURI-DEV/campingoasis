'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig } from '@/config/site';

/*
 * BENTO GRID AUDIT
 * STEP 1 — Array has 4 cards: [Intro, Capacity, Rates, Notice]
 * STEP 2 — Cell map (lg: 3 cols):
 *   Row 1: [col-1: Intro cs-2 rs-2] [col-2: Intro (span)] [col-3: Capacity cs-1]
 *   Row 2: [col-1: Intro (rowspan)] [col-2: Intro (span)] [col-3: Rates cs-1]
 *   Row 3: [col-1: Notice cs-3 full]
 * STEP 3 — Placed 4/4 cards ✓
 *  md (2 cols): Intro cs-2 | Capacity, Rates | Notice cs-2  → 4/4 ✓
 *  sm (1 col): all stacked → 4/4 ✓
 */
export default function PitchBentoSection() {
  const { t } = useTranslation();
  const pitch = siteConfig?.pitch;
  const tbc = t('pitches.tbc');

  return (
    <section className="relative bg-background pb-16 pt-14 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
          {/* Intro: col-span-2 row-span-2 on lg */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-primary p-8 grain md:p-12">
              <div className="blob-sand animate-drift absolute -end-16 -top-16 h-72 w-72 opacity-40" aria-hidden="true" />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon name="TruckIcon" size={26} />
                </span>
                <h2 className="font-display text-section-xl mt-8 max-w-xl text-primary-foreground">
                  {t('home.pitchTitle')}
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-primary-foreground/80">
                  {t('home.pitchLead')}
                </p>
              </div>
              <Link
                href="/camping-and-pitches"
                className="relative mt-10 inline-flex min-h-[48px] w-fit items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
              >
                {t('nav.pitches')}
                <Icon name="ArrowRightIcon" size={16} className="rtl:rotate-180" />
              </Link>
            </div>
          </Reveal>

          {/* Capacity */}
          <Reveal delay={100} className="lg:col-span-1">
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[2rem] border border-border bg-card p-8 text-card-foreground">
              <Icon name="Squares2X2Icon" size={28} className="text-primary" />
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  {t('pitches.count')}
                </p>
                <p className="font-display mt-2 text-3xl text-primary">
                  {pitch?.count !== null ? pitch?.count : tbc}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Rates */}
          <Reveal delay={200} className="lg:col-span-1">
            <div className="flex h-full min-h-[200px] flex-col justify-between rounded-[2rem] bg-accent p-8 text-accent-foreground">
              <Icon name="BanknotesIcon" size={28} />
              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-widest opacity-80">
                  {t('pitches.rates')}
                </p>
                <p className="font-display mt-2 text-3xl">{pitch?.rates ?? tbc}</p>
              </div>
            </div>
          </Reveal>

          {/* Notice: full row */}
          <Reveal delay={150} className="md:col-span-2 lg:col-span-3">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-secondary p-8 text-secondary-foreground md:flex-row md:items-center md:p-10">
              <div className="flex items-start gap-4">
                <Icon name="InformationCircleIcon" size={28} className="mt-1 shrink-0" />
                <div>
                  <h3 className="font-display text-2xl">{t('pitches.noticeTitle')}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {t('pitches.noticeBody')}
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                {t('cta.availability')}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}