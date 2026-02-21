import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { CheckCircle, AlertCircle, Dumbbell, Activity, TrendingUp, Clock, Heart } from 'lucide-react';

interface WorkoutPlanProps {
  userProfile: UserProfile | null;
}

interface WorkoutPlan {
  fitnessLevel: string;
  goal: string;
  duration: string;
  frequency: number;
  durationPerSession: string;
  weeklySchedule: {
    [day: string]: {
      name: string;
      type: string;
      duration: string;
      exercises: Array<{
        name: string;
        sets?: number;
        reps?: string;
        duration?: string;
      }>;
      notes: string;
    };
  };
  recoveryTips: string[];
  warmUpCooldown: {
    warmUp: {
      duration: string;
      exercises: string[];
    };
    coolDown: {
      duration: string;
      exercises: string[];
    };
  };
  progressionStrategy: {
    [key: string]: any;
  };
  medicalConsiderations: string[];
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({ userProfile }) => {
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'tips' | 'progression'>('overview');
  const [backendStatus, setBackendStatus] = useState<'checking' | 'healthy' | 'down'>('checking');
  const [checkingBackend, setCheckingBackend] = useState(false);

  useEffect(() => {
    // Check backend health on mount
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      setCheckingBackend(true);
      const response = await fetch('http://localhost:5000/api/health');
      if (response.ok) {
        setBackendStatus('healthy');
      } else {
        setBackendStatus('down');
      }
    } catch {
      setBackendStatus('down');
    } finally {
      setCheckingBackend(false);
    }
  };

  const generateWorkoutPlan = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!userProfile) {
        throw new Error('User profile is required');
      }

      // Validate backend health first
      if (backendStatus !== 'healthy') {
        throw new Error('Backend service is not available. Please ensure the Python server is running on localhost:5000');
      }

      // Prepare payload with minimal required fields
      const payload = {
        goal: userProfile.goal || 'balanced',
        fitnessExperience: userProfile.fitnessExperience?.split(' ').pop()?.toLowerCase() || 'beginner',
        weight: userProfile.weight,
        height: userProfile.height,
        age: userProfile.age,
        medicalConditions: userProfile.medicalConditions || [],
      };

      const response = await fetch('http://localhost:5000/api/workout-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate workout plan');
      }

      const data = await response.json();
      setWorkoutPlan(data.data);
      setActiveTab('overview');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate workout plan';
      setError(errorMessage);
      console.error('Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!workoutPlan) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
            <Dumbbell size={28} className="text-neon-green" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Workout Planner</h2>
            <p className="text-slate-400 text-sm">Get a personalized 8-week training program</p>
          </div>
        </div>

        {/* Backend Status Indicator */}
        <div className={`px-4 py-3 rounded-lg border ${
          backendStatus === 'healthy'
            ? 'bg-green-500/10 border-green-500/20'
            : 'bg-yellow-500/10 border-yellow-500/20'
        }`}>
          <div className="flex items-center gap-2">
            {backendStatus === 'healthy' ? (
              <>
                <CheckCircle size={18} className="text-green-400" />
                <span className="text-green-300 text-sm font-semibold">Backend Service Ready</span>
              </>
            ) : (
              <>
                <AlertCircle size={18} className="text-yellow-400" />
                <span className="text-yellow-300 text-sm font-semibold">
                  Backend Service {checkingBackend ? 'Checking...' : 'Unavailable'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateWorkoutPlan}
          disabled={loading || backendStatus !== 'healthy'}
          className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-neon-green to-neon-cyan text-black font-bold text-lg hover:shadow-lg hover:shadow-neon-green/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Generating Your Workout Plan...' : 'Generate Workout Plan'}
        </button>

        {/* Check Again Button */}
        {backendStatus !== 'healthy' && (
          <button
            onClick={checkBackendHealth}
            disabled={checkingBackend}
            className="w-full px-6 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-neon-cyan hover:text-neon-cyan transition-all"
          >
            {checkingBackend ? 'Checking...' : '🔄 Check Again'}
          </button>
        )}

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-300 font-semibold text-sm">Error</p>
                <p className="text-red-200 text-sm mt-1">{error}</p>
                <div className="mt-3 text-xs text-red-300 space-y-1">
                  <p><strong>Troubleshooting:</strong></p>
                  <ul className="list-disc list-inside">
                    <li>Make sure Python backend is running: <code className="bg-black/50 px-2 py-1 rounded">python app.py</code></li>
                    <li>Backend should be on localhost:5000</li>
                    <li>Check that Flask-CORS is installed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} className="text-neon-cyan" />
              <h3 className="font-semibold text-white">Personalized</h3>
            </div>
            <p className="text-xs text-slate-400">Based on your goals, fitness level, and experience</p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-neon-fuchsia" />
              <h3 className="font-semibold text-white">8-Week Program</h3>
            </div>
            <p className="text-xs text-slate-400">Progressive training with built-in progression</p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={18} className="text-neon-green" />
              <h3 className="font-semibold text-white">Safe & Healthy</h3>
            </div>
            <p className="text-xs text-slate-400">Considers medical conditions and recovery</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
          <Dumbbell size={28} className="text-neon-green" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Your Workout Plan</h2>
          <p className="text-slate-400 text-sm">
            {workoutPlan.duration} • {workoutPlan.frequency}x per week • {workoutPlan.fitnessLevel}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        {(['overview', 'schedule', 'tips', 'progression'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-semibold transition-all ${
              activeTab === tab
                ? 'text-neon-green border-b-2 border-neon-green'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Goal & Program Info */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Program Overview</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-400">Goal</p>
                <p className="text-white font-semibold capitalize">{workoutPlan.goal.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-slate-400">Fitness Level</p>
                <p className="text-white font-semibold capitalize">{workoutPlan.fitnessLevel}</p>
              </div>
              <div>
                <p className="text-slate-400">Frequency</p>
                <p className="text-white font-semibold">{workoutPlan.frequency} days/week</p>
              </div>
              <div>
                <p className="text-slate-400">Duration Per Session</p>
                <p className="text-white font-semibold">{workoutPlan.durationPerSession}</p>
              </div>
            </div>
          </div>

          {/* Warm-up & Cool-down */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-neon-cyan mb-4">Warm-up & Cool-down</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-300 text-sm mb-2">Warm-up ({workoutPlan.warmUpCooldown.warmUp.duration})</h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  {workoutPlan.warmUpCooldown.warmUp.exercises.map((ex, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-neon-green">→</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-300 text-sm mb-2">Cool-down ({workoutPlan.warmUpCooldown.coolDown.duration})</h4>
                <ul className="space-y-1 text-xs text-slate-400">
                  {workoutPlan.warmUpCooldown.coolDown.exercises.map((ex, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-neon-green">→</span> {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Medical Considerations */}
          {workoutPlan.medicalConsiderations && workoutPlan.medicalConsiderations.length > 0 && (
            <div className="md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-neon-fuchsia mb-4 flex items-center gap-2">
                <AlertCircle size={20} /> Medical Considerations
              </h3>
              <ul className="space-y-2 text-sm text-slate-300">
                {workoutPlan.medicalConsiderations.map((note: string, idx: number) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-neon-yellow">⚠️</span> {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          {Object.entries(workoutPlan.weeklySchedule).map(([day, dayPlan]: [string, any]) => (
            <div key={day} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center">
                  <span className="text-black font-bold text-sm text-center">{day.slice(0, 3)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{dayPlan.name}</h3>
                  <p className="text-xs text-slate-400">{dayPlan.duration}</p>
                </div>
              </div>
              <div className="space-y-3">
                {dayPlan.exercises.map((ex: any, idx: number) => (
                  <div key={idx} className="ml-4 pl-4 border-l border-neon-green/30">
                    <p className="font-semibold text-slate-200">{ex.name}</p>
                    <p className="text-xs text-slate-400">
                      {ex.sets && `${ex.sets} sets`} {ex.reps && `× ${ex.reps} reps`} {ex.duration && ex.duration}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400 italic">{dayPlan.notes}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tips Tab */}
      {activeTab === 'tips' && (
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
          <h3 className="text-lg font-bold text-neon-cyan mb-4">Recovery & Lifestyle Tips</h3>
          <ul className="space-y-3">
            {workoutPlan.recoveryTips.map((tip: string, idx: number) => (
              <li key={idx} className="flex gap-3 text-slate-300">
                <span className="text-neon-green flex-shrink-0">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Progression Tab */}
      {activeTab === 'progression' && (
        <div className="space-y-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-bold text-neon-cyan mb-4 flex items-center gap-2">
              <TrendingUp size={20} /> Progression Strategy
            </h3>
            <div className="space-y-4">
              {Object.entries(workoutPlan.progressionStrategy).map(([key, value]: [string, any]) => {
                if (key === 'tips') {
                  return (
                    <div key={key}>
                      <h4 className="font-semibold text-slate-300 mb-2">Key Tips</h4>
                      <ul className="space-y-2">
                        {(value as string[]).map((tip: string, idx: number) => (
                          <li key={idx} className="flex gap-2 text-sm text-slate-300">
                            <span className="text-neon-fuchsia">→</span> {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <div key={key}>
                    <h4 className="font-semibold text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                    <p className="text-sm text-slate-400">{value}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPlan;
