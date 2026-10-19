'use client';

import React from 'react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  lead?: string;
}

export default function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary pb-14 pt-32 md:pb-20 md:pt-40 grain">
      <div className="blob-sand animate-drift absolute -top-20 end-0 h-72 w-72 opacity-40" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {eyebrow && (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        <h1 className="font-display text-section-xl max-w-3xl text-primary-foreground">{title}</h1>
        {lead && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{lead}</p>
        )}
      </div>
    </section>
  );
}