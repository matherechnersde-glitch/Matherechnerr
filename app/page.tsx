import type { Metadata } from 'next';
import { content } from '@/content/de';
import Calculator from '@/components/Calculator';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};
import ContentSection from '@/components/ContentSection';
import HighlightGrid from '@/components/HighlightGrid';
import FaqSection from '@/components/FaqSection';

const {
  site, hero,
  sectionCompare, sectionFunctions, sectionWho, sectionWhy, sectionHow,
  faq, conclusion,
} = content;

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: site.name,
  url: site.url,
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
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
          </div>
        </section>

        {/* Was unterscheidet einen wissenschaftlichen Taschenrechner */}
        <ContentSection soft={sectionCompare.soft} h2={sectionCompare.h2}>
          <p>{sectionCompare.intro}</p>
          <div className="highlight-grid highlight-grid-2col">
            {sectionCompare.comparison.map((item) => (
              <div key={item.h3}>
                <h3>{item.h3}</h3>
                <p>{item.p}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '18px' }}>{sectionCompare.conclusion}</p>
        </ContentSection>

        {/* Taschenrechner mit Wurzel, Pi und Klammern */}
        <ContentSection soft={sectionFunctions.soft} h2={sectionFunctions.h2}>
          <p>{sectionFunctions.intro}</p>
          <HighlightGrid items={sectionFunctions.subsections} />
        </ContentSection>

        {/* Wer profitiert */}
        <ContentSection soft={sectionWho.soft} h2={sectionWho.h2}>
          <HighlightGrid items={sectionWho.highlights} />
        </ContentSection>

        {/* Warum Online > Physisch */}
        <ContentSection soft={sectionWhy.soft} h2={sectionWhy.h2}>
          {sectionWhy.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </ContentSection>

        {/* So verwenden Sie */}
        <ContentSection soft={sectionHow.soft} h2={sectionHow.h2}>
          <ol className="steps-list">
            {sectionHow.steps.map((step, i) => <li key={i}>{step}</li>)}
          </ol>
        </ContentSection>

        {/* FAQ */}
        <ContentSection soft={false} h2={faq.h2} id="faq">
          <FaqSection items={faq.items} />
        </ContentSection>

        {/* Conclusion */}
        <ContentSection soft={conclusion.soft} h2={conclusion.h2}>
          <p>{conclusion.body}</p>
        </ContentSection>
      </main>
    </>
  );
}
