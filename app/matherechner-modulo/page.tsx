import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import ModuloCalculator from '@/components/ModuloCalculator';
import { content } from '@/content/de';

const title = 'Matherechner Modulo';
const metaTitle = 'Matherechner Modulo 2026';
const description = 'Mit dem Matherechner Modulo berechnest du den Rest einer Division schnell, korrekt und direkt online – inklusive verständlicher Beispiele.';
const updated = '2026-09-04T23:59:59+05:00';
const canonical = '/matherechner-modulo/';
const image = '/matherechner-modulo.webp';

const faq = [
  { q: 'Was bedeutet Modulo?', a: 'Modulo bezeichnet den Rest, der bei einer ganzzahligen Division übrig bleibt. Bei 17 mod 5 ist das Ergebnis 2.' },
  { q: 'Wie berechnet man Modulo?', a: 'Teile den Dividenden durch den Divisor, verwende den ganzzahligen Quotienten und ziehe dessen Produkt vom Dividenden ab: r = x − y × q.' },
  { q: 'Kann der Divisor null sein?', a: 'Nein. Eine Division durch null und damit auch eine Modulo-Rechnung mit Divisor null ist nicht definiert.' },
  { q: 'Wofür wird Modulo verwendet?', a: 'Modulo wird unter anderem für Uhrzeiten, gerade und ungerade Zahlen, wiederkehrende Abläufe, Prüfziffern und in der Programmierung verwendet.' },
  { q: 'Wie behandelt der Rechner negative Zahlen?', a: 'Der Rechner verwendet den nichtnegativen euklidischen Rest. Er liegt immer zwischen 0 und dem Betrag des Divisors.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description,
  alternates: { canonical },
  openGraph: {
    type: 'article', url: canonical, title: metaTitle, description,
    images: [{ url: image, width: 1200, height: 630, alt: 'Matherechner Modulo – den Rest einer Division berechnen' }],
    publishedTime: updated, modifiedTime: updated,
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function MatherechnerModuloPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    {
      '@type': 'Article', headline: title, name: metaTitle, description, url: pageUrl,
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      image: `${content.site.url}${image}`,
      author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` },
      publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` },
      datePublished: updated, dateModified: updated, inLanguage: 'de-DE',
    },
    {
      '@type': 'WebApplication', name: 'Matherechner Modulo', url: pageUrl,
      applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description,
      image: `${content.site.url}${image}`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      datePublished: updated, dateModified: updated,
    },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
    ] },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section modulo-hero"><div className="page-shell"><h1>{title}</h1><ModuloCalculator /></div></section>

      <ContentSection h2="Was bedeutet Modulo?">
        <p>Bei einer Division geht nicht jede Zahl glatt auf. Teilt man 17 durch 5, passen drei vollständige Fünfer hinein und 2 bleiben übrig. Genau dieser Rest ist das Ergebnis der Modulo-Rechnung: <strong>17 mod 5 = 2</strong>.</p>
        <p>Dieser Rest ist der ganze Trick an der Modulo-Rechnung. Wo du ihn im <Link className="inline-link" href="/">Matherechner</Link> findest, wie du ihn eingibst und warum er von der Uhrzeit bis zur Programmierung überall steckt, klärt dieser Überblick.</p>
        <p>Geschrieben wird das Ganze meist als &quot;17 mod 5&quot; oder kurz mit dem Prozentzeichen-ähnlichen Operator in der Programmierung. Der Begriff geht auf Carl Friedrich Gauß zurück, der ihn 1801 in die Zahlentheorie einführte.</p>
        <Image className="article-featured-image" src={image} alt="Matherechner Modulo mit Dividend, Divisor und Rest" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection soft h2="So benutzt du den Modulo-Rechner">
        <p>Trage bei <strong>x</strong> den Dividenden und bei <strong>y</strong> den Divisor ein. Nach einem Klick auf „Berechnen“ zeigt der Rechner den Rest <strong>r</strong>. Für 29 mod 6 erhältst du 5, weil 29 = 4 × 6 + 5 gilt.</p>
        <ol className="article-list">
          <li>Gib die zu teilende Zahl als Dividend x ein.</li>
          <li>Gib die Zahl, durch die geteilt wird, als Divisor y ein.</li>
          <li>Lass den Rest berechnen und prüfe ihn an der dargestellten Gleichung.</li>
        </ol>
      </ContentSection>

      <ContentSection h2="Die Modulo-Formel einfach erklärt">
        <p>Die Grundform lautet <strong>x = q × y + r</strong>. Dabei ist x der Dividend, y der Divisor, q der ganzzahlige Quotient und r der Rest. Umgestellt ergibt sich <strong>r = x − q × y</strong>.</p>
        <div className="formula-grid"><div>Division<br/><strong>17 ÷ 5 = 3 Rest 2</strong></div><div>Modulo<br/><strong>17 mod 5 = 2</strong></div><div>Kontrolle<br/><strong>17 = 3 × 5 + 2</strong></div></div>
        <p>Der Rest ist immer kleiner als der Betrag des Divisors. Bei einem positiven Divisor 5 kann der euklidische Rest daher nur 0, 1, 2, 3 oder 4 sein.</p>
      </ContentSection>

      <ContentSection soft h2="Modulo-Beispiele auf einen Blick">
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Rechnung</th><th>Ergebnis</th><th>Warum?</th></tr></thead><tbody>
          <tr><td>10 mod 3</td><td>1</td><td>10 = 3 × 3 + 1</td></tr>
          <tr><td>24 mod 6</td><td>0</td><td>24 ist ohne Rest durch 6 teilbar</td></tr>
          <tr><td>35 mod 8</td><td>3</td><td>35 = 4 × 8 + 3</td></tr>
          <tr><td>7 mod 10</td><td>7</td><td>Der Dividend ist kleiner als der Divisor</td></tr>
          <tr><td>101 mod 2</td><td>1</td><td>101 ist ungerade</td></tr>
        </tbody></table></div>
      </ContentSection>

      <ContentSection h2="Modulo bei Uhrzeiten und Wochentagen">
        <p>Eine Uhr wiederholt sich alle 24 Stunden. Deshalb lässt sich eine Uhrzeit mit Modulo in den gültigen Bereich zurückführen. 29 Uhr entspricht <strong>29 mod 24 = 5 Uhr</strong>. Bei einer 12-Stunden-Uhr ergibt 17 mod 12 den Wert 5.</p>
        <p>Dasselbe Prinzip gilt für Wochentage. Nach sieben Tagen beginnt die Folge erneut. Liegt ein Termin zehn Tage nach Montag, sind 10 mod 7 gleich 3 zusätzliche Tage – der Termin fällt auf Donnerstag.</p>
      </ContentSection>

      <ContentSection soft h2="Gerade und ungerade Zahlen prüfen">
        <p>Eine ganze Zahl ist gerade, wenn <strong>n mod 2 = 0</strong> gilt. Ergibt die Rechnung 1, ist die Zahl ungerade. So lassen sich auch sehr große Zahlen sofort einordnen, ohne sie vollständig teilen zu müssen.</p>
        <p>Weitere Teilbarkeiten funktionieren genauso: Ist n mod 3 gleich 0, ist n durch 3 teilbar. Für den Divisor 5 muss n mod 5 den Wert 0 liefern.</p>
      </ContentSection>

      <ContentSection h2="Modulo in der Programmierung">
        <p>In vielen Programmiersprachen steht das Prozentzeichen <code>%</code> für den Restoperator. Damit werden wiederkehrende Abläufe gesteuert, Elemente abwechselnd formatiert oder Werte in einen festen Bereich gebracht.</p>
        <ul className="article-list">
          <li><strong>Zyklen:</strong> Nach dem letzten Element wieder beim ersten beginnen.</li>
          <li><strong>Teilbarkeit:</strong> Gerade, ungerade oder Vielfache erkennen.</li>
          <li><strong>Indizes:</strong> Positionen sicher auf die Länge einer Liste begrenzen.</li>
          <li><strong>Prüfziffern:</strong> Eingaben anhand eines Restwerts kontrollieren.</li>
        </ul>
        <p>Bei negativen Zahlen unterscheiden sich Programmiersprachen teilweise. Dieser Rechner verwendet den nichtnegativen euklidischen Rest, damit das Ergebnis eindeutig zwischen 0 und |y| liegt.</p>
      </ContentSection>

      <ContentSection soft h2="Häufige Fehler bei der Modulo-Rechnung">
        <ul className="article-list">
          <li><strong>Divisor null:</strong> x mod 0 ist nicht definiert.</li>
          <li><strong>Quotient statt Rest:</strong> Bei 17 ÷ 5 ist 3 der Quotient, aber 2 das Modulo-Ergebnis.</li>
          <li><strong>Dividend und Divisor vertauschen:</strong> 17 mod 5 ist 2, während 5 mod 17 gleich 5 ist.</li>
          <li><strong>Negative Werte ungeprüft übernehmen:</strong> Beachte, welche Restdefinition ein Programm verwendet.</li>
        </ul>
      </ContentSection>

      <ContentSection h2="Häufig gestellte Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}
