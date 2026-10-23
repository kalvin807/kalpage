import { useEffect, useEffectEvent, useRef } from 'react';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLng } from '@/lib/mapcode';

// Leaflet touches `window` on import, so this module must only be loaded client-side (see the mapcode route).

const JAPAN_CENTER: L.LatLngTuple = [36.2, 138.25];
const JAPAN_ZOOM = 5;
const PIN_ZOOM = 16;
const GSI_TILE_URL = 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png';
const GSI_ATTRIBUTION =
  '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noreferrer">地理院タイル</a>';
// A div icon avoids Leaflet's default marker images, which bundlers fail to resolve.
const PIN_ICON = L.divIcon({
  className: '',
  html: '<div class="map-pin"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

interface MapPickerProps {
  readonly point?: LatLng;
  readonly onPick: (point: LatLng) => void;
}

export function MapPicker({ point, onPick }: MapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map>(undefined);
  const markerRef = useRef<L.Marker>(undefined);
  const pick = useEffectEvent(({ lat, lng }: L.LatLng) => onPick({ lat, lng }));

  useEffect(() => {
    if (!containerRef.current) {
      throw new Error('unreachable: map container is not mounted');
    }
    const map = L.map(containerRef.current, { center: JAPAN_CENTER, zoom: JAPAN_ZOOM });
    L.tileLayer(GSI_TILE_URL, { attribution: GSI_ATTRIBUTION, maxZoom: 18 }).addTo(map);
    const marker = L.marker(JAPAN_CENTER, { icon: PIN_ICON, draggable: true, autoPan: true });
    marker.on('dragend', () => pick(marker.getLatLng()));
    map.on('click', (event) => pick(event.latlng));
    mapRef.current = map;
    markerRef.current = marker;
    return () => {
      map.remove();
      mapRef.current = undefined;
      markerRef.current = undefined;
    };
  }, []);

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
    marker.setLatLng(point).addTo(map);
    // Only move the view for lookups that land off-screen or far out; a drag or tap stays put.
    if (map.getZoom() < PIN_ZOOM - 2 || !map.getBounds().contains(point)) {
      map.setView(point, PIN_ZOOM);
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
