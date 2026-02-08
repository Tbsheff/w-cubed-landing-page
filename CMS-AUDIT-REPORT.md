# W-Cubed CMS Comprehensive Audit Report

**Date:** 2026-02-08
**Stack:** Next.js 16.1.5 + Sanity CMS v5.7.0 + next-sanity v12
**Schemas:** 8 document types (post, author, category, project, manufacturer, siteSettings, representative, territoryInfo)

---

## Executive Summary

A deep review of the CMS across 10 dimensions identified **25 critical**, **35+ major**, and **30+ minor** issues. The most impactful problems fall into five categories:

1. **Non-functional features** -- Contact form does nothing, related posts/featured sections are dead code
2. **SEO blackout** -- Zero `generateMetadata`, no OG/Twitter cards, no sitemap/robots
3. **Content freshness broken** -- force-static with no revalidate and a broken webhook
4. **Hardcoded data bypassing CMS** -- Homepage reps, footer, services, company story all ignore CMS
5. **Schema/validation gaps** -- No alt text, no email validation, missing fields, no singleton enforcement

---

## CRITICAL Issues (Must Fix)

### 1. Contact Form Has No Submission Logic
**Files:** `app/contact/ContactClient.tsx`
- The `<form>` has no `onSubmit` handler and no `action` attribute
- `zod` (v3.24.1) and `react-hook-form` (v7.54.1) are installed but never imported anywhere
- The "Submit Project Inquiry" button triggers default browser form submission (page reload, does nothing)
- HTML `required` attributes are the only "validation"

### 2. Zero Pages Export `generateMetadata`
**Files:** All `page.tsx` files
- Every page shares the root layout title: "W-Cubed | Water-Process Equipment Experts"
- Blog posts, projects, manufacturer detail pages all have identical titles in search results
- No dynamic descriptions from CMS content

### 3. Zero Open Graph / Twitter Card Metadata
**Files:** `app/layout.tsx`
- Links shared on social media show no preview image, no custom title, no description
- Blog posts have share buttons (Facebook, Twitter, LinkedIn) but no OG metadata to populate previews

### 4. No `error.tsx` Files Anywhere
**Impact:** Any runtime error produces Next.js generic error page with no recovery path

### 5. Revalidation Webhook Broken
**File:** `app/api/revalidate/route.ts`
- Does not parse Sanity webhook payload (which sends `_type`, `slug`, `_id`)
- Expects caller to send exact `{ path, tag }` -- not how Sanity webhooks work
- No HMAC signature verification (uses plain string comparison, not timing-safe)
- No mapping of document types to paths

### 6. All Pages `force-static` With No Revalidation Fallback
**Files:** All `page.tsx`
- Every page sets `export const dynamic = "force-static"` with no `revalidate` export
- Combined with broken webhook (#5), CMS changes NEVER appear without full rebuild/redeploy
- `useCdn: false` in Sanity client adds build latency without freshness benefit

### 7. Homepage Representatives Use Hardcoded Data, Not CMS
**Files:** `app/HomePageClient.tsx`, `lib/representatives.ts`
- `HomePageClient` imports hardcoded `territoryRepresentatives` directly
- CMS `representative` schema and `representativesQuery` exist but are never used on homepage
- Hardcoded data uses placeholder SVG images, not real photos
- Contact page has a fallback pattern but homepage does not

### 8. Homepage `throw new Error()` Crashes Production
**File:** `app/page.tsx` (lines 36, 40, 70-73)
- If any CMS field is empty, the entire homepage returns a 500 error
- `HomePageClient.tsx` defines fallback defaults (lines 67-125) that are dead code because `page.tsx` throws before they're reached

### 9. No PortableText Custom Components
**Files:** `app/blog/[slug]/PostClient.tsx`, `app/projects/[slug]/ProjectClient.tsx`
- `<PortableText value={post.body} />` called without `components` prop
- Body schema only allows `{ type: 'block' }` -- no inline images, code blocks, or embeds
- Content authors limited to plain text with basic formatting

### 10. `params` Accessed Synchronously (Next.js 16 Requires Promise)
**Files:** All `[slug]/page.tsx` files
- Pattern: `{ params }: { params: { slug: string } }` then `params.slug`
- Next.js 15+ requires: `{ params }: { params: Promise<{ slug: string }> }` then `await params`
- Currently works via shims but will break in future versions

### 11. TypeScript + ESLint Errors Suppressed in Builds
**File:** `next.config.mjs`
- `eslint: { ignoreDuringBuilds: true }` and `typescript: { ignoreBuildErrors: true }`
- Broken types and lint errors ship silently to production

### 12. No `not-found.tsx` Anywhere
- `notFound()` is correctly called in detail pages, but no branded 404 page exists
- Users see Next.js default unstyled 404

### 13. Representative Email Field Has No Validation
**File:** `sanity/schemaTypes/representative.ts`
- `email` field is plain `string` type with no regex or format validation
- Any text accepted, producing broken `mailto:` links

### 14. Reference `to` Syntax Uses Object Instead of Array
**Files:** `sanity/schemaTypes/post.ts` (line 50), `sanity/schemaTypes/project.ts` (line 44)
- `to: { type: 'category' }` instead of `to: [{ type: 'category' }]`
- Works by Sanity coercion but undocumented; may break in future versions

---

## MAJOR Issues

### Schema & Validation

| # | Issue | File(s) |
|---|-------|---------|
| M1 | No `preview` configuration on any of the 8 schemas | All schema files |
| M2 | No `orderings` defined on any schema (even those with `order` fields) | manufacturer.ts, representative.ts |
| M3 | Manufacturer `category` is freeform string, not reference to `category` type | manufacturer.ts |
| M4 | No image `alt` text field on any image across all schemas (7+ images) | All schemas with images |
| M5 | Author schema missing `slug` and `bio` fields | author.ts |
| M6 | Category schema missing `slug` and `description` fields | category.ts |
| M7 | Singletons (siteSettings, territoryInfo) not enforced in Studio structure | structure.ts |
| M8 | Portable Text body only supports `{ type: 'block' }` -- no images/embeds | post.ts, project.ts |
| M9 | No field descriptions/help text (6 of ~75 fields have descriptions) | All schemas |
| M10 | No `initialValue` on publishedAt, order fields | post.ts, project.ts |
| M11 | `territoryInfo` has zero validation rules on any field | territoryInfo.ts |
| M12 | CTA `href` fields use `string` type, not `url` | siteSettings.ts, territoryInfo.ts |

### GROQ Queries

| # | Issue | File(s) |
|---|-------|---------|
| M13 | List queries missing `defined(slug.current)` filter | sanity.queries.ts |
| M14 | `representativesQuery` fetches `states`/`regions` but no consumer uses them | sanity.queries.ts |
| M15 | `coverageBlurb` fetched but never displayed on any page | sanity.queries.ts |
| M16 | No `publishedAt` filter gates content visibility | sanity.queries.ts |

### Homepage & Layout

| # | Issue | File(s) |
|---|-------|---------|
| M17 | Manufacturer strip has hardcoded special-case logic (Veolia/Suez bypasses CMS logo) | HomePageClient.tsx |
| M18 | Hero floating badges hardcoded ("38+ Years", "4 States"), will diverge from CMS stats | HomePageClient.tsx |
| M19 | "Company Story" section entirely hardcoded with placeholder image | HomePageClient.tsx |
| M20 | "Services" section entirely hardcoded (4 service cards) | HomePageClient.tsx |
| M21 | Footer entirely hardcoded (address, phone, email, fax, links) | site-footer.tsx |
| M22 | Hero image alt text hardcoded as "Industrial Water Equipment" | HomePageClient.tsx |

### Blog

| # | Issue | File(s) |
|---|-------|---------|
| M23 | Related posts always empty (hardcoded `[]`, no query) | blog/[slug]/page.tsx |
| M24 | `featured` flag always false -- Featured Articles section is dead code | blog/page.tsx |
| M25 | `readTime` always undefined -- no reading time calculation | blog/page.tsx |
| M26 | Blog list `loading.tsx` returns `null` | blog/loading.tsx |

### Projects

| # | Issue | File(s) |
|---|-------|---------|
| M27 | Schema missing essential fields: client, location, gallery, featured, completionDate | project.ts |
| M28 | Project detail sidebar only shows category badges -- no client/location/specs | ProjectClient.tsx |
| M29 | Both loading.tsx files return `null` | projects/loading.tsx |

### Manufacturers

| # | Issue | File(s) |
|---|-------|---------|
| M30 | `featured` field fetched but never rendered | manufacturers/page.tsx |
| M31 | Category filter buttons in unstable Set insertion order | ManufacturersClient.tsx |

### Territory & Reps

| # | Issue | File(s) |
|---|-------|---------|
| M32 | `determineRepForCounty` state-level claim overrides county-level (wrong priority) | territory-split-map.tsx |
| M33 | `TerritoryInfo` type missing CTA fields; inline type workaround in page.tsx | lib/types/territory.ts |
| M34 | `coverageBlurb` and `businessHours` fetched but not rendered on territory page | territory/page.tsx |

### Infrastructure

| # | Issue | File(s) |
|---|-------|---------|
| M35 | `sanity/lib/` directory entirely dead code (client.ts, image.ts, live.ts) | sanity/lib/ |
| M36 | Live preview completely non-functional (`live.ts` is just a fetch wrapper) | sanity/lib/live.ts |
| M37 | No SANITY_API_READ_TOKEN configured (blocks draft mode) | sanity/env.ts |
| M38 | `images.unoptimized: true` disables all Next.js image optimization | next.config.mjs |
| M39 | No shared TypeScript types for CMS data -- types duplicated inline across pages | All page.tsx files |
| M40 | No sitemap.ts or robots.ts | app/ directory |

---

## MINOR Issues (Selected)

| # | Issue | File(s) |
|---|-------|---------|
| m1 | `shareUrl` useMemo never re-runs client-side (always uses hardcoded domain) | PostClient.tsx |
| m2 | Date formatting inconsistent between blog list and detail | BlogListClient.tsx vs PostClient.tsx |
| m3 | Redundant `states` + `servedStates` fields on representative schema | representative.ts |
| m4 | Phone numbers not sanitized for `tel:` URI | territory-split-map.tsx |
| m5 | `hero-options.tsx` is dead code with stale data (3 states instead of 4) | components/hero-options.tsx |
| m6 | `territory-map.tsx` is dead code with fake rep names | components/territory-map.tsx |
| m7 | State abbreviation subtitle hardcoded in hero ("serving UT · NV · ID · WY") | HomePageClient.tsx |
| m8 | Stats grid assumes exactly 3 items (md:grid-cols-3) | HomePageClient.tsx |
| m9 | Author phone number hardcoded in post detail | PostClient.tsx |
| m10 | Hotspot enabled on images in schema but not applied in image builder | page.tsx |
| m11 | No `.auto('format')` or `.quality()` on Sanity image URLs | page.tsx |
| m12 | Indentation inconsistency across schema files (4-space vs 2-space) | All schemas |
| m13 | `mainImage` typed as `any` across all pages (18+ instances of `any`) | All pages |
| m14 | `onChange` handlers typed as `any` | BlogListClient.tsx, ProjectsListClient.tsx |
| m15 | Grid view omits `specialty` and `territoryNote` for manufacturers | ManufacturersClient.tsx |
| m16 | HTML tag parsing in `keyProducts` strings is fragile | ManufacturerDetailClient.tsx |
| m17 | Duplicate normalization logic in territory-normalize.ts and territory-split-map.tsx | Both files |
| m18 | Contact page uses union type mixing incompatible rep shapes | ContactClient.tsx |
| m19 | CTA buttons on PostClient have no links/actions | PostClient.tsx |
| m20 | Layout metadata description says "Utah, Idaho, and Wyoming" -- missing Nevada | layout.tsx |

---

## Dead Code Inventory

| File/Component | Status |
|---|---|
| `sanity/lib/client.ts` | Never imported outside sanity/lib/ |
| `sanity/lib/image.ts` | Zero imports anywhere |
| `sanity/lib/live.ts` | Zero imports anywhere |
| `app/studio/[[...tool]]/head.tsx` | Legacy pattern, unused by App Router |
| `components/territory-map.tsx` | Zero imports, fake data |
| `components/hero-options.tsx` | Zero imports, stale data |
| `HomePageClient.tsx` default fallbacks (lines 67-125) | Unreachable due to throws in page.tsx |
| Blog "Featured Articles" section | Dead (featured always false) |
| Blog "Related Articles" section | Dead (related always []) |
| Blog `readTime` display | Dead (readTime always undefined) |
| Projects "Featured Projects" section | Dead (featured always false, not in schema) |
| `zod` dependency | Installed, never imported |
| `react-hook-form` dependency | Installed, never imported |

---

## Recommended Priority Order

### Phase 1: Critical Fixes (Production Safety)
1. Fix contact form submission (wire up zod + react-hook-form + server action/API)
2. Add `error.tsx` at root level
3. Add `not-found.tsx` at root level
4. Replace `throw new Error()` with graceful fallbacks on home/territory/contact
5. Fix `params` to use Promise pattern for Next.js 16

### Phase 2: SEO & Discoverability
6. Add `generateMetadata` to all pages (especially blog/project/manufacturer detail)
7. Add Open Graph and Twitter Card metadata
8. Create `sitemap.ts` from CMS data
9. Create `robots.ts`
10. Fix layout.tsx description (add Nevada)

### Phase 3: Content Freshness
11. Fix revalidation webhook to parse Sanity payloads and map types to paths
12. Add `revalidate = 3600` as safety net on all pages
13. Add HMAC signature verification to webhook

### Phase 4: Schema Improvements
14. Add `alt` text field to all image schemas
15. Add email validation to representative schema
16. Fix reference `to` syntax (object -> array)
17. Add CTA `href` as `url` type
18. Add missing schema fields (project: client/location/gallery, author: slug/bio, category: slug)
19. Make publishedAt required with initial value
20. Add preview configurations to all schemas

### Phase 5: Studio UX
21. Reorganize structure.ts into grouped sidebar
22. Enforce singletons for siteSettings and territoryInfo
23. Add fieldsets/groups to complex schemas
24. Add field descriptions/help text
25. Add orderings to schemas with order/date fields

### Phase 6: CMS Integration Completeness
26. Replace hardcoded homepage reps with CMS data
27. Move footer content to siteSettings schema
28. Move services to siteSettings schema
29. Move company story to siteSettings schema
30. Implement related posts/projects queries

### Phase 7: Cleanup
31. Delete dead code (sanity/lib/, territory-map.tsx, hero-options.tsx, head.tsx)
32. Remove unused dependencies (zod/react-hook-form if not wired up)
33. Create shared CMS type definitions file
34. Replace `any` types with proper Sanity types
35. Re-enable TypeScript and ESLint in builds
