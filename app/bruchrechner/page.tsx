import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import FractionCalculator from '@/components/FractionCalculator';
import { content } from '@/content/de';

const title = 'Bruchrechner: Brüche addieren, kürzen & umrechnen';
const description = 'Bruchrechner einfach erklärt: Brüche addieren, subtrahieren, multiplizieren, dividieren und kürzen, mit klaren Regeln, Beispielen und Rechenweg.';
const updated = '2026-09-15T23:59:59+05:00';
const canonical = '/bruchrechner/';
const image = '/Bruchrechner.webp';

const faq = [
  { q: 'Wie addiere ich zwei Brüche?', a: 'Bring beide auf einen gemeinsamen Nenner, addiere dann die Zähler und behalte den Nenner bei. Zum Schluss kürzen, wenn möglich.' },
  { q: 'Muss ich beim Multiplizieren einen gemeinsamen Nenner suchen?', a: 'Nein. Beim Multiplizieren rechnest du Zähler mal Zähler und Nenner mal Nenner. Ein gemeinsamer Nenner ist nur bei Addition und Subtraktion nötig.' },
  { q: 'Wie teile ich durch einen Bruch?', a: 'Du multiplizierst mit dem Kehrwert des zweiten Bruchs. Dazu vertauschst du bei diesem Zähler und Nenner.' },
  { q: 'Was bedeutet kürzen?', a: 'Zähler und Nenner werden durch denselben Teiler geteilt, bis kein gemeinsamer Teiler mehr übrig ist. Der Wert bleibt gleich, die Darstellung wird einfacher.' },
  { q: 'Was ist eine gemischte Zahl?', a: 'Die Schreibweise eines unechten Bruchs als ganze Zahl plus Restbruch. Aus 7/4 wird zum Beispiel 1 3/4.' },
  { q: 'Warum darf der Nenner nicht null sein?', a: 'Weil ein Bruch eine Division ist und durch null nicht geteilt werden kann. Ein Nenner von null ist deshalb nicht definiert.' },
];

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title, description, images: [{ url: image, width: 1200, height: 630, alt: 'Bruchrechner zum Addieren, Kürzen und Umrechnen von Brüchen' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title, description, images: [image] },
};

export default function BruchrechnerPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: title, name: title, description, url: pageUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }, image: `${content.site.url}${image}`, author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, datePublished: updated, dateModified: updated, inLanguage: 'de-DE' },
    { '@type': 'WebApplication', name: 'Bruchrechner', url: pageUrl, applicationCategory: 'EducationalApplication', operatingSystem: 'Any', description, image: `${content.site.url}${image}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, featureList: ['Brüche addieren', 'Brüche subtrahieren', 'Brüche multiplizieren', 'Brüche dividieren', 'Brüche kürzen', 'Gemischte Zahl und Dezimalzahl anzeigen'], datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` }, { '@type': 'ListItem', position: 3, name: 'Bruchrechner', item: pageUrl }] },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section fraction-hero"><div className="page-shell"><h1>{title}</h1><FractionCalculator /></div></section>

      <ContentSection h2="Brüche verstehen statt nur ausrechnen">
        <p>Für viele ist die Bruchrechnung der Moment, in dem Mathe zum ersten Mal wehtut. Bis dahin waren Zahlen greifbar, dann standen plötzlich zwei Zahlen übereinander, ein Nenner, der gleich sein muss, und ein Kehrwert, der scheinbar aus dem Nichts auftaucht. Wer hier einmal den Faden verliert, hadert oft jahrelang mit Brüchen.</p>
        <p>Dabei folgt die Bruchrechnung wenigen, klaren Regeln. Ein Bruchrechner nimmt dir die Rechenarbeit ab, doch die eigentliche Erleichterung kommt, wenn die Logik dahinter klickt. Genau darum geht es auf dieser Seite.</p>
      </ContentSection>

      <ContentSection soft h2="Was ein Bruch eigentlich ist">
        <p>Ein Bruch ist nichts Geheimnisvolles, sondern eine Division, die stehen geblieben ist. Der obere Wert, der Zähler, sagt, wie viele Teile du hast. Der untere Wert, der Nenner, sagt, in wie viele Teile das Ganze zerlegt wurde. Bei 3/4 ist der Kuchen in vier Stücke geteilt, und du hast drei davon.</p>
        <p>Eine einzige feste Grenze gibt es: Der Nenner darf nie null sein, denn durch null lässt sich nichts teilen. Alles andere in der Bruchrechnung baut auf diesem einfachen Bild von Teilen eines Ganzen auf.</p>
        <Image className="article-featured-image" src={image} alt="Bruchrechner für Zähler, Nenner, Rechenarten und gekürzte Ergebnisse" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection h2="Die eine Regel, die alles entscheidet">
        <p>Wenn du dir nur einen Satz merkst, dann diesen: Plus und Minus brauchen einen gemeinsamen Nenner, Mal und Geteilt nicht. An dieser Unterscheidung scheitern die meisten, weil sie eine Regel auf alle vier Rechenarten anwenden wollen.</p>
        <p>Beim Addieren und Subtrahieren müssen die Stücke gleich groß sein, sonst kannst du sie nicht zusammenzählen. Ein Viertel und ein Drittel lassen sich nicht direkt addieren, solange sie unterschiedlich groß sind. Erst wenn beide auf denselben Nenner gebracht sind, passt es. Beim Multiplizieren und Dividieren dagegen ist dieser Schritt überflüssig, und das macht diese beiden Rechenarten oft einfacher als gedacht.</p>
      </ContentSection>

      <ContentSection soft h2="Die vier Rechenarten im Überblick">
        <p>Diese Tabelle fasst zusammen, wie der Bruchrechner im Hintergrund vorgeht:</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Rechenart</th><th>Vorgehen</th><th>Beispiel</th><th>Ergebnis</th></tr></thead><tbody><tr><td>Addition</td><td>gleicher Nenner, dann Zähler addieren</td><td>1/3 + 2/5 = 5/15 + 6/15</td><td>11/15</td></tr><tr><td>Subtraktion</td><td>gleicher Nenner, dann Zähler subtrahieren</td><td>3/4 − 1/6 = 9/12 − 2/12</td><td>7/12</td></tr><tr><td>Multiplikation</td><td>Zähler mal Zähler, Nenner mal Nenner</td><td>2/3 · 3/4 = 6/12</td><td>1/2</td></tr><tr><td>Division</td><td>mit dem Kehrwert multiplizieren</td><td>3/4 ÷ 2/5 = 3/4 · 5/2</td><td>15/8</td></tr></tbody></table></div>
        <p>Den gemeinsamen Nenner findest du am sichersten über das kleinste gemeinsame Vielfache der beiden Nenner. Anschließend erweiterst du jeden Bruch, indem du Zähler und Nenner mit demselben Faktor multiplizierst.</p>
      </ContentSection>

      <ContentSection h2="Warum Multiplizieren leichter ist als Addieren">
        <p>Das klingt verkehrt, ist aber wahr. Viele halten das Multiplizieren für schwerer, weil Mal in der normalen Arithmetik anspruchsvoller wirkt als Plus. Bei Brüchen dreht sich das um.</p>
        <p>Beim Multiplizieren rechnest du einfach Zähler mal Zähler und Nenner mal Nenner, ganz ohne Vorbereitung. Aus 2/3 mal 3/4 wird direkt 6/12. Beim Addieren dagegen musst du erst die Nenner angleichen, bevor überhaupt etwas passiert. Wer das einmal verstanden hat, verliert die Scheu vor der Multiplikation und macht dort deutlich weniger Fehler.</p>
        <p>Auch die Division ist entspannter, als ihr Ruf vermuten lässt. Der berühmte Merksatz bringt es auf den Punkt: Geteilt durch einen Bruch ist dasselbe wie mal dem Kehrwert. Du drehst den zweiten Bruch also um und multiplizierst.</p>
      </ContentSection>

      <ContentSection soft h2="Kürzen: der Schritt, den viele vergessen">
        <p>Ein Ergebnis wie 6/12 ist nicht falsch, aber unfertig. Kürzen bedeutet, Zähler und Nenner durch dieselbe Zahl zu teilen, bis kein gemeinsamer Teiler mehr übrig ist. Aus 6/12 wird so 1/2, derselbe Wert in seiner klarsten Form.</p>
        <p>Am schnellsten kürzt du mit dem größten gemeinsamen Teiler von Zähler und Nenner. In der Klausur ist ein nicht gekürztes Ergebnis ein häufiger Punktabzug, obwohl der eigentliche Rechenweg stimmt. Wer sichergehen will, ob richtig gekürzt wurde, kann das Ergebnis im <Link className="inline-link" href="/">Matherechner</Link> gegenprüfen und den vollständigen Weg daneben legen.</p>
      </ContentSection>

      <ContentSection h2="Gemischte Zahl und Dezimalzahl">
        <p>Manchmal ist ein Bruch nicht die praktischste Darstellung. Ist der Zähler größer als der Nenner, spricht man von einem unechten Bruch, den du in eine gemischte Zahl umwandeln kannst. Aus 7/4 wird 1 3/4, also eine ganze Einheit und ein Rest von drei Vierteln.</p>
        <p>Genauso lässt sich jeder Bruch als Dezimalzahl schreiben, indem du den Zähler durch den Nenner teilst. So wird 3/4 zu 0,75 und 1/2 zu 0,5. Ein guter Bruchrechner zeigt dir alle drei Formen nebeneinander, damit du die passende für deine Aufgabe wählen kannst.</p>
      </ContentSection>

      <ContentSection soft h2="Wo Brüche im Alltag begegnen">
        <p>Brüche bleiben nicht im Klassenzimmer. Ein Rezept, das du halbierst, ist reine Bruchrechnung, genauso wie eine Dreiviertelstunde oder ein Rabatt von einem Drittel. Auch beim Teilen einer Rechnung unter Freunden rechnest du mit Anteilen, ohne es Bruchrechnung zu nennen. Wer die Regeln einmal verinnerlicht hat, sieht diese kleinen Anteile überall und rechnet sie fast nebenbei aus. Genau deshalb lohnt es sich, die Logik wirklich zu verstehen und nicht nur Ergebnisse abzulesen.</p>
      </ContentSection>

      <ContentSection h2="Typische Fehler">
        <p>Ein paar Stolpersteine tauchen immer wieder auf. Wer sie kennt, rechnet deutlich sicherer.</p>
        <ul className="article-list"><li>Brüche mit unterschiedlichen Nennern direkt addieren, ohne sie vorher gleichnamig zu machen.</li><li>Beim Multiplizieren unnötig einen gemeinsamen Nenner suchen, obwohl das gar nicht nötig ist.</li><li>Beim Dividieren den falschen Bruch umdrehen. Umgedreht wird immer der zweite.</li><li>Das Kürzen am Ende vergessen und ein unfertiges Ergebnis stehen lassen.</li><li>Nur den Nenner oder nur den Zähler kürzen. Geteilt wird immer beides durch dieselbe Zahl.</li></ul>
      </ContentSection>

      <ContentSection soft={false} h2="Häufige Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}