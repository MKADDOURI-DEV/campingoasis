import React from 'react';
import type { Metadata } from 'next';
import PrivacyClient from './components/PrivacyClient';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Camping de Oasis',
  description: 'Comment les informations saisies dans le formulaire du Camping de Oasis sont utilisées.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}