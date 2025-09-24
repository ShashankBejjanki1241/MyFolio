# iOS Developer Portfolio

A modern, interactive portfolio website built with Next.js, React Three Fiber, and Tailwind CSS. Features dual modes: **Recruiter Mode** (fast, minimal) and **Game Mode** (3D interactive experience).

## 🚀 Features

- **Dual Mode Experience**: Fast recruiter-friendly mode and immersive 3D game mode
- **Responsive Design**: Optimized for all devices with Tailwind CSS
- **3D Interactive Elements**: Built with React Three Fiber for engaging visuals
- **Contact Form**: Functional contact form with API integration
- **Project Showcase**: Detailed project pages with screenshots and demos
- **Resume Page**: Professional resume with print-friendly styling
- **Performance Optimized**: Lighthouse score ≥90 in Recruiter Mode
- **SEO Ready**: Meta tags, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.0 (App Router)
- **3D Graphics**: React Three Fiber 8.15.19, Three.js 0.154.0
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Email**: Resend API
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page with mode toggle
│   │   ├── projects/
│   │   │   └── page.tsx          # Projects listing
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact form
│   │   ├── resume/
│   │   │   └── page.tsx          # Resume page
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts       # Contact form API
│   ├── components/
│   │   ├── HeroRecruiter.tsx     # Fast recruiter hero
│   │   ├── Hero3D.tsx            # 3D interactive hero
│   │   ├── ModeToggle.tsx        # Mode switcher
│   │   ├── ProjectCard.tsx       # Project display card
│   │   └── 3d/
│   │       └── IPhone.tsx        # 3D iPhone model
│   └── styles/
│       └── globals.css            # Global styles
├── projects.json                  # Project data
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── .env.local                    # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.18 (LTS)
- npm or pnpm ≥ 8

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_MODE_DEFAULT=recruiter
NEXT_PUBLIC_ASSETS_BASE=https://your-cdn-endpoint.com
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 Modes

### Recruiter Mode (Default)
- Fast loading (<2 seconds)
- Minimal JavaScript
- Professional presentation
- Optimized for mobile
- Perfect for job applications

### Game Mode
- 3D interactive experience
- Immersive visual elements
- Engaging animations
- Showcases technical skills
- Loads only when toggled

## 📱 Pages

- **Home** (`/`): Dual-mode hero with project showcase
- **Projects** (`/projects`): Grid of featured iOS applications
- **Contact** (`/contact`): Functional contact form
- **Resume** (`/resume`): Professional resume with print support

## 🎨 Customization

### Adding Projects

Edit `projects.json` to add your iOS projects:

```json
{
  "id": "your-project-id",
  "title": "Your App Name",
  "description": "Brief description of your app",
  "tech": ["SwiftUI", "ARKit", "Core Data"],
  "metrics": {
    "downloads": "10K+",
    "rating": "4.8",
    "size": "45MB"
  },
  "screenshots": ["https://your-cdn.com/screenshot1.webp"],
  "demoVideo": "https://your-cdn.com/demo.mp4",
  "github": "https://github.com/yourusername/repo",
  "appStore": "https://apps.apple.com/app/your-app"
}
```

### Styling

The project uses Tailwind CSS for styling. Key color scheme:
- Primary: Blue (`blue-600`, `blue-700`)
- Background: Slate (`slate-50`, `slate-900`)
- Accent: Purple (`purple-700`)

### 3D Models

Replace the placeholder iPhone model in `src/components/3d/IPhone.tsx` with your own GLB models:

```tsx
const { scene } = useGLTF(process.env.NEXT_PUBLIC_ASSETS_BASE + '/models/your-model.glb')
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Set these in your Vercel project settings:
- `NEXT_PUBLIC_MODE_DEFAULT`
- `NEXT_PUBLIC_ASSETS_BASE`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

## 📊 Performance

- **Lighthouse Mobile Score**: ≥90 (Recruiter Mode)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🔧 Troubleshooting

### Common Issues

1. **3D components not loading**: Ensure `ssr: false` in dynamic imports
2. **Build errors**: Check TypeScript types are installed (`@types/three`)
3. **Contact form not working**: Verify `RESEND_API_KEY` is set correctly
4. **Images not loading**: Check `remotePatterns` in `next.config.mjs`

### Performance Issues

- Use Recruiter Mode for fast loading
- Optimize images (WebP format)
- Enable CDN caching for assets
- Use `dynamic` imports for 3D components

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following the iOS Developer Portfolio guide
- Inspired by modern portfolio design trends
- Uses React Three Fiber for 3D graphics
- Deployed on Vercel for optimal performance

---

**Ready to showcase your iOS development skills?** 🚀

Start by customizing the content, adding your projects, and deploying to Vercel!