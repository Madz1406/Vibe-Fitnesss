import React from 'react';
import { WeightEntry, UserProfile } from '../../types';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface ProgressAnalysisProps {
    history: WeightEntry[];
    profile: UserProfile;
}

const ProgressAnalysis: React.FC<ProgressAnalysisProps> = ({ history, profile }) => {
    if (history.length < 2) {
        return (
            <div className="text-slate-500 dark:text-slate-400 text-sm text-center py-4">
                Log at least two weight entries to see progress analysis.
            </div>
        );
    }

    const firstEntry = history[0].weight;
    const lastEntry = history[history.length - 1].weight;
    const diff = lastEntry - firstEntry;
    const diffPercent = ((diff / firstEntry) * 100).toFixed(1);

    let message = '';
    const goal = profile.goal;

    if (goal === 'cutting') {
        if (diff < 0) {
            status = 'success';
            message = `Great work! You've lost ${Math.abs(diff).toFixed(1)}kg (${Math.abs(parseFloat(diffPercent))}%). You're on track for your cutting goal.`;
        } else if (diff > 0) {
            status = 'warning';
            message = `You've gained ${diff.toFixed(1)}kg. Keep focus on your caloric deficit for cutting.`;
        } else {
            message = "Your weight is stable. Keep pushing towards your cutting goal!";
        }
    } else if (goal === 'bulking') {
        if (diff > 0) {
            status = 'success';
            message = `Building mass! You've gained ${diff.toFixed(1)}kg (${diffPercent}%). Keep hitting those protein goals!`;
        } else if (diff < 0) {
            status = 'warning';
            message = `You've lost ${Math.abs(diff).toFixed(1)}kg. Consider increasing your caloric intake for bulking.`;
        } else {
            message = "Your weight is stable. Ensure you're in a caloric surplus for muscle growth.";
        }
    } else {
        if (Math.abs(diff) < 0.5) {
            status = 'success';
            message = "Excellent maintenance! Your weight is holding steady.";
        } else {
            message = `Your weight has shifted by ${diff.toFixed(1)}kg. Adjust your intake to maintain your baseline.`;
        }
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-3">
                {diff < 0 ? (
                    <div className="p-2 rounded-full bg-neon-green/10 text-neon-green">
                        <TrendingDown size={20} />
                    </div>
                ) : diff > 0 ? (
                    <div className="p-2 rounded-full bg-neon-fuchsia/10 text-neon-fuchsia">
                        <TrendingUp size={20} />
                    </div>
                ) : (
                    <div className="p-2 rounded-full bg-neon-cyan/10 text-neon-cyan">
                        <Minus size={20} />
                    </div>
                )}
                <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Weight change: <span className={diff < 0 ? 'text-neon-green' : diff > 0 ? 'text-neon-fuchsia' : 'text-neon-cyan'}>
                            {diff > 0 ? '+' : ''}{diff.toFixed(1)}kg
                        </span>
                    </p>
                </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{message}"
            </p>
        </div>
    );
};

export default ProgressAnalysis;
