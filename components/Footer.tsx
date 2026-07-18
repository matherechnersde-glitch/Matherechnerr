import Link from 'next/link';

interface FooterContent {
  tagline: string;
  pagesNav: { h3: string; links: Array<{ label: string; href: string }> };
  legalNav: { h3: string; links: Array<{ label: string; href: string }> };
  bottomLinks: Array<{ label: string; href: string }>;
  copyright: string;
}

export default function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-panel">
        <div className="footer-brand">
          <img
            src="/Matherechnerr-logo.webp"
            alt="Matherechner – Online-Taschenrechner"
            className="site-logo site-logo--footer"
            loading="lazy"
          />
          <p>{content.tagline}</p>
        </div>

        <div className="footer-col">
          <h3>{content.pagesNav.h3}</h3>
          {content.pagesNav.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h3>{content.legalNav.h3}</h3>
          {content.legalNav.links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        {content.bottomLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
        <span>{content.copyright}</span>
      </div>
    </footer>
  );
}
