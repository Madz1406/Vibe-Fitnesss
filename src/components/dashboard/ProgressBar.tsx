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
          <p className="text-slate-300 font-semibold">Daily Progress</p>
          <p className={`text-2xl font-bold ${isComplete ? 'text-neon-green' : 'text-neon-cyan'}`}>
            {Math.round(percentage)}%
          </p>
        </div>

        {/* Animated gradient bar */}
        <div className="relative w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div
            className={`h-full transition-all duration-500 ${
              isComplete
                ? 'bg-gradient-to-r from-neon-green via-neon-cyan to-neon-green animate-pulse'
                : 'bg-gradient-to-r from-neon-fuchsia via-neon-purple to-neon-cyan'
            }`}
            style={{
              width: `${Math.min(percentage, 100)}%`,
              boxShadow: isComplete
                ? '0 0 20px rgba(57, 255, 20, 0.6)'
                : '0 0 20px rgba(255, 0, 110, 0.5)',
            }}
          ></div>
        </div>
      </div>

      {/* Status message */}
      <div className={`p-4 rounded-lg border text-center transition-all ${
        isComplete
          ? 'bg-neon-green/10 border-neon-green/50 text-neon-green'
          : 'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan'
      }`}>
        {isComplete ? (
          <p className="font-bold">🎉 Quest Complete! Amazing effort today!</p>
        ) : (
          <p className="font-semibold">Keep going! You're making great progress.</p>
        )}
      </div>

      {/* Milestone indicators */}
      <div className="grid grid-cols-4 gap-2">
        {[25, 50, 75, 100].map((milestone) => (
          <div
            key={milestone}
            className={`p-3 rounded-lg text-center transition-all ${
              percentage >= milestone
                ? 'bg-neon-fuchsia/20 border border-neon-fuchsia text-neon-fuchsia'
                : 'bg-slate-800/50 border border-slate-700 text-slate-500'
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
