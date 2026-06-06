# Hung Nguyen — Portfolio

Premium personal portfolio website built with Next.js 15, TypeScript, TailwindCSS, Framer Motion, and next-intl.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion
- **i18n:** next-intl (English / Vietnamese)
- **UI:** shadcn/ui patterns + Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/en` or `/vi` based on browser language.

## Configuration

Update contact details and site URL in:

```
src/config/site.ts
```

Add your resume PDF to:

```
public/resume.pdf
```

## Routes

| Route | Description |
|-------|-------------|
| `/en` | English homepage |
| `/vi` | Vietnamese homepage |
| `/en/projects` | English projects page |
| `/vi/projects` | Vietnamese projects page |

## Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/[locale]/       # Localized pages
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Page sections
│   ├── motion/         # Animation utilities
│   └── ui/             # shadcn/ui components
├── config/             # Site configuration
├── i18n/               # next-intl routing
└── lib/                # Utilities & SEO
messages/
├── en.json             # English translations
└── vi.json             # Vietnamese translations
```

## SEO

- Metadata, OpenGraph, Twitter Cards
- JSON-LD structured data
- Sitemap (`/sitemap.xml`)
- Robots (`/robots.txt`)
- hreflang alternate links

## License

Private — All rights reserved.
