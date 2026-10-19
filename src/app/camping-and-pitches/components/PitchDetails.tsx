'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig } from '@/config/site';

export default function PitchDetails() {
  const { t } = useTranslation();
  const p = siteConfig.pitch;
  const tbc = t('pitches.tbc');

  const rows = [
    { icon: 'Squares2X2Icon', label: t('pitches.count'), value: p.count !== null ? String(p.count) : tbc },
    { icon: 'ArrowsPointingOutIcon', label: t('pitches.dimensions'), value: p.dimensions ?? tbc },
    {
      icon: 'WrenchScrewdriverIcon',
      label: t('pitches.equipment'),
      value: p.equipment.length > 0 ? p.equipment.join(', ') : tbc,
    },
    { icon: 'BanknotesIcon', label: t('pitches.rates'), value: p.rates ?? tbc },
    { icon: 'CalendarDaysIcon', label: t('pitches.season'), value: p.season ?? tbc },
  ];

  return (
    <section className="bg-background pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ul className="divide-y divide-border rounded-[2rem] border border-border bg-card">
            {rows.map((r, i) => (
              <li key={r.label}>
                <Reveal delay={i * 80}>
                  <div className="flex items-start gap-5 p-6 md:p-8">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon name={r.icon as 'Squares2X2Icon'} size={24} />
                    </span>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {r.label}
                      </h3>
                      <p className="font-display mt-1 text-2xl text-primary">{r.value}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={150} className="lg:col-span-5">
          <aside className="flex h-full flex-col justify-between gap-8 rounded-[2rem] bg-primary p-8 grain md:p-10 lg:sticky lg:top-28">
            <div>
              <Icon name="InformationCircleIcon" size={30} className="text-accent" />
              <h2 className="font-display mt-5 text-3xl text-primary-foreground">{t('pitches.noticeTitle')}</h2>
              <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">{t('pitches.noticeBody')}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              {t('cta.availability')}
            </Link>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}