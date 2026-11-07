import { createServerFn } from '@tanstack/react-start';
import { fetchPaintingPixels } from './painting.server';

export const maybeGetPainting = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    return await fetchPaintingPixels();
  } catch {
    // fetchPaintingPixels already logged the cause; the footer renders an error line instead.
    return null;
  }
});
