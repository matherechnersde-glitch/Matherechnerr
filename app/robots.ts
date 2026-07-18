import type { MetadataRoute } from 'next';
import { content } from '@/content/de';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${content.site.url}/sitemap.xml`,
  };
}
