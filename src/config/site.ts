export const siteConfig = {
  name: 'Camping de Oasis',
  shortName: 'Oasis',
  tagline: 'Douar Tighmert · Guelmim',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  address: 'Douar Tighmert, Aït Messaoud, Asrir, Guelmim, Maroc',
  // Replace in .env.local before publishing. Never shown publicly while empty.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '',
  phone: process.env.NEXT_PUBLIC_PHONE || '',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  // Approximate regional coordinates, to be verified with the client.
  geo: { lat: 29.1167, lng: -9.9667, verified: false },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM || '',
  },
  // Pitch data: leave null until confirmed by the client.
  pitch: {
    count: null as number | null,
    dimensions: null as string | null,
    equipment: [] as string[],
    rates: null as string | null,
    season: null as string | null,
  },
} as const;

export type Locale = 'fr' | 'en' | 'ar';
export const locales: Locale[] = ['fr', 'en', 'ar'];
export const defaultLocale: Locale = 'fr';

// Demo images only. Replace with the client's own photographs.
export const photos = [
  {
    id: 'p1',
    src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Tente éclairée au crépuscule dans un paysage ouvert', en: 'Illuminated tent at dusk in an open landscape', ar: 'خيمة مضاءة عند الغسق في منظر طبيعي مفتوح' },
    category: 'environment',
  },
  {
    id: 'p2',
    src: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Camping-car stationné face à un paysage dégagé', en: 'Motorhome parked facing an open landscape', ar: 'كرافان متوقف أمام منظر طبيعي مفتوح' },
    category: 'pitches',
  },
  {
    id: 'p3',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Route traversant un paysage de désert au coucher du soleil', en: 'Road crossing a desert landscape at sunset', ar: 'طريق يعبر منظرا صحراويا عند الغروب' },
    category: 'environment',
  },
  {
    id: 'p4',
    src: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Feu de camp en soirée', en: 'Campfire in the evening', ar: 'نار مخيم في المساء' },
    category: 'facilities',
  },
  {
    id: 'p5',
    src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Palmiers et lumière dorée', en: 'Palm trees in golden light', ar: 'نخيل وضوء ذهبي' },
    category: 'environment',
  },
  {
    id: 'p6',
    src: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?auto=format&fit=crop&w=1400&q=80',
    alt: { fr: 'Emplacement de camping dégagé en plein air', en: 'Open-air camping spot', ar: 'مكان تخييم مفتوح في الهواء الطلق' },
    category: 'pitches',
  },
] as const;

export const heroImage =
  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2000&q=80';