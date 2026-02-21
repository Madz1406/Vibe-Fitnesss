import React from 'react';
import { UserProfile } from '../../types';

interface StepHealthConstraintsProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const conditions = [
  { id: 'Diabetes', label: 'Diabetes', color: 'fuchsia' },
  { id: 'Hypertension', label: 'Hypertension (High Blood Pressure)', color: 'cyan' },
  { id: 'Heart Disease', label: 'Heart Disease', color: 'purple' },
  { id: 'Thyroid', label: 'Thyroid Disorder', color: 'cyan' },
  { id: 'Arthritis', label: 'Arthritis', color: 'fuchsia' },
  { id: 'Asthma', label: 'Asthma', color: 'purple' },
];

const StepHealthConstraints: React.FC<StepHealthConstraintsProps> = ({
  profile,
  onUpdate,
}) => {
  const medicalConditions = profile.medicalConditions || [];

  const toggleCondition = (condition: string) => {
    const updated = medicalConditions.includes(condition)
      ? medicalConditions.filter((c) => c !== condition)
      : [...medicalConditions, condition];
    onUpdate({ medicalConditions: updated });
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-300">
        Select any conditions that apply to you. This helps us customize your nutrition plan safely.
      </p>

      <div className="grid grid-cols-1 gap-3">
        {conditions.map((condition) => (
          <button
            key={condition.id}
            onClick={() => toggleCondition(condition.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              medicalConditions.includes(condition.id)
                ? 'border-neon-fuchsia bg-neon-fuchsia/10 text-white'
                : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={medicalConditions.includes(condition.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleCondition(condition.id);
                }}
                className="w-5 h-5 cursor-pointer"
              />
              <span className="font-medium">{condition.label}</span>
            </div>
          </button>
        ))}
      </div>

      {medicalConditions.length === 0 && (
        <div className="p-4 rounded-lg bg-neon-green/5 border border-neon-green/30 text-neon-green text-sm">
          ✓ No conditions selected - we'll provide standard recommendations
        </div>
      )}

      {medicalConditions.length > 0 && (
        <div className="p-4 rounded-lg bg-neon-cyan/5 border border-neon-cyan/30 text-neon-cyan text-sm">
          ⚠️ Your nutrition plan will be adjusted based on your conditions
        </div>
      )}

      <div className="text-xs text-slate-400 border-t border-slate-600 pt-4">
        <p className="font-semibold mb-2">Important:</p>
        <p>All recommendations are educational. Please consult with a healthcare provider before making major dietary or lifestyle changes.</p>
      </div>
    </div>
  );
};

export default StepHealthConstraints;
