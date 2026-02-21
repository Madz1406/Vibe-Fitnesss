import React from 'react';
import { UserProfile } from '../../types';

interface StepPhysicalMetricsProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const StepPhysicalMetrics: React.FC<StepPhysicalMetricsProps> = ({
  profile,
  onUpdate,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Gender
          </label>
          <div className="flex gap-2">
            {(['male', 'female'] as const).map((gender) => (
              <button
                key={gender}
                onClick={() => onUpdate({ gender })}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  profile.gender === gender
                    ? 'bg-neon-fuchsia text-white shadow-lg shadow-neon-fuchsia/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Level */}
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Activity Level
          </label>
          <select
            value={profile.activityLevel || ''}
            onChange={(e) => onUpdate({ activityLevel: e.target.value as any })}
            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white focus:border-neon-cyan focus:outline-none"
          >
            <option value="">Select...</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="very_active">Very Active</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Height (cm)
        </label>
        <input
          type="number"
          value={profile.height || ''}
          onChange={(e) => onUpdate({ height: Number(e.target.value) })}
          placeholder="170"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            value={profile.weight || ''}
            onChange={(e) => onUpdate({ weight: Number(e.target.value) })}
            placeholder="70"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Age (years)
          </label>
          <input
            type="number"
            value={profile.age || ''}
            onChange={(e) => onUpdate({ age: Number(e.target.value) })}
            placeholder="25"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-nemo-cyan focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Body Fat Percentage (%)
        </label>
        <input
          type="number"
          value={profile.bodyFatPercentage !== undefined ? profile.bodyFatPercentage : ''}
          onChange={(e) =>
            onUpdate({ bodyFatPercentage: Number(e.target.value) })
          }
          placeholder="20"
          step="0.1"
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:border-neon-cyan focus:outline-none transition-all"
        />
      </div>

      <p className="text-xs text-slate-400 mt-4">
        💡 Tip: You can use a DEXA scan or online calculator to estimate body fat percentage
      </p>
    </div>
  );
};

export default StepPhysicalMetrics;
