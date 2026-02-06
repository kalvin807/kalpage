import { e as createComponent, m as maybeRenderHead, r as renderTemplate, n as renderComponent, q as Fragment, g as addAttribute } from './astro/server_Cq1NJ6Fi.mjs';
import sharp from 'sharp';

const prerender = false;
const $$PaintingPixels = createComponent(async ($$result, $$props, $$slots) => {
  const MAX_COLS = 28;
  const MAX_RETRIES = 3;
  const SEARCH_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&hasImages=true&q=painting";
  const OBJECT_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
  let error = false;
  let pixels = [];
  let cols = 0;
  let info = { title: "", artist: "", date: "", url: "" };
  try {
    const searchRes = await fetch(SEARCH_URL);
    if (!searchRes.ok) throw new Error("Search API failed");
    const searchData = await searchRes.json();
    const objectIDs = searchData.objectIDs ?? [];
    if (objectIDs.length === 0) throw new Error("No paintings found");
    let imageUrl = null;
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const id = objectIDs[Math.floor(Math.random() * objectIDs.length)];
      const objRes = await fetch(OBJECT_URL + id);
      if (!objRes.ok) continue;
      const obj = await objRes.json();
      if (!obj.isPublicDomain || !obj.primaryImageSmall) continue;
      imageUrl = obj.primaryImageSmall;
      info = {
        title: obj.title ?? "Untitled",
        artist: obj.artistDisplayName ?? "Unknown",
        date: obj.objectDate ?? "",
        url: obj.objectURL ?? ""
      };
      break;
    }
    if (!imageUrl) throw new Error("All retries exhausted");
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) throw new Error("Image fetch failed");
    const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
    const metadata = await sharp(imageBuffer).metadata();
    const origW = metadata.width;
    const origH = metadata.height;
    cols = MAX_COLS;
    const rows = Math.round(origH / origW * cols);
    const rgbBuffer = await sharp(imageBuffer).resize(cols, rows).removeAlpha().raw().toBuffer();
    for (let i = 0; i < rgbBuffer.length; i += 3) {
      pixels.push({ r: rgbBuffer[i], g: rgbBuffer[i + 1], b: rgbBuffer[i + 2] });
    }
  } catch {
    error = true;
  }
  return renderTemplate`${error ? renderTemplate`${maybeRenderHead()}<p class="painting-error">Could not load a painting this time.</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`<div class="painting-grid"${addAttribute(`grid-template-columns:repeat(${cols},1fr)`, "style")}>${pixels.map((px) => renderTemplate`<div class="painting-pixel"${addAttribute(`background:rgb(${px.r},${px.g},${px.b})`, "style")}></div>`)}</div><div class="painting-info"><a${addAttribute(info.url, "href")} target="_blank" rel="noopener noreferrer" class="painting-link"><div class="painting-title">${info.title}</div><div class="painting-artist">${[info.artist, info.date].filter(Boolean).join(" \xB7 ")}</div></a></div>` })}`}`;
}, "/Users/kal/workspace/kalpage/apps/portfolio/src/components/PaintingPixels.astro", void 0);

const $$file = "/Users/kal/workspace/kalpage/apps/portfolio/src/components/PaintingPixels.astro";
const $$url = undefined;

export { $$PaintingPixels as default, $$file as file, prerender, $$url as url };
