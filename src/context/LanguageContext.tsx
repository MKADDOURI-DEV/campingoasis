'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';

export type Locale = 'fr' | 'en' | 'ar';

const dictionaries = { fr, en, ar } as const;
type Dictionary = typeof fr;

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  setLocale: (l: Locale) => void;
  t: (path: string) => string;
  raw: (path: string) => unknown;
  dict: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function resolve(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');

  useEffect(() => {
    const saved = window.localStorage.getItem('oasis-locale') as Locale | null;
    if (saved && ['fr', 'en', 'ar'].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.title = (dictionaries[locale] as Dictionary).meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', (dictionaries[locale] as Dictionary).meta.description);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem('oasis-locale', l);
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const dict = dictionaries[locale] as Dictionary;
    return {
      locale,
      dir: locale === 'ar' ? 'rtl' : 'ltr',
      setLocale,
      dict,
      t: (path: string) => {
        const v = resolve(dict, path);
        return typeof v === 'string' ? v : path;
      },
      raw: (path: string) => resolve(dict, path),
    };
  }, [locale, setLocale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useTranslation must be used within LanguageProvider');
  return ctx;
}