import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('vibeFitnessTheme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('vibeFitnessTheme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('vibeFitnessTheme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-white/10 bg-white/10 backdrop-blur-md text-slate-600 dark:text-slate-300 hover:border-neon-fuchsia dark:hover:border-neon-fuchsia hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 shadow-sm dark:shadow-none"
      aria-label="Toggle theme"
    >
      <span className={`inline-block transition-transform duration-300 ${isDark ? 'animate-spin-once' : ''}`}>
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </span>
    </button>
  );
};

export default ThemeToggle;
