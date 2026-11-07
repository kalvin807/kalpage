import { Await } from '@tanstack/react-router';
import { STRIP_COLS, STRIP_ROWS, type PaintingPayload } from '@/lib/painting/painting';

interface PaintingPixelsProps {
  readonly painting: Promise<PaintingPayload | null>;
}

const CAPTION_CLASS = 'mx-auto my-0 max-w-2xl px-5 py-2.5 text-xs text-text-muted';

export function PaintingPixels({ painting }: PaintingPixelsProps) {
  return (
    <Await promise={painting} fallback={<PaintingFallback />}>
      {(payload) => <PaintingStrip payload={payload} />}
    </Await>
  );
}

function PaintingFallback() {
  return (
    <div>
      <div className="aspect-[64/10] w-full bg-surface-hover" />
      <p className={CAPTION_CLASS}>Loading a painting…</p>
    </div>
  );
}

function PaintingStrip({ payload }: { readonly payload: PaintingPayload | null }) {
  if (!payload) {
    return <p className={CAPTION_CLASS}>Couldn't load today's painting.</p>;
  }

  const { pixels, info } = payload;
  return (
    <>
      <div
        aria-hidden="true"
        className="grid aspect-[64/10] w-full gap-px bg-bg"
        style={{
          gridTemplateColumns: `repeat(${STRIP_COLS},1fr)`,
          gridTemplateRows: `repeat(${STRIP_ROWS},1fr)`,
        }}
      >
        {pixels.map((px, index) => (
          <div key={index} style={{ background: `rgb(${px.r},${px.g},${px.b})` }} />
        ))}
      </div>
      <p className={CAPTION_CLASS}>
        <a href={info.url} target="_blank" rel="noopener noreferrer" className="text-text hover:text-text-heading">
          {info.title}
        </a>
        {[info.artist, info.date].filter(Boolean).map((part) => ` · ${part}`)}
      </p>
    </>
  );
}
