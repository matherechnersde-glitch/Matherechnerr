import { HighlightItem } from '@/content/de';

interface Props {
  items: HighlightItem[];
  variant?: 'default' | 'features' | 'comparison';
}

const featureIcons = [
  <path key="root" d="M5 13h3l2 5 4-12h5" />,
  <><circle key="circle" cx="12" cy="12" r="7" /><path key="pi" d="M8 9h8M10 9v7m5-7v7" /></>,
  <><path key="fraction" d="m8 17 8-10M7 8h.01M17 16h.01" /><path key="line" d="M6 12h12" /></>,
  <path key="wave" d="M4 12c2.5-6 5.5-6 8 0s5.5 6 8 0" />,
  <><path key="percent" d="m7 17 10-10" /><circle key="top" cx="8" cy="8" r="2" /><circle key="bottom" cx="16" cy="16" r="2" /></>,
];

export default function HighlightGrid({ items, variant = 'default' }: Props) {
  if (variant === 'comparison') {
    return (
      <div className="comparison-card-grid">
        {items.map((item, index) => (
          <article key={item.h3} className={'comparison-card comparison-card-' + (index === 0 ? 'basic' : 'scientific')}>
            <div className="comparison-card-top">
              <div className="comparison-card-icon" aria-hidden="true">
                {index === 0 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 7h6M7 4v6M14 7h6M4 17h6M14 14l6 6M20 14l-6 6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 16c2.2-6 4.8-6 7 0s4.8 6 7 0M15 7h6M18 4v6" />
                  </svg>
                )}
              </div>
              <span className="comparison-card-label">{index === 0 ? 'Basis' : 'Erweitert'}</span>
            </div>
            <h3>{item.h3}</h3>
            <p>{item.p}</p>
          </article>
        ))}
      </div>
    );
  }

  if (variant === 'features') {
    return (
      <ol className="feature-card-list">
        {items.map((item, index) => (
          <li key={item.h3} className="feature-card">
            <div className="feature-card-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {featureIcons[index]}
              </svg>
            </div>
            <div className="feature-card-copy">
              <span className="feature-card-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.h3}</h3>
              <p>{item.p}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <div className="highlight-grid">
      {items.map((item) => (
        <div key={item.h3}>
          <h3>{item.h3}</h3>
          <p>{item.p}</p>
        </div>
      ))}
    </div>
  );
}
