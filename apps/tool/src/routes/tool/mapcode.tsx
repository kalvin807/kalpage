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
      { property: 'og:title', content: 'マップコード変換 - kalvin.io/tool' },
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
const LOOKUP_FAILED_MESSAGE = '検索中にエラーが発生しました。時間をおいてもう一度お試しください。';

interface LookupError {
  readonly message: string;
  /** Technical cause (upstream status, API error), shown small so a misconfigured key is diagnosable. */
  readonly detail?: string;
}

interface LookupState {
  readonly place?: Place;
  readonly mapcode?: string;
  readonly loading: boolean;
  readonly error?: LookupError;
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
        setState({ loading: false, error: { message: NOT_FOUND_MESSAGE } });
        return;
      }
      if (!isInJapan(place.point)) {
        setState({ place, loading: false, error: { message: OUTSIDE_JAPAN_MESSAGE } });
        return;
      }
      setState({ place, loading: true });
      const mapcode = await maybeLookupMapcode({ data: place.point });
      if (isStale()) {
        return;
      }
      setState({ place, mapcode, loading: false, error: mapcode ? undefined : { message: NO_MAPCODE_MESSAGE } });
    } catch (error) {
      if (isStale()) {
        return;
      }
      console.error('Mapcode lookup failed:', error);
      // Keep the last pin so a failed lookup after a map tap doesn't make it vanish.
      setState((previous) => ({
        place: previous.place,
        loading: false,
        error: { message: LOOKUP_FAILED_MESSAGE, detail: error instanceof Error ? error.message : String(error) },
      }));
    }
  };

  // Coordinates and bad links are handled locally; everything else needs the server (redirects, geocoding).
  const submit = (text: string) => {
    setInput(text);
    const parsed = parseInput(text);
    if (parsed.type === 'empty') {
      return;
    }
    if (parsed.type === 'invalid') {
      latestRequest.current++;
      setState({ loading: false, error: { message: parsed.error } });
      return;
    }
    if (parsed.type === 'point') {
      void lookup(async () => ({ point: parsed.point, label: parsed.label }));
      return;
    }
    void lookup(() => maybeLookupPlace({ data: { text } }));
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
          className="flex items-center border border-line transition-colors focus-within:border-link hover:border-text-muted"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="住所・Google / Apple マップのリンク・緯度,経度"
            className="h-12 flex-1 border-0 bg-transparent px-4 text-base text-text-heading placeholder:text-text-muted/70 focus-visible:ring-0 dark:bg-transparent sm:h-14"
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
              className="border border-transparent px-2 py-1 text-xs text-text-muted hover:border-line hover:text-text-heading"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {state.error && <ErrorState error={state.error} />}
      {state.place && <ResultCard place={state.place} mapcode={state.mapcode} loading={state.loading} />}

      {/* Map */}
      <div className="mt-6">
        <ClientOnly fallback={<MapPlaceholder />}>
          <Suspense fallback={<MapPlaceholder />}>
            <MapPicker point={state.place?.point} onPick={pickPoint} />
          </Suspense>
        </ClientOnly>
        <p className="mt-2 mb-0 text-xs text-text-muted">地図をタップ、またはピンをドラッグして位置を調整できます</p>
      </div>

      <p className="mt-14 mb-0 border-t border-line pt-4 text-xs text-text-muted">
        マップコードは japanmapcode.com
        から取得しています。「マップコード」および「MAPCODE」は株式会社デンソーの登録商標です。
      </p>
    </>
  );
}

// --- UI Components ---

function MapPlaceholder() {
  return <div className="h-72 w-full animate-pulse border border-line bg-surface-hover sm:h-96" />;
}

interface ErrorStateProps {
  readonly error: LookupError;
}

function ErrorState({ error }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="animate-in fade-in-0 mb-4 border border-destructive/50 px-4 py-3 text-sm text-destructive duration-150"
    >
      {error.message}
      {error.detail && <p className="m-0 mt-1 text-xs break-words opacity-70">{error.detail}</p>}
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
    <div role="status" className="animate-in fade-in-0 border border-line duration-200">
      <div className="border-b border-line px-4 py-4">
        <div className="mb-1 text-xs text-text-muted">マップコード</div>
        <div
          className={`flex min-h-10 items-center gap-2 transition-opacity ${loading ? 'opacity-40' : 'opacity-100'}`}
        >
          <span className="text-3xl font-semibold text-text-heading tabular-nums">{mapcode ?? '— — —'}</span>
          {mapcode && !loading && <CopyButton text={mapcode} />}
        </div>
      </div>
      <dl className="m-0 text-sm">
        {place.label && (
          <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] border-b border-line">
            <dt className="px-4 py-2 text-text-muted">場所</dt>
            <dd className="m-0 border-l border-line px-3 py-2 break-words text-text-heading">{place.label}</dd>
          </div>
        )}
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)]">
          <dt className="px-4 py-2 text-text-muted">座標</dt>
          <dd className="m-0 flex items-center gap-1 border-l border-line px-3 py-2 text-text-heading tabular-nums">
            {coordinates}
            <CopyButton text={coordinates} />
          </dd>
        </div>
      </dl>
    </div>
  );
}
