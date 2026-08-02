import { HighlightItem } from '@/content/de';

interface Props {
  items: HighlightItem[];
  variant?: 'default' | 'features';
}

const featureIcons = [
  <path key="root" d="M5 13h3l2 5 4-12h5" />,
  <><circle key="circle" cx="12" cy="12" r="7" /><path key="pi" d="M8 9h8M10 9v7m5-7v7" /></>,
  <><path key="fraction" d="m8 17 8-10M7 8h.01M17 16h.01" /><path key="line" d="M6 12h12" /></>,
  <path key="wave" d="M4 12c2.5-6 5.5-6 8 0s5.5 6 8 0" />,
  <><path key="percent" d="m7 17 10-10" /><circle key="top" cx="8" cy="8" r="2" /><circle key="bottom" cx="16" cy="16" r="2" /></>,
];

export default function HighlightGrid({ items, variant = 'default' }: Props) {
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
