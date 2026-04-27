import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const isComplete = percentage >= 100;

  return (
    <div className="space-y-4">
      {/* Main progress bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-slate-700 dark:text-slate-300 font-semibold">Daily Progress</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {Math.round(percentage)}%
          </p>
        </div>

        {/* Animated gradient bar */}
        <div className="relative h-3 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden w-full border border-slate-300 dark:border-slate-700 shadow-inner">
          <div
            className="h-full animate-bar-fill bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-500"
            style={{
              '--bar-width': `${Math.min(percentage, 100)}%`,
              boxShadow: isComplete
                ? '0 0 15px rgba(6, 182, 212, 0.4)'
                : '0 0 10px rgba(217, 70, 239, 0.3)',
            } as React.CSSProperties}
          ></div>
        </div>
      </div>

      {/* Status message */}
      <div className={`p-4 rounded-xl border text-center transition-all bg-white dark:bg-white/5 backdrop-blur-md shadow-sm border-slate-200 dark:border-white/10`}>
        {isComplete ? (
          <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">🎉 Quest Complete! Amazing effort today!</p>
        ) : (
          <p className="font-semibold text-slate-600 dark:text-slate-300">Keep going! You're making great progress.</p>
        )}
      </div>

      {/* Milestone indicators */}
      <div className="grid grid-cols-4 gap-2">
        {[25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`p-3 rounded-xl text-center transition-all ${percentage >= milestone
              ? 'bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-fuchsia-500 shadow-md transform scale-[1.02]'
              : 'bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-500'
              }`}
          >
            <p className="text-xs font-bold">{milestone}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
