'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';
import { photos } from '@/config/site';

export default function DestinationTeaserSection() {
  const { t, locale } = useTranslation();
  const img = photos?.[4];

  return (
    <section className="bg-background pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 className="font-display text-section-xl text-primary">{t('home.destTitle')}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t('home.destLead')}</p>
          <Link
            href="/discover-tighmert"
            className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            {t('home.destMore')}
            <Icon name="ArrowRightIcon" size={16} className="rtl:rotate-180" />
          </Link>
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
          <aside className="flex h-full flex-col justify-between gap-8 rounded-[2rem] border border-border bg-card p-8 lg:sticky lg:top-28">
            <div>
              <h3 className="font-display text-2xl text-primary">{t('home.directTitle')}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t('home.directLead')}</p>
            </div>
            <dl className="space-y-5">
              <div className="flex items-start gap-4">
                <Icon name="MapPinIcon" size={22} className="mt-1 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t('home.metaLocation')}
                  </dt>
                  <dd className="mt-1 text-base text-foreground">{t('footer.address')}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="LanguageIcon" size={22} className="mt-1 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t('home.metaLanguages')}
                  </dt>
                  <dd className="mt-1 text-base text-foreground">{t('home.metaLanguagesValue')}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="ChatBubbleLeftRightIcon" size={22} className="mt-1 shrink-0 text-accent" />
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {t('home.metaBooking')}
                  </dt>
                  <dd className="mt-1 text-base text-foreground">{t('home.metaBookingValue')}</dd>
                </div>
              </div>
            </dl>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}