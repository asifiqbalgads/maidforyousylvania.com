# Maid For You — Homepage (redesign demo)

A premium, custom-designed, **mobile-first homepage** for **Maid For You**, a locally owned
professional house cleaning company in Sylvania, Ohio. Built as a static site so it runs
directly on **GitHub Pages** with no build step, backend or dependencies.

- **Live site:** https://www.maidforyousylvania.com/
- **Demo entry point:** [`index.html`](index.html)

---

## 1. Business research (from the existing website)

| Item | Value |
| --- | --- |
| Business name | Maid For You (Maid For You LLC) |
| Industry | Residential & commercial cleaning services |
| Founded | 2008, locally owned by Andrea DuBois |
| Location | 5620 Mayberry Square S, Sylvania, OH 43560 |
| Phone / email | 419.309.1396 · info@maidforyousylvania.com |
| Hours | Mon–Fri, 8am–5pm |
| Service area | Sylvania, Toledo, Perrysburg, Maumee, Holland, Waterville, Whitehouse, Monclova, Oregon, Swanton + Lambertville & Temperance, MI |
| Team | 50+ cleaning professionals, 2 quality-control managers |
| Rating | 4.7/5 across 119 local reviews |

**Services extracted from the site:** recurring house cleaning, deep house cleaning,
move-in/move-out cleaning, commercial cleaning.

**Testimonials** on the homepage are the three genuine reviews published on the live site
(Lisa J., Cindi K., David Z.). No reviews, contact details or claims were invented.

## 2. Brand identity

Colours were sampled pixel-by-pixel from the **original logo** — the logo file itself is used
unmodified (only trimmed of empty canvas so it aligns cleanly in the layout).

| Token | Value | Use |
| --- | --- | --- |
| Brand blue | `#5C8AA3` | logo / accents |
| Deep blue | `#2F5B73` | links, labels, lead-magnet section |
| Sage | `#9CB27C` | accent, highlights |
| Sage deep | `#6D8752` | small-text accents |
| Ink | `#14313D` | dark sections, headings |
| Cream | `#FBF8F1` | page background |
| Sand | `#ECE5D7` | section banding |

**Typography:** *Fraunces* (variable serif, headings — warm, editorial, a little characterful)
paired with *Instrument Sans* (UI, body, labels). Self-hosted WOFF2 subsets in
`assets/fonts/` (SIL Open Font License), so there are no third-party requests.

## 3. Design direction

An **editorial home-care** aesthetic rather than a generic contractor template:

- Arched hero image, oversized serif headline with an italic accent line, rotating
  "Picky · Particular · Prompt · Professional" seal built from the brand emblem.
- Asymmetric feature grid for services (7/5 then 5/7 columns) instead of equal rounded cards.
- Dark, full-width "what a deep clean covers" panel with room tabs (progressive disclosure).
- Numbered process rows, offset review cards, a hand-drawn style service-area map (SVG).
- Restrained motion: subtle scroll reveals, marquee ticker, hover image scale — all
  disabled under `prefers-reduced-motion`.

**Sections:** utility bar → header → hero → values marquee → services → story/difference →
deep-clean room tabs → why-us + founder quote → process → reviews → service area →
free checklist lead magnet → FAQ → final CTA → footer → sticky mobile call/quote bar.

## 4. Project structure

```
.
├── index.html          # homepage (only page)
├── css/style.css       # design system + all components
├── js/script.js        # nav, dropdown, tabs, accordion, reveals, sticky bar
├── assets/
│   ├── fonts/          # Fraunces + Instrument Sans (OFL)
│   ├── icons/          # favicon SVG/PNG, apple-touch-icon
│   ├── images/         # WebP (520/860/1200) + JPEG fallbacks
│   └── logo/           # original Maid For You logo + emblem
├── .nojekyll           # serve assets starting with underscores as-is
└── README.md
```

## 5. Images

- **Logo:** the business's original logo, used unaltered.
- **Photography:** the live site's photography is generic Wix stock, so eight custom
  images were generated for this concept (`assets/images`, WebP with JPEG fallback).
  The cleaning professionals in these images wear Maid For You branded shirts — the
  chest and back marks carry the brand name and house-and-broom motif.
  These are **concept photographs, not photographs of the real team**; swap them for
  real project photography before using this page in production.

## 6. Calls to action (all real destinations)

- **Request a quote** → the company's live Jobber request form.
- **Phone** → `tel:+14193091396`; **email** → `mailto:info@maidforyousylvania.com`.
- **Free cleaning checklist** → the live lead-collection page.
- **Story, team, commercial, city pages, blog** → the corresponding live site pages.
- No contact form is faked: every enquiry CTA goes to a real, working destination.

## 7. Accessibility & SEO

- Semantic landmarks, single `<h1>`, logical heading order, skip link.
- ARIA tabs and accordion patterns with full keyboard support (arrows, Home/End, Esc).
- Visible focus rings, `aria-expanded` state on the mobile menu, focus trapping while open.
- Descriptive `alt` text, explicit image dimensions (no layout shift), ≤1.7 line-height
  minimum for body copy, contrast-checked palette.
- Meta description, Open Graph tags and `HouseCleaningService` JSON-LD structured data.
- **`noindex, nofollow`** so this demo never competes with the real site in search results.

## 8. Deployment (GitHub Pages)

Everything is relative-path based, so it also works from a project subdirectory
(`user.github.io/repo/`).

1. Push this repository.
2. **Settings → Pages → Build and deployment → Deploy from a branch**.
3. Source: branch `main` (or your working branch), folder **`/ (root)`**, then **Save**.
4. The page appears at `https://<user>.github.io/<repo>/` within a minute or two.
5. Remove the `noindex` meta tag in `index.html` only if this page becomes the public site.

## 9. Verified vs. not verified

**Verified here:** HTML parses with no unclosed or stray tags, no duplicate IDs, all
`aria-controls`/`aria-labelledby` targets exist, every local asset path (42 HTML references
and 3 font references) resolves, no missing images, one `<h1>`, no heading-level jumps.

**Not verified here:** the sandbox has no headless browser and blocks browser downloads, so
I could not render the page or capture screenshots. Please open the preview and check
360 / 390 / 430 / 768 / 1024 / 1280 / 1440 px before publishing.
