'use client';

import React from 'react';
import PageHero from '@/components/PageHero';
import { useTranslation } from '@/context/LanguageContext';

export default function PitchesHeroClient() {
  const { t } = useTranslation();
  return <PageHero eyebrow={t('nav.pitches')} title={t('pitches.title')} lead={t('pitches.lead')} />;
}