import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { triggerRipple } from '../utils/ripple';
import { motion } from 'framer-motion';
import { Sparkles, Dumbbell, Activity } from 'lucide-react';

interface AuthProps {
    onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (signUpError) throw signUpError;
                alert('Signup successful! You can now log in.');
                setIsSignUp(false);
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) throw signInError;
                onAuthSuccess();
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Left Side - Motivational Visuals (Hidden on mobile) */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-900 border-r border-white/10 flex-col items-center justify-center p-12">
                {/* Animated Background Gradients */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-glow" />
                <div className="noise-overlay z-0 opacity-50" aria-hidden="true" />

                <div className="relative z-10 w-full max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight mb-4">
                            Your potential, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                                unlocked by AI.
                            </span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Join thousands of athletes transforming their bodies with mathematically optimized training and nutrition.
                        </p>
                    </motion.div>

                    {/* Floating Graphics */}
                    <div className="relative h-64 mt-8">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 left-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl max-w-xs"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Smart Analysis</p>
                                    <p className="text-slate-400 text-xs text-brand-card-text">AI adapts to your progress</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl max-w-xs"
                        >
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                                    <Dumbbell size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold">Dynamic Workouts</p>
                                    <p className="text-slate-400 text-xs">Always challenging</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Mobile background (hidden on desktop) */}
                <div className="lg:hidden absolute inset-0 bg-slate-50 dark:bg-slate-950">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-fuchsia-500/10 rounded-full mix-blend-screen filter blur-[80px]" />
                    <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-[80px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative z-10 w-full max-w-md bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl p-8 lg:p-10 shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center shadow-lg">
                            <Activity className="text-white w-6 h-6" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-2 text-center">
                        {isSignUp ? 'Create an account' : 'Welcome back'}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-center mb-8 text-sm">
                        {isSignUp ? 'Enter your details to get started' : 'Enter your credentials to access your profile'}
                    </p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3"
                        >
                            <span>⚠️</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleAuth} className="space-y-5">
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-transparent dark:border-white/5 text-slate-900 dark:text-white focus:border-fuchsia-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/10 transition-all placeholder-transparent"
                                placeholder="name@example.com"
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-2 text-xs font-semibold text-slate-500 dark:text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-fuchsia-500 cursor-text"
                            >
                                Email address
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-100 dark:bg-slate-900/50 border border-transparent dark:border-white/5 text-slate-900 dark:text-white focus:border-fuchsia-500/50 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-fuchsia-500/10 transition-all placeholder-transparent"
                                placeholder="••••••••"
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-2 text-xs font-semibold text-slate-500 dark:text-slate-400 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-fuchsia-500 cursor-text"
                            >
                                Password
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            onClick={(e) => { triggerRipple(e); }}
                            className="w-full mt-2 disabled:opacity-50 relative overflow-hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-display font-medium px-6 py-3.5 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </span>
                            ) : (
                                isSignUp ? 'Create Account' : 'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setError(null);
                                }}
                                className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors ml-1"
                            >
                                {isSignUp ? 'Sign in' : 'Sign up'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
