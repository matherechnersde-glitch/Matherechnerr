import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { content } from '@/content/de';
import Calculator from '@/components/DeferredCalculator';
import FunctionShowcaseSlider from '@/components/FunctionShowcaseSlider';

export const metadata: Metadata = {
  title: { absolute: 'Matherechner: Kostenloser Online Taschenrechner für Mathematik' },
  description: 'Matherechner kostenlos online nutzen: Wurzeln, Brüche, Prozent, Trigonometrie, Ableitungen und mehr. Direkt im Browser, ohne Anmeldung und ohne Download.',
  alternates: { canonical: '/' },
  openGraph: {
    url: '/',
    title: 'Matherechner: Kostenloser Online Taschenrechner für Mathematik',
    description: 'Matherechner kostenlos online nutzen: Wurzeln, Brüche, Prozent, Trigonometrie, Ableitungen und mehr. Direkt im Browser, ohne Anmeldung und ohne Download.',
  },
  twitter: {
    title: 'Matherechner: Kostenloser Online Taschenrechner für Mathematik',
    description: 'Matherechner kostenlos online nutzen: Wurzeln, Brüche, Prozent, Trigonometrie, Ableitungen und mehr. Direkt im Browser, ohne Anmeldung und ohne Download.',
  },
};
import ContentSection from '@/components/ContentSection';
import HighlightGrid from '@/components/HighlightGrid';
import FaqSection from '@/components/FaqSection';

const {
  site, hero,
  sectionCompare, sectionFunctions, sectionWho, sectionWhy, sectionHow,
  faq, conclusion,
} = content;

const specialCalculators = [
  {
    title: 'Prozentrechner',
    description: 'Berechnet Prozentsätze, Rabatte, Mehrwertsteuer und prozentuale Veränderungen. Behandelt Prozentwert, Prozentsatz und Grundwert, wobei die Dreisatzregel Schritt für Schritt erklärt wird.',
    label: 'Prozent berechnen',
    href: '/prozentrechner/',
    icon: '%',
  },
  {
    title: 'Ableitungsrechner',
    description: 'Differenziert Funktionen und zeigt, wie sich die einzelnen Schritte ergeben. Enthält die Potenz-, Produkt-, Quotienten- und Kettenregel sowie die e-Funktion und partielle Ableitungen.',
    label: 'Ableitung berechnen',
    href: '/ableitungsrechner/',
    icon: 'f′',
  },
  {
    title: 'Integralrechner',
    description: 'Bestimmt Stammfunktionen und bestimmte Integrale mit angezeigter Rechenweise. Erklärt das „Plus C“, die Integrationsregeln und die Berechnung von Flächen unter einer Kurve.',
    label: 'Integral berechnen',
    href: '/integralrechner/',
    icon: '∫',
  },
  {
    title: 'Bruchrechner',
    description: 'Addiert, subtrahiert, multipliziert und dividiert Brüche und kürzt das Ergebnis anschließend automatisch. Konvertiert auch in gemischte Zahlen und Dezimalzahlen.',
    label: 'Brüche berechnen',
    href: '/bruchrechner/',
    icon: '½',
  },
  {
    title: 'Pythagoras-Rechner',
    description: 'Ermittelt die fehlende Seite in einem rechtwinkligen Dreieck. Funktioniert für die Hypotenuse und beide Katheten, einschließlich der bekannten pythagoreischen Tripel.',
    label: 'Pythagoras berechnen',
    href: '/pythagoras-rechner/',
    icon: 'a²',
  },
  {
    title: 'Maßstabsrechner',
    description: 'Rechnet zwischen Plan und Realität für Karten, Baupläne und Modelle um. Unterstützt 1:100, 1:1000 und jedes andere Verhältnis in beide Richtungen.',
    label: 'Maßstab berechnen',
    href: '/massstabsrechner/',
    icon: '1:n',
  },
  {
    title: 'Pi-Rechner',
    description: 'Verwendet Pi als gespeicherte Konstante für Kreise, Kugeln und Zylinder. Enthält die korrekte Eingabesyntax und die Einstellung für Grad beziehungsweise Radiant.',
    label: 'Mit Pi berechnen',
    href: '/matherechner-pi/',
    icon: 'π',
  },
  {
    title: 'Modulo-Rechner',
    description: 'Ermittelt sofort den Rest einer Division. Nützlich für die Prüfung auf gerade und ungerade Zahlen, Zyklen, Wochentage und Programmieraufgaben.',
    label: 'Modulo berechnen',
    href: '/matherechner-modulo/',
    icon: 'mod',
  },
  {
    title: 'HOAI-Rechner',
    description: 'Berechnet Architekten- und Ingenieurhonorare nach der HOAI. Umfasst anrechenbare Kosten, Honorarzonen, Leistungsphasen und die Änderungen seit 2021.',
    label: 'HOAI-Honorar berechnen',
    href: '/hoai-rechner/',
    icon: '€',
  },
] as const;
type FunctionRow = readonly [string, string, string, string, string];

const supportedFunctionGroups: ReadonlyArray<{
  title: string;
  rows: ReadonlyArray<FunctionRow>;
}> = [
  {
    title: 'Algebra',
    rows: [
      ['= mit x', 'Gleichung lösen', 'Löst lineare und quadratische Gleichungen', 'x² − 5x + 6 = 0', 'x = 2, x = 3'],
      ['<, ≤, >, ≥', 'Ungleichung lösen', 'Löst Ungleichungen', '2x + 3 > 7', 'x > 2'],
      ['x, y', 'Variablen', 'Für Terme und Gleichungen mit Unbekannten', '(x + 5)(x + 2)', 'x² + 7x + 10'],
      ['xⁿ', 'Potenz', 'Beliebige Potenzen', '2¹⁰', '1024'],
      ['ⁿ√x', 'n-te Wurzel', 'Quadratwurzel, Kubikwurzel oder jede andere Wurzel', '³√27', '3'],
      ['¹⁄ₓ', 'Kehrwert', 'Bildet den Kehrwert einer Zahl', '1/4', '0,25'],
      ['|x|', 'Betrag', 'Abstand zur Null, immer positiv', '|−7|', '7'],
      ['log', 'Zehnerlogarithmus', 'Logarithmus zur Basis 10', 'log(1000)', '3'],
      ['x!', 'Fakultät', 'Multipliziert alle ganzen Zahlen von 1 bis x', '5!', '120'],
      ['i', 'Imaginäre Einheit', 'Für komplexe Zahlen', 'i²', '−1'],
      ['%', 'Prozent', 'Prozentrechnung', '19 % von 250', '47,5'],
    ],
  },
  {
    title: 'Trigonometrie',
    rows: [
      ['sin, cos, tan', 'Sinus, Kosinus, Tangens', 'Winkelfunktionen', 'sin(30°)', '0,5'],
      ['arcsin, arccos, arctan', 'Arkussinus, Arkuskosinus, Arkustangens', 'Bestimmt den Winkel aus einem Wert', 'arcsin(0,5)', '30°'],
      ['csc, sec, cot', 'Kosekans, Sekans, Kotangens', 'Kehrwerte von sin, cos und tan', 'sec(60°)', '2'],
      ['π', 'Kreiszahl Pi', 'Gespeicherte Konstante, 3,14159…', '2π', '6,2832'],
      ['x², x⁻¹', 'Quadrat, Kehrwert', 'Quadriert einen Wert oder bildet den Kehrwert', 'cos(60°)⁻¹', '2'],
      ['DEG / RAD', 'Gradmaß / Bogenmaß', 'Legt fest, wie Winkel gelesen werden', 'sin(π) im RAD-Modus', '0'],
    ],
  },
  {
    title: 'Analysis',
    rows: [
      ['d/dx', 'Ableitung', 'Leitet eine Funktion ab', 'd/dx x³', '3x²'],
      ['lim', 'Grenzwert', 'Grenzwert einer Funktion', 'lim x→0 sin(x)/x', '1'],
      ['lim⁺, lim⁻', 'Rechtsseitiger / linksseitiger Grenzwert', 'Grenzwert von rechts oder von links', 'lim x→0⁺ 1/x', '∞'],
      ['∫', 'Unbestimmtes Integral', 'Bestimmt die Stammfunktion', '∫ x² dx', 'x³/3 + C'],
      ['∫ᵇₐ', 'Bestimmtes Integral', 'Fläche unter einer Kurve zwischen zwei Grenzen', '∫₀² x² dx', '8/3 ≈ 2,667'],
      ['Σ', 'Summe', 'Addiert die Glieder einer Reihe', 'Σ k für k = 1 bis 10', '55'],
      ['C(n,k)', 'Binomialkoeffizient („n über k“)', 'Anzahl der Möglichkeiten, k aus n auszuwählen, ohne Reihenfolge', 'C(49, 6), Lotto 6 aus 49', '13.983.816'],
      ['P(n,k)', 'Variation ohne Wiederholung', 'Anzahl der Möglichkeiten, k aus n auszuwählen und anzuordnen', 'P(10, 3)', '720'],
      ['e, ∞', 'Eulersche Zahl, Unendlich', 'Konstanten für die Analysis', 'e', '2,71828…'],
    ],
  },
];

function SupportedFunctionsGuide() {
  return (
    <div className="supported-functions">
      <div className="supported-functions-intro">
        <h3>Unterstützte Funktionen mit Beispielen</h3>
        <p><em>Dieser Matherechner kann mehr als die Grundrechenarten. Er löst Gleichungen und Ungleichungen und berechnet Ableitungen, Grenzwerte, Integrale und Summen. Hier findest du alle Funktionen, sortiert nach den drei Reitern, jeweils mit einem Beispiel zum direkten Eintippen.</em></p>
      </div>

      {supportedFunctionGroups.map((group) => (
        <section className="supported-functions-group" key={group.title} aria-labelledby={`functions-${group.title.toLowerCase()}`}>
          <h4 id={`functions-${group.title.toLowerCase()}`}>{group.title}</h4>
          <div className="supported-functions-table-wrap" tabIndex={0} role="region" aria-label={`${group.title}: unterstützte Funktionen`}>
            <table className="supported-functions-table">
              <thead>
                <tr>
                  <th scope="col">Taste</th>
                  <th scope="col">Bezeichnung</th>
                  <th scope="col">Was sie macht</th>
                  <th scope="col">Beispiel</th>
                  <th scope="col">Ergebnis</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={`${group.title}-${row[0]}`}>
                    <th scope="row">{row[0]}</th>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td className="math-example">{row[3]}</td>
                    <td className="math-result">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <aside className="extended-keyboard-note">
        <span aria-hidden="true">⌨</span>
        <div>
          <h4>Erweiterte Tastatur</h4>
          <p>Über das Tastatur-Symbol im Eingabefeld öffnest du weitere Eingabemöglichkeiten: ln und exp, Brüche, ±, ≠, eckige Klammern, das komplette griechische Alphabet und eine Buchstabentastatur. So tippst du Formeln genau so ein, wie sie in deinem Schulbuch stehen.</p>
        </div>
      </aside>
    </div>
  );
}
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: site.name,
  url: site.url,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  datePublished: '2026-10-27T23:59:59+05:00',
  dateModified: '2026-10-27T23:59:59+05:00',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: site.url + '/' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main>
        {/* Hero + Calculator */}
        <section className="hero-section">
          <div className="page-shell">
            <h1>{hero.h1}</h1>
            <Calculator />
            <div className="intro-card">
              {hero.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <Image
              className="intro-followup-image"
              src="/Matherechner-online.webp"
              alt="Matherechner online: kostenloser wissenschaftlicher Taschenrechner für Wurzeln, Brüche, Prozentrechnung und Trigonometrie"
              width={1731}
              height={909}
              sizes="(max-width: 620px) calc(100vw - 28px), 680px"
            />
            <nav className="homepage-toc" aria-labelledby="homepage-toc-title">
              <div className="homepage-toc-heading">
                <span className="homepage-toc-icon" aria-hidden="true">≡</span>
                <div><span>Auf dieser Seite</span><h2 id="homepage-toc-title">Inhaltsverzeichnis</h2></div>
              </div>
              <ol>
                <li><a href="#vergleich"><span>01</span>Matherechner App im Vergleich</a></li>
                <li><a href="#funktionen"><span>02</span>Funktionen des Matherechners</a></li>
                <li><a href="#zielgruppen"><span>03</span>Für wen ist der Rechner geeignet?</a></li>
                <li><a href="#vorteile"><span>04</span>Vorteile des Online-Rechners</a></li>
                <li><a href="#anleitung"><span>05</span>So verwendest du den Matherechner</a></li>
                <li><a href="#weitere-rechner"><span>06</span>Weitere nützliche Rechner</a></li>
                <li><a href="#faq"><span>07</span>Häufig gestellte Fragen</a></li>
                <li><a href="#fazit"><span>08</span>Fazit</a></li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Was unterscheidet einen wissenschaftlichen Taschenrechner */}
        <ContentSection soft={sectionCompare.soft} h2={sectionCompare.h2} id="vergleich">
          <p>{sectionCompare.intro}</p>
          <HighlightGrid items={sectionCompare.comparison} variant="comparison" />
          <p style={{ marginTop: '18px' }}>{sectionCompare.conclusion}</p>
          <SupportedFunctionsGuide />
          <FunctionShowcaseSlider />
        </ContentSection>

        {/* Taschenrechner mit Wurzel, Pi und Klammern */}
        <ContentSection soft={sectionFunctions.soft} h2={sectionFunctions.h2} id="funktionen">
          <p>{sectionFunctions.intro}</p>
          <HighlightGrid items={sectionFunctions.subsections} variant="features" />

        </ContentSection>

        {/* Wer profitiert */}
        <ContentSection soft={sectionWho.soft} h2={sectionWho.h2} id="zielgruppen">
          <HighlightGrid items={sectionWho.highlights} variant="audience" />
        </ContentSection>

        {/* Warum Online > Physisch */}
        <ContentSection soft={sectionWhy.soft} h2={sectionWhy.h2} id="vorteile">
          {sectionWhy.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </ContentSection>

        {/* So verwenden Sie */}
        <ContentSection soft={sectionHow.soft} h2={sectionHow.h2} id="anleitung">
          <p>{sectionHow.intro}</p>
          <ol className="steps-list">
            {sectionHow.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
          <Image
            className="how-section-image"
            src="/Bildschirmfoto-6.webp"
            alt="Matherechner-Bedienung mit erweiterten mathematischen Eingabefunktionen"
            width={739}
            height={551}
            sizes="(max-width: 620px) 100vw, 888px"
          />
        </ContentSection>

        {/* Weitere nützliche Rechner */}
        <section className="content-section related-calculators-section" id="weitere-rechner">
          <div className="page-shell">
            <div className="related-calculators">
              <div className="related-calculators-heading">
                <h2>Weitere nützliche Rechner</h2>
                <p>Der oben gezeigte wissenschaftliche Taschenrechner eignet sich für alltägliche Berechnungen. Für spezielle Aufgaben bieten diese Spezialrechner Ihnen den vollständigen Lösungsweg und nicht nur das Ergebnis.</p>
              </div>
              <div className="related-calculator-grid">
                {specialCalculators.map((calculator) => (
                  <article className="related-calculator-card" key={calculator.href}>
                    <span className="related-calculator-icon" aria-hidden="true">{calculator.icon}</span>
                    <h3>{calculator.title}</h3>
                    <p>{calculator.description}</p>
                    <Link className="related-calculator-link" href={calculator.href} prefetch={false}>
                      {calculator.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <ContentSection soft={false} h2={faq.h2} id="faq">
          <FaqSection items={faq.items} />
        </ContentSection>

        {/* Conclusion */}
        <ContentSection soft={conclusion.soft} h2={conclusion.h2} id="fazit">
          <p>{conclusion.body}</p>
        </ContentSection>

        <section className="homepage-owner-section" aria-labelledby="homepage-owner-name">
          <div className="page-shell">
            <article className="homepage-owner-card">
              <div className="homepage-owner-photo">
                <Image
                  src="/profile-pic.webp"
                  alt="Julian von Berg, Betreiber von Matherechner"
                  width={480}
                  height={640}
                  sizes="(max-width: 620px) 112px, 156px"
                  loading="lazy"
                />
              </div>
              <div className="homepage-owner-content">
                <span className="homepage-owner-kicker">Hinter Matherechner</span>
                <h2 id="homepage-owner-name">Julian von Berg</h2>
                <p className="homepage-owner-role">Betreiber von Matherechner</p>
                <p>Julian von Berg betreut Matherechner mit dem Ziel, Schülerinnen, Schülern, Studierenden und allen, die im Alltag rechnen, ein verlässliches und leicht verständliches Werkzeug bereitzustellen. Er arbeitet kontinuierlich daran, die Rechner übersichtlich, zugänglich und praktisch zu gestalten, damit mathematische Aufgaben leichter nachvollziehbar werden.</p>
                <div className="homepage-owner-links">
                  <Link href="/ueber-uns/">Mehr über Matherechner <span aria-hidden="true">→</span></Link>
                  <Link href="/kontakt/">Kontakt aufnehmen</Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
