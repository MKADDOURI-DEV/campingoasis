import type { MetadataRoute } from 'next';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: '', priority: 1.0 },
    { path: '/camping-and-pitches', priority: 0.8 },
    { path: '/gallery', priority: 0.8 },
    { path: '/discover-tighmert', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy-policy', priority: 0.3 },
  ];
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    priority: r.priority,
  }));
}