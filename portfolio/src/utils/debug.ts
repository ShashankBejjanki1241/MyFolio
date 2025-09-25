export interface DebugConfig {
  enabled: boolean
  level: 'error' | 'warn' | 'info' | 'debug'
  showTimestamps: boolean
  showComponentName: boolean
  logToConsole: boolean
  logToStorage: boolean
}

export const defaultDebugConfig: DebugConfig = {
  enabled: process.env.NODE_ENV === 'development',
  level: 'debug',
  showTimestamps: true,
  showComponentName: true,
  logToConsole: true,
  logToStorage: false
}

class DebugLogger {
  private config: DebugConfig
  private logs: Array<{ timestamp: string; level: string; component: string; message: string; data?: any }> = []

  constructor(config: DebugConfig = defaultDebugConfig) {
    this.config = config
  }

  private shouldLog(level: string): boolean {
    if (!this.config.enabled) return false
    
    const levels = ['error', 'warn', 'info', 'debug']
    const currentLevelIndex = levels.indexOf(this.config.level)
    const messageLevelIndex = levels.indexOf(level)
    
    return messageLevelIndex <= currentLevelIndex
  }

  private formatMessage(level: string, component: string, message: string, data?: any): string {
    let formatted = ''
    
    if (this.config.showTimestamps) {
      formatted += `[${new Date().toISOString()}] `
    }
    
    formatted += `[${level.toUpperCase()}]`
    
    if (this.config.showComponentName && component) {
      formatted += ` [${component}]`
    }
    
    formatted += ` ${message}`
    
    return formatted
  }

  private log(level: string, component: string, message: string, data?: any): void {
    if (!this.shouldLog(level)) return

    const timestamp = new Date().toISOString()
    const logEntry = { timestamp, level, component, message, data }
    
    if (this.config.logToStorage) {
      this.logs.push(logEntry)
      // Keep only last 100 logs to prevent memory issues
      if (this.logs.length > 100) {
        this.logs = this.logs.slice(-100)
      }
    }

    if (this.config.logToConsole) {
      const formatted = this.formatMessage(level, component, message, data)
      
      switch (level) {
        case 'error':
          console.error(formatted, data || '')
          break
        case 'warn':
          console.warn(formatted, data || '')
          break
        case 'info':
          console.info(formatted, data || '')
          break
        case 'debug':
        default:
          console.log(formatted, data || '')
          break
      }
    }
  }

  error(component: string, message: string, data?: any): void {
    this.log('error', component, message, data)
  }

  warn(component: string, message: string, data?: any): void {
    this.log('warn', component, message, data)
  }

  info(component: string, message: string, data?: any): void {
    this.log('info', component, message, data)
  }

  debug(component: string, message: string, data?: any): void {
    this.log('debug', component, message, data)
  }

  getLogs(): Array<{ timestamp: string; level: string; component: string; message: string; data?: any }> {
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  updateConfig(newConfig: Partial<DebugConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Global debug logger instance
export const debugLogger = new DebugLogger()

// Convenience functions
export const debug = {
  error: (component: string, message: string, data?: any) => debugLogger.error(component, message, data),
  warn: (component: string, message: string, data?: any) => debugLogger.warn(component, message, data),
  info: (component: string, message: string, data?: any) => debugLogger.info(component, message, data),
  debug: (component: string, message: string, data?: any) => debugLogger.debug(component, message, data),
  getLogs: () => debugLogger.getLogs(),
  clearLogs: () => debugLogger.clearLogs(),
  exportLogs: () => debugLogger.exportLogs(),
  updateConfig: (config: Partial<DebugConfig>) => debugLogger.updateConfig(config)
}

// Performance monitoring utilities
export const performanceMonitor = {
  startTimer: (name: string): void => {
    if (defaultDebugConfig.enabled) {
      performance.mark(`${name}-start`)
    }
  },

  endTimer: (name: string): number => {
    if (!defaultDebugConfig.enabled) return 0
    
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)
    
    const measure = performance.getEntriesByName(name)[0]
    const duration = measure ? measure.duration : 0
    
    debug.info('Performance', `${name} took ${duration.toFixed(2)}ms`)
    
    return duration
  },

  measureAsync: async <T>(name: string, fn: () => Promise<T>): Promise<T> => {
    performanceMonitor.startTimer(name)
    try {
      const result = await fn()
      performanceMonitor.endTimer(name)
      return result
    } catch (error) {
      performanceMonitor.endTimer(name)
      throw error
    }
  }
}

// Component debugging hook
export const useDebug = (componentName: string) => {
  return {
    error: (message: string, data?: any) => debug.error(componentName, message, data),
    warn: (message: string, data?: any) => debug.warn(componentName, message, data),
    info: (message: string, data?: any) => debug.info(componentName, message, data),
    debug: (message: string, data?: any) => debug.debug(componentName, message, data),
    logRender: (props?: any) => debug.debug(componentName, 'Component rendered', props),
    logMount: () => debug.info(componentName, 'Component mounted'),
    logUnmount: () => debug.info(componentName, 'Component unmounted'),
    logStateChange: (oldState: any, newState: any) => 
      debug.debug(componentName, 'State changed', { oldState, newState })
  }
}

// Development mode detection
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development'
}

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

// Debug panel component data
export const getDebugInfo = () => {
  return {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server',
    url: typeof window !== 'undefined' ? window.location.href : 'Server',
    logs: debugLogger.getLogs(),
    config: defaultDebugConfig
  }
}
