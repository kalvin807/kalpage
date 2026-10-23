# Tools

Japanese date converter and mapcode lookup at `tool.kalvin.io`, built with TanStack Start, React, and Tailwind CSS.

Run these commands from the repository root:

```sh
bun install --frozen-lockfile
bun run dev:tool
bun run test:tool
bun run build:tool
```

The dev server runs on port 3001.

The mapcode tool reads `GOOGLE_MAPS_API_KEY` (Geocoding API) on the server. Without it, Google share links that carry only a place name, not coordinates, can't be resolved; addresses, coordinates and Apple links still work.

- `src/routes/`: pages and shared layout. TanStack generates `src/routeTree.gen.ts`; do not edit it.
- `src/lib/japanese-date/`: era definitions, parsing, conversion, formatting, and parser tests.
- `src/lib/mapcode/`: address and map share link parsing, geocoding, and the Japan MAPCODE lookup. Server functions in `server.ts` call GSI, japanmapcode.com, and (optionally) Google Geocoding.
- `src/components/ui/`: shared UI components.

Run `bun run check` for lint, formatting, type checks, and tests across both apps. Run `bun run fix` to apply Oxlint fixes and Oxfmt formatting.
