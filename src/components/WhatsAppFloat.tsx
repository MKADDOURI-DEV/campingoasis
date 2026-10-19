'use client';

import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig } from '@/config/site';
import { whatsappUrl } from '@/lib/whatsapp';

export default function WhatsAppFloat() {
  const { t } = useTranslation();
  const url = whatsappUrl('');
  const href = url || '/contact';
  const external = Boolean(siteConfig?.whatsappNumber);

  const cls =
    'fixed bottom-4 z-40 flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 end-4';

  const content = (
    <>
      <Icon name="ChatBubbleLeftRightIcon" size={22} />
      <span className="hidden sm:inline">{t('wa.float')}</span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={t('cta.whatsapp')}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cls} aria-label={t('cta.whatsapp')}>
      {content}
    </Link>
  );
}