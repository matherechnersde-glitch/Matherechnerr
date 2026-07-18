import type { Metadata } from 'next';
import ContentSection from '@/components/ContentSection';
import HighlightGrid from '@/components/HighlightGrid';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: content.pages.ueber.title,
  description: 'Erfahren Sie mehr über die Mission hinter Matherechner – dem kostenlosen wissenschaftlichen Online-Taschenrechner ohne Download, Konto oder Werbung.',
  alternates: { canonical: '/ueber-uns/' },
  openGraph: {
    url: '/ueber-uns/',
    description: 'Erfahren Sie mehr über die Mission hinter Matherechner – dem kostenlosen wissenschaftlichen Online-Taschenrechner ohne Download, Konto oder Werbung.',
  },
};

const values = [
  {
    h3: 'Kostenlos & offen',
    p: 'Matherechner ist und bleibt kostenlos. Kein Abo, kein Konto, kein Paywall. Jede Funktion steht jedem Nutzer sofort und vollständig zur Verfügung.',
  },
  {
    h3: 'Datenschutzfreundlich',
    p: 'Wir sammeln keine Nutzerdaten. Kein Tracking, keine Cookies von Drittanbietern. Ihr Berechnungsverlauf bleibt ausschließlich in Ihrem Browser.',
  },
  {
    h3: 'Ständig verfügbar',
    p: 'Als reine Browser-Anwendung ist der Rechner auf jedem Gerät sofort einsatzbereit – kein Download, keine Installation, keine Updates nötig.',
  },
];

export default function UeberUnsPage() {
  return (
    <main>
      <section className="legal-hero hero-section">
        <div className="page-shell">
          <h1>{content.pages.ueber.h1}</h1>
        </div>
      </section>

      <ContentSection soft={false} h2="Was ist Matherechner?">
        <p>
          Matherechner ist ein kostenloser, wissenschaftlicher Online-Taschenrechner, der direkt im Browser läuft. Er wurde entwickelt, um die Lücke zwischen dem einfachen Standardrechner auf dem Smartphone und dem teuren physischen Taschenrechner für die Schule zu schließen.
        </p>
        <p>
          Von der einfachen Prozentrechnung über Quadratwurzeln und Potenzen bis hin zu trigonometrischen Funktionen, Logarithmen und Gleichungslösungen – Matherechner bietet das vollständige Werkzeugset, das Schüler, Studenten und Berufstätige im Alltag benötigen, ohne einen Cent dafür ausgeben zu müssen.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="Unsere Mission">
        <p>
          Mathematik sollte für jeden zugänglich sein – unabhängig davon, ob man ein teures Schulgerät besitzt oder nicht. Unsere Mission ist es, leistungsstarke Rechenwerkzeuge kostenlos und barrierefrei im Internet bereitzustellen.
        </p>
        <p>
          Wir glauben, dass ein guter Taschenrechner keine Schubladenware sein sollte. Er sollte immer in der Tasche sein – auf dem Smartphone, dem Tablet oder dem Laptop – und sofort reagieren, wenn man ihn braucht.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Unsere Werte">
        <HighlightGrid items={values} />
      </ContentSection>

      <ContentSection soft={true} h2="Für wen ist Matherechner gedacht?">
        <p>
          Matherechner richtet sich an alle, die schnell, zuverlässig und kostenlos rechnen möchten:
        </p>
        <ul className="feature-list" style={{ gridTemplateColumns: '1fr', marginBottom: '14px' }}>
          <li><strong>Schüler und Studenten</strong> – für Hausaufgaben, Prüfungsvorbereitung und das schnelle Nachprüfen von Ergebnissen</li>
          <li><strong>Lehrer</strong> – für Demonstrationen im Unterricht und das einfache Projizieren von Berechnungen</li>
          <li><strong>Berufstätige</strong> – für Zinsberechnungen, Rabattermittlungen, Gehaltsanalysen und mehr</li>
          <li><strong>Neugierige</strong> – für alle, die einfach mal Pi auf 14 Stellen ausrechnen oder Trigonometrie ausprobieren möchten</li>
        </ul>
      </ContentSection>

      <ContentSection soft={false} h2="Technik im Hintergrund">
        <p>
          Der Taschenrechner basiert auf der bewährten Open-Source-Bibliothek <strong>math.js</strong>, die präzise numerische Berechnungen ermöglicht. Die gesamte Website ist als statische Next.js-Anwendung aufgebaut und benötigt keinen Server für Berechnungen – alles läuft direkt in Ihrem Browser, was Geschwindigkeit und Datenschutz garantiert.
        </p>
        <p>
          Haben Sie Feedback, einen Fehler entdeckt oder möchten einfach Hallo sagen? Schreiben Sie uns über unsere{' '}
          <a href="/kontakt/" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Kontaktseite</a>.
        </p>
      </ContentSection>
    </main>
  );
}
