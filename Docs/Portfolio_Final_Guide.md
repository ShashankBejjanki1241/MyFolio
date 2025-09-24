# iOS Developer Portfolio — Final Build Guide (Minimal Required)

> A complete, end-to-end guide for building and deploying a professional iOS developer portfolio with dual **Recruiter Mode** (fast, minimal) and **Game Mode** (3D interactive world).

---

## 1. Project Goals

- Showcase iOS apps, projects, and achievements.
- Impress with **3D interactive/game elements** while keeping recruiters happy with a **fast mode**.
- Run entirely on **Vercel** with external CDN for heavy assets.
- Ensure performance, accessibility, SEO, and contact functionality.

---

## 2. Tech Stack (Final Required Versions)

| Component             | Version (stable)                                                                 |
|-----------------------|-----------------------------------------------------------------------------------|
| **Next.js**           | 14.2.x  (⚠️ Next 15 has React Three Fiber issues [ref](https://github.com/vercel/next.js/issues/71836)) |
| **React**             | 18.x                                                                              |
| **@react-three/fiber**| 9.3.0 ([npm](https://www.npmjs.com/package/@react-three/fiber))                   |
| **@react-three/drei** | 10.7.6 ([releases](https://github.com/pmndrs/drei/releases))                      |
| **three**             | ≤ 0.154.x (avoid 0.155+ until fiber fully supports [ref](https://github.com/pmndrs/react-three-fiber/issues/3003)) |
| **Tailwind CSS**      | latest stable                                                                     |
| **Framer Motion**     | latest stable                                                                     |
| **Email**             | Resend or SendGrid (API-based)                                                    |
| **CDN/Storage**       | Cloudflare R2 (or AWS S3)                                                         |

---

## 3. Repository Structure

```
/
  app/
    page.tsx               # Home (Recruiter Mode hero + mode toggle)
    projects/page.tsx      # Project grid
    projects/[slug]/page.tsx
    resume/page.tsx
    contact/page.tsx
    game/page.tsx          # Game world (3D)
    api/contact/route.ts   # Contact form handler
  components/
    HeroRecruiter.tsx
    Hero3D.tsx
    ProjectCard.tsx
    ProjectDetail.tsx
    ModeToggle.tsx
    ...
  public/                  # Icons, favicon, static images
  styles/
    globals.css
    tailwind.css
  utils/
    email.ts               # email sending logic
    storage.ts             # localStorage helpers
  next.config.mjs
  tailwind.config.js
  README.md
  BUILD_FAQ.md
  projects.json            # project metadata
  .env.local               # local env vars
```

---

## 4. Routes & Features (Required Only)

- `/` **Home**  
  - Recruiter Mode hero (fast)  
  - Toggle to Game Mode (loads 3D hero)  

- `/projects`  
  - Grid of projects  

- `/projects/[slug]`  
  - Project detail: screenshots, summary, metrics, tech stack, demo video  

- `/resume`  
  - Printable recruiter-friendly resume (CSS print support)  

- `/contact`  
  - Contact form (POST → API route → Resend/SendGrid email)  

- `/game`  
  - 3D interactive scene (React Three Fiber)  
  - At least one model + hotspot that links to projects  

---

## 5. Environment Variables

Add these in `.env.local` (dev) and Vercel → Project → Settings → Environment Variables:

```
NEXT_PUBLIC_MODE_DEFAULT=recruiter
NEXT_PUBLIC_ASSETS_BASE=https://<cdn-endpoint>
RESEND_API_KEY=xxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 6. 3D Setup (Minimal Required)

**Hero3D.tsx**

```tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import IPhone from '@/components/3d/IPhone'

export default function Hero3D() {
  return (
    <div className="h-[60vh]">
      <Suspense fallback={<div className="animate-pulse">Loading 3D…</div>}>
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 1.2, 3], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 4, 2]} castShadow />
          <IPhone />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </Suspense>
    </div>
  )
}
```

**IPhone.tsx**

```tsx
'use client'
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'

export default function IPhone() {
  const { scene } = useGLTF(process.env.NEXT_PUBLIC_ASSETS_BASE + '/models/iphone14.glb')
  const model = useMemo(() => scene.clone(), [scene])
  return <primitive object={model} position={[0, -0.6, 0]} />
}
```

---

## 7. Contact API (Required)

**app/api/contact/route.ts**

```ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    if (!email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Resend API call
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Portfolio <hello@yourdomain.com>',
        to: 'you@yourdomain.com',
        subject: `New message from ${name || 'Visitor'}`,
        html: `<p><b>Email:</b> ${email}</p><p>${message}</p>`
      })
    })

    if (!resp.ok) throw new Error('Email failed')

    return NextResponse.json({ success: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
```

---

## 8. Assets Hosting Rules

- Host assets in R2/S3 with **CORS allowed** for your domain.  
- Use correct MIME types:
  - `.glb` → `model/gltf-binary`  
  - `.mp4` → `video/mp4`  
  - `.webp` → `image/webp`  

- Add caching headers:  
  `Cache-Control: public, max-age=31536000, immutable`

---

## 9. Performance Rules

- Recruiter Mode must not import 3D libraries. Use:

```tsx
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false })
```

- Clamp DPR for canvas (`dpr={[1, 1.5]}`).  
- Compress models (Draco).  
- Lazy-load videos (`preload="metadata"`).  
- Lighthouse mobile score ≥ 90 in Recruiter Mode.

---

## 10. Accessibility Rules

- Use `alt` text for all images.  
- Keyboard focus visible for navigation.  
- Provide `aria-label` for 3D hotspots.  
- Respect `prefers-reduced-motion`.

---

## 11. SEO Rules

- Use `next-seo` or `<Head>` tags.  
- Add `robots.txt` and `sitemap.xml`.  
- OG images per project (static or via Vercel OG).

---

## 12. Deployment Steps

1. **Push repo** to GitHub.  
2. **Connect to Vercel** → Import repo.  
3. Add env vars in Vercel dashboard.  
4. Upload 3D models/videos/images to R2 (CDN).  
5. Update asset URLs in `projects.json`.  
6. Deploy → test recruiter mode loads fast, game mode toggles, contact form sends.  
7. Connect custom domain in Vercel.  

---

## 13. Testing (Required Only)

- Run `npm run build && npm run start` locally before deploy.  
- Test all routes:  
  - `/` loads recruiter mode in <2s.  
  - Toggle to `/game` → 3D loads correctly.  
  - `/projects/[slug]` displays project details.  
  - `/resume` prints cleanly.  
  - `/contact` sends email.  
- Run Lighthouse mobile: ≥90 Recruiter Mode.  
- Check accessibility with axe devtools.

---

## 14. Known Issues & Fixes

- **Next.js 15 + R3F** → runtime errors. Use Next 14.2.x.  
- **three@0.155+** → breaks with fiber/drei. Use ≤ 0.154.x.  
- **GLB not loading** → check MIME type + CORS on CDN.  
- **Black model** → missing textures or wrong color space.  
- **Contact form fails** → verify `RESEND_API_KEY` and sender domain.  

---

## 15. Post-Deploy Checklist

- ✅ Recruiter mode loads instantly, shows top 3 projects.  
- ✅ Game mode loads only when toggled.  
- ✅ Contact form sends email successfully.  
- ✅ Resume printable.  
- ✅ Lighthouse mobile ≥90.  
- ✅ OG previews show on social.  
- ✅ CDN assets load without CORS/MIME errors.  

---

## 16. Deliverables

- `README.md` (this file)  
- `BUILD_FAQ.md` (detailed troubleshooting)  
- Repo with Next.js app  
- CDN with assets (3D models, videos, images)  
- Vercel project with env vars set  

---
