import { HighlightItem } from '@/content/de';

interface Props {
  items: HighlightItem[];
}

export default function HighlightGrid({ items }: Props) {
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
