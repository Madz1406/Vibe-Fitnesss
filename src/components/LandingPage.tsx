import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Brain, Utensils, Activity, Sparkles, Target, Zap } from 'lucide-react';
import { triggerRipple } from '../utils/ripple';

interface LandingPageProps {
    onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
    return (
        <div className="relative min-h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center -mt-8">
            {/* Background aesthetic blobs handled by App.tsx, we just add content here */}

            {/* Floating Animated Icons Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 text-fuchsia-500/20"
                >
                    <Dumbbell size={64} />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -15, 10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/3 right-1/4 text-cyan-500/20"
                >
                    <Brain size={72} />
                </motion.div>

                <motion.div
                    animate={{ y: [0, -25, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-1/4 left-1/3 text-purple-500/20"
                >
                    <Utensils size={48} />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-1/3 right-1/3 text-fuchsia-400/20"
                >
                    <Activity size={56} />
                </motion.div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 mx-auto"
                >
                    <Sparkles size={16} className="text-fuchsia-500" />
                    <span className="text-sm font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                        Vibe Fitness AI v2.0
                    </span>
                </motion.div>

                {/* Hero Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-tight"
                >
                    Transform Your Fitness <br className="hidden md:block" />
                    Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">AI</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Personalized diet plans, workout programs, and daily fitness insights
                    powered by intelligent algorithms. tailored perfectly to your lifestyle.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                    <button
                        onClick={(e) => { triggerRipple(e); onStart(); }}
                        className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-display font-medium text-lg w-full sm:w-auto shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start Your Journey <Target size={20} />
                        </span>
                    </button>
                </motion.div>

                {/* Features Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16"
                >
                    {[
                        { icon: Utensils, text: "AI Diet Plans", label: "Smart Nutrition" },
                        { icon: Dumbbell, text: "Auto Workouts", label: "Adaptive Routines" },
                        { icon: Zap, text: "Daily Insights", label: "Progress Tracking" },
                    ].map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/60 dark:hover:bg-white/10">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                                <feature.icon size={24} className="text-slate-700 dark:text-white" />
                            </div>
                            <h3 className="font-display font-bold text-slate-900 dark:text-white">{feature.text}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{feature.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;
