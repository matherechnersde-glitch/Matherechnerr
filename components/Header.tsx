'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface HeaderContent {
  navLinks: Array<{ label: string; href: string }>;
}

export default function Header({ content }: { content: HeaderContent }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link prefetch={false} className="brand" href="/" onClick={() => setMenuOpen(false)}>
          <img src="/Matherechnerr-logo.webp" alt="Matherechner – kostenloser Online-Taschenrechner" className="site-logo site-logo--header" width="400" height="170" loading="eager" fetchPriority="high" decoding="async" />
        </Link>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-hidden="true" checked={menuOpen} onChange={(event) => setMenuOpen(event.target.checked)} />
        <label htmlFor="nav-toggle" className="hamburger" aria-label={menuOpen ? 'Navigation schließen' : 'Navigation öffnen'} aria-expanded={menuOpen} aria-controls="main-navigation"><span></span><span></span><span></span></label>
        <nav id="main-navigation" className="header-nav" aria-label="Hauptnavigation" onClick={(event) => {
          if ((event.target as HTMLElement).closest('a')) setMenuOpen(false);
        }}>
          <Link prefetch={false} href="/">Matherechner</Link>
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger" type="button" aria-haspopup="true">Rechner <span aria-hidden="true">⌄</span></button>
            <div className="nav-dropdown-menu"><Link prefetch={false} href="/prozentrechner/">Prozentrechner</Link><Link prefetch={false} href="/matherechner-pi/">Matherechner Pi</Link><Link prefetch={false} href="/matherechner-modulo/">Modulo</Link><Link prefetch={false} href="/hoai-rechner/">HOAI</Link><Link prefetch={false} href="/ableitungsrechner/">Ableitungsrechner</Link><Link prefetch={false} href="/integralrechner/">Integralrechner</Link><Link prefetch={false} href="/pythagoras-rechner/">Pythagoras Rechner</Link><Link prefetch={false} href="/bruchrechner/">Bruchrechner</Link><Link prefetch={false} href="/massstabsrechner/">Maßstabsrechner</Link></div>
          </div>
          <Link prefetch={false} href="/blog/">Blog</Link>
          {content.navLinks.filter((link) => link.href !== '/').map((link) => <Link prefetch={false} key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
