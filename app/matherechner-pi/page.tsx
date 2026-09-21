import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PiCalculator from '@/components/PiCalculator';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import { content } from '@/content/de';

const title = 'Matherechner Pi: So rechnest du mit der Kreiszahl';
const metaTitle = 'Matherechner Pi 2026';
const description = 'Im Matherechner ist Pi als feste Konstante hinterlegt, du gibst einfach pi ein und rechnest normal weiter.';
const updated = '2026-09-21T23:59:59+05:00';
const canonical = '/matherechner-pi/';
const image = '/matherechner-pi.webp';

const faq = [
  { q: 'Wie gebe ich Pi im Matherechner ein?', a: 'Tippe pi oder benutze die π-Taste. Zwischen Zahl und Pi gehört ein Malzeichen, also zum Beispiel 2*pi.' },
  { q: 'Welchen Wert hat Pi?', a: 'Pi beträgt ungefähr 3,14159. Die Zahl hat unendlich viele Nachkommastellen, der Rechner arbeitet aber automatisch mit hoher Genauigkeit.' },
  { q: 'Warum kommt bei sin(pi) manchmal ein falsches Ergebnis?', a: 'Dann ist wahrscheinlich der falsche Winkelmodus aktiv. Für Pi in Winkelfunktionen solltest du das Bogenmaß (RAD) verwenden.' },
  { q: 'Wie berechne ich die Kreisfläche mit Pi?', a: 'Gib pi*r^2 ein und ersetze r durch deinen Radius. Für Radius 5 verwendest du pi*5^2; das ergibt rund 78,54.' },
  { q: 'Ist es besser, 3,14 oder pi einzugeben?', a: 'Verwende pi. So rechnet der Rechner mit größerer Genauigkeit und rundet erst das Ergebnis.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle },
  description,
  alternates: { canonical },
  openGraph: {
    type: 'article',
    url: canonical,
    title: metaTitle,
    description,
    images: [{ url: image, width: 1672, height: 941, alt: 'Matherechner Pi: mit der Kreiszahl π rechnen' }],
    publishedTime: updated,
    modifiedTime: updated,
  },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function MatherechnerPiPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const imageUrl = `${content.site.url}${image}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: title,
        name: metaTitle,
        description,
        url: pageUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
        image: { '@type': 'ImageObject', url: imageUrl, width: 1672, height: 941 },
        author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` },
        publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` },
        datePublished: updated,
        dateModified: updated,
        inLanguage: 'de-DE',
      },
      {
        '@type': 'WebApplication',
        name: 'Matherechner Pi',
        url: pageUrl,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Any',
        description,
        image: imageUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        datePublished: updated,
        dateModified: updated,
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` },
          { '@type': 'ListItem', position: 3, name: 'Matherechner Pi', item: pageUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section pi-hero">
        <div className="page-shell">
          <h1>{title}</h1>
          <PiCalculator />
        </div>
      </section>

      <ContentSection h2="Pi im Matherechner verwenden">
        <p>Pi taucht in der Schule überall auf, wo Kreise, Kugeln oder Winkel im Spiel sind. Das Gute: Du musst die Zahl nie selbst abtippen. Im <Link className="inline-link" href="/">Matherechner</Link> ist Pi als feste Konstante hinterlegt, du gibst einfach <code>pi</code> ein und rechnest normal weiter. Hier erfährst du, wie das genau funktioniert, welche Aufgaben du damit schnell löst und worauf du achten musst.</p>
        <p>Pi (Zeichen: π) ist das Verhältnis vom Umfang eines Kreises zu seinem Durchmesser. Egal wie groß oder klein der Kreis ist, dieses Verhältnis bleibt immer gleich. Der Wert beträgt ungefähr 3,14159.</p>
        <p>Pi ist eine irrationale Zahl. Das bedeutet: Die Nachkommastellen hören nie auf und wiederholen sich nicht in einem festen Muster. Deshalb rechnet man in der Praxis mit einer gerundeten Fassung, und genau das übernimmt der Rechner für dich.</p>
        <Image className="article-featured-image" src={image} alt="Matherechner Pi: Berechnungen mit der Kreiszahl π" width={1672} height={941} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection soft h2="So gibst du Pi richtig ein">
        <p>Du hast zwei einfache Wege, Pi zu benutzen:</p>
        <ul className="article-list">
          <li>Tippe die Buchstaben <code>pi</code> in den Ausdruck.</li>
          <li>Oder nutze die <strong>π-Taste</strong> im Rechner.</li>
        </ul>
        <p>Wichtig ist das Malzeichen. Zwischen einer Zahl und Pi muss ein <code>*</code> stehen. Schreibe also <code>2*pi</code> und nicht <code>2pi</code>. Ein weiterer Punkt für deutsche Nutzer: Im Ergebnis wird das Komma als Dezimaltrennzeichen angezeigt, zum Beispiel 6,28.</p>
      </ContentSection>

      <ContentSection h2="Einfache Rechnungen mit Pi">
        <p>Diese Beispiele zeigen, wie sich Pi in einem Ausdruck verhält. Du kannst Pi auch mitten in größeren Ausdrücken verwenden, etwa <code>pi*4^2</code> für eine Kreisfläche. Setze bei längeren Rechnungen Klammern, damit die Reihenfolge stimmt.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Eingabe</th><th>Bedeutung</th><th>Ergebnis ungefähr</th></tr></thead><tbody>
          <tr><td><code>pi</code></td><td>Wert von Pi</td><td>3,14159</td></tr>
          <tr><td><code>2*pi</code></td><td>Doppeltes Pi</td><td>6,28319</td></tr>
          <tr><td><code>pi^2</code></td><td>Pi zum Quadrat</td><td>9,86960</td></tr>
          <tr><td><code>pi*4^2</code></td><td>Kreisfläche mit Radius 4</td><td>50,26548</td></tr>
        </tbody></table></div>
      </ContentSection>

      <ContentSection soft h2="Kreis, Kugel und Zylinder mit Pi berechnen">
        <p>Der häufigste Grund, Pi zu brauchen, sind Kreis- und Kugelaufgaben. Die folgenden Formeln kannst du direkt so in den Rechner eintippen. <code>r</code> steht für den Radius, <code>d</code> für den Durchmesser und <code>h</code> für die Höhe.</p>
        <div className="formula-grid pi-formula-grid">
          <div>Kreisumfang<br/><strong>U = 2 · π · r</strong><br/><code>2*pi*r</code></div>
          <div>Kreisfläche<br/><strong>A = π · r²</strong><br/><code>pi*r^2</code></div>
          <div>Kugeloberfläche<br/><strong>A = 4 · π · r²</strong><br/><code>4*pi*r^2</code></div>
          <div>Kugelvolumen<br/><strong>V = 4/3 · π · r³</strong><br/><code>(4/3)*pi*r^3</code></div>
          <div>Zylindervolumen<br/><strong>V = π · r² · h</strong><br/><code>pi*r^2*h</code></div>
          <div>Durchmesser<br/><strong>d = 2 · r</strong><br/><code>2*r</code></div>
        </div>
        <p>Ein kurzes Beispiel Schritt für Schritt: Für die Fläche eines Kreises mit Radius 5 gibst du <code>pi*5^2</code> ein. Der Rechner quadriert zuerst die 5 zu 25 und multipliziert dann mit Pi. Heraus kommt rund 78,54.</p>
      </ContentSection>

      <ContentSection h2="Pi in Trigonometrie: DEG oder RAD?">
        <p>Bei Sinus, Kosinus und Tangens ist der Winkelmodus entscheidend:</p>
        <ul className="article-list">
          <li><strong>Grad (DEG):</strong> Winkel wie 30°, 90° oder 180°.</li>
          <li><strong>Bogenmaß (RAD):</strong> Winkel als Vielfache von Pi, zum Beispiel π/2 oder π.</li>
        </ul>
        <p>Wenn du mit Pi in Winkelfunktionen rechnest, brauchst du fast immer das Bogenmaß. Im Bogenmaß entspricht π genau 180°. Prüfe deshalb vor jeder Rechnung den aktiven Modus: <code>sin(pi)</code> liefert im Bogenmaß 0, im Gradmodus dagegen ein anderes Ergebnis.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Gradmaß</th><th>Bogenmaß</th><th>Typischer Wert</th></tr></thead><tbody>
          <tr><td>0°</td><td>0</td><td>sin = 0</td></tr>
          <tr><td>30°</td><td>π/6</td><td>sin = 1/2</td></tr>
          <tr><td>45°</td><td>π/4</td><td>sin = √2/2</td></tr>
          <tr><td>90°</td><td>π/2</td><td>sin = 1</td></tr>
          <tr><td>180°</td><td>π</td><td>sin = 0</td></tr>
        </tbody></table></div>
      </ContentSection>

      <ContentSection soft h2="Wie genau rechnet der Matherechner mit Pi?">
        <p>Pi hat unendlich viele Nachkommastellen. Für Alltag und Schule reichen aber schon wenige Stellen aus:</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Genauigkeit</th><th>Gerundeter Wert</th><th>Geeignet für</th></tr></thead><tbody>
          <tr><td>2 Nachkommastellen</td><td>3,14</td><td>Grobe Überschläge</td></tr>
          <tr><td>5 Nachkommastellen</td><td>3,14159</td><td>Schule und Alltag</td></tr>
          <tr><td>10 Nachkommastellen</td><td>3,1415926536</td><td>Genauere Berechnungen</td></tr>
        </tbody></table></div>
        <p>Der große Vorteil des Rechners: Er nutzt intern eine sehr genaue Fassung von Pi und rundet erst am Ende. Wenn du dagegen von Hand nur mit 3,14 rechnest, wird das Ergebnis bei größeren Zahlen spürbar ungenauer. Nutze also lieber <code>pi</code> als eine selbst getippte 3,14.</p>
      </ContentSection>

      <ContentSection h2="Häufige Fehler beim Rechnen mit Pi">
        <p>Ein paar Stolperfallen tauchen immer wieder auf. Wenn du sie kennst, sparst du dir viele falsche Ergebnisse:</p>
        <ul className="article-list">
          <li><strong>Das Malzeichen vergessen:</strong> <code>2pi</code> vermeiden; verwende <code>2*pi</code>.</li>
          <li><strong>3,14 statt pi tippen:</strong> Das kostet Genauigkeit, besonders bei großen Aufgaben.</li>
          <li><strong>Falscher Winkelmodus:</strong> Für Aufgaben mit Pi in Sinus oder Kosinus meist RAD wählen.</li>
          <li><strong>Klammern weglassen:</strong> Bei <code>(4/3)*pi*r^3</code> sichern Klammern die richtige Reihenfolge.</li>
          <li><strong>Radius und Durchmesser verwechseln:</strong> Für die Fläche brauchst du den Radius.</li>
        </ul>
      </ContentSection>

      <ContentSection soft h2="Praxisbeispiel: Volumen eines runden Eimers">
        <p>Stell dir vor, du sollst berechnen, wie viel Wasser in einen runden Eimer passt. Der Eimer hat einen Radius von 15 Zentimetern und eine Höhe von 30 Zentimetern. Gesucht ist das Volumen eines Zylinders.</p>
        <p>Die Formel lautet <strong>V = π · r² · h</strong>. Im Rechner tippst du dafür <code>pi*15^2*30</code>. Der Rechner quadriert zuerst die 15 zu 225, multipliziert dann mit der Höhe 30 und zum Schluss mit Pi. Das Ergebnis sind rund 21.205 Kubikzentimeter, also etwa 21,2 Liter.</p>
        <p>Der ganze Weg dauert nur wenige Sekunden. Genau so gehst du bei fast allen Kreis- und Kugelaufgaben vor: passende Formel wählen, Werte einsetzen und Pi als Konstante stehen lassen.</p>
      </ContentSection>

      <ContentSection h2="Häufig gestellte Fragen" id="faq">
        <FaqSection items={faq} />
      </ContentSection>
    </main>
  </>;
}