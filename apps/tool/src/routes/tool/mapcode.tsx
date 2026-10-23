import { lazy, Suspense, useRef, useState } from 'react';
import { ClientOnly, createFileRoute } from '@tanstack/react-router';
import { IconLoader2 } from '@tabler/icons-react';
import { SITE_URL } from '@/lib/site';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/copy-button';
import { isInJapan, parseInput, type LatLng, type Place } from '@/lib/mapcode';
import { maybeLookupMapcode, maybeLookupPlace } from '@/lib/mapcode/server';

// MapLibre needs `window` and WebGL, so the map is code-split and only rendered on the client.
const MapPicker = lazy(() => import('@/components/map-picker').then((module) => ({ default: module.MapPicker })));

const DESCRIPTION = '住所やGoogleマップ・Appleマップの共有リンクから、カーナビ用のマップコードを調べるツール';

export const Route = createFileRoute('/tool/mapcode')({
  component: MapcodePage,
  head: () => ({
    meta: [
      { title: 'マップコード変換' },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:url', content: `${SITE_URL}/tool/mapcode` },
      { property: 'og:title', content: 'マップコード変換 - tool.kalvin.io' },
      { property: 'og:description', content: DESCRIPTION },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'マップコード変換' },
      { name: 'twitter:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/tool/mapcode` }],
  }),
});

const EXAMPLE_INPUTS = ['東京都渋谷区千駄ヶ谷1-5-5', '沖縄県那覇市首里金城町1-2', '26.694333, 127.877833'] as const;

const NOT_FOUND_MESSAGE =
  '場所が見つかりませんでした。日本語の住所を入力するか、地図をタップしてピンを置いてください。';
const OUTSIDE_JAPAN_MESSAGE = 'マップコードは日本国内の地点のみ対応しています';
const NO_MAPCODE_MESSAGE = 'この地点のマップコードは見つかりませんでした';

interface LookupState {
  readonly place?: Place;
  readonly mapcode?: string;
  readonly loading: boolean;
  readonly error?: string;
}

/** Coordinates and bad links are handled locally; everything else needs the server (redirects, geocoding). */
async function maybeFindPlace(text: string): Promise<Place | undefined> {
  const parsed = parseInput(text);
  if (parsed.type === 'invalid') {
    throw new Error(parsed.error);
  }
  if (parsed.type === 'point') {
    return { point: parsed.point, label: parsed.label };
  }
  return maybeLookupPlace({ data: { text } });
}

function MapcodePage() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<LookupState>({ loading: false });
  const latestRequest = useRef(0);

  // Each lookup supersedes the previous one, so a slow response can't overwrite a newer pin.
  const lookup = async (findPlace: () => Promise<Place | undefined>) => {
    const request = ++latestRequest.current;
    const isStale = () => request !== latestRequest.current;
    setState((previous) => ({ place: previous.place, loading: true }));
    try {
      const place = await findPlace();
      if (isStale()) {
        return;
      }
      if (!place) {
        setState({ loading: false, error: NOT_FOUND_MESSAGE });
        return;
      }
      if (!isInJapan(place.point)) {
        setState({ place, loading: false, error: OUTSIDE_JAPAN_MESSAGE });
        return;
      }
      setState({ place, loading: true });
      const mapcode = await maybeLookupMapcode({ data: place.point });
      if (isStale()) {
        return;
      }
      setState({ place, mapcode, loading: false, error: mapcode ? undefined : NO_MAPCODE_MESSAGE });
    } catch (error) {
      if (isStale()) {
        return;
      }
      setState({ loading: false, error: error instanceof Error ? error.message : String(error) });
    }
  };

  const submit = (text: string) => {
    setInput(text);
    if (!text.trim()) {
      return;
    }
    void lookup(() => maybeFindPlace(text));
  };

  const pickPoint = (point: LatLng) => {
    void lookup(async () => ({ point }));
  };

  return (
    <>
      {/* Input */}
      <div className="mb-6">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(input);
          }}
          className="flex items-center rounded-lg border border-border bg-card shadow-sm transition-all focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-ring hover:border-foreground/20"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="住所・Google / Apple マップのリンク・緯度,経度"
            className="h-12 flex-1 border-0 bg-transparent px-4 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 sm:h-14"
            aria-label="住所またはマップのリンク"
            enterKeyHint="search"
          />
          <Button type="submit" size="lg" className="mr-2 min-w-16" disabled={state.loading}>
            {state.loading ? <IconLoader2 className="animate-spin" aria-label="検索中" /> : '変換'}
          </Button>
        </form>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          {EXAMPLE_INPUTS.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => submit(example)}
              className="rounded-full border border-transparent px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {state.error && <ErrorState message={state.error} />}
      {state.place && <ResultCard place={state.place} mapcode={state.mapcode} loading={state.loading} />}

      {/* Map */}
      <div className="mt-6">
        <ClientOnly fallback={<MapPlaceholder />}>
          <Suspense fallback={<MapPlaceholder />}>
            <MapPicker point={state.place?.point} onPick={pickPoint} />
          </Suspense>
        </ClientOnly>
        <p className="mt-2 text-xs text-muted-foreground">地図をタップ、またはピンをドラッグして位置を調整できます</p>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground/70">
        マップコードは japanmapcode.com
        から取得しています。「マップコード」および「MAPCODE」は株式会社デンソーの登録商標です。
      </p>
    </>
  );
}

// --- UI Components ---

function MapPlaceholder() {
  return <div className="h-72 w-full animate-pulse rounded-lg border border-border bg-muted sm:h-96" />;
}

interface ErrorStateProps {
  readonly message: string;
}

function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="animate-in fade-in-0 mb-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive duration-150">
      {message}
    </div>
  );
}

interface ResultCardProps {
  readonly place: Place;
  readonly mapcode?: string;
  readonly loading: boolean;
}

function ResultCard({ place, mapcode, loading }: ResultCardProps) {
  const coordinates = `${place.point.lat.toFixed(6)}, ${place.point.lng.toFixed(6)}`;
  return (
    <div className="animate-in fade-in-0 rounded-lg border border-border bg-card p-5 shadow-sm duration-200">
      <div className="mb-1 text-xs font-medium tracking-wide text-muted-foreground">マップコード</div>
      <div className={`flex min-h-10 items-center gap-2 transition-opacity ${loading ? 'opacity-40' : 'opacity-100'}`}>
        <span className="font-mono text-3xl font-semibold tracking-wide tabular-nums">{mapcode ?? '— — —'}</span>
        {mapcode && !loading && <CopyButton text={mapcode} />}
      </div>
      <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
        {place.label && (
          <>
            <dt className="text-muted-foreground">場所</dt>
            <dd className="min-w-0 break-words">{place.label}</dd>
          </>
        )}
        <dt className="text-muted-foreground">座標</dt>
        <dd className="flex items-center gap-1 font-mono tabular-nums">
          {coordinates}
          <CopyButton text={coordinates} />
        </dd>
      </dl>
    </div>
  );
}
