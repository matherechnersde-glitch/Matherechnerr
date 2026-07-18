import Link from 'next/link';

interface HeaderContent {
  navLinks: Array<{ label: string; href: string }>;
}

export default function Header({ content }: { content: HeaderContent }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/">
          <img
            src="/Matherechnerr-logo.webp"
            alt="Matherechner – kostenloser Online-Taschenrechner"
            className="site-logo site-logo--header"
            loading="eager"
          />
        </Link>

        {/* CSS-only hamburger — no JS needed */}
        <input type="checkbox" id="nav-toggle" className="nav-toggle" aria-hidden="true" />
        <label htmlFor="nav-toggle" className="hamburger" aria-label="Navigation öffnen">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <nav className="header-nav" aria-label="Primary navigation">
          {content.navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
