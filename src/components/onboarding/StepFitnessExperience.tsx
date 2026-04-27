import React from 'react';
import { UserProfile } from '../../types';

interface StepFitnessExperienceProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const experienceLevels = [
  {
    id: 'beginner',
    label: '🌱 Beginner',
    description: 'New to structured workouts or returning after a break',
  },
  {
    id: 'intermediate',
    label: '💪 Intermediate',
    description: 'Training consistently for 1-2 years with decent strength base',
  },
  {
    id: 'advanced',
    label: '🏆 Advanced',
    description: 'Been training seriously for multiple years, strong foundation',
  },
];

const StepFitnessExperience: React.FC<StepFitnessExperienceProps> = ({
  profile,
  onUpdate,
}) => {
  return (
    <div className="space-y-4">
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        This helps us create a workout plan matched to your current fitness level.
      </p>
      <div className="grid gap-3">
        {experienceLevels.map((level, index) => (
          <div key={level.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
            <button
              onClick={() =>
                onUpdate({ fitnessExperience: level.id as any })
              }
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${profile.fitnessExperience === level.id
                ? 'border-neon-fuchsia bg-neon-fuchsia/10 text-slate-900 dark:text-white'
                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/30 hover:border-neon-fuchsia dark:hover:border-slate-600 shadow-sm dark:shadow-none'
                }`}
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h3 className="font-display font-bold tracking-tight text-lg mb-1">{level.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{level.description}</p>
                </div>
                {profile.fitnessExperience === level.id && (
                  <div className="w-6 h-6 rounded-full bg-neon-fuchsia flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepFitnessExperience;
