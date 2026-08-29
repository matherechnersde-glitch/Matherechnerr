import Link from 'next/link';

interface HeaderContent {
  navLinks: Array<{ label: string; href: string }>;
}

export default function Header({ content }: { content: HeaderContent }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/">
          <img src="/Matherechnerr-logo.webp" alt="Matherechner – kostenloser Online-Taschenrechner" className="site-logo site-logo--header" loading="eager" />
        </Link>
        <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-hidden="true" />
        <label htmlFor="nav-toggle" className="hamburger" aria-label="Navigation öffnen"><span></span><span></span><span></span></label>
        <nav className="header-nav" aria-label="Hauptnavigation">
          <Link href="/">Matherechner</Link>
          <div className="nav-dropdown">
            <button className="nav-dropdown-trigger" type="button" aria-haspopup="true">Rechner <span aria-hidden="true">⌄</span></button>
            <div className="nav-dropdown-menu"><Link href="/prozentrechner/">Prozentrechner</Link><Link href="/matherechner-pi/">Matherechner Pi</Link><Link href="/matherechner-modulo/">Modulo</Link><Link href="/hoai-rechner/">HOAI</Link></div>
          </div>
          <Link href="/blog/">Blog</Link>
          {content.navLinks.filter((link) => link.href !== '/').map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
