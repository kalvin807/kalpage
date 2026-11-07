// The footer strip is a fixed 64x10 grid of roughly square cells.
export const STRIP_COLS = 64;
export const STRIP_ROWS = 10;

export interface PixelData {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface PaintingInfo {
  readonly title: string;
  readonly artist: string;
  readonly date: string;
  readonly url: string;
}

export interface PaintingPayload {
  readonly pixels: PixelData[];
  readonly info: PaintingInfo;
}
