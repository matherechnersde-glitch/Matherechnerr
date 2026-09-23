import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import IntegralCalculator from '@/components/IntegralCalculator';
import { content } from '@/content/de';

const title = 'Integralrechner';
const metaTitle = 'Integralrechner: Stammfunktion & Integral berechnen';
const description = 'Integralrechner einfach erklärt: Stammfunktion, bestimmtes und unbestimmtes Integral, Integrationsregeln und Flächenberechnung mit Rechenweg verständlich gemacht.';
const updated = '2026-09-23T23:59:59+05:00';
const canonical = '/integralrechner/';
const image = '/Integralrechner.webp';

const faq = [
  { q: 'Was ist eine Stammfunktion?', a: 'Eine Funktion F(x), deren Ableitung wieder die Ausgangsfunktion f(x) ergibt. Sie ist das Ergebnis des unbestimmten Integrals.' },
  { q: 'Warum steht am Ende immer plus C?', a: 'Die Ableitung jeder Konstante ist null. Deshalb gibt es unendlich viele Stammfunktionen, die sich nur um eine Konstante unterscheiden; C hält diese Unbestimmtheit fest.' },
  { q: 'Was ist der Unterschied zwischen bestimmtem und unbestimmtem Integral?', a: 'Das unbestimmte Integral liefert eine Funktion mit plus C. Das bestimmte Integral hat Grenzen und liefert einen konkreten vorzeichenbehafteten Wert.' },
  { q: 'Wie prüfe ich, ob mein Integral stimmt?', a: 'Leite die gefundene Stammfunktion wieder ab. Entsteht die ursprüngliche Funktion, ist die Stammfunktion korrekt.' },
  { q: 'Zeigt der Integralrechner den Rechenweg?', a: 'Ja. Der Rechner nennt die erkannten Integrationsregeln, zeigt eine Stammfunktion und bei bestimmten Integralen das Einsetzen der Grenzen.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle }, description,
  alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title: metaTitle, description, images: [{ url: image, width: 1200, height: 630, alt: 'Integralrechner für Stammfunktionen und bestimmte Integrale' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function IntegralrechnerPage() {
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
      <section className="hero-section integral-hero"><div className="page-shell"><h1>{title}</h1><IntegralCalculator /></div></section>

      <ContentSection h2="Stammfunktion und Fläche verstehen">
        <p>Ein Integral beantwortet eine überraschend anschauliche Frage: Wie viel Fläche liegt unter einer Kurve? Aus dieser einen Idee wächst ein großer Teil der Oberstufen-Analysis, und genau hier verlieren viele den Faden, spätestens beim rätselhaften plus C.</p>
        <p>Ein Integralrechner liefert dir das Ergebnis in Sekunden. Sein eigentlicher Nutzen liegt aber im Rechenweg, der zeigt, wie die Stammfunktion entsteht und wie daraus eine Fläche wird. Wer diesen Weg nachvollzieht statt nur die Lösung abzuschreiben, versteht das Integrieren schneller, als es im Unterricht oft gelingt. Weitere Werkzeuge dazu findest du auf der Startseite vom <Link className="inline-link" href="/">Matherechner</Link>.</p>
      </ContentSection>

      <ContentSection soft h2="Was ein Integral beschreibt">
        <p>Anschaulich misst ein Integral die Fläche zwischen dem Graphen einer Funktion und der x-Achse. Man kann es sich als Aufsummieren unendlich vieler, unendlich schmaler Streifen vorstellen. Genau diese Summe ergibt am Ende die Fläche.</p>
        <p>Das Integrieren ist dabei die Umkehrung des Ableitens. Während die Ableitung nach der Steigung fragt, fragt das Integral danach, welche Funktion diese Steigung ursprünglich hatte. Diese beiden Richtungen sind das Herzstück der Analysis.</p>
        <Image className="article-featured-image" src={image} alt="Integralrechner für Stammfunktion, Grenzen und Flächenberechnung" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection h2="Stammfunktion und das plus C">
        <p>Wenn du integrierst, suchst du eine Stammfunktion. Das ist eine Funktion F(x), deren Ableitung genau deine Ausgangsfunktion f(x) ergibt. Aus f(x) = 2x wird zum Beispiel F(x) = x², denn abgeleitet ergibt x² wieder 2x.</p>
        <p>Hier kommt das berühmte plus C ins Spiel. Da die Ableitung jeder Konstante null ist, ändert eine angehängte Zahl nichts an der Ableitung. F(x) = x² + 3 hat dieselbe Ableitung wie x². Deshalb gibt es nicht eine, sondern unendlich viele Stammfunktionen, die sich nur um eine Konstante unterscheiden. Das C hält diese Unbestimmtheit fest.</p>
      </ContentSection>

      <ContentSection soft h2="Bestimmtes und unbestimmtes Integral">
        <p>Der Unterschied klingt kompliziert, ist aber einfach.</p>
        <ul className="article-list"><li><strong>Unbestimmtes Integral:</strong> Es liefert die Stammfunktion mit plus C. Das Ergebnis ist eine Funktion.</li><li><strong>Bestimmtes Integral:</strong> Es hat zwei Grenzen a und b und liefert eine konkrete Zahl: den vorzeichenbehafteten Flächeninhalt zwischen diesen Stellen.</li></ul>
        <p>Beim bestimmten Integral fällt das C weg, weil es sich beim Einsetzen der Grenzen von selbst aufhebt. Deshalb brauchst du dir darüber bei Flächenaufgaben keine Gedanken zu machen.</p>
      </ContentSection>

      <ContentSection h2="Was der Integralrechner macht">
        <p>Du gibst deine Funktion ein, bei Bedarf zusätzlich die Grenzen a und b, und der Rechner bestimmt die Stammfunktion oder das bestimmte Integral samt Rechenweg. Der Rechner läuft kostenlos direkt im Browser.</p>
        <p>Mit den Vorlagentasten setzt du Potenzen, Brüche, Wurzeln und Funktionen in echter mathematischer Notation ein. Über die Tastatur kannst du Potenzen auch als <code>x^2</code>, Funktionen als <code>sin(x)</code>, <code>cos(x)</code>, <code>ln(x)</code> oder <code>sqrt(x)</code> und die e-Funktion als <code>e^x</code> eingeben. Das f(x) und das dx lässt du weg und schreibst nur den Integranden.</p>
      </ContentSection>

      <ContentSection soft h2="Die wichtigsten Integrationsregeln">
        <p>Wenn du diese Grundregeln kennst, kannst du jeden Schritt im Rechenweg zuordnen.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Regel</th><th>Formel</th><th>Beispiel</th></tr></thead><tbody><tr><td>Potenzregel</td><td>∫ xⁿ dx = xⁿ⁺¹/(n+1) + C</td><td>∫ x² dx = x³/3 + C</td></tr><tr><td>Faktorregel</td><td>Ein konstanter Faktor bleibt erhalten</td><td>∫ 5x dx = 5 · x²/2 + C</td></tr><tr><td>Summenregel</td><td>Jeder Summand wird einzeln integriert</td><td>∫ (x + 1) dx = x²/2 + x + C</td></tr><tr><td>e-Funktion</td><td>∫ eˣ dx = eˣ + C</td><td>Sie bleibt in ihrer Grundform erhalten</td></tr><tr><td>Sinus und Kosinus</td><td>∫ cos(x) dx = sin(x) + C</td><td>∫ sin(x) dx = −cos(x) + C</td></tr></tbody></table></div>
        <p>Die Potenzregel hat eine wichtige Ausnahme: Für n gleich minus eins funktioniert sie nicht, denn dann stünde eine Null im Nenner. Stattdessen gilt ∫ 1/x dx = ln|x| + C. Für Produkte und verkettete Funktionen kommen fortgeschrittene Methoden dazu, vor allem Substitution und partielle Integration.</p>
      </ContentSection>

      <ContentSection h2="Flächen berechnen mit Grenzen">
        <p>Für eine Fläche brauchst du das bestimmte Integral. Der Hauptsatz der Differential- und Integralrechnung sagt, wie es geht: Du bestimmst die Stammfunktion F, setzt die obere Grenze ein, ziehst den Wert der unteren Grenze ab und erhältst F(b) minus F(a).</p>
        <p>Ein Punkt wird dabei oft übersehen: Flächen unterhalb der x-Achse zählt das Integral negativ. Wenn eine Kurve die Achse schneidet, können sich Anteile oberhalb und unterhalb der Achse rechnerisch aufheben. Für den geometrischen Gesamtflächeninhalt teilst du die Rechnung an den Nullstellen auf und addierst die Beträge der Teilintegrale.</p>
      </ContentSection>

      <ContentSection soft h2="Den Rechenweg zum Lernen nutzen">
        <p>Beim Integrieren gibt es einen Trick, der dir mehr bringt als jede Musterlösung: die Umkehrprobe. Weil Integrieren und Ableiten Gegenspieler sind, kannst du dein Ergebnis selbst überprüfen. Leite deine gefundene Stammfunktion wieder ab. Kommt dabei die ursprüngliche Funktion heraus, hast du richtig integriert.</p>
        <p>So nutzt du den Rechner sinnvoll:</p>
        <ol className="article-list"><li>Integriere die Funktion zuerst selbst, so weit du kommst.</li><li>Vergleiche dein Ergebnis mit dem des Rechners.</li><li>Leite dein Ergebnis zur Kontrolle wieder ab.</li><li>Suche gezielt die Stelle, an der Rechenweg und dein Weg auseinanderlaufen.</li></ol>
        <p>Auf diese Weise wird der Rechner vom bloßen Ergebnislieferant zur Lernhilfe. Er deckt Denkfehler auf und macht dich mit der Zeit unabhängig von ihm: und genau darauf kommt es in der Klausur an.</p>
      </ContentSection>

      <ContentSection h2="Häufig gestellte Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}
