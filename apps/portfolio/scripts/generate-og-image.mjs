import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const width = 1200;
const height = 630;
const centerX = width / 2;
const centerY = height / 2;
const iconSize = 180;
const iconRadius = iconSize / 2;
const iconRingRadius = iconRadius + 14;
const iconX = centerX - iconRadius;
const iconY = centerY - iconRadius;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const iconPath = resolve(__dirname, '../public/apple-touch-icon.png');
const outputPath = resolve(__dirname, '../public/og-image.png');
const iconBase64 = readFileSync(iconPath).toString('base64');
const iconDataUri = `data:image/png;base64,${iconBase64}`;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1816" />
      <stop offset="100%" stop-color="#141311" />
    </linearGradient>
    <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75">
      <stop offset="0%" stop-color="rgba(255,255,255,0.04)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0)" />
    </radialGradient>
    <clipPath id="icon-clip">
      <circle cx="${centerX}" cy="${centerY}" r="${iconRadius - 4}" />
    </clipPath>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect width="${width}" height="${height}" fill="url(#vignette)" />

  <circle cx="${centerX}" cy="${centerY}" r="${iconRingRadius}" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
  <image href="${iconDataUri}" x="${iconX}" y="${iconY}" width="${iconSize}" height="${iconSize}" preserveAspectRatio="xMidYMid slice" clip-path="url(#icon-clip)" />
</svg>
`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 100 })
  .toFile(outputPath);

console.log(`Generated ${outputPath}`);
