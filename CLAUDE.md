# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a Bun workspaces monorepo containing two applications:

- **apps/portfolio**: SvelteKit personal portfolio website
- **apps/home**: React + TanStack Router home page

## Development Commands

### Root-level Commands

- **Install all dependencies**: `bun install`
- **Dev portfolio**: `bun dev:portfolio` (runs on port 5173)
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
- **Type checking**: `bun run check`
- **Type checking (watch)**: `bun run check:watch`
- **Lint and format check**: `bun run lint`
- **Format code**: `bun run format`

### Home App Commands (apps/home/)

- **Development server**: `bun run dev` (port 3000)
- **Build production**: `bun run build`
- **Preview build**: `bun run preview`
- **Run tests**: `bun run test`

## Architecture Overview

### Portfolio App (apps/portfolio/)

Built with SvelteKit 2, Tailwind CSS v4, and DaisyUI. The project uses:

- **Package Manager**: Bun (specified in root package.json)
- **Deployment**: Static site generation via `@sveltejs/adapter-static`
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Icons**: Lucide Svelte
- **Analytics**: Vercel Analytics

#### Key Structure

- **Layout**: Single layout (`+layout.svelte`) with Header/Footer wrapper
- **Main page**: Portfolio homepage (`+page.svelte`) with three sections:
  - Personal introduction with spinning doggo avatar
  - "Stuff I made" (Showcases component)
  - "Things that happened" (Experiences component)
- **Components**: Modular components in `src/components/` with co-located data files
- **Data pattern**: Components have accompanying `data.ts` files for content

#### Component Data Pattern

Components that display dynamic content (like Experiences and Showcases) import data from co-located `data.ts` files. When modifying content, look for these data files rather than hardcoded content in components.

#### Static Assets

Static assets are in `apps/portfolio/static/` and include favicon variants, apple touch icons, and the main doggo images used throughout the site.

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
- **apps/portfolio**: SvelteKit portfolio (port 5173)
- **apps/home**: React home page (port 3000)

Each app can be developed and built independently. There are no shared packages between apps.
