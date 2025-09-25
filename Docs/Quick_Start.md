# MyFolio Quick Start Guide

> Get your iOS Developer Portfolio up and running in 5 minutes

## 🚀 Quick Setup

1. **Install dependencies**
   ```bash
   cd portfolio
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## ⚡ Essential Customization

### 1. Update Branding
- Edit `src/app/layout.tsx` - Replace "Your Name" and metadata
- Update navigation labels throughout the app

### 2. Add Your Projects
- Edit `portfolio/projects.json`
- Replace placeholder URLs with your CDN
- Add real project data

### 3. Configure Contact Form
- Set `RESEND_API_KEY` in `.env.local` for production
- Update contact email in `src/app/contact/page.tsx`

### 4. Replace 3D Models
- Update `src/components/3d/IPhone.tsx` with your GLB model
- Set `NEXT_PUBLIC_ASSETS_BASE` in environment

## 📁 Key Files to Edit

- `portfolio/projects.json` - Project data
- `portfolio/src/app/layout.tsx` - Branding & metadata
- `portfolio/src/app/contact/page.tsx` - Contact info
- `portfolio/next.config.mjs` - Image domains
- `.env.local` - Environment variables

## 🎯 Two Modes

- **Recruiter Mode** (default): Fast, minimal, SEO-optimized
- **Game Mode**: 3D interactive experience

Toggle between modes on the homepage.

## 📚 Documentation

- **Detailed Guide**: `portfolio/README.md`
- **Concise Notes**: `Docs/Project_Notes.md`
- **Obsidian Vault**: `Docs/ObsidianVault/README.md`
- **Master Index**: `Docs/Master_Index.md`

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

See `Docs/ObsidianVault/06_Deployment.md` for detailed steps.

---

**Need help?** Check `Docs/ObsidianVault/08_Troubleshooting.md`
