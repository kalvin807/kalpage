import { v as decodeKey } from './chunks/astro/server_Cq1NJ6Fi.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BT101Usi.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/kal/workspace/kalpage/apps/portfolio/","cacheDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/node_modules/.astro/","outDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/dist/","srcDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/src/","publicDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/public/","buildClientDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/dist/client/","buildServerDir":"file:///Users/kal/workspace/kalpage/apps/portfolio/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.mdx","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/.bun/astro@5.17.1+34f3ac042a278c58/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/kal/workspace/kalpage/apps/portfolio/src/pages/index.mdx",{"propagation":"in-tree","containsHead":true}],["/Users/kal/workspace/kalpage/apps/portfolio/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/index@_@mdx":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/.bun/astro@5.17.1+34f3ac042a278c58/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DigSUK_O.mjs","/Users/kal/workspace/kalpage/apps/portfolio/src/components/PaintingPixels.astro":"chunks/PaintingPixels_DoQLZRXm.mjs","/Users/kal/workspace/kalpage/node_modules/.bun/astro@5.17.1+34f3ac042a278c58/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CLDH3kxF.mjs","/Users/kal/workspace/kalpage/apps/portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DcoFpdYB.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/kal/workspace/kalpage/apps/portfolio/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const c=document.querySelector(\".card-grid\");if(c){const r=c.querySelectorAll(\".glow-card\"),i=e=>{for(const o of r){const t=o.getBoundingClientRect(),s=e.x>t.left-40&&e.x<t.left+t.width+40&&e.y>t.top-40&&e.y<t.top+t.height+40;o.style.setProperty(\"--active\",s?\"1\":String(.15));const I=t.left+t.width*.5,d=t.top+t.height*.5;let n=Math.atan2(e.y-d,e.x-I)*180/Math.PI;n<0&&(n+=360),o.style.setProperty(\"--start\",String(n+90))}};document.body.addEventListener(\"pointermove\",i)}"]],"assets":["/_astro/index.QhbVyVmr.css","/CNAME","/android-chrome-192x192.png","/android-chrome-512x512.png","/apple-touch-icon.png","/browserconfig.xml","/doggo.png","/doggo.webp","/favicon-16x16.png","/favicon-32x32.png","/favicon.ico","/mstile-150x150.png","/safari-pinned-tab.svg","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[["/Users/kal/workspace/kalpage/apps/portfolio/src/components/PaintingPixels.astro","PaintingPixels"]],"key":"J+2/KD0s5cBOAkUsICL2G1rY/LHI9XZpWpTV0uLdAJ8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
