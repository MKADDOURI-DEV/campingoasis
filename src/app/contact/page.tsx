import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact et disponibilité — Camping de Oasis, Tighmert',
  description:
    'Demandez une disponibilité au Camping de Oasis à Douar Tighmert, Guelmim, par formulaire ou WhatsApp.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactClient />;
}