'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useTranslation } from '@/context/LanguageContext';
import { heroImage } from '@/config/site';

export default function HeroSection() {
  const { t } = useTranslation();
  const bgRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let mx = 0;
    let my = 0;
    let sy = 0;

    const apply = () => {
      raf = 0;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(${mx * -10}px, ${sy * 0.3 + my * -8}px, 0) scale(1.08)`;
      }
      if (blobARef.current) {
        blobARef.current.style.transform = `translate3d(${mx * 30}px, ${sy * 0.5 + my * 22}px, 0)`;
      }
      if (blobBRef.current) {
        blobBRef.current.style.transform = `translate3d(${mx * -24}px, ${sy * 0.2 + my * -18}px, 0)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      schedule();
    };
    const onScroll = () => {
      sy = Math.min(window.scrollY, 700);
      schedule();
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-foreground grain">
      <div ref={bgRef} className="absolute inset-0 -z-20 will-change-transform">
        <AppImage
          src={heroImage}
          alt="Palmeraie et paysage d'oasis au crépuscule"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="bg-hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
      <div
        ref={blobARef}
        className="blob-sand animate-drift absolute -top-24 start-[-5rem] -z-10 h-96 w-96 opacity-40 will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={blobBRef}
        className="blob-green animate-drift absolute bottom-[-6rem] end-[-4rem] -z-10 h-[28rem] w-[28rem] opacity-60 will-change-transform"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-4 pb-16 pt-36 md:px-8 md:pb-24"
      >
        <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-background/30 bg-background/10 px-4 py-2 text-sm font-semibold text-background backdrop-blur-md">
          <Icon name="MapPinIcon" size={16} />
          {t('home.eyebrow')}
        </p>
        <h1 className="font-display text-hero-xl max-w-5xl text-background">{t('home.title')}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-background/85 md:text-xl">
          {t('home.subtitle')}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/camping-and-pitches"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            {t('cta.discover')}
            <Icon name="ArrowDownIcon" size={18} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-background/50 bg-background/10 px-8 text-base font-semibold text-background backdrop-blur-md transition-colors hover:bg-background/20"
          >
            {t('cta.availability')}
          </Link>
        </div>
      </div>
    </section>
  );
}