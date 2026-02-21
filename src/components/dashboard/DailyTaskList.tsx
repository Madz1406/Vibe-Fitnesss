import React from 'react';
import { DailyTask } from '../../types';
import { Plus, Minus, Check } from 'lucide-react';

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
      {tasks.map((task) => {
        const progressPercentage = getProgressPercentage(task);
        const isGoalReached = task.current >= task.goal;

        return (
          <div
            key={task.id}
            className={`p-4 rounded-lg border transition-all ${
              task.completed
                ? 'border-neon-green/50 bg-neon-green/10 backdrop-blur-sm'
                : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask(task.id)}
                className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed
                    ? 'border-neon-green bg-neon-green text-slate-900'
                    : 'border-slate-600 hover:border-neon-cyan'
                }`}
              >
                {task.completed && <Check size={18} />}
              </button>

              {/* Task info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{task.emoji}</span>
                  <h3
                    className={`font-semibold ${
                      task.completed ? 'text-neon-green line-through' : 'text-white'
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden mb-1">
                  <div
                    className={`h-full transition-all ${
                      isGoalReached
                        ? 'bg-gradient-to-r from-neon-green to-neon-cyan'
                        : 'bg-gradient-to-r from-neon-fuchsia to-neon-cyan'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <p className="text-xs text-slate-400">
                  {task.current} / {task.goal} {task.unit}
                </p>
              </div>

              {/* Progress controls */}
              {!task.completed && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onUpdateProgress(task.id, Math.max(0, task.current - 1))
                    }
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-slate-200 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <button
                    onClick={() =>
                      onUpdateProgress(
                        task.id,
                        Math.min(task.goal, task.current + 1)
                      )
                    }
                    className="p-1.5 rounded-lg bg-neon-fuchsia hover:bg-neon-fuchsia/80 text-white transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyTaskList;
