---
aliases: [Troubleshooting]
tags: [troubleshooting]
---

# Troubleshooting

## 3D not rendering
- Ensure dynamic import `ssr: false`
- Check `NEXT_PUBLIC_ASSETS_BASE` and model URLs

## Images blocked
- Add CDN host to `next.config.mjs` → `images.remotePatterns`

## Contact not working
- Dev: expect server console logs
- Prod: set `RESEND_API_KEY` and uncomment block

## Types
- Ensure `@types/three` exists in devDependencies

Refs: [[04_3D]] | [[05_Contact]]


