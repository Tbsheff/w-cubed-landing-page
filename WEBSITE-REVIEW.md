# W-Cubed Website Review: Comprehensive Audit Findings

**Date:** 2026-02-08
**Reviewed by:** Automated multi-agent audit (SEO, Performance, Accessibility, Security, Code Quality, Content/Design)

---

## Critical Issues (Fix Immediately)

### 1. Contact Form is Non-Functional
**File:** `app/contact/ContactClient.tsx`

The form has no `onSubmit` handler, no `action`, and no API endpoint. Clicking "Submit Project Inquiry" does absolutely nothing. The phone number on the contact page is a fake 555 number (`+1 (801) 555-0199`) instead of the real business number in the footer (`(801) 232-8241`).

**Fix:** Create `app/api/contact/route.ts` with server-side validation using `zod`. Add `react-hook-form` to the contact form client component. Replace the fake phone number with the real one.

---

### 2. No Privacy Policy or Terms of Service
The contact form collects PII (name, email, phone, company) but no privacy policy exists anywhere. This is a legal liability under GDPR/CCPA. No Terms of Service page either.

**Fix:** Create `/privacy` and `/terms` pages. Add links to the footer.

---

### 3. Zero Page-Specific SEO Metadata
**Files:** All 9 `page.tsx` files

Not a single page beyond the root layout exports `metadata` or `generateMetadata()`. Every page shares the identical `<title>` and `<meta description>`. Dynamic routes (`/blog/[slug]`, `/manufacturers/[slug]`, `/projects/[slug]`) especially need unique metadata from CMS data.

**Fix:** Add `generateMetadata()` to all dynamic route pages. Add static `metadata` exports to all static pages. Add `metadataBase` and `title.template` to `app/layout.tsx`.

---

### 4. No sitemap.xml or robots.txt
Search engines have no sitemap to discover pages. The Sanity Studio at `/studio/` is not blocked from indexing.

**Fix:** Create `app/sitemap.ts` and `app/robots.ts` using Next.js built-in metadata route types.

---

### 5. Security Headers Missing
**File:** `next.config.mjs`

Zero security headers configured: no CSP, no X-Frame-Options, no HSTS, no X-Content-Type-Options, no Referrer-Policy.

**Fix:** Add `async headers()` function to `next.config.mjs` with CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.

---

### 6. Build Error Suppression
**File:** `next.config.mjs`

Both `ignoreBuildErrors: true` (TypeScript) and `ignoreDuringBuilds: true` (ESLint) are set. Combined with no `next build` step in CI, type and lint errors can be silently deployed.

**Fix:** Remove both flags after fixing existing type/lint errors. Add `pnpm build` to the CI pipeline.

---

## High Priority Issues

### 7. Image Optimization Disabled
**File:** `next.config.mjs`

`images: { unoptimized: true }` disables all Next.js image optimization. No WebP/AVIF conversion, no responsive sizing.

**Fix:** Remove `unoptimized: true`. Add `remotePatterns` for `cdn.sanity.io`.

---

### 8. No Font Loading Strategy
**File:** `app/layout.tsx`

The Geist font package is installed but never imported or configured. CSS variables `--font-geist-sans` and `--font-geist-mono` are referenced but never set.

**Fix:** Import `GeistSans` and `GeistMono` from the `geist` package. Apply CSS variable classes to `<body>`.

---

### 9. Placeholder Images Throughout the Site
**Files:** `app/HomePageClient.tsx`, `lib/representatives.ts`

15+ placeholder images visible to end users: all 4 representative photos, project highlights, company history image.

**Fix:** Replace all `/placeholder.svg` references with real images in Sanity CMS or local assets.

---

### 10. Form Labels Not Associated with Inputs
**File:** `app/contact/ContactClient.tsx`

Every `<label>` lacks `htmlFor` and every `<Input>` lacks `id`. Screen readers cannot announce field labels. WCAG 2.1 Level A failure.

**Fix:** Add matching `htmlFor`/`id` pairs to all form fields. Add `aria-required="true"` to required fields.

---

### 11. No Skip-to-Content Link
**File:** `app/layout.tsx`

No skip navigation link exists. Keyboard users must tab through the entire navigation on every page. WCAG 2.1 Level A failure.

**Fix:** Add a visually hidden skip-to-content link as the first element in `<body>`. Add `id="main-content"` to the `<main>` element in `page-wrapper.tsx`.

---

### 12. No Error Boundaries or 404 Page
Zero `error.tsx` files, zero `not-found.tsx` files anywhere. Runtime errors show the generic Next.js error page.

**Fix:** Create `app/not-found.tsx` with branded 404 page. Create `app/error.tsx` as a global error boundary. Consider route-level error boundaries for critical pages.

---

### 13. Color Contrast Failures

| Combination | Ratio | Required |
|-------------|-------|----------|
| `#4986C8` on white (links) | ~3.6:1 | 4.5:1 (fails) |
| `#4986C8` on `#1C4E80` (stats) | ~2.0:1 | 4.5:1 (fails) |
| `#1FA9A4` on white | ~3.1:1 | 4.5:1 (fails) |
| `slate-400` on `#123D6A` (footer) | ~3.9:1 | 4.5:1 (fails) |

**Fix:** Darken the primary blue to at least `#3D73AE` for link text. Use white or light text on dark backgrounds. Darken teal accent.

---

### 14. Missing "About Us" Page
A 38-year-old business has no dedicated About page. The brief homepage story section is insufficient for trust-building and SEO.

**Fix:** Create `/about` page with company history, team bios, values, certifications. Add to navigation.

---

## Medium Priority Issues

### 15. No Dynamic Imports / Code Splitting
Zero uses of `next/dynamic` or `React.lazy()`. The territory map (1020 lines + heavy geo deps) is statically imported.

**Fix:** Use `next/dynamic` for `TerritorySplitMap`, `TerritoryMap`, and other heavy components with SSR disabled and loading skeletons.

---

### 16. 12+ Unused Dependencies
**File:** `package.json`

Never imported: `recharts`, `styled-components`, `react-day-picker`, `react-hook-form`, `zod`, `cmdk`, `sonner`, `vaul`, `embla-carousel-react`, `input-otp`, `react-resizable-panels`.

**Fix:** `pnpm remove` all unused packages. (Keep `react-hook-form` and `zod` if implementing the contact form.)

---

### 17. Two Competing Color Palettes
Home/contact/territory use `#1C4E80`/`#4986C8`. Blog/projects/footer use `#123D6A`/`#1FA9A4`. Inconsistent visual identity.

**Fix:** Standardize on one palette. Define colors as CSS variables/Tailwind theme tokens and use them consistently.

---

### 18. Carousel Accessibility
**File:** `app/HomePageClient.tsx`

Prev/next buttons and dot indicators have no `aria-label`. No `aria-live` region for slide changes. No touch/swipe on mobile.

**Fix:** Add `aria-label` to all carousel controls. Add `aria-live="polite"` to the carousel region. Consider `embla-carousel` (already installed) for swipe support.

---

### 19. Mobile Menu Accessibility
**File:** `components/site-header.tsx`

No focus trap, no Escape key handler, no `aria-expanded` on hamburger button. Missing `aria-label` on both `<nav>` elements.

**Fix:** Add `aria-expanded={isOpen}` to toggle button. Add focus trap and Escape handler. Label both `<nav>` elements.

---

### 20. No Open Graph / Twitter Cards
Zero OG or Twitter Card tags. Shared links show no preview.

**Fix:** Add `openGraph` and `twitter` fields to page metadata. Set `metadataBase` in root layout for URL resolution.

---

### 21. Duplicate Sanity Clients
**Files:** `lib/sanity.client.ts` and `sanity/lib/client.ts`

Two identical configurations. Risk of configuration drift.

**Fix:** Consolidate into one client, or have one re-export from the other.

---

### 22. `params` Accessed Synchronously (Next.js 16)
**Files:** `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`, `app/manufacturers/[slug]/page.tsx`

In Next.js 15+, `params` is a Promise. These routes access `params.slug` synchronously.

**Fix:** `const { slug } = await params;` in all dynamic route page components.

---

### 23. No Pagination
Blog and project listing pages render all items at once.

**Fix:** Add pagination or infinite scroll with a reasonable page size (e.g., 12 items).

---

### 24. Nevada Omitted from SEO Description
Root metadata says "serving Utah, Idaho, and Wyoming" — Nevada is missing. Projects page subtitle also omits it.

**Fix:** Update all copy to include Nevada.

---

### 25. No Structured Data (JSON-LD)
No `schema.org` markup. Google cannot show rich results.

**Fix:** Add JSON-LD for `Organization` (homepage), `BlogPosting` (blog posts), `ContactPage` (contact), and `LocalBusiness` with `areaServed`.

---

### 26. Territory Map SVG Inaccessible
**File:** `components/territory-map.tsx`

No keyboard navigation, no ARIA labels, no screen reader alternatives. Mouse-only.

**Fix:** Add `role`, `aria-label`, `tabIndex`, and keyboard handlers to map elements. Add a text alternative summary.

---

### 27. `Link` Inside `Button` Anti-pattern
Multiple instances of `<Button><Link>...</Link></Button>` — invalid nested HTML.

**Fix:** Use `<Button asChild><Link href="...">...</Link></Button>` or style `<Link>` directly.

---

### 28. No Rate Limiting on Revalidation API
**File:** `app/api/revalidate/route.ts`

No rate limiting. Secret sent in JSON body instead of header.

**Fix:** Move secret to `Authorization` header. Add rate limiting middleware.

---

### 29. Loading States Return `null`
4 of 5 `loading.tsx` files return `null` (blank screen). 4 routes have no loading state at all.

**Fix:** Add skeleton loading UIs to all routes. Use the blog post loading.tsx as a template.

---

### 30. Framer Motion (~130KB) on Every Page
Imported in 14 files for simple fade-in animations.

**Fix:** Replace simple animations with CSS `@keyframes` and `animation` properties. Reserve Framer Motion for complex interactive animations only.

---

## Low Priority / Polish Items

| Item | File(s) |
|------|---------|
| Dead code: `hero-options.tsx`, `NavigationProgress` never imported | `components/` |
| No social media links in footer | `components/site-footer.tsx` |
| Footer email `Bradg@wcubedinc.com` vs contact page `info@wcubedinc.com` | `components/site-footer.tsx` |
| `generator: 'v0.app'` meta tag should be removed | `app/layout.tsx` |
| `package.json` name is `"my-v0-project"` | `package.json` |
| No `.env.example` file | Project root |
| 20+ `any` types undermine TypeScript strict mode | Various |
| No tests or test runner configured | `package.json`, `.github/workflows/ci.yml` |
| Dark theme CSS variables defined but unused | `styles/globals.css` |
| CDN disabled for Sanity reads | `lib/sanity.client.ts` |
| Heading hierarchy broken in ManufacturersClient (h4 before h3) | `app/manufacturers/ManufacturersClient.tsx` |
| `outline: "none"` on map paths removes focus indicators | `components/territory-split-map.tsx` |
| `aria-current="page"` missing on active nav links | `components/site-header.tsx` |

---

## Recommended Phased Action Plan

| Phase | Focus | Items |
|-------|-------|-------|
| **Phase 1** | Functional fixes | #1 (contact form), #9 (placeholder images), #24 (Nevada copy) |
| **Phase 2** | Legal compliance | #2 (privacy policy, terms of service) |
| **Phase 3** | SEO foundation | #3 (page metadata), #4 (sitemap/robots), #20 (OG tags), #25 (JSON-LD) |
| **Phase 4** | Security | #5 (headers), #6 (build flags), #28 (rate limiting) |
| **Phase 5** | Performance | #7 (images), #8 (fonts), #15 (dynamic imports), #16 (unused deps), #30 (Framer Motion) |
| **Phase 6** | Accessibility | #10 (form labels), #11 (skip-to-content), #13 (contrast), #18 (carousel), #19 (mobile menu), #26 (map), #27 (Link/Button) |
| **Phase 7** | Content & design | #14 (About page), #17 (color palette), #12 (error/404 pages), #23 (pagination) |
| **Phase 8** | Code quality | #22 (async params), #21 (Sanity clients), dead code removal, TypeScript types |
