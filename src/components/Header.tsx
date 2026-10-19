'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { useTranslation, type Locale } from '@/context/LanguageContext';

const links = [
  { href: '/', key: 'nav.home' },
  { href: '/camping-and-pitches', key: 'nav.pitches' },
  { href: '/gallery', key: 'nav.gallery' },
  { href: '/discover-tighmert', key: 'nav.discover' },
  { href: '/contact', key: 'nav.contact' },
];

const langs: { code: Locale; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (open) setOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === '/' || pathname === '/homepage';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled || open
          ? 'bg-background/90 shadow-sm backdrop-blur-xl'
          : isHome
          ? 'bg-transparent' :'bg-background/70 backdrop-blur-md'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t('common.skip')}
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2" aria-label="Camping de Oasis">
          <AppLogo size={40} />
          <span
            className={`font-display text-lg tracking-tight transition-colors ${
              !scrolled && !open && isHome ? 'text-background' : 'text-primary'
            }`}
          >
            Camping de Oasis
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.href === '/' ? isHome : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? 'bg-accent text-accent-foreground'
                    : !scrolled && isHome
                    ? 'text-background hover:bg-background/15' :'text-primary hover:bg-secondary'
                }`}
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={t('nav.language')}
            className={`flex items-center rounded-full border p-1 ${
              !scrolled && !open && isHome ? 'border-background/40' : 'border-border bg-card'
            }`}
          >
            {langs.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLocale(l.code)}
                aria-pressed={locale === l.code}
                className={`min-h-[36px] min-w-[36px] rounded-full px-2 text-xs font-bold transition-colors ${
                  locale === l.code
                    ? 'bg-primary text-primary-foreground'
                    : !scrolled && !open && isHome
                    ? 'text-background hover:bg-background/15' :'text-primary hover:bg-secondary'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${
              !scrolled && !open && isHome ? 'text-background' : 'text-primary'
            }`}
          >
            <Icon name={open ? 'XMarkIcon' : 'Bars3Icon'} size={26} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background/95 px-4 pb-6 pt-2 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-[48px] items-center border-b border-border/60 py-3 text-base font-semibold text-primary"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 flex min-h-[48px] items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground"
            >
              {t('cta.availability')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}