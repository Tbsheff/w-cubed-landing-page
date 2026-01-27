# W-Cubed Landing Page

A modern, responsive landing page for W-Cubed - Mountain West's premier water
equipment representative, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **CMS Integration**: Sanity CMS for dynamic content management
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

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and fill in the required values:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (e.g., `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version (default: `2025-09-15`)
- `REVALIDATE_SECRET` - Secret for on-demand revalidation webhooks

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

| Script           | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start the development server        |
| `pnpm build`     | Build the production application    |
| `pnpm start`     | Start the production server         |
| `pnpm lint`      | Run ESLint for code quality         |
| `pnpm typecheck` | Run TypeScript type checking        |
| `pnpm clean`     | Remove build cache and node_modules |

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

## Deployment

### Required Environment Variables

For production builds, you **must** set the following environment variables in
your deployment platform (e.g., Vercel, Netlify):

**Required:**

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Your Sanity dataset (e.g., `production`)

**Optional:**

- `NEXT_PUBLIC_SANITY_API_VERSION` - Sanity API version (defaults to
  `2025-09-15` if not set)
- `REVALIDATE_SECRET` - Secret for on-demand revalidation webhooks (required for
  webhook-based revalidation)

### Vercel Deployment

1. Connect your repository to Vercel
2. Add the required environment variables in Project Settings → Environment
   Variables
3. Deploy

The build will fail if `NEXT_PUBLIC_SANITY_PROJECT_ID` or
`NEXT_PUBLIC_SANITY_DATASET` are not set.

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

- **Framework**: Next.js 14 (App Router)
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
