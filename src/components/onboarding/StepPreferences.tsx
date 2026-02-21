import React from 'react';
import { UserProfile } from '../../types';

interface StepPreferencesProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const preferences = [
  { id: 'Vegan', label: '🌱 Vegan', description: 'No animal products' },
  { id: 'Vegetarian', label: '🥕 Vegetarian', description: 'No meat, fish OK' },
  { id: 'Pescatarian', label: '🐟 Pescatarian', description: 'Fish & seafood OK' },
  { id: 'Keto', label: '🥑 Keto', description: 'Low-carb focused' },
  { id: 'Paleo', label: '🥩 Paleo', description: 'Whole foods only' },
  { id: 'Gluten-Free', label: '🍚 Gluten-Free', description: 'No gluten' },
  { id: 'Dairy-Free', label: '🥛 Dairy-Free', description: 'No dairy products' },
  { id: 'Low-FODMAP', label: '🫒 Low-FODMAP', description: 'Digestive friendly' },
];

const StepPreferences: React.FC<StepPreferencesProps> = ({
  profile,
  onUpdate,
}) => {
  const restrictions = profile.dietaryRestrictions || [];

  const toggleRestriction = (restriction: string) => {
    const updated = restrictions.includes(restriction)
      ? restrictions.filter((r) => r !== restriction)
      : [...restrictions, restriction];
    onUpdate({ dietaryRestrictions: updated });
  };

  return (
    <div className="space-y-6">
      <p className="text-slate-300">
        Select your dietary preferences and restrictions. You can choose multiple options.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {preferences.map((pref) => (
          <button
            key={pref.id}
            onClick={() => toggleRestriction(pref.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              restrictions.includes(pref.id)
                ? 'border-neon-cyan bg-neon-cyan/10 text-white'
                : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <input
                type="checkbox"
                checked={restrictions.includes(pref.id)}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleRestriction(pref.id);
                }}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="font-semibold">{pref.label}</span>
            </div>
            <p className="text-xs text-slate-400 ml-6">{pref.description}</p>
          </button>
        ))}
      </div>

      {restrictions.length === 0 && (
        <div className="p-4 rounded-lg bg-neon-green/5 border border-neon-green/30 text-neon-green text-sm">
          ✓ No restrictions selected - full flexibility in meal planning
        </div>
      )}

      {restrictions.length > 0 && (
        <div className="p-4 rounded-lg bg-neon-purple/5 border border-neon-purple/30 text-neon-purple text-sm">
          Selected: {restrictions.join(', ')}
        </div>
      )}
    </div>
  );
};

export default StepPreferences;
