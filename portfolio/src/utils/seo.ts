export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export const defaultSEO: SEOConfig = {
  title: 'Your Name — iOS Developer',
  description: 'SwiftUI • ARKit • Core Data • High-performance iOS apps. Professional iOS developer with 5+ years of experience creating beautiful, user-friendly mobile applications.',
  keywords: ['iOS Developer', 'SwiftUI', 'ARKit', 'Core Data', 'Mobile Apps', 'iPhone Apps', 'iOS Development'],
  type: 'website'
}

export const generateMetaTags = (config: SEOConfig) => {
  const title = config.title.includes('—') ? config.title : `${config.title} — iOS Developer`
  const description = config.description || defaultSEO.description
  const url = config.url || 'https://yourdomain.com'
  const image = config.image || '/og-image.jpg'
  const keywords = config.keywords?.join(', ') || defaultSEO.keywords?.join(', ') || ''

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Your Name — iOS Developer',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: config.type || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export const projectSEO = (project: {
  title: string
  description: string
  tech: string[]
}): SEOConfig => ({
  title: `${project.title} — iOS App`,
  description: `${project.description} Built with ${project.tech.join(', ')}. View screenshots, demo video, and download from App Store.`,
  keywords: [...(defaultSEO.keywords || []), ...project.tech, project.title],
  type: 'article'
})

export const contactSEO: SEOConfig = {
  title: 'Contact — Get In Touch',
  description: 'Have a project in mind or want to collaborate? I\'d love to hear from you. Contact me for iOS development opportunities.',
  keywords: [...(defaultSEO.keywords || []), 'Contact', 'Hire iOS Developer', 'Collaboration']
}

export const resumeSEO: SEOConfig = {
  title: 'Resume — Professional Experience',
  description: 'Download my resume or view my professional experience as an iOS developer. 5+ years of SwiftUI, ARKit, and Core Data expertise.',
  keywords: [...(defaultSEO.keywords || []), 'Resume', 'CV', 'Experience', 'Skills']
}
