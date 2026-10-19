'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { useTranslation } from '@/context/LanguageContext';

interface Section {
  h: string;
  p: string;
}

export default function PrivacyClient() {
  const { t, raw } = useTranslation();
  const sections = raw('privacy.sections') as Section[];

  return (
    <>
      <PageHero title={t('privacy.title')} lead={t('privacy.updated')} />
      <section className="bg-background pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="space-y-10">
            {sections.map((s) => (
              <article key={s.h}>
                <h2 className="font-display text-2xl text-primary">{s.h}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}