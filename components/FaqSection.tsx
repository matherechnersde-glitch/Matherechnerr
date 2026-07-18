import { FaqItem } from '@/content/de';

interface Props {
  items: FaqItem[];
}

export default function FaqSection({ items }: Props) {
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
