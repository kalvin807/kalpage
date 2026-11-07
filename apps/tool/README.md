# kalvin.io

Portfolio at `/` plus tools under `/tool` (Japanese date converter, mapcode lookup), built with TanStack Start, React, and Tailwind CSS.

Run these commands from the repository root:

```sh
bun install --frozen-lockfile
bun run dev
bun run test
bun run build
```

The dev server runs on port 3001.

The mapcode tool reads `GOOGLE_MAPS_API_KEY` (Geocoding API) on the server. Without it, Google share links that carry only a romanised address are rebuilt from their postal code (jp-postal-code-api) and chōme numbers; links with just a place name can't be resolved. Addresses, coordinates and Apple links work either way.

- `src/routes/`: pages and layouts. `__root.tsx` is the bare HTML shell, `index.tsx` is the portfolio, `tool.tsx` is the tool layout. TanStack generates `src/routeTree.gen.ts`; do not edit it.
- `src/components/portfolio/`: portfolio sections, layout, Tokyo clock, and painting strip.
- `src/lib/painting/`: Met Museum painting fetch and downsampling for the footer strip.
- `src/lib/japanese-date/`: era definitions, parsing, conversion, formatting, and parser tests.
- `src/lib/mapcode/`: address and map share link parsing, geocoding, and the Japan MAPCODE lookup. Server functions in `server.ts` call GSI, jp-postal-code-api, japanmapcode.com, and (optionally) Google Geocoding.
- `src/components/ui/`: shared UI components.

Run `bun run check` for lint, formatting, type checks, and tests. Run `bun run fix` to apply Oxlint fixes and Oxfmt formatting.
