# Relicsol — Next.js 14 marketing site

Web design, custom software, AI automation and SEO agency site for Relicsol. Full server-side-rendered content, real per-page metadata, JSON-LD schema on every route, and the original Three.js icosahedron hero preserved.

## Stack

- **Next.js 14.2 App Router** with TypeScript
- **React 18.3**, Tailwind CSS + custom CSS
- **`next/font/google`** for Syne, Plus Jakarta Sans, JetBrains Mono (self-hosted, `display: 'swap'`)
- **`next/image`** for all bitmap and SVG assets
- **Three.js r128** loaded via CDN on the homepage only (dynamic import, `ssr: false`), pauses when off-screen or tab is hidden
- **Resend** for contact-form email
- No CSS-in-JS libraries. Inline `style` props and Tailwind classes only.
- No analytics scripts. Add GA4/GTM yourself in `app/layout.tsx` when ready.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in RESEND_API_KEY when ready
npm run dev
# → http://localhost:3000
```

Build for production:

```bash
npm run build
npm run start
```

Typecheck without emitting:

```bash
npm run typecheck
```

## Environment

`.env.local`:

| Var                    | Purpose                                                        | Required |
|------------------------|----------------------------------------------------------------|----------|
| `RESEND_API_KEY`       | Send contact-form email via Resend. Falls back to console log if unset. | prod    |
| `RESEND_FROM`          | Verified sender (e.g. `Relicsol Website <noreply@relicsol.com>`) | optional |
| `CONTACT_TO`           | Notification recipient. Defaults to `info@relicsol.com`.       | optional |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and JSON-LD.               | prod     |

## Structure

```
app/
  layout.tsx            root layout, metadata, fonts, Organization/WebSite JSON-LD
  page.tsx              homepage server wrapper (metadata + JSON-LD)
  HomeClient.tsx        the interactive homepage sections
  template.tsx          page fade transition
  globals.css           base + animation keyframes
  sitemap.ts / robots.ts
  not-found.tsx         404
  privacy/ terms/       policy stubs
  about/ contact/       static pages
  contact/ContactForm.tsx
  api/contact/route.ts  Resend endpoint with dev fallback
  portfolio/
    page.tsx + PortfolioClient.tsx  (filter tabs synced to ?filter=)
    [slug]/page.tsx     18 case studies, generateStaticParams
  blog/
    page.tsx + BlogClient.tsx  (category filter synced to ?category=)
    [slug]/page.tsx     10 blog posts, generateStaticParams
  services/
    [slug]/page.tsx     4 services (web-design-development, software-development, ai-automation, seo-services)
    [slug]/ServiceFAQClient.tsx
components/
  Nav Footer ScrollProgress Hero3D JsonLd Reveal CountUp MagneticButton
lib/
  siteConfig.ts         constants + years-in-business helper
  caseStudies.ts        18 case studies (typed)
  blogPosts.ts          10 blog posts (typed)
  services.ts           4 services (typed)
  aboutData.ts          stats, values, tech icons
  homeData.ts           homepage-specific data
public/
  images/               SVG placeholders — swap for real .webp product art
scripts/
  gen-placeholders.mjs  regenerate placeholder SVGs
```

## Adding a case study

1. Add a new entry to `lib/caseStudies.ts` following the `CaseStudy` type.
2. Drop a 16:9 image at `public/images/<slug>.svg` (or update the entry's `image` field).
3. `npm run build` — the page appears at `/portfolio/<slug>` automatically via `generateStaticParams`, and is included in the sitemap.

## Adding a blog post

1. Add a new entry to `lib/blogPosts.ts` following the `BlogPost` type. Body is a typed array of section objects: `p`, `h2`, `h3`, `ul`, `callout`, `beforeAfter`, `code`.
2. Drop the featured image at the path listed in the entry.
3. `npm run build` — the page appears at `/blog/<slug>`.

## Deploying to Vercel

```bash
# From the project root:
vercel                     # first time — link/create project
vercel --prod              # deploy
```

Set these environment variables in the Vercel dashboard (Settings → Environment Variables):

- `RESEND_API_KEY` — your Resend key
- `RESEND_FROM` — e.g. `Relicsol Website <noreply@relicsol.com>` (needs a verified domain in Resend)
- `NEXT_PUBLIC_SITE_URL` — `https://www.relicsol.com`

The site is fully static apart from `/api/contact`, so it edge-caches well.

## SEO checklist

Every route sets a unique `title`, `description`, `canonical`, OpenGraph tags, and JSON-LD. See `MIGRATION-NOTES.md` for the specific schema types used per route.

To verify:

```bash
curl -sL http://localhost:3000/portfolio/firmate | grep -o '<h1[^>]*>[^<]*'
curl -sL http://localhost:3000/portfolio/firmate | grep -o 'application/ld+json'
```

Both should return real content — no `{{ placeholder }}` strings anywhere in the initial HTML response.

## Accessibility

- All interactive controls have accessible names (`aria-label` or visible label).
- Every form field has a linked `<label>`.
- Focus rings preserved (`:focus-visible`).
- `prefers-reduced-motion: reduce` disables the marquee, hero rotation, reveals, count-ups and testimonial auto-advance.
