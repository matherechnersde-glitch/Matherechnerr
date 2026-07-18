# Matherechner – Next.js 14 Static Site

Production-grade static site built with Next.js 14 App Router, TypeScript, and full static export (`output: 'export'`).

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Fonts**: Inter via `next/font/google` (self-hosted, font-display swap)
- **Calculator engine**: [mathjs](https://mathjs.org/) v12 (bundled via npm, dynamic import – never blocks first paint)
- **Rendering**: 100% server-side static HTML except the Calculator client component
- **Export**: Fully static – no server runtime required

## Project Structure

```
app/
  globals.css          CSS from original (Inter loaded via CSS var --font-inter)
  layout.tsx           Root layout: Header, Footer, metadata, hreflang, Org/WebSite JSON-LD
  page.tsx             Homepage: all sections, WebApplication + FAQPage + BreadcrumbList JSON-LD
  not-found.tsx        404 page styled with the same design system
  sitemap.ts           Generates /sitemap.xml
  robots.ts            Generates /robots.txt
  icon.svg             SVG favicon (auto-picked up by Next.js)
  impressum/page.tsx   Impressum legal page (TODO placeholder)
  datenschutz/page.tsx Datenschutzerklärung legal page (TODO placeholder)
  kontakt/page.tsx     Contact page (TODO placeholder)

components/
  Header.tsx           Sticky header with brand + nav (server)
  Footer.tsx           Footer with nav columns + social (server)
  Calculator.tsx       ★ The only client component — full calculator engine
  ContentSection.tsx   Section wrapper (white / #f3f6ff alternation)
  FeatureList.tsx      2-column bullet grid
  HighlightGrid.tsx    3-column highlight cards
  FaqSection.tsx       Native <details>/<summary> FAQ (no JS)

content/
  de.ts                ★ Single source of truth for ALL page copy
                         Swap this one file to switch to German content
```

## Commands

```bash
npm install      # install dependencies
npm run dev      # development server (http://localhost:3000)
npm run build    # production build + static export → /out folder
```

The `out/` folder is fully static and can be deployed anywhere.

## Deploy

### Vercel (recommended)
```bash
npx vercel --prod
```
Vercel detects Next.js automatically. With `output: 'export'`, it serves from the `out/` directory.

### Any static host (Netlify, Cloudflare Pages, GitHub Pages, etc.)
1. Run `npm run build`
2. Upload the `out/` directory
3. Configure the host to serve `404.html` for missing routes

### Apache / Nginx
Point document root at `out/`. Configure 404 to serve `out/404.html`.

## German Content Swap

All page copy lives in **`content/de.ts`**. To swap to final German text:

1. Open `content/de.ts`
2. Replace every string value (hero, sections, faq, footer, page metadata, etc.)
3. Look for `// TODO` comments — those mark the fields most urgently needing translation:
   - `site.title` — page `<title>` and OG title
   - `site.description` — meta description
4. Run `npm run build` to verify

No component files need to change — only `content/de.ts`.

## TODO Before Launch

- [ ] `content/de.ts` — replace all `// TODO` fields with final German copy
- [ ] `app/impressum/page.tsx` — replace placeholder with real Impressum (required §5 TMG)
- [ ] `app/datenschutz/page.tsx` — replace placeholder with real DSGVO-compliant privacy policy
- [ ] `app/kontakt/page.tsx` — add real contact form or contact details
- [ ] `app/favicon.ico` — add a real `.ico` file (16×16 + 32×32)
- [ ] `app/apple-icon.png` — add 180×180 PNG for Apple devices
- [ ] `public/og-image.svg` — replace with a 1200×630 **PNG** (`/og-image.png`) and update `content/de.ts` `ogImage` field
- [ ] Register domain matherechners.de and point DNS to host
- [ ] Submit sitemap to Google Search Console after launch

## SEO Features

- Metadata API: title template, canonical, Open Graph, Twitter card
- hreflang `de` + `x-default` self-referencing alternate tags
- JSON-LD structured data (server-rendered):
  - `WebApplication` (UtilityApplication, free, operatingSystem: Any)
  - `FAQPage` (generated from `content/de.ts` — single source of truth)
  - `Organization` + `WebSite`
  - `BreadcrumbList`
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- Semantic HTML: one `<h1>`, logical heading hierarchy, `<main>`, `<header>`, `<footer>`, `<nav aria-label>`
- FAQ uses native `<details>`/`<summary>` — zero JS, keyboard accessible

## Performance

- Inter font self-hosted via next/font (no external font requests, font-display: swap)
- mathjs code-split with `dynamic import()` — never blocks first paint
- Calculator HTML rendered in static output (no CLS on hydration)
- All content sections are server components (zero JS sent for them)
