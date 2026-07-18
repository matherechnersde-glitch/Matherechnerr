import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { content } from '@/content/de';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const { site } = content;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: 'Matherechner – kostenloser wissenschaftlicher Online-Taschenrechner' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [
      { url: '/siteicon.webp', type: 'image/webp' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/siteicon.webp',
    shortcut: '/siteicon.webp',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: site.themeColor,
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: `${site.url}/Matherechnerr-logo.webp`,
    },
    {
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Header content={content.header} />
        {children}
        <Footer content={content.footer} />
      </body>
    </html>
  );
}
