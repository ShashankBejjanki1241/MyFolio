'use client'

import { useState, useEffect } from 'react'
import { debug, getDebugInfo, isDevelopment } from '@/utils/debug'
// Testing utilities removed - debug panel simplified

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    if (isDevelopment()) {
      const interval = setInterval(() => {
        setDebugInfo(getDebugInfo())
        setLogs(debug.getLogs())
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [])

  if (!isDevelopment()) {
    return null
  }

  // Test data generation removed

  const handleClearLogs = () => {
    debug.clearLogs()
    setLogs([])
  }

  const handleExportLogs = () => {
    const logsData = debug.exportLogs()
    const blob = new Blob([logsData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `debug-logs-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Debug mode toggle removed

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        title="Debug Panel"
      >
        🐛
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-xl max-w-md max-h-96 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Debug Panel</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Debug Info */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Environment</h4>
            <div className="text-xs space-y-1">
              <div>Mode: {debugInfo?.environment}</div>
              <div>URL: {debugInfo?.url}</div>
              <div>Timestamp: {debugInfo?.timestamp}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Controls</h4>
            <div className="space-y-2">
              {/* Test controls removed */}
              <button
                onClick={handleClearLogs}
                className="w-full bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
              >
                Clear Logs
              </button>
              <button
                onClick={handleExportLogs}
                className="w-full bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
              >
                Export Logs
              </button>
            </div>
          </div>

          {/* Logs */}
          <div>
            <h4 className="font-semibold mb-2">Recent Logs ({logs.length})</h4>
            <div className="max-h-32 overflow-auto text-xs space-y-1">
              {logs.slice(-10).map((log, index) => (
                <div key={index} className="border-l-2 border-gray-600 pl-2">
                  <div className="text-gray-400">
                    [{log.level}] {log.component}
                  </div>
                  <div className="text-white">{log.message}</div>
                  {log.data && (
                    <div className="text-gray-300 text-xs">
                      {JSON.stringify(log.data, null, 2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
