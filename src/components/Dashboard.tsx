import React, { useState, useEffect } from 'react';
import { UserProfile, DailyTask, UserState } from '../types';
import { calculateMacros, calculateLevel, getPointsForNextLevel } from '../utils/calculations';
import MacroBreakdown from './dashboard/MacroBreakdown';
import DailyTaskList from './dashboard/DailyTaskList';
import ProgressBar from './dashboard/ProgressBar';
import DietPlan from './DietPlan';
import WorkoutPlan from './WorkoutPlan';
import { LogOut, Zap } from 'lucide-react';

interface DashboardProps {
  profile: UserProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onLogout }) => {
  const [state, setState] = useState<UserState>({
    profile,
    macros: calculateMacros(profile),
    dailyTasks: initializeDailyTasks(),
    currentStep: 0,
    currentLevel: 1,
    totalPoints: 0,
  });

  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('vibeFitnessState');
    if (saved) {
      const parsed = JSON.parse(saved);
      setState(parsed);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('vibeFitnessState', JSON.stringify(state));
  }, [state]);

  const toggleTask = (taskId: string) => {
    const updatedTasks = state.dailyTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const pointsPerTask = 50;
    const newPoints = state.totalPoints + (updatedTasks.find(t => t.id === taskId)?.completed ? 0 : pointsPerTask);
    const newLevel = calculateLevel(newPoints);

    const oldLevel = calculateLevel(state.totalPoints);
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }

    setState({
      ...state,
      dailyTasks: updatedTasks,
      totalPoints: newPoints,
      currentLevel: newLevel,
    });
  };

  const updateTaskProgress = (taskId: string, progress: number) => {
    const updatedTasks = state.dailyTasks.map((task) =>
      task.id === taskId ? { ...task, current: progress } : task
    );
    setState({ ...state, dailyTasks: updatedTasks });
  };

  const completedTasks = state.dailyTasks.filter((t) => t.completed).length;
  const progressPercentage = (completedTasks / state.dailyTasks.length) * 100;
  const pointsForNext = getPointsForNextLevel(state.totalPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-neon-fuchsia rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-glow"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-slate-800/50 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-fuchsia via-neon-purple to-neon-cyan bg-clip-text text-transparent">
              VIBE FITNESS
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Level {state.currentLevel} • {state.totalPoints} points
            </p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-neon-fuchsia hover:text-neon-fuchsia transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* User greeting and macro stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Daily Overview</h2>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm">Tasks Completed</p>
                <p className="text-3xl font-bold text-neon-green">
                  {completedTasks}/{state.dailyTasks.length}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-sm">Points to Next Level</p>
                <p className="text-3xl font-bold text-neon-cyan">{pointsForNext}</p>
              </div>
            </div>
          </div>

          {/* Macros card */}
          {state.macros && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Today's Goal</h2>
              <MacroBreakdown macros={state.macros} />
            </div>
          )}
        </div>

        {/* Daily tasks */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Zap size={24} className="text-neon-green" /> Daily Quest
          </h2>
          <DailyTaskList
            tasks={state.dailyTasks}
            onToggleTask={toggleTask}
            onUpdateProgress={updateTaskProgress}
          />
        </div>

        {/* Progress bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Daily Progress</h2>
          <ProgressBar percentage={progressPercentage} />
        </div>

        {/* AI Diet Plan Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <DietPlan userProfile={state.profile} />
        </div>

        {/* AI Workout Plan Section */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <WorkoutPlan userProfile={state.profile} />
        </div>

        {/* Level up animation */}
        {showLevelUp && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="animate-level-up">
              <div className="text-center">
                <p className="text-6xl font-black text-transparent bg-gradient-to-r from-neon-fuchsia via-neon-green to-neon-cyan bg-clip-text mb-2">
                  LEVEL UP!
                </p>
                <p className="text-2xl font-bold text-neon-green">
                  Level {state.currentLevel} 🎉
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative border-t border-slate-800/50 backdrop-blur-md bg-black/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-slate-400">
            ⚠️ <span className="text-neon-cyan font-semibold">Medical Disclaimer:</span> Consult a medical professional before starting any new diet or exercise program. This app provides educational recommendations only.
          </p>
        </div>
      </div>
    </div>
  );
};

function initializeDailyTasks(): DailyTask[] {
  return [
    {
      id: '1',
      title: 'Hit Protein Goal',
      goal: 150,
      current: 0,
      unit: 'g',
      completed: false,
      icon: 'target',
      emoji: '🥩',
    },
    {
      id: '2',
      title: 'Complete Workout',
      goal: 1,
      current: 0,
      unit: 'session',
      completed: false,
      icon: 'activity',
      emoji: '💪',
    },
    {
      id: '3',
      title: 'Drink 3L Water',
      goal: 3000,
      current: 0,
      unit: 'ml',
      completed: false,
      icon: 'droplet',
      emoji: '💧',
    },
    {
      id: '4',
      title: 'Sleep 8 Hours',
      goal: 8,
      current: 0,
      unit: 'hours',
      completed: false,
      icon: 'moon',
      emoji: '😴',
    },
    {
      id: '5',
      title: 'Track Meals',
      goal: 3,
      current: 0,
      unit: 'meals',
      completed: false,
      icon: 'utensils',
      emoji: '🍽️',
    },
    {
      id: '6',
      title: 'Stretch & Mobility',
      goal: 1,
      current: 0,
      unit: 'session',
      completed: false,
      icon: 'flex',
      emoji: '🧘',
    },
  ];
}

export default Dashboard;
