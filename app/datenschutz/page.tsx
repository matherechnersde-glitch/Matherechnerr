import type { Metadata } from 'next';
import ContentSection from '@/components/ContentSection';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: content.pages.datenschutz.title,
  description: 'Datenschutzerklärung von Matherechner: keine Tracking-Cookies, kein Google Analytics, DSGVO-konform. Ihr Rechenverlauf bleibt ausschließlich im lokalen Browser-Speicher.',
  alternates: { canonical: '/datenschutz/' },
  openGraph: { url: '/datenschutz/' },
};

export default function DatenschutzPage() {
  return (
    <main>
      <section className="legal-hero hero-section">
        <div className="page-shell">
          <h1>{content.pages.datenschutz.h1}</h1>
        </div>
      </section>

      <ContentSection soft={false} h2="Verantwortlicher">
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist der Betreiber von matherechnerr.de. Kontaktdaten finden Sie auf der{' '}
          <a href="/impressum/" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Impressum-Seite</a>.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="Welche Daten wir verarbeiten">
        <p>
          Wir legen großen Wert auf Datensparsamkeit. Matherechner erhebt und verarbeitet <strong>keine personenbezogenen Daten</strong> wie Name, E-Mail-Adresse oder IP-Adresse, solange Sie den Taschenrechner ohne Kontaktaufnahme nutzen.
        </p>
        <p>
          Der Online-Taschenrechner selbst speichert Ihren Berechnungsverlauf ausschließlich im lokalen Speicher (<strong>localStorage</strong>) Ihres Browsers. Diese Daten verlassen Ihren Browser zu keiner Zeit und werden nicht an unsere Server übertragen. Sie können den Verlauf jederzeit über die Schaltfläche „Verlauf löschen" im Rechner entfernen.
        </p>
        <p>
          Wenn Sie unser Kontaktformular verwenden, speichern wir die von Ihnen übermittelten Daten (Name, E-Mail-Adresse, Nachricht) ausschließlich zur Bearbeitung Ihrer Anfrage. Diese Daten werden nicht an Dritte weitergegeben und nach vollständiger Bearbeitung gelöscht.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Cookies und lokaler Speicher">
        <p>
          Diese Website verwendet <strong>keine Tracking-Cookies</strong> und setzt keine Cookies von Drittanbietern ein. Es werden weder Analyse-Tools wie Google Analytics noch Werbenetzwerke eingesetzt.
        </p>
        <p>
          Der Taschenrechner nutzt das <code>localStorage</code>-Feature Ihres Browsers, um Ihren Rechenverlauf zu speichern. Dies ist technisch notwendig für die Verlauf-Funktion und dient keinen Tracking-Zwecken. <code>localStorage</code>-Daten können Sie jederzeit in den Browser-Einstellungen löschen.
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="Schriftarten und externe Ressourcen">
        <p>
          Die auf dieser Website verwendete Schriftart <strong>Inter</strong> wird <em>selbst gehostet</em> und bei keinem Drittanbieter (z. B. Google Fonts) abgerufen. Es werden daher beim Laden der Seite keine Verbindungen zu externen Font-Servern hergestellt, die Ihre IP-Adresse übermitteln würden.
        </p>
        <p>
          Alle weiteren Ressourcen (JavaScript, CSS, Bilder) werden ausschließlich von unseren eigenen Servern geladen.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Rechtsgrundlagen der Verarbeitung">
        <p>
          Soweit wir personenbezogene Daten verarbeiten, erfolgt dies auf Basis folgender Rechtsgrundlagen:
        </p>
        <ul className="feature-list" style={{ gridTemplateColumns: '1fr', marginBottom: '14px' }}>
          <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Verarbeitung zur Durchführung vorvertraglicher Maßnahmen bzw. zur Erfüllung eines Vertrags (z. B. bei Kontaktanfragen)</li>
          <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Verarbeitung zur Wahrung berechtigter Interessen des Betreibers (z. B. technisch notwendiger lokaler Speicher des Rechners)</li>
        </ul>
      </ContentSection>

      <ContentSection soft={true} h2="Ihre Rechte nach der DSGVO">
        <p>Als betroffene Person haben Sie gegenüber uns folgende Rechte:</p>
        <ul className="feature-list" style={{ gridTemplateColumns: '1fr', marginBottom: '14px' }}>
          <li><strong>Auskunftsrecht (Art. 15 DSGVO)</strong> – Sie können Auskunft über die zu Ihrer Person gespeicherten Daten verlangen.</li>
          <li><strong>Berichtigungsrecht (Art. 16 DSGVO)</strong> – Sie können die Berichtigung unrichtiger Daten verlangen.</li>
          <li><strong>Recht auf Löschung (Art. 17 DSGVO)</strong> – Sie können unter bestimmten Voraussetzungen die Löschung Ihrer Daten verlangen.</li>
          <li><strong>Recht auf Einschränkung (Art. 18 DSGVO)</strong> – Sie können die Einschränkung der Verarbeitung verlangen.</li>
          <li><strong>Widerspruchsrecht (Art. 21 DSGVO)</strong> – Sie können der Verarbeitung Ihrer Daten widersprechen.</li>
          <li><strong>Beschwerderecht</strong> – Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</li>
        </ul>
        <p>
          Zur Wahrnehmung Ihrer Rechte wenden Sie sich bitte über die{' '}
          <a href="/kontakt/" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Kontaktseite</a> an uns.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den aktuellen rechtlichen Anforderungen anzupassen oder um Änderungen unserer Dienste zu berücksichtigen. Die jeweils aktuelle Version ist auf dieser Seite abrufbar. Stand: Juli 2026.
        </p>
      </ContentSection>
    </main>
  );
}
