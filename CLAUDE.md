# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a Bun workspaces monorepo containing two applications:

- **apps/portfolio**: Astro + MDX static portfolio website
- **apps/home**: React + TanStack Router home page

## Development Commands

### Root-level Commands

- **Install all dependencies**: `bun install`
- **Dev portfolio**: `bun dev:portfolio` (runs on port 4321)
- **Dev home**: `bun dev:home` (runs on port 3000)
- **Dev both**: `bun dev:all`
- **Build portfolio**: `bun build:portfolio`
- **Build home**: `bun build:home`
- **Build all**: `bun build:all`
- **Clean all**: `bun clean`

### Portfolio App Commands (apps/portfolio/)

- **Development server**: `bun run dev`
- **Build production**: `bun run build`
- **Preview build**: `bun run preview`

### Home App Commands (apps/home/)

- **Development server**: `bun run dev` (port 3000)
- **Build production**: `bun run build`
- **Preview build**: `bun run preview`
- **Run tests**: `bun run test`

## Architecture Overview

### Portfolio App (apps/portfolio/)

Built with Astro and MDX. Fully static — zero client-side JavaScript.

- **Framework**: Astro 5 with MDX integration
- **Styling**: Tailwind CSS v4 with `@tailwindcss/typography` (prose classes)
- **Content**: All portfolio content lives in `src/pages/index.mdx` as plain markdown
- **Layout**: Single layout (`src/layouts/Layout.astro`) with HTML shell, header, footer, SEO meta

#### Key Structure

- `src/pages/index.mdx` — The portfolio content (edit this to update content)
- `src/layouts/Layout.astro` — HTML wrapper with SEO, header/footer
- `src/styles/global.css` — Tailwind imports
- `public/` — Static assets (favicons, doggo images, CNAME)

### Home App (apps/home/)

Built with React 19 and TanStack Router. The project uses:

- **Framework**: React 19
- **Router**: TanStack Router with devtools
- **Build**: Vite with React plugin
- **Testing**: Vitest with jsdom and React Testing Library
- **Path Aliases**: `@/*` maps to `./src/*`

#### Key Structure

- **Router**: Configured in `src/router.tsx`
- **Routes**: File-based routing in `src/routes/`
- **Components**: Reusable components in `src/components/`
- **Data**: Static data in `src/data/`
- **Assets**: Public assets in `public/`

## Workspace Management

This monorepo uses Bun workspaces. Both apps are independent with their own dependencies and build configurations.

- **Root**: Workspace configuration and shared tooling
- **apps/portfolio**: Astro portfolio (port 4321)
- **apps/home**: React home page (port 3000)

Each app can be developed and built independently. There are no shared packages between apps.
