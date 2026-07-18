import type { MetadataRoute } from 'next';
import { content } from '@/content/de';

const BASE = content.site.url;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${BASE}/ueber-uns/`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/kontakt/`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE}/impressum/`,   lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/datenschutz/`, lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${BASE}/agb/`,         lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];
}
