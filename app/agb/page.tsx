import type { Metadata } from 'next';
import ContentSection from '@/components/ContentSection';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: content.pages.agb.title,
  description: 'Allgemeine Geschäftsbedingungen für die Nutzung des kostenlosen Online-Taschenrechners Matherechner – transparent, ohne Registrierung, ohne versteckte Kosten.',
  alternates: { canonical: '/agb/' },
  openGraph: { url: '/agb/' },
};

export default function AgbPage() {
  return (
    <main>
      <section className="legal-hero hero-section">
        <div className="page-shell">
          <h1>{content.pages.agb.h1}</h1>
        </div>
      </section>

      <ContentSection soft={false} h2="§ 1 Geltungsbereich und Nutzung">
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für die Nutzung des kostenlosen Online-Taschenrechners auf <strong>matherechnerr.de</strong>. Mit dem Zugriff auf diese Website erklären Sie sich mit den nachfolgenden Bedingungen einverstanden.
        </p>
        <p>
          Der Taschenrechner steht jedem Nutzer kostenlos zur Verfügung. Eine Registrierung, ein Benutzerkonto oder eine Anmeldung ist nicht erforderlich. Es gelten keinerlei Nutzungsentgelte.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="§ 2 Leistungsumfang">
        <p>
          Matherechner stellt einen wissenschaftlichen Online-Taschenrechner bereit, der folgende Berechnungen ermöglicht:
        </p>
        <ul className="feature-list" style={{ gridTemplateColumns: '1fr', marginBottom: '14px' }}>
          <li>Grundrechenarten und Klammern</li>
          <li>Quadratwurzeln, Kubikwurzeln und beliebige Potenzen</li>
          <li>Trigonometrische Funktionen (Sinus, Kosinus, Tangens) im Grad- und Radiantenmodus</li>
          <li>Logarithmen, Pi-Berechnungen und Exponentialfunktionen</li>
          <li>Prozentrechnung und Brüche</li>
          <li>Gleichungslösung und Verlaufsfunktion</li>
        </ul>
        <p>
          Wir behalten uns vor, den Funktionsumfang jederzeit zu erweitern, zu ändern oder einzelne Funktionen einzustellen, ohne dass daraus Ansprüche des Nutzers entstehen.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="§ 3 Haftungsausschluss">
        <p>
          Die durch den Taschenrechner erzeugten Ergebnisse werden nach bestem Wissen und Gewissen bereitgestellt. Dennoch können wir keine <strong>Garantie für die absolute Richtigkeit</strong> der Berechnungsergebnisse übernehmen, insbesondere bei sehr komplexen oder verschachtelten Ausdrücken.
        </p>
        <p>
          Matherechner haftet nicht für Schäden, die aus der Verwendung von Berechnungsergebnissen in rechtlichen, medizinischen, technischen oder finanziellen Entscheidungen entstehen. Für wichtige Berechnungen empfehlen wir, die Ergebnisse durch eine weitere Quelle zu prüfen.
        </p>
        <p>
          Die Verfügbarkeit der Website wird nicht garantiert. Wartungsarbeiten oder technische Störungen können zu vorübergehenden Ausfällen führen.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="§ 4 Urheberrecht und geistiges Eigentum">
        <p>
          Sämtliche Inhalte dieser Website – einschließlich Texte, Grafiken, Code und Design – sind urheberrechtlich geschützt. Eine Vervielfältigung, Verbreitung oder öffentliche Wiedergabe ohne vorherige schriftliche Genehmigung des Betreibers ist untersagt.
        </p>
        <p>
          Der Taschenrechner verwendet die Open-Source-Bibliothek <strong>math.js</strong> (Apache-2.0-Lizenz) sowie die Schriftart <strong>Inter</strong> (SIL Open Font License). Die Lizenzangaben dieser Drittanbieter bleiben unberührt.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="§ 5 Unzulässige Nutzung">
        <p>
          Die missbräuchliche Nutzung der Website – insbesondere durch automatisierte Massenanfragen (Bots, Scraper), das gezielte Herbeiführen von Serverausfällen oder der Versuch, in die technische Infrastruktur einzudringen – ist untersagt und kann rechtliche Konsequenzen haben.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="§ 6 Änderungen der AGB">
        <p>
          Wir behalten uns vor, diese AGB jederzeit zu ändern. Änderungen werden auf dieser Seite veröffentlicht. Durch die weitere Nutzung der Website nach einer Änderung stimmen Sie den aktualisierten Bedingungen zu. Stand: Juli 2026.
        </p>
        <p>
          Bei Fragen zu diesen AGB wenden Sie sich bitte an uns über die{' '}
          <a href="/kontakt/" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Kontaktseite</a>.
        </p>
      </ContentSection>
    </main>
  );
}
