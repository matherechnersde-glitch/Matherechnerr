import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ratgeber, Erklärungen und praktische Rechner rund um Mathematik, Prozentrechnung und den Alltag.',
  alternates: { canonical: '/blog/' },
  openGraph: { url: '/blog/', title: 'Matherechner Blog', description: 'Ratgeber und praktische Rechner rund um Mathematik und Prozentrechnung.' },
};

export default function BlogPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Matherechner Blog', url: `${content.site.url}/blog/`, datePublished: '2026-08-28T23:59:59+05:00', dateModified: '2026-08-28T23:59:59+05:00' };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><main>
    <section className="hero-section blog-hero"><div className="page-shell"><h1>Matherechner Blog</h1><p className="blog-lead">Praktische Rechner, verständliche Formeln und hilfreiche Erklärungen für Schule, Beruf und Alltag.</p></div></section>
    <section className="content-section"><div className="blog-grid">
      <article className="blog-card"><Link className="blog-card-image" href="/prozentrechner/"><Image src="/Prozentrechner.webp" alt="Prozentrechner Online" width={1200} height={630} sizes="(max-width: 620px) calc(100vw - 40px), 560px" /></Link><div className="blog-card-body"><span className="blog-card-category">Rechner</span><h2><Link href="/prozentrechner/">Prozentrechner Online 2026</Link></h2><p>Berechnen Sie Prozentwerte, prozentuale Veränderungen, Rabatte und Prozentsätze schnell und nachvollziehbar.</p><Link className="blog-card-link" href="/prozentrechner/">Zum Prozentrechner <span aria-hidden="true">→</span></Link></div></article>
      <article className="blog-card"><Link className="blog-card-image" href="/matherechner-pi/"><Image src="/matherechner-pi.webp" alt="Matherechner Pi – mit der Kreiszahl rechnen" width={1672} height={941} sizes="(max-width: 620px) calc(100vw - 40px), 560px" /></Link><div className="blog-card-body"><span className="blog-card-category">Ratgeber</span><h2><Link href="/matherechner-pi/">Matherechner Pi 2026</Link></h2><p>So verwendest du Pi für Kreisflächen, Kugeln, Zylinder und Winkel – mit Beispielen, Formeln und den richtigen Eingaben.</p><Link className="blog-card-link" href="/matherechner-pi/">Zum Pi-Ratgeber <span aria-hidden="true">→</span></Link></div></article>
      <article className="blog-card"><Link className="blog-card-image" href="/matherechner-modulo/"><Image src="/matherechner-modulo.webp" alt="Matherechner Modulo – den Divisionsrest berechnen" width={1200} height={630} sizes="(max-width: 620px) calc(100vw - 40px), 560px" /></Link><div className="blog-card-body"><span className="blog-card-category">Rechner</span><h2><Link href="/matherechner-modulo/">Matherechner Modulo 2026</Link></h2><p>Berechne den Rest einer Division und erfahre, wie Modulo bei Uhrzeiten, Teilbarkeit und in der Programmierung funktioniert.</p><Link className="blog-card-link" href="/matherechner-modulo/">Zum Modulo-Rechner <span aria-hidden="true">→</span></Link></div></article>    </div></section>
  </main></>;
}
