## Sanity CMS Integration Plan (Next.js App Router + Static until updated)

### Goals
- **Hosted CMS** with a production-ready admin UI (no DB/server to run).
- **Static site by default**; pages only update when content is published.
- **Simple, reliable pipeline** for Vercel and workable for Cloudflare.

### Overview
- Use **Sanity** (hosted) for content + assets.
- Use **Next.js** App Router to statically render pages from Sanity data.
- On publish, Sanity sends a **webhook** to a Next route that triggers **on‑demand revalidation** for affected pages.
- Until revalidation, pages remain entirely static.

### Implementation Plan
1) Setup Sanity project (hosted Studio)
- Run: `npx sanity@latest init`
  - Choose an existing or new project + dataset (e.g., `production`).
  - Prefer **Managed Studio** (hosted by Sanity) to avoid bundling Studio into your Next app.
- Define minimal schemas: `post`, `manufacturer`, `project` (align with current site).

2) Install frontend packages
- `pnpm add next-sanity @sanity/image-url`

3) Configure Sanity client in Next
- Create `lib/sanity.client.ts`:
  - Export a configured `createClient({ projectId, dataset, apiVersion, useCdn: true })`.
  - Read from env: `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`.
- Optional: `lib/sanity.image.ts` using `@sanity/image-url`.

4) Fetch data in Server Components
- Use `client.fetch(groq, params)` inside Server Components / Route Handlers.
- Keep pages static by default (no `revalidate` timer). Use revalidation only via webhook.

5) Add on‑demand revalidation route
- `app/api/revalidate/route.ts`:
  - Accept POST body `{ secret, path }` (and/or `{ tag }`).
  - Verify `secret === process.env.REVALIDATE_SECRET`.
  - Call `revalidatePath(path)` for precise refresh.
  - Optionally support `revalidateTag(tag)` if you prefer tag‑based caching.

6) Configure Sanity webhook(s)
- In Sanity project settings → Webhooks:
  - Trigger on `create` + `update` + `delete` + `publish` for each relevant type.
  - Map document type to revalidate path(s), e.g., `/blog/[slug]`.
  - POST to your Next route with `{ secret, path }`.
  - Use filters to avoid unnecessary calls (e.g., `(_type == "post")`).

7) Static generation setup
- Listing pages: statically render with builds that query Sanity for slugs only (lean queries in `generateStaticParams`).
- Detail pages: statically render per slug.
- If the dataset is large, statically render only top pages and use `fallback` style behavior via SSR for long‑tail routes (optional, keep simple first).

8) Environment variables
- `.env.local`:
  - `SANITY_PROJECT_ID=...`
  - `SANITY_DATASET=production`
  - `SANITY_API_VERSION=2025-01-01` (or a pinned date)
  - `REVALIDATE_SECRET=...`

9) Hosting
- Vercel: Works out of the box with `revalidatePath`. Protect the revalidate route with the secret.
- Cloudflare:
  - Easiest: use Cloudflare Pages build hook from Sanity webhook to trigger a **static rebuild** (pages stay static until rebuild completes).
  - If using Next on Pages with ODR, ensure your revalidate route is supported; otherwise stick to static rebuilds.

### Minimal Code Sketches
- Revalidate route:
```ts
// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  const { secret, path, tag } = await req.json();
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);
  return NextResponse.json({ ok: true });
}
```

- Sanity client:
```ts
// lib/sanity.client.ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET!,
  apiVersion: process.env.SANITY_API_VERSION!,
  useCdn: true,
});
```

### Risks & Mitigations
- Webhook security: use a strong `REVALIDATE_SECRET` and restrict Sanity webhook IPs if possible.
- Large datasets: keep build‑time queries lean; revalidate precise paths to avoid full rebuilds.
- Drafts/preview: add later with `token` and preview routes; keep initial rollout published‑only.
- Cloudflare ODR differences: use static rebuilds via build hooks if ODR isn’t available.

### Day‑to‑day Workflow
1. Edit content in Sanity Studio (hosted).
2. Publish changes.
3. Sanity webhook hits `/api/revalidate` → the affected static page(s) refresh.
4. Users see updated static pages; everything else stays cached.

### Rollout Checklist
- [ ] Initialize Sanity project and schemas (post/manufacturer/project).
- [ ] Add `next-sanity` client (`lib/sanity.client.ts`).
- [ ] Fetch data and render at build for key pages.
- [ ] Add `/api/revalidate` with secret.
- [ ] Configure Sanity webhooks per document type.
- [ ] Set env vars in local + hosting.
- [ ] Deploy and verify end‑to‑end updates.
