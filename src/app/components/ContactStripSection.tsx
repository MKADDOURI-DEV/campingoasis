'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import Reveal from '@/components/Reveal';
import { useTranslation } from '@/context/LanguageContext';

export default function ContactStripSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-background pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 grain md:px-16 md:py-20">
            <div className="blob-sand animate-drift absolute -start-10 -top-10 h-72 w-72 opacity-35" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-section-xl text-primary-foreground">{t('home.ctaTitle')}</h2>
                <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">{t('home.ctaLead')}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
                >
                  {t('cta.availability')}
                  <Icon name="ArrowRightIcon" size={18} className="rtl:rotate-180" />
                </Link>
                <Link
                  href="/contact#whatsapp"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-primary-foreground/40 px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  {t('cta.whatsapp')}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}