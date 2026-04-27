import React from 'react';
import { DailyTask } from '../../types';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DailyTaskListProps {
  tasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
  onUpdateProgress: (taskId: string, progress: number) => void;
}

const DailyTaskList: React.FC<DailyTaskListProps> = ({
  tasks,
  onToggleTask,
  onUpdateProgress,
}) => {
  const getProgressPercentage = (task: DailyTask) => {
    return Math.min((task.current / task.goal) * 100, 100);
  };

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => {
        const progressPercentage = getProgressPercentage(task);

        return (
          <div key={task.id} className="animate-fade-up opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
            <div
              className={`p-4 rounded-2xl border transition-all duration-300 ${task.completed
                ? 'border-fuchsia-500/50 bg-fuchsia-500/10 backdrop-blur-xl shadow-md'
                : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl hover:scale-[1.01] hover:shadow-xl'
                }`}
            >
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleTask(task.id)}
                  className={`relative flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${task.completed
                    ? 'border-neon-green bg-neon-green text-slate-900'
                    : 'border-slate-300 dark:border-slate-600 hover:border-neon-cyan'
                    }`}
                >
                  <AnimatePresence>
                    {task.completed && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <Check size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtle glow effect on complete */}
                  <AnimatePresence>
                    {task.completed && (
                      <motion.div
                        className="absolute inset-0 bg-neon-green rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Task info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{task.emoji}</span>
                    <h3
                      className={`font-display font-bold tracking-tight ${task.completed ? 'text-neon-fuchsia dark:text-neon-green line-through' : 'text-slate-900 dark:text-white'
                        }`}
                    >
                      {task.title}
                    </h3>
                  </div>

                  {/* Interactive Progress Slider */}
                  <div className="relative flex items-center w-full h-8 mb-1 group">
                    {/* Invisible native range input for interaction */}
                    {!task.completed && (
                      <input
                        type="range"
                        min="0"
                        max={task.goal}
                        step={task.goal > 1000 ? 50 : task.goal > 100 ? 5 : 1}
                        value={task.current}
                        onChange={(e) => onUpdateProgress(task.id, Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      />
                    )}

                    {/* Visual Track */}
                    <div className="relative h-2 rounded-full bg-white/10 overflow-hidden w-full">
                      {/* Active portion */}
                      <div
                        className={`h-full pointer-events-none transition-all duration-500 animate-bar-fill bg-gradient-to-r from-fuchsia-500 to-cyan-400`}
                        style={{ '--bar-width': `${progressPercentage}%` } as React.CSSProperties}
                      ></div>
                    </div>

                    {/* Custom Thumb */}
                    {!task.completed && (
                      <div
                        className="absolute h-5 w-5 bg-white border-2 border-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,217,255,0.5)] pointer-events-none transition-transform group-active:scale-125 group-active:shadow-[0_0_15px_rgba(0,217,255,0.8)] z-10"
                        style={{
                          left: `calc(10px + calc(100% - 20px) * ${progressPercentage / 100})`,
                          transform: 'translateX(-50%)',
                        }}
                      ></div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {task.current} / {task.goal} {task.unit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyTaskList;
