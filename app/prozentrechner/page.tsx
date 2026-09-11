import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import PercentageCalculator from '@/components/PercentageCalculator';
import { content } from '@/content/de';

const description = 'Nutzen Sie unseren Prozentrechner, um einen Prozentwert zu ermitteln oder zwei Werte zu vergleichen.';
const updated = '2026-09-11T23:59:59+05:00';
const faq = [
  { q: 'Wie berechnet man einen Prozentsatz?', a: 'Teilen Sie den Teil durch das Ganze und multiplizieren Sie das Ergebnis mit 100. Zum Beispiel entsprechen 30 von 200 genau 15 %.' },
  { q: 'Was ist X Prozent einer Zahl?', a: 'Wandeln Sie den Prozentsatz in eine Dezimalzahl um und multiplizieren Sie ihn mit der Zahl. Zum Beispiel sind 25 % von 80 gleich 20.' },
  { q: 'Wie berechnet man den Grundwert?', a: 'Teilen Sie den Prozentwert durch den als Dezimalzahl geschriebenen Prozentsatz. Wenn 30 gleich 15 % sind, lautet der Grundwert 30 ÷ 0,15 = 200.' },
  { q: 'Wie berechnet man die prozentuale Veränderung?', a: 'Subtrahieren Sie den Anfangswert vom Endwert, teilen Sie die Differenz durch den Anfangswert und multiplizieren Sie mit 100.' },
];

export const metadata: Metadata = {
  title: { absolute: 'Prozentrechner Online 2026' }, description,
  alternates: { canonical: '/prozentrechner/' },
  openGraph: { type: 'article', url: '/prozentrechner/', title: 'Prozentrechner Online 2026', description, images: [{ url: '/Prozentrechner.webp', width: 1200, height: 630, alt: 'Prozentrechner Online' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title: 'Prozentrechner Online 2026', description, images: ['/Prozentrechner.webp'] },
};

export default function ProzentrechnerPage() {
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebApplication', name: 'Prozentrechner', url: `${content.site.url}/prozentrechner/`, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', description, image: `${content.site.url}/Prozentrechner.webp`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Prozentrechner', item: `${content.site.url}/prozentrechner/` }] },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><main>
    <section className="hero-section percentage-hero"><div className="page-shell"><h1>Prozentrechner</h1><PercentageCalculator /></div></section>
    <ContentSection h2="Schnell und einfach Prozent berechnen"><p>Sie brauchen schnell einen Prozentsatz, ohne sich mit Formeln herumschlagen? Nutzen Sie unseren Prozentrechner, um einen Prozentsatz zu finden, zwei Werte zu vergleichen, eine Veränderung zu berechnen oder rückwärts zum ursprünglichen Betrag zu gelangen.</p><p>Er arbeitet für Rabatte, Mehrwertsteuer, Gehaltserhöhungen, Preisänderungen, Trinkgelder und alltägliche Mathematik. Sie erhalten in Sekundenschnelle ein klares Ergebnis, während die dahinter liegende Berechnung leicht nachvollziehbar bleibt.</p><Image className="article-featured-image" src="/Prozentrechner.webp" alt="Prozentrechner für Rabatte, Änderungen und Prozentsätze" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" /></ContentSection>
    <ContentSection soft h2="Prozentrechner: So funktioniert die Berechnung"><p>Wählen Sie die Berechnung, die zu Ihrer Frage passt, und geben Sie dann die Werte ein, die Sie bereits kennen. Der <Link className="inline-link" href="/">Rechner</Link> verbindet drei Kernelemente – den Grundwert, den Prozentwert und den Prozentsatz – und ermittelt den fehlenden Wert.</p><p>Angenommen, Sie möchten 15 % von 200 finden. Geben Sie 200 als Grundwert und 15 % als Prozentsatz ein, um 30 zu erhalten. Wenn Sie wissen, dass sich 30 von 200 Personen für eine Option entschieden haben, geben Sie 30 und 200 ein, um den Prozentsatz zu finden: 15 %.</p><p>Sie können auch den ursprünglichen Betrag berechnen oder eine Veränderung zwischen zwei Werten messen. Die Richtung ist entscheidend: Ein Anstieg von 50 auf 75 entspricht 50 %, aber ein Rückgang von 75 auf 50 entspricht 33,33 %.</p></ContentSection>
    <ContentSection h2="Grundwert, Prozentwert und Prozentsatz erklärt"><p>Jedes Standard-Prozentproblem enthält drei Elemente. Der Grundwert repräsentiert das Ganze, der Prozentwert den Teil, und der Prozentsatz drückt diesen Teil pro hundert aus.</p><ul className="article-list"><li><strong>Grundwert (G):</strong> Der vollständige Betrag, der 100 % repräsentiert.</li><li><strong>Prozentwert (W):</strong> Der tatsächliche Teil des Ganzen.</li><li><strong>Prozentsatz (P %):</strong> Der Teil, ausgedrückt aus hundert.</li></ul><p>Denken Sie so darüber nach: Ganzes, Teil, Prozentsatz. Identifizieren Sie zuerst das Ganze, besonders wenn ein alter Preis mit einem neuen verglichen wird.</p></ContentSection>
    <ContentSection soft h2="Die wichtigsten Prozentformeln"><p>Drei Formeln lösen die wichtigsten Prozentprobleme:</p><div className="formula-grid"><div>Prozentwert<br/><strong>W = G × P ÷ 100</strong></div><div>Prozentsatz<br/><strong>P = W ÷ G × 100</strong></div><div>Grundwert<br/><strong>G = W × 100 ÷ P</strong></div></div><p>Wählen Sie die Formel, die mit dem Wert beginnt, den Sie finden möchten. Zum Beispiel sind 20 % von 250 gleich 50, weil 250 × 20 ÷ 100 = 50.</p></ContentSection>
    <ContentSection h2="Prozentrechnung mit dem Dreisatz"><p>Der Dreisatz lässt Sie Prozentprobleme lösen, ohne Formeln auswendig zu lernen. Setzen Sie den Grundwert mit 100 % gleich, teilen Sie beide Seiten, um 1 % zu finden, und multiplizieren Sie anschließend mit dem benötigten Prozentsatz.</p><p>Für 15 % von 240 gilt: 240 = 100 %, daher 2,4 = 1 % und schließlich 36 = 15 %. Wenden Sie bei jedem Schritt dieselbe Operation auf beide Seiten an.</p></ContentSection>
    <ContentSection soft h2="Prozentuale Erhöhungen und Veränderungen berechnen"><p>Um einen Wert zu erhöhen, multiplizieren Sie ihn mit 1 plus dem Prozentsatz als Dezimalzahl. Um ihn zu verringern, verwenden Sie 1 minus die Dezimalzahl. So wird 200 × 1,15 = 230 und 200 × 0,85 = 170.</p><p>Die prozentuale Veränderung lautet: (Endwert − Anfangswert) ÷ Anfangswert × 100. Ein Preisanstieg von 80 auf 100 entspricht 25 %.</p><p>Gleiche prozentuale Erhöhungen und Verringerungen heben sich nicht gegenseitig auf, weil sich der Grundwert ändert.</p></ContentSection>
    <ContentSection h2="Rabatte und Originalpreise berechnen"><p>Ein Produkt für 200 € mit 15 % Rabatt spart 30 €, sodass Sie 170 € zahlen. Den Endpreis berechnen Sie direkt mit 200 × 0,85.</p><p>Um den Originalpreis zurückzugewinnen, teilen Sie den reduzierten Preis durch den verbleibenden Prozentfaktor. Kostet ein Artikel nach 20 % Rabatt 120 €, beträgt der Originalpreis 120 ÷ 0,80 = 150 €.</p></ContentSection>
    <ContentSection soft h2="Mehrwertsteuer berechnen: Netto, Brutto und Steuer"><p>Der Nettobetrag schließt die Mehrwertsteuer aus, während der Bruttobetrag sie enthält. Mit 19 % Mehrwertsteuer wird aus 100 € netto durch Multiplikation mit 1,19 ein Bruttopreis von 119 €.</p><p>Rückwärts teilen Sie den Bruttobetrag durch 1,19. Ein Bruttopreis von 238 € ergibt so 200 € netto und 38 € enthaltene Mehrwertsteuer.</p></ContentSection>
    <ContentSection h2="Häufig gestellte Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
  </main></>;
}

