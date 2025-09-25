---
tags: [project-notes, nextjs, portfolio]
aliases: [MyFolio Notes]
created: 2025-09-24
---

## Overview

Next.js 14 portfolio with dual modes:
- Recruiter Mode (default): fast, minimal, SEO-friendly
- Game Mode: 3D hero using React Three Fiber

## Tech

- Next.js (App Router), React 18, TypeScript
- Tailwind CSS, Framer Motion
- React Three Fiber, Three.js
- Zustand (state), next-seo

## Key Paths

- `src/app/page.tsx`: home, mode toggle, featured projects
- `src/app/projects/page.tsx`: projects index
- `src/app/projects/[slug]/page.tsx`: project detail
- `src/app/contact/page.tsx`: form with built-in test helpers
- `src/app/api/contact/route.ts`: POST handler (Resend placeholder)
- `src/app/resume/page.tsx`: printable resume
- `src/components/*`: hero, 3D, cards, toggles, debug panel
- `projects.json`: project data source
- `next.config.mjs`: image remotePatterns
- `tailwind.config.ts`: Tailwind scanning paths

## Environment (.env.local)

- `NEXT_PUBLIC_MODE_DEFAULT` = recruiter | game
- `NEXT_PUBLIC_ASSETS_BASE` = https://your-cdn-endpoint.com
- `RESEND_API_KEY` = <key>
- `NEXT_PUBLIC_SITE_URL` = https://yourdomain.com

## Commands

```bash
npm run dev    # start at http://localhost:3000
npm run build  # production build
npm start      # run production server
```

## Content Editing

- Add/update projects in `projects.json`.
- Replace placeholder CDN URLs in `projects.json` and `next.config.mjs`.
- Customize branding in `src/app/layout.tsx` metadata and nav labels.

## Contact Flow

Form (`/contact`) → POST `/api/contact` → currently logs to server.
Enable email by uncommenting Resend block in `route.ts` and set `RESEND_API_KEY`.

## 3D Notes

- 3D hero dynamically imported (`ssr: false`).
- Replace model sources in `src/components/3d/*` using `NEXT_PUBLIC_ASSETS_BASE`.

## Deployment (Vercel)

- Connect repo → set env vars → deploy.
- Ensure image domains configured in `next.config.mjs`.

## Quick Checklist

- [ ] Set env vars (.env.local / Vercel)
- [ ] Update `Your Name`, links, and contact email
- [ ] Replace CDN/image URLs
- [ ] Populate real projects
- [ ] Test contact form (dev and production)
- [ ] Verify Recruiter vs Game modes

## Troubleshooting

- 3D not rendering: check dynamic import and asset URLs
- Images blocked: update `images.remotePatterns`
- Contact failing: set `RESEND_API_KEY` or stay in dev logging mode
- Types missing: `@types/three` installed in devDependencies


