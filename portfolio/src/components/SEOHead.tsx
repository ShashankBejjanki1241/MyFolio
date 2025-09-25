import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  keywords?: string[]
}

export default function SEOHead({
  title = 'ExtMac — iOS Developer',
  description = 'SwiftUI • ARKit • Core Data • High-performance iOS apps',
  image = '/og-image.jpg',
  url = 'https://extmac.dev',
  type = 'website',
  keywords = ['iOS', 'SwiftUI', 'ARKit', 'Core Data', 'mobile development']
}: SEOHeadProps) {
  const fullTitle = title.includes('ExtMac') ? title : `${title} | ExtMac`
  const fullImage = image.startsWith('http') ? image : `https://extmac.dev${image}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="ExtMac" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="ExtMac Portfolio" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@extmac" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ExtMac" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'ExtMac',
            jobTitle: 'iOS Developer',
            description: description,
            url: url,
            sameAs: [
              'https://github.com/extmac',
              'https://linkedin.com/in/extmac'
            ],
            knowsAbout: keywords,
            worksFor: {
              '@type': 'Organization',
              name: 'Freelance iOS Developer'
            }
          })
        }}
      />
    </Head>
  )
}
