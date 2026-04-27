import React, { useState } from 'react';
import { Scale, Plus } from 'lucide-react';
import { triggerRipple } from '../../utils/ripple';
import { WeightEntry } from '../../types';

interface WeightLoggerProps {
    onAddEntry: (entry: WeightEntry) => void;
    currentWeight: number;
}

const WeightLogger: React.FC<WeightLoggerProps> = ({ onAddEntry, currentWeight }) => {
    const [weight, setWeight] = useState<string>(currentWeight.toString());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const weightNum = parseFloat(weight);
        if (!isNaN(weightNum)) {
            onAddEntry({
                date: new Date().toISOString(),
                weight: weightNum,
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Scale className="text-neon-cyan" size={20} />
                <h3 className="font-display font-bold tracking-tight text-slate-900 dark:text-white">Log Weight</h3>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="number"
                        step="0.1"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-neon-cyan transition-colors"
                        placeholder="Weight (kg)"
                    />
                    <span className="absolute right-3 top-2 text-slate-400 text-sm">kg</span>
                </div>
                <button
                    type="submit"
                    onClick={(e) => { triggerRipple(e); }}
                    className="relative overflow-hidden bg-gradient-brand text-white font-display font-semibold px-6 py-3 rounded-xl shadow-glow-pink hover:shadow-btn-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2"
                >
                    <Plus size={18} /> Log
                </button>
            </form>
        </div>
    );
};

export default WeightLogger;
