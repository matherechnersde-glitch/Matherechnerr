import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import PythagorasCalculator from '@/components/PythagorasCalculator';
import { content } from '@/content/de';

const title = 'Pythagoras Rechner: Die fehlende Seite im rechtwinkligen Dreieck';
const metaTitle = 'Pythagoras Rechner: Hypotenuse & Kathete berechnen';
const description = 'Pythagoras Rechner für rechtwinklige Dreiecke: fehlende Hypotenuse oder Kathete mit a² + b² = c² berechnen, inklusive Beispielen, Tripeln und Rechenweg.';
const updated = '2026-09-14T23:59:59+05:00';
const canonical = '/pythagoras-rechner/';
const image = '/pythagoras-rechner.webp';

const faq = [
  { q: 'Wie lautet der Satz des Pythagoras?', a: 'In einem rechtwinkligen Dreieck gilt a² + b² = c². Das Quadrat der Hypotenuse ist gleich der Summe der Quadrate der beiden Katheten.' },
  { q: 'Wie berechne ich die Hypotenuse?', a: 'Mit c = √(a² + b²). Du quadrierst beide Katheten, addierst sie und ziehst die Wurzel.' },
  { q: 'Wie berechne ich eine fehlende Kathete?', a: 'Mit a = √(c² − b²) beziehungsweise b = √(c² − a²). Das Quadrat der bekannten Kathete wird vom Quadrat der Hypotenuse abgezogen.' },
  { q: 'Gilt der Satz für jedes Dreieck?', a: 'Nein. Er gilt nur für rechtwinklige Dreiecke. Ohne einen rechten Winkel führt die Formel zu falschen Werten.' },
  { q: 'Was sind Pythagoras-Tripel?', a: 'Das sind Kombinationen ganzer Zahlen, welche die Gleichung exakt erfüllen, zum Beispiel 3, 4 und 5.' },
  { q: 'Muss ich auf die Einheiten achten?', a: 'Ja. Alle Seiten müssen vor der Berechnung in derselben Einheit vorliegen.' },
  { q: 'Woher kommt der Satz des Pythagoras?', a: 'Er ist nach dem griechischen Gelehrten Pythagoras benannt. Der Zusammenhang war allerdings schon früheren Kulturen wie den Babyloniern bekannt.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description,
  alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title: metaTitle, description, images: [{ url: image, width: 1200, height: 630, alt: 'Pythagoras Rechner für Hypotenuse und Katheten' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function PythagorasRechnerPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: metaTitle, name: title, description, url: pageUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }, image: `${content.site.url}${image}`, author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, datePublished: updated, dateModified: updated, inLanguage: 'de-DE' },
    { '@type': 'WebApplication', name: 'Pythagoras Rechner', url: pageUrl, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description, image: `${content.site.url}${image}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, featureList: ['Hypotenuse berechnen', 'Kathete berechnen', 'Rechenweg anzeigen'], datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` }, { '@type': 'ListItem', position: 3, name: 'Pythagoras Rechner', item: pageUrl }] },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section pythagoras-hero"><div className="page-shell"><h1>{title}</h1><PythagorasCalculator /></div></section>

      <ContentSection h2="Pythagoras im rechtwinkligen Dreieck">
        <p>Eine Leiter lehnt an der Wand. Ihr Fuß steht anderthalb Meter entfernt, oben berührt sie die Wand in zwei Metern Höhe. Wie lang ist die Leiter? Die Frage wirkt beiläufig, doch sie ist reinster Pythagoras. Überall dort, wo ein rechter Winkel im Spiel ist, lässt sich eine fehlende Länge aus den beiden anderen bestimmen. Genau das ist die Idee hinter dem Satz, und genau das rechnet ein Pythagoras Rechner für dich aus.</p>
      </ContentSection>

      <ContentSection soft h2="Die Formel a² + b² = c²">
        <p>Der Satz des Pythagoras verbindet die drei Seiten eines rechtwinkligen Dreiecks in einer einzigen Gleichung:</p>
        <p className="article-formula">a² + b² = c²</p>
        <p>Das Quadrat der längsten Seite ist genauso groß wie die Summe der Quadrate der beiden kürzeren Seiten. Wichtig ist die Bedingung: Der Satz gilt ausschließlich für Dreiecke mit einem rechten Winkel von 90 Grad. Fehlt dieser Winkel, ist die Formel schlicht nicht anwendbar.</p>
        <p>Zurück zur Leiter: Die beiden kurzen Seiten sind 1,5 und 2 Meter. Also ist die Leiter gleich der Wurzel aus 1,5² plus 2², das sind 2,25 plus 4 gleich 6,25, und die Wurzel daraus ist 2,5. Die Leiter ist 2,5 Meter lang.</p>
        <Image className="article-featured-image" src={image} alt="Pythagoras Rechner für ein rechtwinkliges Dreieck mit Katheten und Hypotenuse" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection h2="Welche Seite ist die Hypotenuse?">
        <p>Bevor du rechnest, musst du die Seiten richtig benennen, sonst stimmt das Ergebnis nicht.</p>
        <ul className="article-list"><li>Die Hypotenuse (c) ist die längste Seite. Sie liegt immer gegenüber dem rechten Winkel.</li><li>Die Katheten (a und b) sind die beiden kürzeren Seiten, die den rechten Winkel einschließen.</li></ul>
        <p>Eine einfache Merkhilfe: Suche zuerst den rechten Winkel. Die Seite, die ihn nicht berührt, ist die Hypotenuse. Verwechselt man Hypotenuse und Kathete, dreht sich die ganze Rechnung, deshalb lohnt dieser kurze Blick.</p>
      </ContentSection>

      <ContentSection soft h2="Fehlende Seite berechnen">
        <p>Je nachdem, welche Seite fehlt, stellt man die Formel um.</p>
        <p>Suchst du die Hypotenuse, gilt c gleich Wurzel aus a² plus b². Ein Beispiel mit den Katheten 3 und 4: Wurzel aus 9 plus 16 gleich Wurzel aus 25 gleich 5.</p>
        <p>Suchst du eine Kathete, ziehst du stattdessen ab. Dann gilt a gleich Wurzel aus c² minus b². Beispiel: Bei einer Hypotenuse von 13 und einer Kathete von 5 ergibt sich Wurzel aus 169 minus 25 gleich Wurzel aus 144 gleich 12.</p>
        <p>Eine schnelle Kontrolle nach jeder Rechnung: Die Hypotenuse muss länger sein als jede einzelne Kathete. Kommt etwas anderes heraus, hast du dich vertan oder die Seiten vertauscht.</p>
      </ContentSection>

      <ContentSection h2="Bekannte Pythagoras-Tripel">
        <p>Manche Dreiecke haben durchweg ganze Zahlen als Seitenlängen. Diese Kombinationen heißen Pythagoras-Tripel, und ein paar davon tauchen in Aufgaben immer wieder auf.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Kathete a</th><th>Kathete b</th><th>Hypotenuse c</th></tr></thead><tbody><tr><td>3</td><td>4</td><td>5</td></tr><tr><td>5</td><td>12</td><td>13</td></tr><tr><td>8</td><td>15</td><td>17</td></tr><tr><td>7</td><td>24</td><td>25</td></tr><tr><td>9</td><td>40</td><td>41</td></tr></tbody></table></div>
        <p>Das bekannteste ist das 3-4-5-Dreieck. Wer diese Tripel im Kopf hat, erkennt viele Aufgaben sofort und kann sein Ergebnis ohne Rechnung grob einschätzen.</p>
      </ContentSection>

      <ContentSection soft h2="Wo Pythagoras im Alltag steckt">
        <p>Der Satz bleibt selten im Klassenzimmer. Handwerker prüfen mit dem 3-4-5-Trick, ob eine Ecke wirklich rechtwinklig ist: Wenn drei und vier Einheiten an den Seiten genau fünf Einheiten über die Diagonale ergeben, stimmt der rechte Winkel. Die Bildschirmdiagonale in Zoll ist nichts anderes als die Hypotenuse aus Breite und Höhe. Ein Monitor, der 60 Zentimeter breit und 34 Zentimeter hoch ist, hat also eine Diagonale von rund 69 Zentimetern. Und in der Navigation entspricht die Luftlinie zwischen zwei Punkten genau dieser Rechnung.</p>
        <p>Sogar in Videospielen steckt der Satz. Der Abstand zwischen zwei Figuren auf dem Bildschirm ergibt sich aus der Wurzel der quadrierten Differenzen ihrer Koordinaten, dem sogenannten euklidischen Abstand. Für all diese Fälle musst du nichts von Hand ausrechnen. Ein Pythagoras Rechner im <Link className="inline-link" href="/">Matherechner</Link> übernimmt das Quadrieren und Wurzelziehen und zeigt dir das Ergebnis samt Rechenweg.</p>
      </ContentSection>

      <ContentSection h2="Ohne rechten Winkel gilt der Satz nicht">
        <p>Dieser Punkt wird oft unterschätzt. Der Satz des Pythagoras funktioniert nur im rechtwinkligen Dreieck. Bei einem beliebigen Dreieck ohne 90-Grad-Winkel liefert a² plus b² gleich c² ein falsches Ergebnis.</p>
        <p>Umgekehrt gilt aber auch etwas Praktisches: Wenn in einem Dreieck a² plus b² genau c² ergibt, dann muss es rechtwinklig sein. Diese Umkehrung ist der Grund, warum der 3-4-5-Trick zum Prüfen von Ecken überhaupt funktioniert.</p>
      </ContentSection>

      <ContentSection soft h2="Typische Fehler">
        <ul className="article-list"><li>Die Hypotenuse als Kathete behandeln oder umgekehrt.</li><li>Beim Suchen einer Kathete addieren statt subtrahieren.</li><li>Das Quadrieren vergessen und einfach die Seiten addieren.</li><li>Unterschiedliche Einheiten mischen, etwa Zentimeter und Meter, ohne sie vorher anzugleichen.</li></ul>
      </ContentSection>

      <ContentSection h2="Häufige Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}