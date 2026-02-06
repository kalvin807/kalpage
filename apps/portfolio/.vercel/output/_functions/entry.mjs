import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_EEavGl1R.mjs';
import { manifest } from './manifest_DigSUK_O.mjs';

const serverIslandMap = new Map([
	['PaintingPixels', () => import('./chunks/PaintingPixels_DoQLZRXm.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/.bun/astro@5.17.1+34f3ac042a278c58/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/index.mdx", _page1]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3ffd35d4-c146-4e14-9a69-a7acedf27a94",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
