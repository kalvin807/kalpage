# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `bun run dev` (or `npm run dev`)
- **Build production**: `bun run build`
- **Preview build**: `bun run preview`
- **Type checking**: `bun run check`
- **Type checking (watch)**: `bun run check:watch`
- **Lint and format check**: `bun run lint`
- **Format code**: `bun run format`

## Architecture Overview

This is a personal portfolio website built with SvelteKit 2, Tailwind CSS v4, and DaisyUI. The project uses:

- **Package Manager**: Bun (specified in package.json)
- **Deployment**: Static site generation via `@sveltejs/adapter-static`
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **Icons**: Lucide Svelte
- **Analytics**: Vercel Analytics

### Key Structure

- **Layout**: Single layout (`+layout.svelte`) with Header/Footer wrapper
- **Main page**: Portfolio homepage (`+page.svelte`) with three sections:
  - Personal introduction with spinning doggo avatar
  - "Stuff I made" (Showcases component)
  - "Things that happened" (Experiences component)
- **Components**: Modular components in `src/components/` with co-located data files
- **Data pattern**: Components have accompanying `data.ts` files for content

### Component Data Pattern

Components that display dynamic content (like Experiences and Showcases) import data from co-located `data.ts` files. When modifying content, look for these data files rather than hardcoded content in components.

### Static Assets

Static assets are in `/static/` and include favicon variants, apple touch icons, and the main doggo images used throughout the site.