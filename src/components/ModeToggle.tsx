'use client'

interface ModeToggleProps {
  mode: 'recruiter' | 'game'
  onModeChange: (mode: 'recruiter' | 'game') => void
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => onModeChange('recruiter')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          mode === 'recruiter'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Recruiter
      </button>
      <button
        onClick={() => onModeChange('game')}
        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
          mode === 'game'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        Game Mode
      </button>
    </div>
  )
}
