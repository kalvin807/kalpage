# Tools

Japanese date converter at `tool.kalvin.io`, built with TanStack Start, React, and Tailwind CSS.

Run these commands from the repository root:

```sh
bun install --frozen-lockfile
bun run dev:tool
bun run test:tool
bun run build:tool
```

The dev server runs on port 3001.

- `src/routes/`: pages and shared layout. TanStack generates `src/routeTree.gen.ts`; do not edit it.
- `src/lib/japanese-date/`: era definitions, parsing, conversion, formatting, and parser tests.
- `src/components/ui/`: shared UI components.

Run `bun run check` for lint, type, and formatting checks. Run `bun run fix` to apply Oxlint fixes and Oxfmt formatting.
