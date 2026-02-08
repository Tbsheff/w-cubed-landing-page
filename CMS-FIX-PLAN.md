# W-Cubed CMS Fix Implementation Plan

**Date:** 2026-02-08
**Reference:** CMS-AUDIT-REPORT.md
**Total Steps:** 33 across 7 phases

---

## Phase 1: Production Safety (Critical Runtime Fixes)
> Deploy immediately after completing this phase.

### Step 1.1: Create root `error.tsx` boundary
- **Create:** `app/error.tsx`
- **Details:** `"use client"` component accepting `{ error, reset }` props. Render branded error page with W-Cubed blue palette (#1C4E80, #4986C8). Include "Try again" button calling `reset()` and "Go Home" link to `/`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 1.2: Create root `not-found.tsx` page
- **Create:** `app/not-found.tsx`
- **Details:** Branded 404 page. Import `PageWrapper` for site header/footer. Include heading, message, and buttons linking to `/` and `/contact`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 1.3: Replace `throw new Error()` with graceful fallbacks in homepage
- **Modify:** `app/page.tsx`
- **Details:** Remove lines 36, 40, 70-73 that `throw new Error()`. Let data flow through to `HomePageClient` which already defines fallback defaults at lines 67-125 (`defaultManufacturers`, `defaultHighlights`, `defaultStats`, `defaultHero`). Use null-coalescing `|| []` patterns instead of throwing.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 1.4: Replace `throw new Error()` on territory and contact pages
- **Modify:** `app/territory/page.tsx` (line 23), `app/contact/page.tsx` (line 31)
- **Details:** Remove `throw new Error("CMS territoryInfo missing")`. Pass `null` to client components; both `TerritoryClient` and `ContactClient` handle null/undefined props gracefully.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 1.5: Fix `params` to use async Promise pattern (Next.js 16)
- **Modify:** `app/blog/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`, `app/manufacturers/[slug]/page.tsx`
- **Details:** Change signature from `{ params }: { params: { slug: string } }` to `{ params }: { params: Promise<{ slug: string }> }`. Add `const { slug } = await params` at the top. Replace all `params.slug` with `slug`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 1.6: Wire up contact form with zod + react-hook-form + server action
- **Create:** `lib/schemas/contact-form.ts` (Zod schema for firstName, lastName, email, phone, company, location, projectType, equipmentCategory, timeline, message)
- **Create:** `app/contact/actions.ts` (Server action: validate with zod, log to console for now with TODO for email service)
- **Modify:** `app/contact/ContactClient.tsx` (Import `useForm` from react-hook-form, `zodResolver`, the schema, and the server action. Register all inputs, add error display, add `useTransition` for pending state, show success/error toast via `sonner`)
- **Depends on:** Nothing (zod, react-hook-form, @hookform/resolvers already in package.json)
- **Complexity:** Large

### Step 1.7: Fix loading.tsx files to show actual skeletons
- **Modify:** `app/blog/loading.tsx`, `app/projects/loading.tsx`
- **Details:** Replace `return null` with skeleton UI using Tailwind `animate-pulse` divs representing card grid layouts.
- **Depends on:** Nothing
- **Complexity:** Small

---

## Phase 2: SEO & Discoverability
> Deploy after Phase 1.

### Step 2.1: Create shared metadata utility
- **Create:** `lib/metadata.ts`
- **Details:** Export `buildMetadata()` function that generates consistent `Metadata` objects including `openGraph`, `twitter`, `alternates.canonical`. Parameters: `title`, `description?`, `path?`, `image?`, `type?`, `publishedTime?`. Constants: `SITE_URL = 'https://wcubedinc.com'`, `SITE_NAME = 'W-Cubed'`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 2.2: Fix root layout metadata
- **Modify:** `app/layout.tsx`
- **Details:** Fix description from "Utah, Idaho, and Wyoming" to "Utah, Nevada, Idaho, and Wyoming". Add `metadataBase: new URL('https://wcubedinc.com')`. Add `title.template: '%s | W-Cubed'`. Add default `openGraph.siteName` and `twitter.card`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 2.3: Add `generateMetadata` to blog post detail page
- **Modify:** `app/blog/[slug]/page.tsx`
- **Details:** Export async `generateMetadata` that fetches post title, excerpt, imageUrl, publishedAt with a lightweight GROQ query, then calls `buildMetadata()` with `type: 'article'`.
- **Depends on:** 2.1, 1.5 (async params)
- **Complexity:** Small

### Step 2.4: Add `generateMetadata` to project and manufacturer detail pages
- **Modify:** `app/projects/[slug]/page.tsx`, `app/manufacturers/[slug]/page.tsx`
- **Details:** Same pattern as 2.3 but fetching project title/excerpt/image and manufacturer name/description/logo respectively.
- **Depends on:** 2.1, 1.5
- **Complexity:** Small

### Step 2.5: Add static metadata to all list/utility pages
- **Modify:** `app/blog/page.tsx`, `app/projects/page.tsx`, `app/manufacturers/page.tsx`, `app/territory/page.tsx`, `app/contact/page.tsx`
- **Details:** Export `metadata` constant using `buildMetadata()` with page-specific title and description.
- **Depends on:** 2.1
- **Complexity:** Small

### Step 2.6: Create `sitemap.ts`
- **Create:** `app/sitemap.ts`
- **Details:** Export default async function returning `MetadataRoute.Sitemap`. Fetch all post, project, and manufacturer slugs with `_updatedAt` from Sanity. Combine with static pages (/, /blog, /projects, /manufacturers, /territory, /contact). Set priorities: homepage 1.0, list pages 0.8, detail pages 0.6.
- **Depends on:** Nothing
- **Complexity:** Medium

### Step 2.7: Create `robots.ts`
- **Create:** `app/robots.ts`
- **Details:** Allow all crawlers on `/`, disallow `/studio/` and `/api/`. Include sitemap URL.
- **Depends on:** Nothing
- **Complexity:** Small

---

## Phase 3: Content Freshness
> Deploy with Phase 2.

### Step 3.1: Rewrite revalidation webhook
- **Modify:** `app/api/revalidate/route.ts`
- **Details:** Complete rewrite. Parse Sanity webhook payload `{ _type, slug }`. Verify HMAC signature with `crypto.timingSafeEqual`. Map `_type` to paths:
  - `post` -> `/blog`, `/blog/${slug}`
  - `project` -> `/projects`, `/projects/${slug}`
  - `manufacturer` -> `/`, `/manufacturers`, `/manufacturers/${slug}`
  - `siteSettings` -> `/`
  - `representative` -> `/`, `/territory`, `/contact`
  - `territoryInfo` -> `/territory`, `/contact`
  - `author`/`category` -> `/blog`
- Call `revalidatePath()` for each matched path.
- **Depends on:** Nothing
- **Complexity:** Medium

### Step 3.2: Replace `force-static` with `revalidate` on all pages
- **Modify:** All 9 `page.tsx` files
- **Details:** Replace `export const dynamic = "force-static"` with `export const revalidate = 3600`. Update `lib/sanity.client.ts` to use `useCdn: true` (safe now with on-demand revalidation).
- **Depends on:** 3.1
- **Complexity:** Small

---

## Phase 4: Schema Improvements
> Can be worked on in parallel with Phases 1-3. Deploy after Phase 3.

### Step 4.1: Add `alt` text field to all image schemas
- **Modify:** All 6 schema files with images (`post.ts`, `project.ts`, `author.ts`, `manufacturer.ts`, `representative.ts`, `siteSettings.ts`)
- **Details:** Add `fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', description: '...', validation: r => r.required().warning('...') })]` to each image field. Update GROQ queries in `lib/sanity.queries.ts` to fetch `mainImage{ ..., alt }` etc. Update consuming components.
- **Depends on:** Nothing
- **Complexity:** Medium

### Step 4.2: Add email validation and fix reference syntax
- **Modify:** `sanity/schemaTypes/representative.ts` (email regex validation), `sanity/schemaTypes/post.ts` line 50, `sanity/schemaTypes/project.ts` line 44
- **Details:** Fix `to: { type: 'category' }` -> `to: [{ type: 'category' }]` in both files. Add email regex to representative.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 4.3: Add CTA `url` types and `initialValue` for publishedAt
- **Modify:** `siteSettings.ts` (CTA href -> `url` type with `allowRelative: true`), `territoryInfo.ts` (same), `post.ts` (publishedAt `initialValue: () => new Date().toISOString()`, required), `project.ts` (same)
- **Depends on:** Nothing
- **Complexity:** Small

### Step 4.4: Add missing schema fields
- **Modify:** `author.ts` (add `slug`, `bio`), `category.ts` (add `slug`, `description`), `project.ts` (add `client`, `location`, `completionDate`, `featured`, `gallery`)
- **Depends on:** Nothing
- **Complexity:** Medium

### Step 4.5: Enrich Portable Text body with image support
- **Modify:** `post.ts` and `project.ts` body field (add `image` type to `of` array with alt/caption fields)
- **Create:** `components/portable-text-components.tsx` (custom PortableText renderer for inline images with `next/image`, figure/figcaption)
- **Modify:** `PostClient.tsx` and `ProjectClient.tsx` (pass `components={portableTextComponents}` to `<PortableText>`)
- **Depends on:** 4.1
- **Complexity:** Medium

### Step 4.6: Add `preview` configurations to all 8 schemas
- **Modify:** All 8 schema files
- **Details:** Add `preview: { select: { title, subtitle, media } }` to each. Singletons use `prepare: () => ({ title: 'Site Settings' })`.
- **Depends on:** Nothing
- **Complexity:** Small

### Step 4.7: Add `orderings` to schemas with date/order fields
- **Modify:** `post.ts`, `project.ts` (order by publishedAt), `manufacturer.ts`, `representative.ts` (order by `order` and `name`)
- **Depends on:** Nothing
- **Complexity:** Small

### Step 4.8: Add validation rules and field descriptions
- **Modify:** `territoryInfo.ts` (add required validation to heroTitle, heroSubtitle), all schema files (add `description` to fields lacking them)
- **Depends on:** Nothing
- **Complexity:** Small (tedious)

---

## Phase 5: Studio UX
> Deploy with Phase 4.

### Step 5.1: Reorganize Studio structure with groups and singletons
- **Modify:** `sanity/structure.ts`
- **Details:** Replace flat `S.documentTypeListItems()` with grouped sidebar:
  - **Singletons:** Site Settings (fixed documentId), Territory Info (fixed documentId)
  - **Content:** Blog Posts, Projects
  - **Reference Data:** Manufacturers, Representatives
  - **Taxonomies:** Authors, Categories
  - Use `S.divider()` between groups
- **Depends on:** Nothing
- **Complexity:** Medium

### Step 5.2: Add fieldsets/groups to complex schemas
- **Modify:** `siteSettings.ts` (groups: Hero, Stats, Manufacturer Strip, Highlights), `representative.ts` (groups: Personal Info, Coverage)
- **Depends on:** Nothing
- **Complexity:** Small

---

## Phase 6: CMS Integration Completeness
> Deploy after Phases 3-5.

### Step 6.1: Replace hardcoded homepage reps with CMS data
- **Modify:** `app/page.tsx` (fetch `representativesQuery`, normalize, pass as prop), `app/HomePageClient.tsx` (remove hardcoded import, accept `representatives` prop, fall back to hardcoded data if CMS array empty)
- **Depends on:** 3.2
- **Complexity:** Medium

### Step 6.2: Implement related posts query
- **Modify:** `lib/sanity.queries.ts` (add `relatedPostsQuery` matching by shared categories), `app/blog/[slug]/page.tsx` (fetch related posts, pass to `PostClient` instead of hardcoded `[]`)
- **Depends on:** 1.5
- **Complexity:** Medium

### Step 6.3: Implement reading time and featured posts
- **Modify:** `app/blog/page.tsx` (add `estimateReadTime()` helper counting words in Portable Text blocks, use CMS `featured` field)
- **Depends on:** 4.4 (if adding `featured` to post schema)
- **Complexity:** Small

### Step 6.4: Add `defined(slug.current)` filter and publishedAt gating to list queries
- **Modify:** `lib/sanity.queries.ts`
- **Details:**
  - `postsListQuery`: add `&& defined(slug.current) && dateTime(publishedAt) <= dateTime(now())`
  - `projectsListQuery`: add `&& defined(slug.current)`
  - `manufacturersListQuery`: add `&& defined(slug.current)` (safety)
- **Depends on:** Nothing
- **Complexity:** Small

---

## Phase 7: Cleanup
> Deploy last, after all other phases.

### Step 7.1: Delete dead code files
- **Delete:** `sanity/lib/client.ts`, `sanity/lib/image.ts`, `sanity/lib/live.ts`, `components/territory-map.tsx`, `components/hero-options.tsx`, `app/studio/[[...tool]]/head.tsx`
- **Verify:** grep for any remaining imports to these files
- **Depends on:** Nothing
- **Complexity:** Small

### Step 7.2: Create shared CMS type definitions
- **Create:** `lib/types/cms.ts`
- **Details:** Extract all inline types from page.tsx files into shared types: `PostListItem`, `PostDetail`, `ProjectListItem`, `ProjectDetail`, `ManufacturerListItem`, `SiteSettings`, `RepresentativeResult`, `TerritoryInfoResult`. Use `SanityImage` type for images, `PortableTextBlock[]` for body.
- **Modify:** All `page.tsx` files to import from `@/lib/types/cms`
- **Depends on:** All prior phases (types reflect added fields)
- **Complexity:** Medium

### Step 7.3: Replace `any` types with proper types
- **Modify:** All page.tsx and Client component files
- **Details:** Replace `mainImage?: any` -> `SanityImage`, `body?: any` -> `PortableTextBlock[]`, `logo?: any` -> `SanityImage`, `onChange: (e: any)` -> `ChangeEvent<HTMLInputElement>` or appropriate Radix type
- **Depends on:** 7.2
- **Complexity:** Medium

### Step 7.4: Re-enable TypeScript and ESLint in builds
- **Modify:** `next.config.mjs`
- **Details:** Remove `eslint: { ignoreDuringBuilds: true }` and `typescript: { ignoreBuildErrors: true }`. Replace `images: { unoptimized: true }` with `images: { remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }] }`. Run `pnpm typecheck` and `pnpm lint` first to identify and fix all errors.
- **Depends on:** ALL prior steps
- **Complexity:** Large (may surface many errors)

### Step 7.5: Clean up minor issues
- **Modify:** Various files
- **Details:**
  - Fix `shareUrl` useMemo in `PostClient.tsx` (use `usePathname()`)
  - Add links to CTA buttons in `PostClient.tsx` (Link to `/contact` and `/territory`)
  - Consolidate redundant `states`/`servedStates` fields in representative schema
  - Sanitize phone numbers for `tel:` URIs (strip non-numeric chars)
- **Depends on:** Various
- **Complexity:** Small per item

---

## Deployment Checkpoints

| Checkpoint | Phases | Key Changes |
|------------|--------|-------------|
| **Deploy 1** | Phase 1 | Error boundaries, graceful fallbacks, working contact form, async params |
| **Deploy 2** | Phases 2 + 3 | SEO metadata on all pages, sitemap, robots, working revalidation |
| **Deploy 3** | Phases 4 + 5 | Schema improvements, Studio reorganization (no frontend impact yet) |
| **Deploy 4** | Phase 6 | CMS data live on frontend (reps, related posts, reading time) |
| **Deploy 5** | Phase 7 | Cleanup, strict TypeScript, image optimization enabled |

## Critical Path

```
Phase 1 (safety) ──> Phase 2 (SEO) ──> Phase 6 (integration) ──> Phase 7 (cleanup)
                 ──> Phase 3 (freshness) ─┘                            │
Phase 4 (schemas) ──> Phase 5 (studio) ──────────────────────────────┘
```

Phases 1 and 4 can run in parallel. Phase 7 depends on everything else.
