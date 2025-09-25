'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics 4 Integration
export function GoogleAnalytics({ GA_TRACKING_ID }: { GA_TRACKING_ID: string }) {
  useEffect(() => {
    // Load Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    script.async = true
    document.head.appendChild(script)

    // Initialize gtag
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }

    window.dataLayer = window.dataLayer || []
    window.gtag('js', new Date())
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(`script[src*="${GA_TRACKING_ID}"]`)
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [GA_TRACKING_ID])

  return null
}

// Page view tracking
export function usePageTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [pathname, searchParams])
}

// Event tracking utilities
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Portfolio-specific tracking events
export const trackPortfolioEvent = {
  // Mode switching
  modeSwitch: (mode: 'recruiter' | 'game') => {
    trackEvent('mode_switch', 'engagement', mode)
  },

  // Project interactions
  projectView: (projectId: string, projectTitle: string) => {
    trackEvent('project_view', 'engagement', projectTitle)
  },

  projectClick: (projectId: string, destination: 'github' | 'appstore') => {
    trackEvent('project_click', 'outbound', `${projectId}_${destination}`)
  },

  // Contact form
  contactFormStart: () => {
    trackEvent('contact_form_start', 'engagement')
  },

  contactFormSubmit: (success: boolean) => {
    trackEvent('contact_form_submit', 'conversion', success ? 'success' : 'error')
  },

  // Resume
  resumeView: () => {
    trackEvent('resume_view', 'engagement')
  },

  resumeDownload: () => {
    trackEvent('resume_download', 'conversion')
  },

  // 3D interactions
  threeDInteraction: (interaction: string) => {
    trackEvent('3d_interaction', 'engagement', interaction)
  },

  // Performance metrics
  performanceMetric: (metric: string, value: number) => {
    trackEvent('performance_metric', 'technical', metric, value)
  }
}

// Performance monitoring integration
export function usePerformanceMetrics() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    const trackWebVital = (name: string, value: number) => {
      trackPortfolioEvent.performanceMetric(name, value)
    }

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        trackWebVital('FCP', fcpEntry.startTime)
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        trackWebVital('LCP', lastEntry.startTime)
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        const fidEntry = entry as any
        if (fidEntry.processingStart && fidEntry.startTime) {
          const fid = fidEntry.processingStart - fidEntry.startTime
          trackWebVital('FID', fid)
        }
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        const clsEntry = entry as any
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value
          trackWebVital('CLS', clsValue)
        }
      })
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])
}

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
