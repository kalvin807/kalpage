import { useEffect, useEffectEvent, useRef } from 'react';
import { MapLibreMap, Marker, NavigationControl, setWorkerUrl, type TransformStyleFunction } from 'maplibre-gl';
// MapLibre builds its worker URL at runtime from import.meta.url, which neither Vite's dep
// pre-bundling nor the production build can follow; `?url` emits the file and hands us its path.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { LatLng } from '@/lib/mapcode';
import { useTheme } from '@/lib/theme-provider';

// MapLibre needs `window` and WebGL, so this module must only be loaded client-side (see the mapcode route).

setWorkerUrl(workerUrl);

// Kyushu to Hokkaido; fitting bounds keeps all four main islands in view at any width.
const JAPAN_BOUNDS: [[number, number], [number, number]] = [
  [129.5, 31],
  [145.8, 45.5],
];
const PIN_ZOOM = 16;
// OpenFreeMap serves OSM vector tiles with no API key. Positron and Dark share one layout,
// so switching theme only recolours the map.
const STYLE_URLS = {
  light: 'https://tiles.openfreemap.org/styles/positron',
  dark: 'https://tiles.openfreemap.org/styles/dark',
} as const;
// An embedded map in a scrolling page shouldn't trap the scroll wheel or one-finger swipes.
const GESTURE_LOCALE = {
  'CooperativeGesturesHandler.WindowsHelpText': 'Ctrl + スクロールで拡大・縮小',
  'CooperativeGesturesHandler.MacHelpText': '⌘ + スクロールで拡大・縮小',
  'CooperativeGesturesHandler.MobileHelpText': '2本の指で地図を動かせます',
};
const PIN_SVG = `<svg width="32" height="40" viewBox="0 0 32 40" aria-hidden="true">
  <path d="M16 38S4 25.5 4 16a12 12 0 0 1 24 0c0 9.5-12 22-12 22z" fill="var(--primary)" stroke="var(--background)" stroke-width="2.5"/>
  <circle cx="16" cy="16" r="4.5" fill="var(--background)"/>
</svg>`;

/** The styles label places as "Shibuya\n渋谷"; the tool is in Japanese, so show the local name only. */
const withJapaneseLabels: TransformStyleFunction = (_previous, next) => ({
  ...next,
  layers: next.layers.map((layer) => {
    if (layer.type !== 'symbol' || !JSON.stringify(layer.layout?.['text-field'] ?? '').includes('name')) {
      return layer;
    }
    return { ...layer, layout: { ...layer.layout, 'text-field': ['coalesce', ['get', 'name:ja'], ['get', 'name']] } };
  }),
});

interface MapPickerProps {
  readonly point?: LatLng;
  readonly onPick: (point: LatLng) => void;
}

export function MapPicker({ point, onPick }: MapPickerProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap>(undefined);
  const markerRef = useRef<Marker>(undefined);
  const pick = useEffectEvent(({ lat, lng }: LatLng) => onPick({ lat, lng }));

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error('unreachable: map container is not mounted');
    }
    const map = new MapLibreMap({
      container: containerRef.current,
      bounds: JAPAN_BOUNDS,
      fitBoundsOptions: { padding: 16 },
      // Pin placement is easier on a flat, north-up map.
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      cooperativeGestures: true,
      locale: GESTURE_LOCALE,
      attributionControl: { compact: true },
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right');
    // The compact attribution opens expanded on load and covers a third of a phone-sized map;
    // start it collapsed behind its (i) button instead.
    map.once('load', () => {
      const attribution = map.getContainer().querySelector('.maplibregl-compact-show');
      attribution?.classList.remove('maplibregl-compact-show');
      attribution?.removeAttribute('open');
    });

    const element = document.createElement('div');
    element.className = 'map-pin';
    element.innerHTML = PIN_SVG;
    const marker = new Marker({ element, anchor: 'bottom', draggable: true });
    marker.on('dragend', () => pick(marker.getLngLat()));
    map.on('click', (event) => pick(event.lngLat));

    mapRef.current = map;
    markerRef.current = marker;
    return () => {
      map.remove();
      mapRef.current = undefined;
      markerRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    mapRef.current?.setStyle(STYLE_URLS[theme], { transformStyle: withJapaneseLabels });
  }, [theme]);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) {
      return;
    }
    if (!point) {
      marker.remove();
      return;
    }
    marker.setLngLat(point).addTo(map);
    // Only move the camera for lookups that land off-screen or far out; a drag or tap stays put.
    if (map.getZoom() < PIN_ZOOM - 2 || !map.getBounds().contains(point)) {
      map.flyTo({ center: point, zoom: PIN_ZOOM });
    }
  }, [point]);

  return (
    <div
      ref={containerRef}
      className="isolate h-72 w-full overflow-hidden rounded-lg border border-border sm:h-96"
      aria-label="地図"
    />
  );
}
