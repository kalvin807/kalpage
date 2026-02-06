# Kalpage Monorepo

Personal portfolio and home page applications managed as a Bun workspaces monorepo.

## Structure

```
.
├── apps/
│   ├── portfolio/    # SvelteKit portfolio website
│   └── home/         # React + TanStack Router home page
├── package.json      # Root workspace configuration
└── README.md
```

## Development

### Prerequisites

- Bun 1.2.15 or higher

### Setup

Install all dependencies:
```bash
bun install
```

### Running Apps

**Portfolio (SvelteKit):**
```bash
bun dev:portfolio
# Runs on http://localhost:5173
```

**Home (React):**
```bash
bun dev:home
# Runs on http://localhost:3000
```

**Both apps simultaneously:**
```bash
bun dev:all
```

### Building

**Build portfolio:**
```bash
bun build:portfolio
```

**Build home:**
```bash
bun build:home
```

**Build all:**
```bash
bun build:all
```

### Testing

**Run home tests:**
```bash
bun test:home
```

### Type Checking & Linting (Portfolio)

```bash
bun check:portfolio          # Type check
bun check:watch:portfolio    # Type check in watch mode
bun lint:portfolio           # Lint and format check
bun format:portfolio         # Format code
```

## Apps

### Portfolio

SvelteKit 2 portfolio website with Tailwind CSS v4 and DaisyUI.

- **Framework**: SvelteKit 2
- **Styling**: Tailwind CSS v4 + DaisyUI
- **Icons**: Lucide Svelte
- **Analytics**: Vercel Analytics
- **Build**: Static site generation

See [apps/portfolio/](apps/portfolio/) for more details.

### Home

React home page with TanStack Router.

- **Framework**: React 19
- **Router**: TanStack Router
- **Build**: Vite
- **Testing**: Vitest

See [apps/home/](apps/home/) for more details.

## Deployment

Both apps are configured for static site generation and can be deployed to Vercel, Netlify, or any static hosting provider.

## Workspace Management

**Clean all build artifacts and node_modules:**
```bash
bun clean
```

**Install dependencies for specific app:**
```bash
bun install --filter portfolio
bun install --filter home
```
