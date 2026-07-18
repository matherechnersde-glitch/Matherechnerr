import { ReactNode } from 'react';

interface Props {
  soft?: boolean;
  h2: string;
  id?: string;
  children: ReactNode;
}

export default function ContentSection({ soft, h2, id, children }: Props) {
  return (
    <section id={id} className={`content-section${soft ? ' soft' : ''}`}>
      <div className="section-card">
        <h2>{h2}</h2>
        {children}
      </div>
    </section>
  );
}
