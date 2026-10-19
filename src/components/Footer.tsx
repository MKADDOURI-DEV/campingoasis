'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useTranslation } from '@/context/LanguageContext';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const { t } = useTranslation();
  const [year, setYear] = React.useState('');
  React.useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  const groupA = [
    { href: '/', key: 'nav.home' },
    { href: '/camping-and-pitches', key: 'nav.pitches' },
    { href: '/gallery', key: 'nav.gallery' },
  ];
  const groupB = [
    { href: '/discover-tighmert', key: 'nav.discover' },
    { href: '/contact', key: 'nav.contact' },
    { href: '/privacy-policy', key: 'footer.privacy' },
  ];

  const linkCls =
    'inline-flex min-h-[44px] items-center text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground';

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <AppLogo size={40} />
              <span className="font-display text-lg text-primary">Camping de Oasis</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {t('footer.address')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-2">
            <ul className="flex flex-col">
              {groupA?.map((l) => (
                <li key={l?.href}>
                  <Link href={l?.href} className={linkCls}>
                    {t(l?.key)}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col">
              {groupB?.map((l) => (
                <li key={l?.href}>
                  <Link href={l?.href} className={linkCls}>
                    {t(l?.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-[15px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig?.name}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            {siteConfig?.social?.facebook && (
              <a href={siteConfig?.social?.facebook} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Facebook
              </a>
            )}
            {siteConfig?.social?.instagram && (
              <a href={siteConfig?.social?.instagram} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Instagram
              </a>
            )}
            <Link href="/privacy-policy" className={linkCls}>
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}