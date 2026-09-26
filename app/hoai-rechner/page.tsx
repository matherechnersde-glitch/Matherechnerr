import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContentSection from '@/components/ContentSection';
import FaqSection from '@/components/FaqSection';
import HoaiCalculator from '@/components/HoaiCalculator';
import { content } from '@/content/de';

const title = 'HOAI Rechner';
const metaTitle = 'HOAI Rechner 2026';
const description = 'Mit dem HOAI Rechner ermittelst du Honorare für Gebäude und Innenräume nach HOAI 2021: mit Honorarzone, Leistungsphasen und Nebenkosten.';
const updated = '2026-09-26T23:59:59+05:00';
const canonical = '/hoai-rechner/';
const image = '/hoai-rechner.webp';

const faq = [
  { q: 'Ist der HOAI Rechner kostenlos?', a: 'Ja. Der Rechner ist kostenlos und ohne Anmeldung direkt im Browser nutzbar.' },
  { q: 'Welche Angaben muss ich mindestens eingeben?', a: 'Du brauchst die anrechenbaren Kosten, die Honorarzone, den Honorarsatz und mindestens eine beauftragte Leistungsphase.' },
  { q: 'Gilt die HOAI 2026 als eigene Fassung?', a: 'Nein. Eine eigene HOAI 2026 gibt es nicht. Der Rechner orientiert sich an der seit 2021 geltenden Fassung.' },
  { q: 'Sind die berechneten Honorare verbindlich?', a: 'Nein. Seit 2021 können Honorare grundsätzlich frei vereinbart werden. Die Honorartafeln enthalten Orientierungswerte.' },
  { q: 'Kann ich auch Technische Ausrüstung berechnen?', a: 'Dieser Rechner deckt Gebäude und Innenräume nach § 35 HOAI ab. Technische Ausrüstung verwendet eine eigene Honorartafel und ist hier nicht enthalten.' },
  { q: 'Ersetzt der Rechner eine rechtliche Prüfung?', a: 'Nein. Das Ergebnis ist eine rechnerische Orientierung. Vertragliche, rechtliche und steuerliche Fragen müssen individuell geprüft werden.' },
];

export const metadata: Metadata = {
  title: { absolute: metaTitle }, description,
  alternates: { canonical },
  openGraph: { type: 'article', url: canonical, title: metaTitle, description, images: [{ url: image, width: 1200, height: 630, alt: 'HOAI Rechner für Architekten- und Ingenieurhonorare' }], publishedTime: updated, modifiedTime: updated },
  twitter: { card: 'summary_large_image', title: metaTitle, description, images: [image] },
};

export default function HoaiRechnerPage() {
  const pageUrl = `${content.site.url}${canonical}`;
  const schema = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'Article', headline: title, name: metaTitle, description, url: pageUrl, mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl }, image: `${content.site.url}${image}`, author: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, publisher: { '@type': 'Organization', name: content.site.name, url: `${content.site.url}/` }, datePublished: updated, dateModified: updated, inLanguage: 'de-DE' },
    { '@type': 'WebApplication', name: title, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', description, image: `${content.site.url}${image}`, offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' }, datePublished: updated, dateModified: updated },
    { '@type': 'FAQPage', mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Startseite', item: `${content.site.url}/` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${content.site.url}/blog/` }, { '@type': 'ListItem', position: 3, name: title, item: pageUrl }] },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <main>
      <section className="hero-section hoai-hero"><div className="page-shell"><h1>{title}</h1><HoaiCalculator /></div></section>

      <ContentSection h2="Architekten- und Ingenieurhonorare online berechnen">
        <p>Das Honorar für Architekten und Ingenieure entsteht nicht aus dem Bauchgefühl, sondern aus einer festen Rechenlogik. Fünf Angaben entscheiden über die Summe: die anrechenbaren Kosten, das Leistungsbild, die Honorarzone, der Honorarsatz und die beauftragten Leistungsphasen. Ein HOAI-Rechner nimmt dir genau diese Rechnung ab und liefert in Sekunden eine belastbare Orientierung.</p>
        <p>Dieser Ratgeber erklärt, welche Angaben der Rechner braucht, wie die Berechnung im Hintergrund abläuft und was sich mit der HOAI 2021 verändert hat. Weitere Werkzeuge für Zahlen und Formeln findest du auf der Startseite vom <Link className="inline-link" href="/">Matherechner</Link>.</p>
        <p>Die HOAI ist die Honorarordnung für Architekten und Ingenieure. Sie regelt, welche Planungsleistungen es gibt und wie deren Vergütung ermittelt wird. Ein HOAI-Rechner setzt diese Systematik in ein Online-Werkzeug um: Du trägst die Projektdaten ein, und das Tool bestimmt daraus das Honorar für die geregelten Grundleistungen.</p>
        <p>Das Ergebnis dient als Orientierung, etwa für Angebote, Vertragsgespräche oder die Rechnungsstellung. Die meisten Rechner sind kostenlos und laufen direkt im Browser, ohne Installation.</p>
        <Image className="article-featured-image" src={image} alt="HOAI Rechner mit anrechenbaren Kosten, Honorarzone und Leistungsphasen" width={1200} height={630} priority sizes="(max-width: 620px) calc(100vw - 52px), 888px" />
      </ContentSection>

      <ContentSection soft h2="Welche Angaben braucht der HOAI Rechner?">
        <p>Ohne die richtigen Eingaben liefert kein Rechner ein sinnvolles Ergebnis. Diese Parameter sind entscheidend:</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Angabe</th><th>Bedeutung</th></tr></thead><tbody>
          <tr><td>Anrechenbare Kosten</td><td>Der Kostenanteil des Projekts, der für die Honorarermittlung zählt.</td></tr>
          <tr><td>Leistungsbild</td><td>Die Art der Planungsleistung. Dieser Rechner verwendet Gebäude und Innenräume nach § 35 HOAI.</td></tr>
          <tr><td>Honorarzone</td><td>Der Schwierigkeitsgrad der Planungsaufgabe von Zone I bis V.</td></tr>
          <tr><td>Honorarsatz</td><td>Die gewählte Position innerhalb der in der Honorartafel genannten Spanne.</td></tr>
          <tr><td>Leistungsphasen</td><td>Der tatsächlich beauftragte Anteil der gesamten Planungsleistung.</td></tr>
          <tr><td>Zuschläge und Nebenkosten</td><td>Zusätzliche prozentuale Beträge, die zum Leistungshonorar hinzukommen.</td></tr>
        </tbody></table></div>
        <p>Fehlt eine dieser Angaben, kann der Rechner nur schätzen. Besonders die anrechenbaren Kosten und die Honorarzone haben großen Einfluss auf das Ergebnis.</p>
      </ContentSection>

      <ContentSection h2="Honorarzonen I bis V">
        <p>Die Honorarzone spiegelt wider, wie anspruchsvoll die Planung ist. Je höher die Zone, desto höher das Honorar bei gleichen Kosten.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Zone</th><th>Planungsanforderungen</th><th>Typische Einordnung</th></tr></thead><tbody>
          <tr><td>I</td><td>Sehr gering</td><td>Sehr einfache Planungsaufgaben</td></tr><tr><td>II</td><td>Gering</td><td>Einfache Gebäude</td></tr><tr><td>III</td><td>Durchschnittlich</td><td>Viele übliche Wohn- und Bürogebäude</td></tr><tr><td>IV</td><td>Hoch</td><td>Komplexe Gebäude mit hohen Anforderungen</td></tr><tr><td>V</td><td>Sehr hoch</td><td>Besonders anspruchsvolle Planungsaufgaben</td></tr>
        </tbody></table></div>
        <p>Ein einfaches Lagergebäude liegt eher in Zone I oder II, ein aufwendiges Wohn- oder Kulturgebäude in Zone IV oder V. Die Einordnung folgt festen Bewertungsmerkmalen der HOAI und sollte bei Zweifeln fachlich geprüft werden.</p>
      </ContentSection>

      <ContentSection soft h2="Leistungsphasen und ihre Anteile">
        <p>Ein Auftrag umfasst selten alle Phasen. Deshalb rechnet der HOAI Rechner das Tabellenhonorar auf die tatsächlich beauftragten Leistungsphasen herunter. Für die Objektplanung Gebäude gelten diese Anteile:</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>LPH</th><th>Leistungsphase</th><th>Anteil</th></tr></thead><tbody>
          <tr><td>1</td><td>Grundlagenermittlung</td><td>2 %</td></tr><tr><td>2</td><td>Vorplanung</td><td>7 %</td></tr><tr><td>3</td><td>Entwurfsplanung</td><td>15 %</td></tr><tr><td>4</td><td>Genehmigungsplanung</td><td>3 %</td></tr><tr><td>5</td><td>Ausführungsplanung</td><td>25 %</td></tr><tr><td>6</td><td>Vorbereitung der Vergabe</td><td>10 %</td></tr><tr><td>7</td><td>Mitwirkung bei der Vergabe</td><td>4 %</td></tr><tr><td>8</td><td>Objektüberwachung</td><td>32 %</td></tr><tr><td>9</td><td>Objektbetreuung</td><td>2 %</td></tr>
        </tbody></table></div>
        <p>Auffällig ist das Gewicht der Objektüberwachung mit 32 Prozent. Wer nur die Planung bis zur Genehmigung übernimmt, erhält also einen deutlich kleineren Anteil als ein Büro, das die Bauphase begleitet.</p>
      </ContentSection>

      <ContentSection h2="So berechnet der HOAI Rechner das Honorar">
        <p>Im Kern arbeitet der Rechner in drei Schritten:</p>
        <ol className="article-list"><li>Aus anrechenbaren Kosten und Honorarzone liest er das Tabellenhonorar aus der Honorartafel nach § 35 HOAI ab.</li><li>Liegen die Kosten zwischen zwei Tafelwerten, interpoliert er linear, um den Zwischenwert zu bestimmen.</li><li>Er multipliziert das Tabellenhonorar mit dem Anteil der ausgewählten Leistungsphasen und ergänzt Zuschläge, Nebenkosten und Umsatzsteuer.</li></ol>
        <p>Ein Beispiel: Angenommen, für ein Wohngebäude liegen die anrechenbaren Kosten bei 600.000 Euro und das Projekt fällt in Honorarzone III. Der Rechner interpoliert dazu den Basishonorarsatz aus der Tabelle. Wurden nur die Leistungsphasen 1 bis 4 beauftragt, summieren sich deren Anteile auf 27 Prozent (2 + 7 + 15 + 3). Das Honorar für diese Phasen entspricht damit 27 Prozent des vollen Tabellenhonorars. Zum Schluss kommen noch vereinbarte Nebenkosten und die Umsatzsteuer hinzu.</p>
        <p>Genau diese Interpolation und die saubere Gewichtung der Phasen sind die Gründe, warum ein Rechner zuverlässiger ist als eine Berechnung im Kopf.</p>
      </ContentSection>

      <ContentSection soft h2="Was hat sich mit der HOAI 2021 geändert?">
        <p>Bis 2020 gab es verbindliche Mindest- und Höchstsätze. Nach einem Urteil des Europäischen Gerichtshofs aus dem Jahr 2019 sind diese festen Grenzen weggefallen. Seit der Fassung von 2021 sind Honorare grundsätzlich frei verhandelbar.</p>
        <p>Die Honorartafeln bleiben trotzdem wichtig. Sie liefern Orientierungswerte; der untere Wert wird als Basishonorarsatz bezeichnet. Fehlt eine wirksame Honorarvereinbarung in Textform, gilt für Grundleistungen im Anwendungsbereich der HOAI der jeweilige Basishonorarsatz als vereinbart. Auch im Jahr 2026 ist die HOAI 2021 die maßgebliche Fassung, an der sich dieser Rechner ausrichtet.</p>
        <p className="legal-note">Wichtig: Der Rechner bildet eine mathematische Orientierung für Gebäude und Innenräume ab. Er ersetzt weder die fachliche Einordnung des Projekts noch eine rechtliche, vertragliche oder steuerliche Beratung.</p>
      </ContentSection>

      <ContentSection h2="HOAI Rechner oder Excel-Tabelle?">
        <p>Viele Büros nutzen eigene Excel-Vorlagen für die Honorarermittlung. Das funktioniert, hat aber klare Grenzen im Vergleich zu einem Online-Rechner.</p>
        <div className="article-table-wrap"><table className="article-table"><thead><tr><th>Online-Rechner</th><th>Excel-Vorlage</th></tr></thead><tbody><tr><td>Honorartafel und Interpolation sind bereits hinterlegt</td><td>Formeln und Tabellen müssen selbst gepflegt werden</td></tr><tr><td>Leistungsphasen lassen sich direkt auswählen</td><td>Individuell an eigene Prozesse anpassbar</td></tr><tr><td>Funktioniert ohne Installation</td><td>Kann intern gespeichert und erweitert werden</td></tr><tr><td>Geringeres Risiko einfacher Formelfehler</td><td>Fehler in Formeln bleiben leicht unbemerkt</td></tr></tbody></table></div>
        <p>Für eine schnelle, verlässliche Orientierung ist ein gepflegter Online-Rechner in den meisten Fällen die sicherere Wahl. Eine Excel-Lösung lohnt sich vor allem, wenn sie tief in eigene Angebots- und Rechnungsprozesse eingebunden ist.</p>
      </ContentSection>

      <ContentSection soft h2="Häufig gestellte Fragen" id="faq"><FaqSection items={faq} /></ContentSection>
    </main>
  </>;
}
