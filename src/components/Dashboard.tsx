import React, { useState, useEffect } from 'react';
import { UserProfile, DailyTask, UserState } from '../types';
import { calculateMacros, calculateLevel, getPointsForNextLevel } from '../utils/calculations';
import MacroBreakdown from './dashboard/MacroBreakdown';
import DailyTaskList from './dashboard/DailyTaskList';
import ProgressBar from './dashboard/ProgressBar';
import DietPlan from './DietPlan';
import WorkoutPlan from './WorkoutPlan';
import { Zap, Activity } from 'lucide-react';
import TopNavbar from './TopNavbar';
import { motion } from 'framer-motion';
import ProgressAnalysis from './dashboard/ProgressAnalysis';
import ProgressChart from './dashboard/ProgressChart';
import WeightLogger from './dashboard/WeightLogger';
import { generateFitnessReport } from '../utils/reportGenerator';
import DailyStreak from './dashboard/DailyStreak';
import AIInsights from './dashboard/AIInsights';
import WeeklyReport from './dashboard/WeeklyReport';
import confetti from 'canvas-confetti';

interface DashboardProps {
  profile: UserProfile;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, onLogout }) => {
  const getInitialState = (): UserState => {
    // Basic defaults
    const defaultQuests = initializeDailyTasks();
    const todayStr = new Date().toISOString().split('T')[0];

    // Load Quests
    let loadedQuests = defaultQuests;
    const savedQuests = localStorage.getItem('vibeFitness_dailyQuest');
    if (savedQuests) {
      try {
        const parsedQuests = JSON.parse(savedQuests);
        if (parsedQuests.date === todayStr && parsedQuests.quests) {
          loadedQuests = parsedQuests.quests;
        }
      } catch (e) {
        console.error("Failed to parse vibeFitness_dailyQuest", e);
      }
    }

    // Load Streak
    let loadedStreakDays = 0;
    let loadedLastActive = todayStr;
    const savedStreak = localStorage.getItem('vibeFitness_streak');
    if (savedStreak) {
      try {
        const parsedStreak = JSON.parse(savedStreak);

        const lastActiveDateObj = new Date(parsedStreak.lastActiveDate);
        const todayObj = new Date(todayStr);
        const diffTime = Math.abs(todayObj.getTime() - lastActiveDateObj.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) { // Same day or previous day
          loadedStreakDays = parsedStreak.streakDays || 0;
          loadedLastActive = parsedStreak.lastActiveDate || todayStr;
        } else {
          loadedStreakDays = 0; // Missed a day
          loadedLastActive = todayStr;
        }
      } catch (e) {
        console.error("Failed to parse vibeFitness_streak", e);
      }
    }

    const defaultState: UserState = {
      profile,
      macros: calculateMacros(profile),
      dailyTasks: loadedQuests,
      currentStep: 0,
      currentLevel: 1,
      totalPoints: 0,
      weightHistory: [],
      streak_days: loadedStreakDays,
      last_active_date: loadedLastActive,
    };

    // Attempt to merge with the main state payload if it has other progress (like points, level, weight history)
    const savedGlobal = localStorage.getItem('vibeFitnessState');
    if (savedGlobal) {
      try {
        const parsedGlobal = JSON.parse(savedGlobal);
        return {
          ...defaultState,
          currentStep: parsedGlobal.currentStep ?? defaultState.currentStep,
          currentLevel: parsedGlobal.currentLevel ?? defaultState.currentLevel,
          totalPoints: parsedGlobal.totalPoints ?? defaultState.totalPoints,
          weightHistory: parsedGlobal.weightHistory ?? defaultState.weightHistory,
          // Ensure profile and macros are fresh based on props, but keep history
        };
      } catch (e) {
        console.error("Failed to parse vibeFitnessState", e);
      }
    }

    return defaultState;
  };

  const [state, setState] = useState<UserState>(getInitialState());

  const [showLevelUp, setShowLevelUp] = useState(false);

  useEffect(() => {
    // Save state payloads whenever state changes
    localStorage.setItem('vibeFitnessState', JSON.stringify({
      currentStep: state.currentStep,
      currentLevel: state.currentLevel,
      totalPoints: state.totalPoints,
      weightHistory: state.weightHistory
    }));

    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem('vibeFitness_dailyQuest', JSON.stringify({
      date: todayStr,
      quests: state.dailyTasks
    }));

    localStorage.setItem('vibeFitness_streak', JSON.stringify({
      streakDays: state.streak_days,
      lastActiveDate: state.last_active_date
    }));
  }, [state]);

  const toggleTask = (taskId: string) => {
    const updatedTasks = state.dailyTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const pointsPerTask = 50;
    const isNowCompleted = updatedTasks.find(t => t.id === taskId)?.completed;
    const newPoints = state.totalPoints + (isNowCompleted ? pointsPerTask : -pointsPerTask); // fixed logic
    const newLevel = calculateLevel(Math.max(0, newPoints)); // prevent negative points

    const oldLevel = calculateLevel(state.totalPoints);
    if (newLevel > oldLevel) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }

    // Streak logic
    const todayStr = new Date().toISOString().split('T')[0];
    let newStreak = state.streak_days;
    let newLastActive = state.last_active_date;

    const anyTaskCompletedToday = updatedTasks.some(t => t.completed);

    // Check if missed a day (simplified: if last active is not today and not yesterday)
    // For a robust system we'd compare dates properly, but simple string compare works for basic reset
    const lastActiveDateObj = new Date(state.last_active_date);
    const todayObj = new Date(todayStr);
    const diffTime = Math.abs(todayObj.getTime() - lastActiveDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      newStreak = 0; // Missed a day
    }

    if (anyTaskCompletedToday && state.last_active_date !== todayStr) {
      newStreak = newStreak === 0 && diffDays > 1 ? 1 : newStreak + 1;
      newLastActive = todayStr;
    }

    // Trigger Confetti if all tasks are complete today and wasn't marked complete before
    const allCompletedToday = updatedTasks.every(t => t.completed);
    const wasAllCompletedBefore = state.dailyTasks.every(t => t.completed);

    if (allCompletedToday && !wasAllCompletedBefore) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D946EF', '#06B6D4', '#22C55E'] // fuchsia, cyan, green
      });
    }

    setState({
      ...state,
      dailyTasks: updatedTasks,
      totalPoints: Math.max(0, newPoints),
      currentLevel: newLevel,
      streak_days: newStreak,
      last_active_date: newLastActive,
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

  const handleWeightLog = (entry: any) => {
    if (!state.profile) return;
    const newProfile = { ...state.profile, weight: entry.weight };
    setState({
      ...state,
      weightHistory: [...state.weightHistory, entry],
      profile: newProfile,
      macros: calculateMacros(newProfile),
    });
  };

  const handleDownloadReport = () => {
    if (!state.profile) return;
    generateFitnessReport(state.profile, state.weightHistory, state.macros);
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <TopNavbar onLogout={onLogout} />

      {/* Main content */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* User greeting and macro stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Daily Overview</h2>
            <div className="space-y-3">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Tasks Completed</p>
                <p className="text-3xl font-bold text-fuchsia-500">
                  {completedTasks}/{state.dailyTasks.length}
                </p>
              </div>
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Points to Next Level</p>
                <p className="text-3xl font-bold text-cyan-500">{pointsForNext}</p>
              </div>
            </div>
          </motion.div>

          {/* Macros card */}
          {state.macros && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Today's Goal</h2>
              <MacroBreakdown macros={state.macros} />
            </motion.div>
          )}
        </div>

        {/* Daily Streak (Feature 1) */}
        <div className="scroll-mt-24">
          <DailyStreak streak={state.streak_days} />
        </div>

        {/* Daily Tasks (Daily Quest) - Positioned Second */}
        <motion.div
          id="daily-quest"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl scroll-mt-24"
        >
          <h2 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap size={24} className="text-fuchsia-500" /> Daily Quest
          </h2>
          <DailyTaskList
            tasks={state.dailyTasks}
            onToggleTask={toggleTask}
            onUpdateProgress={updateTaskProgress}
          />
        </motion.div>

        {/* Level up animation */}
        {showLevelUp && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
            <div className="animate-level-up">
              <div className="text-center bg-white/10 backdrop-blur-2xl p-8 rounded-3xl border border-white/20 shadow-2xl">
                <p className="text-6xl font-black text-transparent bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text mb-2">
                  LEVEL UP!
                </p>
                <p className="text-2xl font-bold text-cyan-400">
                  Level {state.currentLevel} 🎉
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Progress bar (Daily Progress) */}
        <motion.div
          id="daily-progress"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 transform-gpu hover:scale-[1.01] hover:shadow-2xl scroll-mt-24"
        >
          <ProgressBar percentage={progressPercentage} />
        </motion.div>

        {/* AI Insights (Feature 2) */}
        <div className="scroll-mt-24">
          <AIInsights state={state} />
        </div>

        {/* Progress Analysis Module */}
        <div id="progress-analysis" className="grid grid-cols-1 lg:grid-cols-3 gap-8 scroll-mt-24">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="text-cyan-500" size={24} /> Progress Chart
                </h2>
                <button
                  onClick={handleDownloadReport}
                  className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 shadow-sm"
                >
                  Download Info
                </button>
              </div>
              <ProgressChart data={state.weightHistory} />
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            >
              <WeightLogger onAddEntry={handleWeightLog} currentWeight={state.profile?.weight || 0} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
            >
              <h3 className="font-display font-bold tracking-tight text-slate-900 dark:text-white mb-4">Analysis</h3>
              <ProgressAnalysis history={state.weightHistory} profile={state.profile as UserProfile} />
            </motion.div>
          </div>
        </div>

        {/* Weekly Report (Feature 3) */}
        <div className="scroll-mt-24">
          <WeeklyReport state={state} />
        </div>

        {/* Action Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          {/* AI Diet Plan Section */}
          <motion.div id="diet-planner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="scroll-mt-24">
            <DietPlan userProfile={state.profile} />
          </motion.div>

          {/* AI Workout Plan Section */}
          <motion.div id="workout-planner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="scroll-mt-24">
            <WorkoutPlan userProfile={state.profile} />
          </motion.div>
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
      <div className="relative mt-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center border-t border-slate-200 dark:border-white/10">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            ⚠️ <span className="text-fuchsia-500 font-semibold">Medical Disclaimer:</span> Consult a medical professional before starting any new diet or exercise program. This app provides educational recommendations only.
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
