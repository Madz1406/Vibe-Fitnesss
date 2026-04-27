import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface DailyStreakProps {
    streak: number;
}

const DailyStreak: React.FC<DailyStreakProps> = ({ streak }) => {
    const nextMilestone = Math.ceil((streak + 1) / 7) * 7;

    return (
        <motion.div
            id="daily-streak"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-mt-24"
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Flame size={24} className="text-orange-500" /> Daily Streak
                </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <motion.div
                        key={streak}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg relative"
                    >
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75"></div>
                        <span className="text-3xl font-black text-white relative z-10">{streak}</span>
                    </motion.div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            {streak} {streak === 1 ? 'Day' : 'Days'}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Consistency builds strength. Keep it going!
                        </p>
                    </div>
                </div>

                <div className="bg-slate-50 dark:bg-black/20 rounded-xl p-4 border border-slate-100 dark:border-white/5 w-full md:w-auto">
                    <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                        Next milestone: <span className="font-bold text-slate-900 dark:text-white">{nextMilestone} days</span>
                    </p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(streak % 7 / 7) * 100}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DailyStreak;
