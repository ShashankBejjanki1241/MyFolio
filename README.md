# ExtMac iOS Developer Portfolio

> Modern, interactive portfolio showcasing iOS development skills with dual modes

## 🚀 Quick Start

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000

## 📁 Clean Project Structure

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
│   │       └── 📄 seo.ts            # SEO utilities
│   └── 📁 public/                   # Static assets
│       ├── 📄 next.svg              # Next.js logo
│       └── 📄 vercel.svg            # Vercel logo
└── 📁 Docs/                         # Documentation
    ├── 📄 Project_Notes.md          # Concise project overview
    ├── 📄 Master_Index.md           # Complete file index
    ├── 📄 Quick_Start.md            # 5-minute setup guide
    └── 📁 ObsidianVault/            # Obsidian knowledge base
        ├── 📄 README.md             # Vault entry point
        ├── 📄 00_Overview.md        # Project overview
        ├── 📄 01_Setup.md           # Setup instructions
        ├── 📄 02_Structure.md       # Project structure
        ├── 📄 03_Content_Guidelines.md # Content best practices
        ├── 📄 04_3D.md              # 3D components guide
        ├── 📄 05_Contact.md         # Contact form guide
        ├── 📄 06_Deployment.md      # Deployment guide
        ├── 📄 07_Checklists.md      # Pre-deployment checklists
        ├── 📄 08_Troubleshooting.md # Common issues
        ├── 📁 Projects/             # Individual project notes
        │   ├── 📄 README.md         # Projects index
        │   ├── 📄 Pulse Incident iOS.md
        │   ├── 📄 Weather Pro.md
        │   └── 📄 Task Manager Pro.md
        └── 📁 Templates/            # Note templates
            └── 📄 Project.md        # Project template
```

## ✨ Features

- **Dual Mode Experience**: Fast recruiter mode + immersive 3D game mode
- **Responsive Design**: Optimized for all devices
- **3D Interactive Elements**: React Three Fiber integration
- **Contact Form**: Functional with validation
- **Project Showcase**: Detailed project pages
- **Resume Page**: Print-friendly professional resume
- **Performance Optimized**: Lighthouse score ≥90
- **SEO Ready**: Meta tags and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **3D Graphics**: React Three Fiber, Three.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Email**: Resend API
- **Deployment**: Vercel

## 🎯 Customization

1. **Update branding** in `portfolio/src/app/layout.tsx`
2. **Add your projects** in `portfolio/projects.json`
3. **Configure contact** in `portfolio/src/app/contact/page.tsx`
4. **Set environment variables** for production

## 📚 Documentation

- **Quick Start**: `Docs/Quick_Start.md`
- **Project Notes**: `Docs/Project_Notes.md`
- **Obsidian Vault**: `Docs/ObsidianVault/README.md`
- **Master Index**: `Docs/Master_Index.md`

## 🚀 Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy!

---

**Ready to showcase your iOS development skills!** 🎉
