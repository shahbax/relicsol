# Migration notes — `.dc.html` → Next.js 14

Documenting what changed between the `claude.ai/design` export and this Next.js build. Nothing here should surprise you; if anything reads wrong, treat it as a bug to fix, not a design decision.

## Content corrections applied

| Original | Now | Applies to |
|---|---|---|
| `EST. 2013` | `EST. 2018` | Homepage hero trust bar (driven by `siteConfig.founded`) |
| `12+ years` | `${yearsInBusiness()}+` — currently `8+` | About stats, homepage stats — computed at render time so it ages correctly |
| Author bio "since 2013" | "since 2018" | All 10 blog posts (fixed during extraction) |
| `contact@relicsol.com` | `info@relicsol.com` | Homepage CTA band and everywhere else |
| Social icons pointing to `#` | Removed | Only LinkedIn and Facebook remain in Nav overlay + Footer. Instagram and X (Twitter) were dropped rather than left as dead links. Re-add in `siteConfig.social` + `components/Footer.tsx` when the accounts exist. |
| `12 years` mentions in prose | Not autoscanned — please spot-check | Case studies talk about client projects, not Relicsol's age, so this shouldn't come up. |

## Structural changes

- **Nav** — original had a hover-triggered services dropdown built inline. Same behaviour is now in `components/Nav.tsx` using CSS `:hover` on `.rl-svc-dd`. Mobile hamburger + animated services accordion preserved.
- **Route structure** — the four services now live under `/services/<slug>` (not `/WebDesign.dc.html`). Slugs used: `web-design-development`, `software-development`, `ai-automation`, `seo-services`.
- **Case studies** — 18 pages now at `/portfolio/<slug>` via `generateStaticParams`. All 18 slugs preserved from the source filenames.
- **Blog posts** — 10 pages at `/blog/<slug>`. Body content preserved as a typed section array (`p | h2 | h3 | ul | callout | beforeAfter | code`) so headings, lists, callouts and before/after blocks render faithfully without inline HTML.
- **Sitemap** — dynamically generated from data (`app/sitemap.ts`). Total: 40 URLs.
- **Robots** — `app/robots.ts` disallows `/api/` and `/_next/`, points to the sitemap.

## SEO schema

Per route:

| Route | JSON-LD emitted |
|---|---|
| Layout (every page) | `Organization`, `WebSite` |
| Homepage | `ProfessionalService` with `OfferCatalog` |
| `/services/[slug]` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/portfolio` | `CollectionPage`, `BreadcrumbList` |
| `/portfolio/[slug]` | `Article`, `BreadcrumbList` |
| `/blog` | `Blog`, `BreadcrumbList` |
| `/blog/[slug]` | `BlogPosting`, `BreadcrumbList` |
| `/about` | `AboutPage` |
| `/contact` | `ContactPage`, `BreadcrumbList` |

Every page also sets a unique `<title>` (50–60 chars), meta description (140–160 chars), `alternates.canonical`, OpenGraph tags, and `twitter:card = summary_large_image`.

## Three.js hero

Preserved essentially unchanged from the original — same icosahedron geometry, same wireframe overlay, same two orbital torus rings, same ambient + two point lights (one orbiting), same 30 FPS render cadence. The differences:

- Loaded from CDN (`cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`) inside a `useEffect` in `components/Hero3D.tsx` — **not bundled**. Preconnect added in `app/layout.tsx`.
- Wrapped with `dynamic(() => import(...), { ssr: false })` in `HomeClient.tsx` so it never runs on the server.
- `IntersectionObserver` pauses the render loop when the canvas is off-screen. `visibilitychange` pauses when the tab is backgrounded.
- Honours `prefers-reduced-motion: reduce` — renders one frame and stops (no rotation, no orbit).

## Homepage sections — all preserved

Hero → tech marquee → about + stats → services grid → dual-row portfolio marquee → why-us → 3-step process → testimonials rotator → video testimonials → 3 pricing tiers → CTA band → 2-card blog preview. Nothing was dropped.

## Animations added (beyond the original)

Tasteful. Nothing that fights the design.

- **Section reveal on scroll** — `data-reveal` attribute, fades in with a 24px translate on intersection, threshold `0.15`. Applied to About, Services, Portfolio header, Why, Process, Testimonials, Pricing, CTA, Blog, About stats, Values, and every card grid.
- **Count-up on stats** — `components/CountUp.tsx`, cubic easing, 1.6s duration. Applied to homepage stats (200+, 18, 4.9) and About-page stats.
- **Magnetic hover on primary CTAs** — `components/MagneticButton.tsx`, max 6px displacement toward the cursor. Applied to "Start Your Project" buttons.
- **Portfolio card hover** — original spec (image scale to 1.06, overlay slides up, description cascades in) kept unchanged.
- **Marquee pause on hover** — added via `.rl-marquee-row:hover { animation-play-state: paused; }`.

All of the above respects `prefers-reduced-motion: reduce`.

## Real images shipped

All 18 case-study `.webp` product screenshots and 10 blog `.webp` covers were sourced from the previous-build archive and now live under `public/images/`. Blog posts were mapped to topic-appropriate images:

| Slug | Image |
|---|---|
| ai-automation | `AI-automation-services.webp` |
| n8n-vs-make | `AI-automation-workflow.webp` |
| local-seo, seo-small-business | `SEO-services-small-business.webp` |
| ecommerce-cro, website-maintenance | `s1-card-img-1.webp` |
| shopify-vs-woocommerce, wordpress-vs-nextjs | `s1-card-img-2.webp` |
| web-design-trends | `s1-card-img-3.webp` |
| website-cost | `s1-card-img-4.webp` |

Placeholder SVGs are gone. `dangerouslyAllowSVG` has been removed from `next.config.js`. `logo.svg` is the only SVG remaining, referenced only by JSON-LD.

## Video testimonials

- Behaviour changed from **autoplay on load** → **autoplay on hover**, click-to-toggle, `mouseleave` pauses and resets to `currentTime = 0`.
- The card component (`VideoTestimonialCard` inside `app/HomeClient.tsx`) is keyboard-accessible (`Enter` / `Space` toggles) and swaps the play-button overlay opacity based on state.
- `/videos/relicsol_review.mp4` (~38 MB) ships with the project.

**Known gap:** the second video slot (`web-design-and-developemnt-Uk-USA.mp4` in the original) was NOT in the previous-build archive. Both cards currently point at `relicsol_review.mp4`. Drop the walkthrough MP4 into `public/videos/` and update `videoTestimonials[1].src` in `lib/homeData.ts` when you have the file.

## What was deliberately not brought over

- `_marqRow`, `_portRow*` React-in-JS helpers from the original — replaced by native JSX loops.
- The `<sc-if>` / `<sc-for>` custom elements — React handles these natively.
- The `support.js` runtime — not shipped, not linked.
- The wp-content WordPress image URLs — see placeholder note above.
- Cursor followers, text-scramble effects, page loaders — none were in the original brief and the user specifically excluded them.

## Verification

To confirm content is server-rendered (no `{{ }}` in the HTML response):

```bash
npm run build && npm run start
# In another terminal:
curl -sL http://localhost:3000/portfolio/firmate | grep -o 'convert trials\|Free trial conversion rate'
curl -sL http://localhost:3000/blog/ai-automation | grep -o 'Where Businesses Lose the Most Hours'
curl -sL http://localhost:3000/services/web-design-development | grep -o 'Fixed pricing'
```

Each should print a match.
