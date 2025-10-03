## Payload CMS Integration Plan (Next.js App Router + Git, no external DB)

### Goals
- **Add a CMS** to manage site content with minimal moving parts.
- **No external DB server**; keep everything self-contained in the repo.
- **Git as the source of truth** for content.

### Overview (keep it simple)
- Run **Payload** inside the existing Next.js app.
- Use **SQLite** as the runtime datastore (file-based, zero ops).
- Store canonical content in **JSON files committed to Git**; import into SQLite on start.
- Keep the Payload Admin at `/admin` and ensure no build-time DB dependency.

Two options for content versioning (pick one):
- **A) SQLite-in-Git (simplest)**: Commit `payload.db` to Git. Easiest but binary file, poor diffs/merges.
- **B) JSON-in-Git (recommended)**: Keep `content/**/*.json` in Git. Import to SQLite on dev/build; export back when content changes.

This plan defaults to B to avoid over-engineering while preserving clean diffs and merges.

### Implementation Plan
1) Dependencies
- Add: `payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql @payloadcms/db-sqlite`.

2) Payload base config (`payload.config.ts` at repo root)
- `secret` from env (`PAYLOAD_SECRET`).
- `db`: SQLite adapter pointing at a local file (e.g., `payload.db`).
- `editor`: `lexicalEditor()`.
- Start small with collections: `posts`, `manufacturers`, `projects`.
- TS path alias: `"@payload-config" -> "./payload.config.ts"`.

3) Next.js integration
- Wrap `next.config.mjs` with `withPayload` from `@payloadcms/next/withPayload`.
- Add App Router routes for Admin and API under `app/(payload)/`.
- Set `export const dynamic = 'force-dynamic'` on those routes to avoid build-time DB.
- Remove/relocate existing `public/admin/index.html` to prevent route collision.

4) JSON-in-Git workflow (recommended)
- Create `content/` with one JSON file per document per collection.
- Add two small scripts using Payload Local API:
  - `scripts/content-import.ts`: read JSON and upsert into collections.
  - `scripts/content-export.ts`: dump collections to JSON files.
- Package scripts (keep automation light):
  - `dev`: run `content:import` then `next dev`.
  - Run `content:export` manually before committing content changes from Admin.
- Use stable IDs or slugs in JSON to enable safe upserts.

5) Data access in the app
- Use Local API from Server Components/Route Handlers for reads (`payload.find(...)`).
- Avoid adding REST/GraphQL unless a client component needs it.

6) SSR/ISR considerations
- Do not query Payload during static generation if a DB may be unavailable at build time.
- For pages that depend on CMS data, prefer SSR or set a reasonable `revalidate` interval.
- Mark admin/API routes as dynamic, and any CMS-dependent static routes should avoid `generateStaticParams` that requires live data.

7) Uploads
- For now, store uploads at `public/uploads/` and commit to Git.
- If repo growth becomes an issue, move to object storage later (S3, etc.).

8) Deployment
- Serverless FS is ephemeral; treat Admin edits as local-only. Commit JSON to Git and deploy.
- CI builds should run `content:import` to hydrate SQLite from repo content.
- If live production editing is required, deploy to a Node host with a persistent volume; keep JSON as source of truth regardless.

### Risks & Mitigations
- **Binary DB in Git (if A)**: hard to diff/merge. Prefer B.
- **Build-time DB access**: mark admin/API as dynamic; do not query Payload in static generation.
- **Uploads growth**: committing media increases repo size; acceptable initially. Revisit object storage later.
- **Native deps (sharp)**: ensure Node 18+; typical Next environments are fine.
- **Admin route collision**: remove or move `public/admin/index.html`.
- **Schema drift**: use stable IDs/slugs in JSON and keep import idempotent.

### Not doing now (avoid over-engineering)
- No GraphQL or REST proxies beyond what’s needed.
- No webhooks/queues/live preview.
- No S3/object storage initially.
- No Git hooks; scripts are manual to start.

### Day-to-day workflow (JSON-in-Git)
1. `pnpm dev` (auto-imports `content/` into SQLite).
2. Edit content via `/admin` or by editing JSON.
3. If edited via Admin, run `pnpm content:export`.
4. Commit `content/` changes (and media if any) and push.
5. CI runs `content:import` during build; deploy.

### Rollout checklist
- [ ] Add packages.
- [ ] Create `payload.config.ts` with minimal collections.
- [ ] Wrap `next.config.mjs` with `withPayload`.
- [ ] Add admin/API routes; mark `dynamic`.
- [ ] Create `content/` and import/export scripts.
- [ ] Remove/relocate `public/admin/index.html`.
- [ ] Add `.env.local` with `PAYLOAD_SECRET`.
- [ ] Render one example collection on a page to validate end-to-end.
