# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing/brochure website for **South Hills Medicine**, a primary-care clinic in Helena, MT. Built with **Astro 6** (static output) and **Tailwind CSS v4**. There is no backend, no forms, and no tests — it's a static site whose CTA is a phone call (`tel:`) link.

## Commands

```bash
npm run dev      # local dev server (astro dev)
npm run build    # static build to dist/
npm run preview  # serve the built dist/ locally
```

Requires Node (dev on Node 25). There is no lint step and no test suite — don't invent one.

## Architecture

- **One page.** `src/pages/index.astro` composes the whole site from section components: `Header` → `Hero` → `Services` → `Providers` → `Footer`. Navigation is anchor-based within the page (`#home`, `#services`, `#providers`); there are no other routes.
- **`src/layouts/Layout.astro`** is the HTML shell: `<head>` meta, Open Graph tags, canonical URL, font preloading, and the global stylesheet import. JSON-LD structured data (`MedicalBusiness` schema) lives inline in `index.astro`.
- **Content lives in typed data arrays.** Provider data is in `src/data/providers.ts` (imported by `Providers.astro` for rendering **and** `index.astro` for Person structured data — edit it once, both stay in sync). Service cards + `iconPaths` are still inline in `Services.astro`'s frontmatter.

## SEO

- **`src/config.ts` is the single source of truth for SEO / NAP data** (business name, address, phone, hours, `sameAs`, `SITE_URL`, `OG_IMAGE`). It feeds the meta tags in `Layout.astro`, the JSON-LD `@graph` in `index.astro`, and `robots.txt`. (It used to be unused dead code — it isn't anymore; keep it accurate, since search engines cross-check it against directory listings.)
- **Structured data** is a schema.org `@graph` built in `index.astro`: one `MedicalClinic`/`MedicalBusiness`/`LocalBusiness` node cross-linked (`employee` ↔ `worksFor`) to a `Person` node per provider. Validate changes with Google's Rich Results Test.
- **`robots.txt` is a route** (`src/pages/robots.txt.ts`), not a static file, so its `Sitemap:` URL is derived from the configured `site` and can't drift. It points at the `@astrojs/sitemap` output.
- **The OG/social image** is `public/og-image.jpg`, referenced via `OG_IMAGE`. It was generated from the brand logo + colors with `sharp`; regenerate at the same 1200×630 if branding changes.
- ⚠️ **Human-visible contact details in `Header.astro` / `Hero.astro` / `Footer.astro` are still hardcoded** (phone, address, map link) and are *not* yet wired to `config.ts`. If you change NAP data, update both `config.ts` and those components so the visible text and the schema don't disagree.

## Key conventions & gotchas

- **Tailwind v4 — design tokens live in CSS, not JS.** Colors, fonts, and the brand scale are defined in the `@theme { ... }` block of `src/styles/global.css`, which is the source of truth. A legacy `tailwind.config.mjs` with a `theme.extend` block also exists and partially overlaps; prefer editing `global.css`. Brand palette: `brand-*` (slate blue), `accent-blue` (#5B8FA8), `accent-green` (#7D9B76), plus `warm-gray`/`egshell`.

- **Component `<style>` blocks are the ones that actually apply.** Note that in `global.css`, most rules under `@layer components` (`.service-card`, footer link and CTA styles, etc.) are nested *inside* the `.nav-link` selector, so they compile to `.nav-link .service-card` and don't take effect globally. The working versions of those styles are duplicated in the relevant component's own scoped `<style>` block. Edit the component's `<style>` for reliable results.

- **Fonts** are loaded via Astro's native `fonts` config in `astro.config.mjs` (Google-provided Lato + Poppins), exposed as `--font-lato` / `--font-poppins` and the `font-lato` / `font-poppins` Tailwind utilities. Lato is the body default (`<body class="font-lato">`); Poppins is used for the brand wordmark/headings. Preloaded via `<Font>` in `Layout.astro`.

- **Images** use `astro:assets` `<Image>` with source files in `src/assets/`. They are emitted as responsive `webp` (`widths`/`sizes` set per image). Add new images to `src/assets/` and import them; don't reference by public path.

- **Icons** are inline SVG paths written directly in markup (e.g. `iconPaths` in `Services.astro`, phone/pin SVGs in `Header`/`Footer`). `astro-icon` is installed and registered but the codebase currently favors raw inline SVG.

- **`public/` is committed** (standard Astro static-asset dir, copied to the site root at build). Put favicons, the OG image, etc. here.

- **Naming is intentionally inconsistent** — "South Hills Medicine" (most UI), "South Hills Family Medicine" (repo/package/footer copyright), and "South Hills Internal Medicine" (the production domain `southhillsinternalmedicine.com`, set as `site` in `astro.config.mjs`). Don't "fix" these as typos without checking.

- **Path alias:** `@/*` maps to `src/*` (see `tsconfig.json`), and Astro strict TS config is in effect.
