import React from 'react';
import { UserProfile } from '../../types';

interface StepGoalProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const goals = [
  {
    id: 'bulking',
    label: '💪 Bulking',
    description: 'Build muscle mass',
    details: '+300 cal/day',
  },
  {
    id: 'cutting',
    label: '🔥 Cutting',
    description: 'Lose fat',
    details: '-400 cal/day',
  },
  {
    id: 'maintenance',
    label: '⚖️ Maintenance',
    description: 'Stay where you are',
    details: 'Baseline calories',
  },
];

const StepGoal: React.FC<StepGoalProps> = ({ profile, onUpdate }) => {
  return (
    <div className="space-y-6">
      <p className="text-slate-600 dark:text-slate-300">
        What's your primary fitness goal? We'll adjust your caloric target accordingly.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {goals.map((goalOption, index) => (
          <div key={goalOption.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
            <button
              onClick={() => onUpdate({ goal: goalOption.id as any })}
              className={`w-full p-6 rounded-lg border-2 transition-all text-left ${profile.goal === goalOption.id
                ? 'border-neon-green bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 dark:from-neon-green/20 dark:to-neon-cyan/20 text-slate-900 dark:text-white shadow-lg shadow-neon-green/20 dark:shadow-neon-green/50'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-neon-green shadow-sm dark:shadow-none'
                }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display font-bold tracking-tight text-lg mb-1">{goalOption.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{goalOption.description}</p>
                </div>
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center ${profile.goal === goalOption.id
                    ? 'border-neon-green bg-neon-green'
                    : 'border-slate-300 dark:border-slate-600'
                    }`}
                >
                  {profile.goal === goalOption.id && (
                    <span className="text-slate-900 font-bold">✓</span>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 rounded bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                <p className="text-xs text-neon-cyan dark:text-neon-cyan font-mono font-bold">
                  {goalOption.details}
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-sm">
        <p className="font-semibold mb-2">How it works:</p>
        <ul className="space-y-1 text-xs">
          <li>• We calculate your TDEE (Total Daily Energy Expenditure)</li>
          <li>• Apply your goal adjustment to set your target calories</li>
          <li>• Generate personalized macro recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default StepGoal;
