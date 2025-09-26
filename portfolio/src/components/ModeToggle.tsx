'use client'

interface ModeToggleProps {
  mode: 'recruiter' | 'immersive'
  onModeChange: (mode: 'recruiter' | 'immersive') => void
  labels?: { recruiter: string; immersive: string }
}

export default function ModeToggle({ mode, onModeChange, labels = { recruiter: 'Professional', immersive: 'Interactive' } }: ModeToggleProps) {
  return (
    <div className="flex items-center bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-1 border border-slate-200/50 dark:border-slate-700/50">
      <button
        onClick={() => onModeChange('recruiter')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          mode === 'recruiter'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-lg transform scale-105'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">💼</span>
          {labels.recruiter}
        </span>
      </button>
      <button
        onClick={() => onModeChange('immersive')}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          mode === 'immersive'
            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-lg transform scale-105'
            : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">🎮</span>
          {labels.immersive}
        </span>
      </button>
    </div>
  )
}
