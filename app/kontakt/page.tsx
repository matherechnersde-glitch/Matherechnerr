import type { Metadata } from 'next';
import ContentSection from '@/components/ContentSection';
import HighlightGrid from '@/components/HighlightGrid';
import ContactForm from '@/components/ContactForm';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: content.pages.kontakt.title,
  description: 'Kontakt mit dem Matherechner-Team aufnehmen – für Feedback, Fehlermeldungen oder Fragen. Wir antworten in der Regel innerhalb von 1–3 Werktagen.',
  alternates: { canonical: '/kontakt/' },
  openGraph: {
    url: '/kontakt/',
    description: 'Kontakt mit dem Matherechner-Team aufnehmen – für Feedback, Fehlermeldungen oder Fragen.',
  },
};

const channels = [
  {
    h3: 'Allgemeine Anfragen',
    p: 'Für Fragen rund um den Taschenrechner, Funktionswünsche oder Anmerkungen zur Website stehen wir gerne zur Verfügung.',
  },
  {
    h3: 'Datenschutz & Rechtliches',
    p: 'Für Anfragen zu Ihrer Datenschutzerklärung, Auskunftsersuchen nach DSGVO oder rechtliche Angelegenheiten nutzen Sie bitte das Kontaktformular mit dem Betreff „Datenschutz".',
  },
  {
    h3: 'Technischer Support',
    p: 'Haben Sie einen Rechenfehler entdeckt oder funktioniert etwas nicht wie erwartet? Beschreiben Sie das Problem so genau wie möglich – wir kümmern uns darum.',
  },
];

export default function KontaktPage() {
  return (
    <main>
      <section className="legal-hero hero-section">
        <div className="page-shell">
          <h1>{content.pages.kontakt.h1}</h1>
        </div>
      </section>

      <ContentSection soft={false} h2="So erreichen Sie uns">
        <p>
          Wir freuen uns über Ihre Nachricht – egal ob Feedback, Fehlerhinweis, Kooperationsanfrage oder Frage zum Datenschutz. Nutzen Sie das Formular weiter unten oder senden Sie uns eine E-Mail. Wir antworten in der Regel innerhalb von 1–3 Werktagen.
        </p>
        <HighlightGrid items={channels} />
      </ContentSection>

      <ContentSection soft={true} h2="Nachricht senden">
        <ContactForm />
        <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>
          Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.
          Weitere Informationen finden Sie in unserer{' '}
          <a href="/datenschutz/" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>Datenschutzerklärung</a>.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Häufig gestellte Fragen">
        <p>
          Bevor Sie uns kontaktieren, lohnt sich möglicherweise ein Blick in unsere{' '}
          <a href="/#faq" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>FAQ-Sektion</a>{' '}
          auf der Startseite – viele häufige Fragen zur Nutzung des Taschenrechners sind dort bereits beantwortet.
        </p>
      </ContentSection>
    </main>
  );
}
