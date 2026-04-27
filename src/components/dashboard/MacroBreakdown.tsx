import React from 'react';
import { MacroBreakdown as MacroBreakdownType } from '../../types';
import { Zap } from 'lucide-react';

interface MacroBreakdownProps {
  macros: MacroBreakdownType;
}

const MacroBreakdown: React.FC<MacroBreakdownProps> = ({ macros }) => {
  const proteinPercentage = (macros.protein * 4) / macros.calories * 100;
  const carbPercentage = (macros.carbs * 4) / macros.calories * 100;
  const fatPercentage = (macros.fats * 9) / macros.calories * 100;

  const macroItems = [
    {
      label: 'Protein',
      icon: '🥩',
      value: macros.protein,
      percentage: proteinPercentage,
      calories: macros.protein * 4,
      color: 'from-neon-fuchsia to-neon-purple',
    },
    {
      label: 'Carbs',
      icon: '🍚',
      value: macros.carbs,
      percentage: carbPercentage,
      calories: macros.carbs * 4,
      color: 'from-neon-green to-neon-cyan',
    },
    {
      label: 'Fats',
      icon: '🥑',
      value: macros.fats,
      percentage: fatPercentage,
      calories: macros.fats * 9,
      color: 'from-neon-cyan to-neon-purple',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Daily calorie target */}
      <div className="text-center mb-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Daily Target</p>
        <div className="flex items-center justify-center gap-2">
          <Zap className="text-neon-yellow" size={20} />
          <span className="text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
            {macros.calories} <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-normal">kcal</span>
          </span>
        </div>
      </div>

      {/* Macros breakdown */}
      <div className="space-y-3">
        {macroItems.map((macro) => (
          <div key={macro.label} className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{macro.icon}</span>
                <span className="text-xs font-display font-bold tracking-tight text-slate-700 dark:text-slate-300 uppercase tracking-wider">{macro.label}</span>
              </div>
              <span className="text-sm font-display font-black text-slate-900 dark:text-white">{macro.value}g</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${macro.color} transition-all duration-500`}
                style={{ width: `${Math.min(macro.percentage, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{Math.round(macro.percentage)}% of calories</span>
            </div>
          </div>
        ))}
      </div>

      {/* Macro pie visualization */}
      <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
        <p className="text-xs text-slate-600 dark:text-slate-400 font-display font-semibold tracking-tight mb-2">Macro Distribution</p>
        <div className="flex gap-1 h-2 rounded-full overflow-hidden">
          <div
            className="bg-neon-fuchsia"
            style={{ width: `${proteinPercentage}%` }}
            title={"Protein: " + Math.round(proteinPercentage) + "%"}
          ></div>
          <div
            className="bg-neon-green"
            style={{ width: `${carbPercentage}%` }}
            title={"Carbs: " + Math.round(carbPercentage) + "%"}
          ></div>
          <div
            className="bg-neon-cyan"
            style={{ width: `${fatPercentage}%` }}
            title={"Fats: " + Math.round(fatPercentage) + "%"}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MacroBreakdown;
