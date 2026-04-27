import React, { useState, useEffect } from 'react';
import { UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { triggerRipple } from '../utils/ripple';

interface TopNavbarProps {
    onLogout: () => void;
}

const navItems = [
    { label: 'Daily Quest', targetId: 'daily-quest' },
    { label: 'Daily Progress', targetId: 'daily-progress' },
    { label: 'Progress Analysis', targetId: 'progress-analysis' },
    { label: 'Daily Streak', targetId: 'daily-streak' },
    { label: 'AI Insights', targetId: 'ai-insights' },
    { label: 'Weekly Report', targetId: 'weekly-report' },
    { label: 'Diet Planner', targetId: 'diet-planner' },
    { label: 'Workout Planner', targetId: 'workout-planner' },
];

const TopNavbar: React.FC<TopNavbarProps> = () => {
    const [activeSection, setActiveSection] = useState('daily-progress');

    const handleScrollTo = (id: string, e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) triggerRipple(e);
        const element = document.getElementById(id);
        if (element) {
            // Add a slight offset for the sticky header
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.targetId));
            let currentActive = activeSection;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    // If the top of the section is near the top of the viewport
                    if (rect.top <= 150) {
                        currentActive = navItems[i].targetId;
                        break;
                    }
                }
            }

            if (currentActive !== activeSection) {
                setActiveSection(currentActive);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]);

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Left: Branding */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer group text-left"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
                        V
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden lg:block">
                        Vibe Fitness
                    </span>
                </button>

                {/* Center: Navigation Links (Hidden on small screens) */}
                <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
                    {navItems.map((item) => (
                        <button
                            key={item.targetId}
                            onClick={(e) => handleScrollTo(item.targetId, e)}
                            className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 overflow-hidden ${activeSection === item.targetId
                                ? 'text-fuchsia-600 dark:text-fuchsia-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                }`}
                        >
                            {activeSection === item.targetId && (
                                <div className="absolute inset-0 bg-white dark:bg-white/10 rounded-lg shadow-sm border border-slate-200 dark:border-white/5 -z-10" />
                            )}
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <div className="h-6 w-px bg-slate-300 dark:bg-white/10 mx-1"></div>
                    <Link
                        to="/profile"
                        className="rounded-full p-2 border border-white/10 bg-slate-100 dark:bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-200"
                        title="View Profile"
                    >
                        <UserCircle size={24} className="text-slate-600 dark:text-slate-300" />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default TopNavbar;
