import type { Metadata } from 'next';
import ContentSection from '@/components/ContentSection';
import { content } from '@/content/de';

export const metadata: Metadata = {
  title: content.pages.impressum.title,
  description: 'Impressum von Matherechner gemäß § 5 TMG – rechtliche Angaben zum Betreiber des kostenlosen Online-Taschenrechners matherechnerr.de.',
  alternates: { canonical: '/impressum/' },
  openGraph: { url: '/impressum/' },
};

export default function ImpressumPage() {
  return (
    <main>
      <section className="legal-hero hero-section">
        <div className="page-shell">
          <h1>{content.pages.impressum.h1}</h1>
        </div>
      </section>

      <ContentSection soft={false} h2="Angaben gemäß § 5 TMG">
        <p>
          <strong>TODO: Name des Betreibers / Unternehmens</strong><br />
          Musterstraße 1<br />
          12345 Musterstadt<br />
          Deutschland
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="Kontakt">
        <p>
          E-Mail: <a href="/kontakt/" style={{ color: 'var(--blue)' }}>Kontaktformular</a><br />
          <strong>TODO: Telefonnummer (optional)</strong>
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <p>
          <strong>TODO: Name und vollständige Anschrift der verantwortlichen Person</strong>
        </p>
      </ContentSection>

      <ContentSection soft={true} h2="Haftungsausschluss">
        <p>
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
        </p>
        <p>
          Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
      </ContentSection>

      <ContentSection soft={false} h2="Urheberrecht">
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </ContentSection>
    </main>
  );
}
