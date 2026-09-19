import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import ScaleCalculator from '@/components/ScaleCalculator';
import { content } from '@/content/de';

const title = 'Maßstabsrechner: Maßstab berechnen und umrechnen';
const description = 'Maßstabsrechner: Maßstab berechnen und umrechnen: für Plan, Karte und Modellbau mit automatischer Einheitenumrechnung und verständlichem Rechenweg.';
const updated = '2026-09-20T23:59:59+05:00';
const canonical = '/massstabsrechner/';
const image = '/Maßstabsrechner.webp';

const faq = [
  { q: 'Was bedeutet der Maßstab 1:1000?', a: 'Die Darstellung ist 1000-mal kleiner als die Wirklichkeit. Ein Zentimeter auf dem Plan entspricht 10 Metern, ein Millimeter genau einem Meter.' },
  { q: 'Wie rechne ich vom Plan in die Wirklichkeit?', a: 'Du multiplizierst die gemessene Planlänge mit der Maßstabszahl. Die Einheiten müssen anschließend passend umgerechnet werden.' },
  { q: 'Wie bestimme ich den Maßstab aus zwei Längen?', a: 'Teile die reale Länge durch die Planlänge. Beide Längen müssen dafür zunächst in dieselbe Einheit umgerechnet werden.' },
  { q: 'Welcher Maßstab gilt für einen Bauantrag?', a: 'Grundrisse liegen häufig bei 1:100 oder 1:50, Lagepläne bei 1:500 oder 1:1000. Maßgeblich ist die Vorgabe der zuständigen Behörde.' },
  { q: 'Muss ich die Einheiten vorher angleichen?', a: 'Bei einer Handrechnung ja. Der Maßstabsrechner gleicht Millimeter, Zentimeter, Meter und Kilometer automatisch an.' },
  { q: 'Warum skalieren Flächen anders?', a: 'Flächen skalieren mit dem Quadrat der Maßstabszahl. Bei 1:100 ist die reale Fläche daher 10.000-mal so groß wie die Planfläche.' },
];

export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title, description, images: [{ url: image, width: 1200, height: 630, alt: 'Maßstabsrechner für Plan, Karte und Wirklichkeit' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

export default function MassstabsrechnerPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: title, name: title, description, url: pageUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }, image: `${content.site.url}${image}`, author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, datePublished: updated, dateModified: updated, inLanguage: 'de-DE' },
    { '@type': 'WebApplication', name: 'Maßstabsrechner', url: pageUrl, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description, image: `${content.site.url}${image}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, featureList: ['Reale Länge berechnen', 'Planlänge berechnen', 'Maßstab bestimmen', 'Einheiten automatisch umrechnen'], datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` }, { '@type': 'ListItem', position: 3, name: 'Maßstabsrechner', item: pageUrl }] },
  ] };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><main>
    <section className="hero-section scale-hero"><div className="page-shell"><h1>{title}</h1><ScaleCalculator /></div></section>
    <ContentSection h2="Was ein Maßstab bedeutet"><p>Auf jedem Bauplan, jeder Wanderkarte und jedem Modellbausatz steht eine kleine Zahlenkombination wie 1:1000 oder 1:87. Sie entscheidet darüber, wie groß etwas in Wirklichkeit ist, und trotzdem stolpern viele bei der Umrechnung. Dabei steckt hinter dem Maßstab nur eine einzige, sehr logische Idee.</p><p>Dieser Ratgeber erklärt, was die Zahl bedeutet, mit welchen drei Rechenwegen du jede Aufgabe löst und welcher Maßstab wofür gebraucht wird.</p><p>Ein Maßstab beschreibt das Verhältnis zwischen einer Zeichnung und der Wirklichkeit. Steht dort 1:1000, ist die Darstellung tausendmal kleiner als das echte Objekt. Ein Zentimeter auf dem Plan entspricht also 1000 Zentimetern in der Realität, das sind 10 Meter.</p><p>Die zweite Zahl, die Maßstabszahl, ist der Schlüssel zu allem. Sie sagt dir, mit welchem Faktor du umrechnest. Wichtig ist dabei nur eine Regel: Auf beiden Seiten der Rechnung muss dieselbe Einheit stehen. Der Maßstab selbst ist einheitenunabhängig, das Verhältnis gilt in Zentimetern genauso wie in Zoll.</p><Image className="article-featured-image" src={image} alt="Maßstabsrechner für Planlänge, reale Länge und Maßstab" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" /></ContentSection>
    <ContentSection soft h2="Die drei Rechenwege"><p>Fast jede Aufgabe lässt sich mit einer von drei Formeln lösen. Welche du brauchst, hängt davon ab, was du schon weißt.</p><ul className="article-list"><li>Von der Zeichnung zur Wirklichkeit: reale Länge gleich Planlänge mal Maßstabszahl.</li><li>Von der Wirklichkeit zur Zeichnung: Planlänge gleich reale Länge geteilt durch die Maßstabszahl.</li><li>Den Maßstab bestimmen: Maßstabszahl gleich reale Länge geteilt durch Planlänge, beide in derselben Einheit.</li></ul><p>Diese drei Wege decken alles ab, vom Architekturplan bis zur Modellbahn. Wer nicht jedes Mal von Hand umrechnen möchte, gibt zwei Werte in den <Link className="inline-link" href="/">Matherechner</Link> ein und liest den dritten sofort ab.</p></ContentSection>
    <ContentSection h2="Beispiel: Maßstab 1:1000"><p>Nimm eine Straße, die in Wirklichkeit 80 Meter lang ist. Auf einem Plan im Maßstab 1:1000 zeichnest du sie mit 80 Meter geteilt durch 1000, also 8 Zentimeter. Umgekehrt gilt: Misst eine Strecke auf demselben Plan 4 Zentimeter, sind das in echt 40 Meter.</p><p>Bei 1:1000 gilt die praktische Faustregel: Ein Millimeter auf dem Plan ist genau ein Meter in der Wirklichkeit.</p><div className="article-table-wrap"><table className="article-table"><thead><tr><th>Länge auf dem Plan</th><th>Reale Länge</th></tr></thead><tbody><tr><td>1 mm</td><td>1 m</td></tr><tr><td>1 cm</td><td>10 m</td></tr><tr><td>5 cm</td><td>50 m</td></tr><tr><td>10 cm</td><td>100 m</td></tr><tr><td>100 cm</td><td>1 km</td></tr></tbody></table></div></ContentSection>
    <ContentSection soft h2="Gebräuchliche Maßstäbe im Überblick"><p>Welcher Maßstab passt, hängt vom Zweck ab. Für ein winziges Bauteil brauchst du einen anderen als für eine Landkarte.</p><div className="article-table-wrap"><table className="article-table"><thead><tr><th>Maßstab</th><th>1 cm entspricht</th><th>Typische Anwendung</th></tr></thead><tbody><tr><td>1:20</td><td>20 cm</td><td>Detailzeichnungen</td></tr><tr><td>1:50</td><td>50 cm</td><td>Grundrisse</td></tr><tr><td>1:100</td><td>1 m</td><td>Entwurf und Bauantrag</td></tr><tr><td>1:500</td><td>5 m</td><td>Lageplan</td></tr><tr><td>1:1000</td><td>10 m</td><td>Stadtplanung</td></tr><tr><td>1:25 000</td><td>250 m</td><td>Wanderkarte</td></tr><tr><td>1:50 000</td><td>500 m</td><td>Radwanderkarte</td></tr><tr><td>1:100 000</td><td>1 km</td><td>Autokarte</td></tr></tbody></table></div><p>Im Modellbau begegnen dir Werte wie 1:87 für die Modellbahn H0 oder 1:24 bei Sammlerautos. Das Prinzip bleibt identisch.</p></ContentSection>
    <ContentSection h2="Verkleinern oder vergrößern"><p>Die meisten Maßstäbe verkleinern, weil Gebäude und Landschaften größer sind als das Papier. Bei winzigen Bauteilen wird dagegen vergrößert, etwa mit 2:1 oder 5:1. Ein Maßstab von 5:1 bedeutet, dass die Zeichnung fünfmal größer ist als das echte Objekt. Solche Vergrößerungen sind vor allem im Maschinenbau und in der Feinmechanik üblich.</p></ContentSection>
    <ContentSection soft h2="Warum Flächen anders skalieren"><p>Flächen und Volumen verändern sich nicht im gleichen Verhältnis wie Längen. Halbierst du eine Länge, viertelt sich die Fläche. Für Flächen gilt das Quadrat der Maßstabszahl: Bei 1:100 ist eine Länge 100-mal kleiner, die Fläche aber 10.000-mal. Beim Volumen kommt die dritte Potenz ins Spiel.</p></ContentSection>
    <ContentSection h2="Vorsicht beim Ausdrucken"><p>Ein numerischer Maßstab wie 1:1000 stimmt nur bei der Originalgröße des Plans. Wird die Zeichnung verkleinert oder vergrößert ausgedruckt, passt das Verhältnis nicht mehr. Ein grafischer Maßstabsbalken verändert sich beim Skalieren automatisch mit und bleibt deshalb korrekt.</p></ContentSection>
    <ContentSection soft h2="Häufige Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
  </main></>;
}
