import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import DerivativeCalculator from '@/components/DerivativeCalculator';
import FaqSection from '@/components/FaqSection';
import { content } from '@/content/de';

const title = 'Ableitungsrechner';
const metaTitle = 'Ableitungsrechner: Ableitungen mit Rechenweg verstehen';
const description = 'Der Ableitungsrechner bestimmt Ableitungen symbolisch und zeigt den Rechenweg verständlich – für Potenzen, Produkte, Kettenregel und mehr.';
const updated = '2026-09-05T23:59:59+05:00';
const canonical = '/ableitungsrechner/';
const image = '/Ableitungsrechner.webp';

const faq = [
  { q: "Wofür steht f'(x)?", a: "f'(x) steht für die erste Ableitung der Funktion f. Sie gibt die Steigung von f an jeder Stelle an." },
  { q: 'Zeigt der Ableitungsrechner den Rechenweg?', a: 'Ja. Der Rechner nennt die erkannten Ableitungsregeln und zeigt das exakte symbolische Ergebnis. Bei komplexen Funktionen kann der angezeigte Weg kompakter ausfallen.' },
  { q: 'Wie leite ich e^x ab?', a: 'Die Ableitung von e^x ist wieder e^x. Steht im Exponenten mehr als x, wird zusätzlich mit der inneren Ableitung multipliziert.' },
  { q: 'Was ist eine partielle Ableitung?', a: 'Das ist die Ableitung einer Funktion mit mehreren Variablen nach einer davon. Die übrigen Variablen werden dabei als Konstanten behandelt.' },
  { q: 'Ersetzt der Rechner das eigene Üben?', a: 'Nein. Er eignet sich zum Kontrollieren und Verstehen; die Ableitungsregeln solltest du dennoch selbst beherrschen.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle }, description,
  alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title: metaTitle, description, images: [{ url: image, width: 1200, height: 630, alt: 'Ableitungsrechner mit Rechenweg' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function AbleitungsrechnerPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: metaTitle, name: title, description, url: pageUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }, image: `${content.site.url}${image}`, author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, datePublished: updated, dateModified: updated, inLanguage: 'de-DE' },
    { '@type': 'WebApplication', name: title, url: pageUrl, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description, image: `${content.site.url}${image}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` }, { '@type': 'ListItem', position: 3, name: title, item: pageUrl }] },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section derivative-hero"><div className="page-shell"><h1>{title}</h1><DerivativeCalculator /></div></section>

      <ContentSection h2="Ableitungen mit Rechenweg verstehen">
        <p>Eine Funktion sagt dir, wo etwas ist. Die Ableitung sagt dir, wie schnell es sich ändert. Genau an dieser Stelle steigen viele im Matheunterricht aus, nicht beim Rechnen selbst, sondern bei der Frage, was eine Ableitung eigentlich bedeutet.</p>
        <p>Ein Ableitungsrechner nimmt dir die Arbeit ab und liefert das Ergebnis in Sekunden. Sein eigentlicher Wert liegt aber woanders: im Rechenweg, der zeigt, wie das Ergebnis zustande kommt. Wer diesen Weg liest statt nur das Resultat abzuschreiben, versteht die Differentialrechnung nach kurzer Zeit deutlich besser. Weitere Werkzeuge dazu findest du auf der Startseite vom <Link className="inline-link" href="/">Matherechner</Link>.</p>
        <Image className="article-featured-image" src={image} alt="Ableitungsrechner für Funktionen mit verständlichem Rechenweg" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection soft h2="Was eine Ableitung beschreibt">
        <p>Die Ableitung f&apos;(x) misst die Steigung einer Funktion an jeder einzelnen Stelle. Anschaulich ist es die Steigung der Tangente, die den Graphen in einem Punkt berührt. In der Sprache des Alltags ist es eine Änderungsrate: Wie stark wächst oder fällt ein Wert genau hier, in diesem Moment?</p>
        <p>Dieses Bild trägt weit. Beim Fahren ist der Weg die Funktion und die Geschwindigkeit ihre Ableitung. Wer das einmal verinnerlicht hat, sieht in f&apos;(x) keine abstrakte Formel mehr, sondern eine konkrete Aussage über Veränderung.</p>
      </ContentSection>

      <ContentSection h2="Was der Ableitungsrechner macht">
        <p>Der Rechner nimmt deine Funktion entgegen, bestimmt die Ableitung und zeigt den Weg dorthin. Du gibst also f(x) ein und bekommst f&apos;(x) samt den erkannten Regeln zurück. Der Rechner läuft kostenlos direkt im Browser, ohne Installation.</p>
        <p>Der Unterschied zwischen einem reinen Ergebnis und einem nachvollziehbaren Rechenweg ist groß. Ein bloßes Ergebnis beantwortet die Aufgabe. Ein guter Rechenweg beantwortet die Frage, warum das Ergebnis so aussieht, und genau das brauchst du in der Klausur.</p>
      </ContentSection>

      <ContentSection soft h2="Funktion richtig eingeben">
        <p>Mit den Tasten im Rechner setzt du Potenzen, Brüche, Wurzeln und Funktionen direkt als mathematische Vorlagen ein. Du kannst außerdem über die Tastatur schreiben.</p>
        <ul className="article-list"><li>Potenzen schreibst du mit dem Dach, also <code>x^2</code> für x hoch zwei.</li><li>Für Multiplikation kannst du einen Stern setzen, also <code>3*x</code>; der visuelle Editor versteht auch 3x.</li><li>Standardfunktionen heißen <code>sin</code>, <code>cos</code>, <code>tan</code>, <code>ln</code> und <code>sqrt</code> für die Wurzel.</li><li>Die Exponentialfunktion gibst du als <code>e^x</code> ein oder setzt sie über die Taste eˣ ein.</li></ul>
        <p>Achte besonders auf Klammern. Ein fehlendes Klammerpaar verändert die ganze Funktion, und der Rechner leitet dann etwas anderes ab, als du meinst.</p>
      </ContentSection>

      <ContentSection h2="Die wichtigsten Ableitungsregeln">
        <p>Im Hintergrund wählt der Rechner die passende Regel, so wie es auch ein Mensch tun würde. Wenn du diese Regeln kennst, kannst du jeden Schritt im Rechenweg zuordnen.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Regel</th><th>Anwendung</th><th>Beispiel</th></tr></thead><tbody><tr><td>Potenzregel</td><td>xⁿ wird zu n · xⁿ⁻¹</td><td>x³ wird zu 3x²</td></tr><tr><td>Faktorregel</td><td>Ein konstanter Faktor bleibt stehen</td><td>5x² wird zu 10x</td></tr><tr><td>Summenregel</td><td>Jeder Summand wird einzeln abgeleitet</td><td>x² + x wird zu 2x + 1</td></tr><tr><td>Produktregel</td><td>u&apos;·v + u·v&apos;</td><td>x · sin(x) wird zu sin(x) + x·cos(x)</td></tr><tr><td>Quotientenregel</td><td>(u&apos;·v − u·v&apos;) geteilt durch v²</td><td>Für Brüche zweier Funktionen</td></tr><tr><td>Kettenregel</td><td>Äußere Ableitung mal innere Ableitung</td><td>(2x+1)³ wird zu 6·(2x+1)²</td></tr></tbody></table></div>
        <p>Die Kettenregel ist erfahrungsgemäß die größte Hürde. Sie greift immer dann, wenn eine Funktion in einer anderen steckt, und genau hier lohnt es sich, den Rechenweg besonders aufmerksam zu lesen.</p>
      </ContentSection>

      <ContentSection soft h2="Die e-Funktion ableiten">
        <p>Die Exponentialfunktion hat eine Eigenschaft, die sie einzigartig macht: Sie bleibt beim Ableiten sie selbst. Die Ableitung von eˣ ist wieder eˣ.</p>
        <p>Steht im Exponenten mehr als nur x, kommt die Kettenregel dazu. Aus e³ˣ wird dann 3·e³ˣ, weil die innere Ableitung von 3x gleich 3 ist. Verwandt damit ist der natürliche Logarithmus: Die Ableitung von ln(x) ist 1 geteilt durch x. Diese beiden Bausteine tauchen in der Oberstufe ständig auf.</p>
      </ContentSection>

      <ContentSection h2="Partielle Ableitung bei mehreren Variablen">
        <p>Sobald eine Funktion von mehr als einer Variablen abhängt, kommt die partielle Ableitung ins Spiel. Die Idee dahinter ist überraschend einfach: Du leitest nach einer Variablen ab und behandelst alle anderen für diesen Moment wie Konstanten.</p>
        <p>Bei f(x, y) = x² · y leitest du nach x ab und erhältst 2x · y, weil y hier wie eine Zahl behandelt wird. Leitest du dagegen nach y ab, bleibt x² als konstanter Faktor stehen, und das Ergebnis ist x². Wähle dazu im Rechner einfach x oder y als Variable.</p>
      </ContentSection>

      <ContentSection soft h2="Den Rechenweg zum Lernen nutzen">
        <p>Hier liegt der Punkt, der einen Rechner vom bloßen Spickzettel unterscheidet. Wenn du eine Aufgabe eingibst, widersteh der Versuchung, nur die letzte Zeile abzuschreiben. Geh stattdessen jeden Schritt durch und frag dich bei jedem, welche Regel gerade angewendet wurde.</p>
        <ol className="article-list"><li>Rechne die Ableitung zuerst selbst, so weit du kommst.</li><li>Lass den Rechner dieselbe Aufgabe lösen und vergleiche Schritt für Schritt.</li><li>Suche gezielt die Stelle, an der dein Weg vom Rechenweg abweicht.</li><li>Verstehe diese eine Stelle, statt die ganze Lösung neu abzuschreiben.</li></ol>
        <p>So wird aus einem Werkzeug für schnelle Antworten eine echte Lernhilfe. Der Rechner kontrolliert deine Hausaufgaben, deckt Denkfehler auf und macht dich mit der Zeit unabhängig von ihm. Genau das ist das Ziel.</p>
      </ContentSection>

      <ContentSection h2="Häufig gestellte Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}
