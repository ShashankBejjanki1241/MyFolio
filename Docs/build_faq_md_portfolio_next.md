# BUILD_FAQ.md — iOS Portfolio (Next.js + R3F + Spline + Vercel)

A living FAQ/troubleshooting guide to prevent and fix common issues while building the **3D/Game** portfolio. Copy this file into your repo root.

---

## 🔧 Preflight Checklist
- Node **≥ 18.18** (LTS), npm or pnpm **≥ 8**
- Next.js **15+** (App Router)
- Packages: `react`, `react-dom`, `@react-three/fiber`, `@react-three/drei`, `three`, `three-stdlib`, `framer-motion`, `zustand`, `next-seo`
- Optional: `gsap`, `@supabase/supabase-js`, `@vercel/og`, `resend`
- Accounts set up: **Vercel**, **Cloudflare R2** (assets), **Supabase** (optional), **Resend** (email)
- **Environment variables** configured in Vercel → Project → Settings → Env Vars

### Required env vars
```
NEXT_PUBLIC_MODE_DEFAULT=recruiter
NEXT_PUBLIC_ASSETS_BASE=https://<your-r2-public-endpoint>
RESEND_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://<your-domain>
```

### Optional env vars
```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
PLAUSIBLE_DOMAIN=<your-domain>
```

---

## 🧭 Routing & App Router Gotchas
**Q:** Refreshing a nested route (e.g., `/projects/pulse-incident-ios`) 404s?

**A:** On Vercel (SSR/SSG) it should work. If you used `next export` (static only), dynamic routes won’t render. Use normal `next build` + Vercel, not `next export`.

**Q:** `Link` navigation is instant locally but slow on prod.

**A:** Enable route prefetch (default) and ensure images are optimized via `next/image` with `remotePatterns` (see below).

---

## 📦 Assets (R2/S3) — CORS, MIME, and Cache
**Q:** GLB/MP4/WebP not loading or shows CORS errors in console?

**A:**
1) Set **CORS** on R2 bucket to allow your domain:
```json
[
  {"AllowedOrigins":["https://<your-domain>", "https://<your-vercel-subdomain>.vercel.app"],
   "AllowedMethods":["GET","HEAD"],
   "AllowedHeaders":["*"]}
]
```
2) Ensure correct **Content-Type**:
- `.glb` → `model/gltf-binary`
- `.gltf` → `model/gltf+json`
- `.ktx2` → `image/ktx2`
- `.mp4` → `video/mp4`
- `.webm` → `video/webm`
- `.webp` → `image/webp`
3) Add `Cache-Control: public, max-age=31536000, immutable` for versioned assets.

**Q:** Video scrubbing broken?

**A:** Enable **Range requests** in R2 and upload with correct `Content-Length`. Use `<video controls preload="metadata">`.

---

## 🖼️ next/image Remote Patterns
**Q:** Images from R2/Cloudinary aren’t rendering with `next/image`.

**A:** Add to `next.config.mjs`:
```js
export default {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '<your-r2-host>', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' }
    ]
  }
}
```

---

## 🎮 React Three Fiber / three.js Issues
**Q:** `window is not defined` or R3F explodes during SSR.

**A:** Dynamically import 3D components **client-side only**:
```tsx
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false })
```
Also place `"use client"` at the top of any R3F component file.

**Q:** GLB model loads black / no texture.

**A:**
- Ensure materials bake or correct texture paths.
- If using KTX2, add a KTX2 loader via `drei`’s `useKTX2` or set `useGLTF.preload`.
- Use an HDRI env map; check color spaces: set `gl.outputColorSpace = THREE.SRGBColorSpace`.

**Q:** Performance tanks on mobile.

**A:**
- Clamp DPR: `<Canvas dpr={[1, 1.5]}>`
- Disable heavy shadows; use baked lighting; reduce poly count; use instancing.
- Lazy-load scenes with `Suspense`; split routes.

**Q:** Raycasting taps are offset/misfiring.

**A:** Pass correct pointer events container, ensure canvas size matches layout; convert clientX/Y to normalized device coords; verify `OrbitControls` options.

---

## 🌀 Spline Embeds
**Q:** Spline iframe doesn’t show.

**A:**
- Use `<iframe loading="lazy" allow="xr-spatial-tracking; fullscreen" />`.
- If blocked by CSP, update `Content-Security-Policy` to include `frame-src https://my.spline.design https://prod.spline.design` and `script-src` if required.

**Q:** Page shifts layout while Spline loads.

**A:** Give the iframe a fixed height (`h-[60vh]`) and a skeleton fallback.

---

## ✉️ Contact Form / API Routes
**Q:** 500 error from contact API.

**A:**
- Verify `RESEND_API_KEY` exists in Vercel and **project redeployed**.
- Resend requires a verified sender domain or `from` address; use a `@yourdomain` address.
- Add basic rate limit middleware to avoid spam.

**Q:** Form works locally but fails on prod.

**A:** Check Vercel function region (default OK). Ensure you’re using **Route Handlers** under `app/api/contact/route.ts`.

---

## 🗄️ Supabase (Achievements/Trophies, Optional)
**Q:** CORS or `Failed to fetch` when saving trophies.

**A:** Add your site origins in **Supabase → Auth → URL Configuration → Allowed Redirect URLs** and in **Auth → Settings → Additional Redirect URLs**. Also configure **Auth → Policies** if you’re writing to a row-level table; ensure RLS policies allow the insert for anon or logged-in users.

**Q:** Exposing `SUPABASE_ANON_KEY` safe?

**A:** Yes, the anon key is intended for client use with RLS. Never expose service role key.

---

## 🔐 Security Headers & CSP
**Q:** Mixed content / blocked by CSP.

**A:** Serve everything via **HTTPS**. Add a middleware (`middleware.ts`) to set headers:
```ts
import { NextResponse } from 'next/server'
export function middleware(req: Request) {
  const res = NextResponse.next()
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  // Relax frame-src for Spline
  res.headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "media-src https: data:",
    "script-src 'self' 'unsafe-inline' https:",
    "style-src 'self' 'unsafe-inline' https:",
    "connect-src 'self' https:",
    "frame-src https://my.spline.design https://prod.spline.design",
  ].join('; '))
  return res
}
```

---

## ⚡ Performance & Lighthouse
**Q:** Lighthouse mobile score low due to JS size.

**A:**
- **Recruiter Mode** default: no 3D imports.
- Use `dynamic(() => import(...), { ssr: false })` for game components.
- Code-split routes; tree-shake Drei imports; avoid importing `three/examples/jsm/*` globally.
- Serve images as WebP/AVIF; set `priority` for LCP image; preconnect to R2 host.

**Q:** LCP is the Spline iframe.

**A:** Lazy load the iframe after first interaction or move it below the fold; provide a static hero for Recruiter Mode.

---

## ♿ Accessibility
**Q:** Motion sickness reports / prefers-reduced-motion.

**A:** Respect media query:
```css
@media (prefers-reduced-motion: reduce) {
  /* disable auto animations, parallax */
}
```
Provide skip links, keyboard navigation, ARIA labels for interactive 3D hotspots.

---

## 📱 iOS Safari / Mobile WebXR Quirks
- **Autoplay** blocked → require user gesture before playing video/audio.
- **WebGL context loss** → keep scenes light; detect `webglcontextlost` and recover.
- **Pointer events** → prefer `onPointerDown` over `onClick` for reliability.
- **PWA**: add `apple-touch-icon`, splashscreens, and `viewport-fit=cover`.

---

## 🔍 SEO & Social
**Q:** Pages not indexed / poor previews.

**A:**
- Use `next-seo` per route.
- Generate OG images (Vercel OG) for `/projects/[slug]`.
- Add `sitemap.xml` and `robots.txt`; submit to Google Search Console.

---

## 🧪 Testing
**Q:** Playwright fails on WebGL.

**A:** Run with `--use-gl=egl` or skip 3D-specific assertions on CI; use data-testid fallbacks; test presence of canvas and interactive hotspots via ARIA roles.

---

## 🐛 Common Error Messages & Fixes
- `TypeError: Cannot read properties of undefined (reading 'scene')` → `useGLTF` path wrong or missing `public/` asset; confirm URL & CORS.
- `Hydration failed` → server markup differs; avoid conditional rendering that changes between SSR and client; gate 3D with `useEffect` or `ssr:false`.
- `Unhandled Runtime Error: ResizeObserver loop limit exceeded` → usually safe to ignore; throttle layout changes, avoid infinite re-renders.
- `403 Forbidden` from R2 → object ACL not public or wrong auth; verify URL and bucket policy.

---

## 🏁 Post-Deploy Checklist
- ✅ `/?mode=recruiter` loads fast (<2s)
- ✅ Top 3 projects visible above the fold
- ✅ Contact form sends via Resend
- ✅ 3D hero loads on toggle to Game Mode
- ✅ Two working portals in `/game`
- ✅ Lighthouse (mobile) Recruiter Mode ≥ 90
- ✅ Sitemap/robots present; OG previews correct
- ✅ Analytics receiving events (view_project, toggle_mode)

---

## 📚 Snippets
**Dynamic import for 3D-only client:**
```tsx
import dynamic from 'next/dynamic'
const GameWorld = dynamic(() => import('@/app/game/GameWorld'), { ssr: false })
```

**Clamp DPR and basic canvas:**
```tsx
<Canvas dpr={[1, 1.5]} shadows camera={{ fov: 45, position: [0,1.4,3] }}>
  <ambientLight intensity={0.5} />
</Canvas>
```

**Video with good defaults:**
```html
<video controls playsinline preload="metadata" poster="/posters/pulse.webp">
  <source src="https://r2.example.com/pulse/demo.mp4" type="video/mp4" />
</video>
```

**next-seo basic config:**
```ts
export const SEO = {
  titleTemplate: '%s | Your Name — iOS Developer',
  defaultTitle: 'Your Name — iOS Developer',
  description: 'SwiftUI • ARKit • Core Data • High-performance iOS apps',
  openGraph: { type: 'website', site_name: 'Your Name' }
}
```

---

## 🆘 When All Else Fails
- Check browser console/network for CORS/MIME.
- Compare dev vs prod env vars on Vercel.
- Reproduce errors with a minimal page (drop all 3D, add back step-by-step).
- Use Vercel preview deployments to bisect changes.

> Keep this file updated as you discover new edge cases. PRs welcome in your own repo 🔧

