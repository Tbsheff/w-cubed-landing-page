# W-Cubed Landing Page

A modern, responsive landing page for W-Cubed - Mountain West's premier water equipment representative, built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **CMS Integration**: Sanity CMS for dynamic content management
- **Static Public Build**: Uses Next.js static export to generate deployable artifacts in `out/`
- **Responsive Design**: Mobile-first approach with Framer Motion animations
- **Component Library**: Radix UI components with shadcn/ui styling
- **Interactive Territory Map**: Visual representation of service areas
- **Blog System**: Dynamic blog with Sanity CMS integration
- **Contact Forms**: Multiple contact points with territory-specific routing
- **Analytics**: Vercel Analytics integration

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- pnpm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tbsheff/w-cubed-landing-page.git
cd w-cubed-landing-page
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables (if needed):
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

| Script | Description |
|--------|------------|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build the production application |
| `pnpm build:static` | Build static-export output into `out/` |
| `pnpm pages:dev` | Build static output and serve it locally with Wrangler Pages |
| `pnpm pages:deploy` | Build static output and deploy to Cloudflare Pages |
| `pnpm pages:project:create` | Create the Cloudflare Pages project (one-time) |
| `pnpm pages:project:list` | List Cloudflare Pages projects for the configured account |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint for code quality |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm clean` | Remove build cache and node_modules |

## Static Public Site

The public marketing site can be deployed as fully static artifacts:

1. Run `pnpm build:static`
2. Deploy the generated `out/` directory to Cloudflare Pages (`pnpm pages:deploy`)

Wrangler setup:
- `wrangler.jsonc` is configured for Pages with `pages_build_output_dir: "out"`.
- Set `CLOUDFLARE_ACCOUNT_ID` in your shell/CI for non-interactive deploys.
- Create the project once via `pnpm pages:project:create`.
- Authenticate Wrangler with `wrangler login` before first deploy.

Notes:
- The static build uses native Next.js `output: 'export'`.
- Public content is baked at build time from Sanity.
- CMS updates should trigger a new deploy (webhook -> CI/CD), not runtime revalidation.
- Sanity Studio/admin is intentionally excluded from this static app and should be deployed separately.
- If the projects collection is empty, the export emits a placeholder detail route (`/projects/__no-projects__`) that resolves to 404.

## Project Structure

```
w-cubed/
├── app/                    # Next.js app directory
│   ├── blog/              # Blog pages and components
│   ├── contact/           # Contact page
│   ├── manufacturers/     # Manufacturers showcase
│   ├── services/          # Services pages
│   └── territory/         # Territory information
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utility functions and configurations
├── public/               # Static assets
└── sanity/              # Sanity CMS configuration
```

## CI/CD

This project uses GitHub Actions for continuous integration:

- **Automatic Checks**: TypeScript and ESLint run on every pull request
- **Branch Protection**: Main branch requires passing CI checks
- **Workflow**: `.github/workflows/ci.yml`

### CI Pipeline

The CI pipeline runs on:
- Pull requests to `main`
- Pushes to `main`

It performs:
1. TypeScript type checking (`pnpm typecheck`)
2. ESLint linting (`pnpm lint`)

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

### Content Management
- **CMS**: Sanity v4
- **Image Handling**: Sanity Image URL builder
- **Content Queries**: GROQ

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **CI/CD**: GitHub Actions

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass:
   ```bash
   pnpm typecheck
   pnpm lint
   ```
4. Create a pull request
5. Wait for CI checks to pass
6. Request review

## License

Proprietary - W-Cubed. All rights reserved.

## Contact

For questions about this project, please contact the W-Cubed development team.
