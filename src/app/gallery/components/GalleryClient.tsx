'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import PageHero from '@/components/PageHero';
import { useTranslation } from '@/context/LanguageContext';
import { photos } from '@/config/site';

type Filter = 'all' | 'pitches' | 'environment' | 'facilities';

/*
 * GRID AUDIT (masonry via CSS columns — no explicit cells, no grid spans)
 * Cards: 6 (filtered). Columns flow automatically, no empty cells possible.
 */
export default function GalleryClient() {
  const { t, locale, dir } = useTranslation();
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const list = photos.filter((p) => filter === 'all' || p.category === filter);

  const open = (i: number, el: HTMLElement) => {
    lastFocus.current = el;
    setActive(i);
  };
  const close = useCallback(() => {
    setActive(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => {
      setActive((cur) => (cur === null ? cur : (cur + d + list.length) % list.length));
    },
    [list.length]
  );

  useEffect(() => {
    if (active === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(dir === 'rtl' ? -1 : 1);
      if (e.key === 'ArrowLeft') step(dir === 'rtl' ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, close, step, dir]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('gallery.all') },
    { key: 'pitches', label: t('gallery.pitches') },
    { key: 'environment', label: t('gallery.environment') },
    { key: 'facilities', label: t('gallery.facilities') },
  ];

  const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80'];
  const current = active !== null ? list[active] : null;

  return (
    <>
      <PageHero eyebrow={t('nav.gallery')} title={t('gallery.title')} lead={t('gallery.lead')} />
      <section className="bg-background pb-20 pt-10 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div role="group" aria-label={t('gallery.title')} className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                  className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors ${
                    filter === f.key
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-card text-primary hover:bg-secondary'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">{t('gallery.note')}</p>
          </div>

          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {list.map((p, i) => (
              <li key={p.id} className="mb-4 break-inside-avoid">
                <button
                  type="button"
                  onClick={(e) => open(i, e.currentTarget)}
                  aria-label={`${t('gallery.open')}: ${p.alt[locale]}`}
                  className="group relative block w-full overflow-hidden rounded-3xl bg-primary"
                >
                  <div className={`relative w-full ${heights[i % heights.length]}`}>
                    <AppImage
                      src={p.src}
                      alt={p.alt[locale]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt[locale]}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/95 p-4"
          onClick={close}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t('gallery.close')}
            className="absolute end-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-background text-primary"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label={t('gallery.prev')}
            className="absolute start-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background text-primary"
          >
            <Icon name="ChevronLeftIcon" size={24} className="rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label={t('gallery.next')}
            className="absolute end-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-background text-primary"
          >
            <Icon name="ChevronRightIcon" size={24} className="rtl:rotate-180" />
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <AppImage
              src={current.src}
              alt={current.alt[locale]}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}