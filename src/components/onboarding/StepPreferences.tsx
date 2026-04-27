import React from 'react';
import { UserProfile } from '../../types';

interface StepPreferencesProps {
  profile: Partial<UserProfile>;
  onUpdate: (data: Partial<UserProfile>) => void;
}

const preferences = [
  { id: 'Vegan', label: '🌱 Vegan', description: 'No animal products' },
  { id: 'Vegetarian', label: '🥕 Vegetarian', description: 'No meat or fish' },
  { id: 'No-Eggs', label: '🥚 No Eggs', description: 'No egg products' },
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
      <p className="text-slate-600 dark:text-slate-300">
        Select your dietary preferences and restrictions. You can choose multiple options.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {preferences.map((pref, index) => (
          <div key={pref.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
            <button
              onClick={() => toggleRestriction(pref.id)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${restrictions.includes(pref.id)
                ? 'border-neon-cyan bg-neon-cyan/10 text-slate-900 dark:text-white'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:border-neon-cyan dark:hover:border-slate-500 shadow-sm dark:shadow-none'
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
              <p className="text-xs text-slate-500 dark:text-slate-400 ml-6">{pref.description}</p>
            </button>
          </div>
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
