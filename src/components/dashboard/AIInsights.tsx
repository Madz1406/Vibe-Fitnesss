import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Heart, Activity } from 'lucide-react';
import { UserState } from '../../types';

interface AIInsightsProps {
    state: UserState;
}

const AIInsights: React.FC<AIInsightsProps> = ({ state }) => {
    const generateInsights = () => {
        const insights = [];

        // Weight insight
        if (state.weightHistory && state.weightHistory.length >= 2) {
            const firstWeight = state.weightHistory[0].weight;
            const lastWeight = state.weightHistory[state.weightHistory.length - 1].weight;
            const diff = lastWeight - firstWeight;
            if (diff < 0) {
                insights.push({
                    id: 'weight',
                    icon: <TrendingUp size={20} className="text-emerald-500" />,
                    title: 'Weight Insight',
                    text: `You lost ${Math.abs(diff).toFixed(1)} kg recently — great progress.`,
                    color: 'emerald'
                });
            } else if (diff > 0) {
                insights.push({
                    id: 'weight',
                    icon: <TrendingUp size={20} className="text-amber-500" />,
                    title: 'Weight Insight',
                    text: `You gained ${Math.abs(diff).toFixed(1)} kg. Make sure it aligns with your goals.`,
                    color: 'amber'
                });
            }
        }

        // Consistency (Workout/Tasks)
        const completedTasks = state.dailyTasks.filter(t => t.completed).length;
        const totalTasks = state.dailyTasks.length;
        if (completedTasks === totalTasks) {
            insights.push({
                id: 'consistency',
                icon: <Activity size={20} className="text-fuchsia-500" />,
                title: 'Consistency Insight',
                text: "You've completed all tasks today! This consistency will accelerate progress.",
                color: 'fuchsia'
            });
        } else {
            insights.push({
                id: 'consistency',
                icon: <Activity size={20} className="text-cyan-500" />,
                title: 'Consistency Insight',
                text: `You completed ${completedTasks} tasks today. Completing all tasks will accelerate progress.`,
                color: 'cyan'
            });
        }

        // Hydration insight
        const waterTask = state.dailyTasks.find(t => t.id === '3'); // Assuming id 3 is water
        if (waterTask) {
            if (!waterTask.completed) {
                insights.push({
                    id: 'hydration',
                    icon: <Heart size={20} className="text-blue-500" />,
                    title: 'Hydration Insight',
                    text: "You have not reached your water goal. Stay hydrated for optimal performance.",
                    color: 'blue'
                });
            }
        }

        // Default brain insight if somehow nothing else triggered
        if (insights.length < 3) {
            insights.push({
                id: 'general',
                icon: <Brain size={20} className="text-purple-500" />,
                title: 'AI Tip',
                text: `Stay consistent with your ${state.profile?.goal || 'fitness'} goals for the best results!`,
                color: 'purple'
            });
        }

        return insights;
    };

    const insights = generateInsights();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            id="ai-insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-mt-24"
        >
            <div className="flex items-center gap-2 mb-6">
                <Brain size={24} className="text-purple-500" />
                <h2 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
                    AI Insights
                </h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {insights.map((insight, index) => (
                    <motion.div
                        key={`${insight.id}-${index}`}
                        variants={item}
                        className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors duration-300"
                    >
                        <div className={`p-3 rounded-lg bg-${insight.color}-500/10 dark:bg-${insight.color}-500/20`}>
                            {insight.icon}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{insight.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {insight.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default AIInsights;
