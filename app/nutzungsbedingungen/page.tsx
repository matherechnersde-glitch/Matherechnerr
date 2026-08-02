import type { Metadata } from 'next';
import AgbPage from '@/app/agb/page';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen',
  description: 'Lesen Sie die Nutzungsbedingungen für den kostenlosen Online-Taschenrechner Matherechner, einschließlich Leistungsumfang, Haftung und Urheberrecht.',
  alternates: { canonical: '/nutzungsbedingungen/' },
  openGraph: {
    url: '/nutzungsbedingungen/',
    title: 'Nutzungsbedingungen',
    description: 'Bedingungen für die Nutzung des kostenlosen Online-Taschenrechners Matherechner.',
  },
  robots: { index: true, follow: true },
};

export default AgbPage;
