# MyFolio Master Index

> Complete file index and navigation guide for the iOS Developer Portfolio project

## 🏗️ Project Structure

```
MyFolio/
├── 📁 portfolio/                    # Main Next.js application
│   ├── 📄 package.json              # Dependencies & scripts
│   ├── 📄 next.config.mjs           # Next.js configuration
│   ├── 📄 tailwind.config.ts        # Tailwind CSS config
│   ├── 📄 projects.json             # Project data source
│   ├── 📄 README.md                 # Detailed documentation
│   ├── 📁 src/
│   │   ├── 📁 app/                  # App Router pages
│   │   │   ├── 📄 page.tsx          # Home page (dual mode)
│   │   │   ├── 📄 layout.tsx        # Root layout & metadata
│   │   │   ├── 📄 globals.css       # Global styles
│   │   │   ├── 📁 projects/
│   │   │   │   ├── 📄 page.tsx      # Projects listing
│   │   │   │   └── 📁 [slug]/
│   │   │   │       └── 📄 page.tsx  # Individual project pages
│   │   │   ├── 📁 contact/
│   │   │   │   └── 📄 page.tsx      # Contact form
│   │   │   ├── 📁 resume/
│   │   │   │   └── 📄 page.tsx      # Resume page
│   │   │   ├── 📁 game/
│   │   │   │   └── 📄 page.tsx      # Game mode page
│   │   │   └── 📁 api/
│   │   │       └── 📁 contact/
│   │   │           └── 📄 route.ts  # Contact API handler
│   │   ├── 📁 components/           # React components
│   │   │   ├── 📄 HeroRecruiter.tsx # Fast recruiter hero
│   │   │   ├── 📄 Hero3D.tsx        # 3D interactive hero
│   │   │   ├── 📄 ModeToggle.tsx    # Mode switcher
│   │   │   ├── 📄 ProjectCard.tsx   # Project display card
│   │   │   ├── 📄 DebugPanel.tsx    # Development debug panel
│   │   │   └── 📁 3d/               # 3D components
│   │   │       ├── 📄 IPhone.tsx    # 3D iPhone model
│   │   │       └── 📄 GameWorld.tsx  # 3D game world
│   │   └── 📁 utils/                # Utility functions
│   │       ├── 📄 debug.ts          # Debug utilities
│   │       ├── 📄 email.ts          # Email utilities
│   │       ├── 📄 seo.ts            # SEO utilities
│   │       ├── 📄 storage.ts        # Storage utilities
│   │       └── 📄 testing.ts        # Testing utilities
│   └── 📁 public/                   # Static assets
│       ├── 📄 next.svg              # Next.js logo
│       └── 📄 vercel.svg            # Vercel logo
├── 📁 Docs/                         # Documentation
│   ├── 📄 Project_Notes.md         # Concise project overview
│   ├── 📄 Master_Index.md           # This file
│   ├── 📄 Portfolio_Final_Guide.md  # Original guide
│   ├── 📄 build_faq_md_portfolio_next.md
│   ├── 📄 Build Faq.md – Portfolio (next.pdf
│   ├── 📄 I Os Developer Portfolio – 3d_game Blueprint (vercel + R3f + Spline).pdf
│   └── 📁 ObsidianVault/            # Obsidian knowledge base
│       ├── 📄 README.md             # Vault entry point
│       ├── 📄 00_Overview.md       # Project overview
│       ├── 📄 01_Setup.md          # Setup instructions
│       ├── 📄 02_Structure.md      # Project structure
│       ├── 📄 03_Content_Guidelines.md # Content best practices
│       ├── 📄 04_3D.md             # 3D components guide
│       ├── 📄 05_Contact.md        # Contact form guide
│       ├── 📄 06_Deployment.md     # Deployment guide
│       ├── 📄 07_Checklists.md     # Pre-deployment checklists
│       ├── 📄 08_Troubleshooting.md # Common issues
│       ├── 📁 Projects/            # Individual project notes
│       │   ├── 📄 README.md        # Projects index
│       │   ├── 📄 Pulse Incident iOS.md
│       │   ├── 📄 Weather Pro.md
│       │   └── 📄 Task Manager Pro.md
│       └── 📁 Templates/           # Note templates
│           └── 📄 Project.md       # Project template
└── 📁 public/                      # Root public assets
    └── 📁 icons/                   # Icon assets
```

## 🎯 Quick Navigation

### Core Application Files
- **Home Page**: `portfolio/src/app/page.tsx` - Dual mode homepage
- **Projects**: `portfolio/src/app/projects/page.tsx` - Project listing
- **Contact**: `portfolio/src/app/contact/page.tsx` - Contact form
- **Resume**: `portfolio/src/app/resume/page.tsx` - Resume page
- **API**: `portfolio/src/app/api/contact/route.ts` - Contact handler

### Key Components
- **Hero Components**: `portfolio/src/components/HeroRecruiter.tsx`, `Hero3D.tsx`
- **3D Models**: `portfolio/src/components/3d/IPhone.tsx`, `GameWorld.tsx`
- **Project Cards**: `portfolio/src/components/ProjectCard.tsx`
- **Mode Toggle**: `portfolio/src/components/ModeToggle.tsx`

### Configuration
- **Dependencies**: `portfolio/package.json`
- **Next.js Config**: `portfolio/next.config.mjs`
- **Tailwind Config**: `portfolio/tailwind.config.ts`
- **Project Data**: `portfolio/projects.json`

### Documentation
- **Quick Start**: `Docs/Project_Notes.md`
- **Obsidian Vault**: `Docs/ObsidianVault/README.md`
- **Master Index**: `Docs/Master_Index.md` (this file)

## 🚀 Getting Started

1. **Read**: `Docs/Project_Notes.md` for quick overview
2. **Setup**: Follow `Docs/ObsidianVault/01_Setup.md`
3. **Customize**: Update `portfolio/projects.json` and branding
4. **Deploy**: Use `Docs/ObsidianVault/06_Deployment.md`

## 📊 Project Stats

- **Total Files**: 50+ files
- **Components**: 7 React components
- **Pages**: 6 Next.js pages
- **Utilities**: 5 utility modules
- **Documentation**: 15+ documentation files
- **Projects**: 3 sample iOS projects

## 🔗 Key Links

- [Portfolio README](portfolio/README.md)
- [Project Notes](Docs/Project_Notes.md)
- [Obsidian Vault](Docs/ObsidianVault/README.md)
- [Setup Guide](Docs/ObsidianVault/01_Setup.md)
- [Deployment Guide](Docs/ObsidianVault/06_Deployment.md)

---

*Last updated: 2025-09-24*
