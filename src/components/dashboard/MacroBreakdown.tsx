import React from 'react';
import { MacroBreakdown as MacroBreakdownType } from '../../types';
import { Flame } from 'lucide-react';

interface MacroBreakdownProps {
  macros: MacroBreakdownType;
}

const MacroBreakdown: React.FC<MacroBreakdownProps> = ({ macros }) => {
  const proteinPercentage = (macros.protein * 4) / macros.calories * 100;
  const carbPercentage = (macros.carbs * 4) / macros.calories * 100;
  const fatPercentage = (macros.fats * 9) / macros.calories * 100;

  return (
    <div className="space-y-4">
      {/* Daily calorie target */}
      <div className="p-4 bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 rounded-lg border border-neon-cyan/30">
        <div className="flex items-center gap-2 mb-1">
          <Flame size={20} className="text-neon-green" />
          <p className="text-slate-400 text-sm">Daily Calories</p>
        </div>
        <p className="text-3xl font-bold text-white">
          {macros.calories} <span className="text-neon-green text-xl">kcal</span>
        </p>
      </div>

      {/* Macros breakdown */}
      <div className="space-y-3">
        {/* Protein */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-slate-300 font-semibold flex items-center gap-2">
              <span className="text-lg">🥩</span> Protein
            </p>
            <p className="text-neon-fuchsia font-bold">{macros.protein}g</p>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-fuchsia to-neon-purple"
              style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {Math.round(proteinPercentage)}% • {Math.round(macros.protein * 4)} kcal
          </p>
        </div>

        {/* Carbs */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-slate-300 font-semibold flex items-center gap-2">
              <span className="text-lg">🍚</span> Carbs
            </p>
            <p className="text-neon-green font-bold">{macros.carbs}g</p>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-green to-neon-cyan"
              style={{ width: `${Math.min(carbPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {Math.round(carbPercentage)}% • {Math.round(macros.carbs * 4)} kcal
          </p>
        </div>

        {/* Fats */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-slate-300 font-semibold flex items-center gap-2">
              <span className="text-lg">🥑</span> Fats
            </p>
            <p className="text-neon-cyan font-bold">{macros.fats}g</p>
          </div>
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
              style={{ width: `${Math.min(fatPercentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {Math.round(fatPercentage)}% • {Math.round(macros.fats * 9)} kcal
          </p>
        </div>
      </div>

      {/* Macro pie visualization */}
      <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
        <p className="text-xs text-slate-400 font-semibold mb-2">Macro Distribution</p>
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
