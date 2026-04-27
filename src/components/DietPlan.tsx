import React, { useState, useEffect } from 'react';
import { ChefHat, AlertCircle, CheckCircle, Zap, Lightbulb, Download } from 'lucide-react';
import { triggerRipple } from '../utils/ripple';
import { generateDietPlanPDF } from '../utils/reportGenerator';
import { calculateTDEE } from '../utils/calculations';

interface DietPlanProps {
  userProfile: any;
}

const DietPlan: React.FC<DietPlanProps> = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'guidelines'>('overview');
  const [backendHealthy, setBackendHealthy] = useState<boolean | null>(null);
  const [checkingBackend, setCheckingBackend] = useState(false);

  // Check backend health on component mount
  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    setCheckingBackend(true);
    try {
      const response = await fetch('http://localhost:5000/api/health', {
        method: 'GET',
      });
      setBackendHealthy(response.ok);
      if (!response.ok) {
        console.error('Backend health check failed:', response.statusText);
      }
    } catch (err) {
      console.error('Cannot reach backend:', err);
      setBackendHealthy(false);
    }
    setCheckingBackend(false);
  };

  const generateDietPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      // Prepare user profile data with required fields
      const requestData = {
        height: userProfile.height || 170,
        weight: userProfile.weight || 70,
        age: userProfile.age || 25,
        gender: userProfile.gender || 'male',
        activityLevel: userProfile.activityLevel || 'moderate',
        goal: userProfile.goal || 'maintenance',
        medicalConditions: userProfile.medicalConditions || [],
        dietaryRestrictions: userProfile.dietaryRestrictions || [],
        targetCalories: userProfile.targetCalories || calculateTDEE(userProfile) + (userProfile.goal === 'bulking' ? 300 : userProfile.goal === 'cutting' ? -400 : 0),
      };

      console.log('Sending diet plan request:', requestData);

      const response = await fetch('http://localhost:5000/api/diet-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to generate diet plan`);
      }

      const data = await response.json();
      setDietPlan(data.data);

      // Get recommendations
      const recResponse = await fetch('http://localhost:5000/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (recResponse.ok) {
        await recResponse.json();
        // Recommendations feature coming soon
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      console.error('Diet plan error:', errorMsg);
      setError(errorMsg);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Success message toast */}
      {successMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-medium animate-fade-up">
          {successMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ChefHat size={32} className="text-neon-fuchsia" />
            <div>
              <h2 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">AI Diet Planner</h2>
              <p className="text-slate-600 dark:text-slate-400">Personalized meal plans powered by AI</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {dietPlan && (
              <button
                onClick={async (e) => { 
                  triggerRipple(e); 
                  setIsGeneratingPDF(true);
                  // Allow React to render the loading state before synchronous PDF generation blocks the thread
                  await new Promise(resolve => setTimeout(resolve, 50));
                  try {
                    generateDietPlanPDF(dietPlan);
                    setSuccessMessage("Download started.");
                    setTimeout(() => setSuccessMessage(null), 3000);
                  } catch (err) {
                    console.error("Failed to generate PDF", err);
                  } finally {
                    setIsGeneratingPDF(false);
                  }
                }}
                disabled={isGeneratingPDF}
                className="disabled:opacity-50 relative overflow-hidden bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-display font-medium px-4 py-3 rounded-xl shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Download size={18} /> {isGeneratingPDF ? 'Preparing your PDF...' : 'Download Info'}
              </button>
            )}
            <button
              onClick={(e) => { triggerRipple(e); generateDietPlan(); }}
              disabled={loading || backendHealthy === false}
              title={backendHealthy === false ? "Backend is not running. Please start it with: python backend/app.py" : ""}
              className="disabled:opacity-50 relative overflow-hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-display font-medium px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 active:scale-95"
            >
              {loading ? 'Generating...' : 'Generate Plan'}
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/50 rounded-lg p-4">
          <p className="text-red-300 font-semibold mb-2">❌ Error: {error}</p>
          <p className="text-red-300 text-sm mb-3">Troubleshooting tips:</p>
          <ul className="text-red-300 text-sm space-y-1 ml-4">
            <li>1. Ensure backend is running: <code className="bg-black/30 px-1 py-0.5 rounded text-xs">python backend/app.py</code></li>
            <li>2. Check that backend is on port 5000: http://localhost:5000/api/health</li>
            <li>3. Open browser console (F12) to see detailed error logs</li>
            <li>4. Verify all user profile fields are filled during onboarding</li>
          </ul>
        </div>
      )}

      {/* Backend connection note */}
      {backendHealthy === null ? (
        <div className="backdrop-blur-xl bg-slate-500/10 border border-slate-500/50 rounded-lg p-4 text-slate-300 text-sm">
          🔄 Checking backend connection...
        </div>
      ) : backendHealthy ? (
        <div className="backdrop-blur-xl bg-green-500/10 border border-green-500/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-300 text-sm">
            <CheckCircle size={20} />
            <span><strong>✅ Backend is connected!</strong> You can now generate diet plans.</span>
          </div>
        </div>
      ) : (
        <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-yellow-300 mt-0.5 flex-shrink-0" />
            <div className="text-yellow-300 text-sm">
              <p className="font-semibold mb-2">⚠️ Backend is NOT running</p>
              <p className="mb-2">Start the backend in a new terminal:</p>
              <code className="block bg-black/40 px-3 py-2 rounded mb-2 text-xs font-mono">cd backend && python app.py</code>
              <button
                onClick={() => {
                  checkBackendHealth();
                  setTimeout(() => checkBackendHealth(), 3000);
                }}
                disabled={checkingBackend}
                className="text-xs bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded transition-all disabled:opacity-50"
              >
                {checkingBackend ? 'Checking...' : '🔄 Check Again'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-slate-200/50 dark:bg-slate-800/30 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl h-64 animate-pulse">
              <div className="p-6 space-y-4">
                <div className="h-6 bg-slate-300 dark:bg-slate-700/50 rounded w-1/3"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700/50 rounded w-1/2"></div>
                <div className="space-y-2 pt-4">
                  <div className="h-3 bg-slate-300 dark:bg-slate-700/50 rounded w-full"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700/50 rounded w-5/6"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-700/50 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Diet Plan Content */}
      {dietPlan && !loading && (
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-700">
            {(['overview', 'daily', 'guidelines'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition-colors duration-200 ${activeTab === tab
                  ? 'text-neon-fuchsia border-b-2 border-neon-fuchsia'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && dietPlan.summary && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan Summary */}
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <h3 className="text-xl font-display font-bold tracking-tight text-neon-green mb-4 flex items-center gap-2">
                  <Zap size={20} /> Targets
                </h3>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-lg flex items-center justify-between border border-slate-200 dark:border-slate-800">
                    <span className="font-semibold text-lg">🔥 Total Calories</span>
                    <span className="text-2xl font-display font-bold tracking-tight text-neon-fuchsia">{dietPlan.summary.totalCalories}</span>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold flex items-center gap-2">🥩 Protein ({dietPlan.summary.protein.percentage}%)</span>
                      <span className="font-bold">{dietPlan.summary.protein.grams}g</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${dietPlan.summary.protein.percentage}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold flex items-center gap-2">🍚 Carbs ({dietPlan.summary.carbs.percentage}%)</span>
                      <span className="font-bold">{dietPlan.summary.carbs.grams}g</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${dietPlan.summary.carbs.percentage}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold flex items-center gap-2">🥑 Fats ({dietPlan.summary.fats.percentage}%)</span>
                      <span className="font-bold">{dietPlan.summary.fats.grams}g</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: `${dietPlan.summary.fats.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy */}
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <h3 className="text-xl font-display font-bold tracking-tight text-neon-cyan mb-4 flex items-center gap-2">
                  <Lightbulb size={20} /> Strategy
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {dietPlan.summary.explanation}
                </p>

                <h4 className="font-bold text-slate-800 dark:text-slate-200 mt-6 mb-2 flex items-center gap-2">
                  💧 Hydration
                </h4>
                <p className="text-slate-700 dark:text-slate-300 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                  {dietPlan.waterIntake}
                </p>
              </div>
            </div>
          )}

          {/* Daily Meals Tab */}
          {activeTab === 'daily' && dietPlan.meals && (
            <div className="space-y-4">
              {['breakfast', 'mid_morning_snack', 'lunch', 'evening_snack', 'dinner'].map((mealTime) => (
                <div key={mealTime} className="bg-white dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                  <h3 className="text-xl font-display font-bold tracking-tight text-neon-cyan mb-4 capitalize flex items-center gap-2">
                    {mealTime.replace(/_/g, ' ')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dietPlan.meals[mealTime].map((option: any, idx: number) => (
                      <div key={idx} className="animate-fade-up opacity-0" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}>
                        <div className="bg-white/60 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none relative overflow-hidden group hover:border-neon-fuchsia/50 transition-all h-full">
                          <div className="absolute top-0 right-0 bg-neon-fuchsia/10 text-neon-fuchsia text-xs font-bold px-2 py-1 rounded-bl-lg">
                            Option {idx + 1}
                          </div>

                          <h4 className="font-semibold text-slate-900 dark:text-white mb-1 pr-16">{option.name}</h4>
                          <span className="inline-block text-neon-green font-bold text-sm mb-3">{option.calories} kcal</span>

                          <div className="grid grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                            <div className="text-center"><span className="block text-slate-800 dark:text-slate-200 font-bold">{option.protein}g</span>Protein</div>
                            <div className="text-center border-x border-slate-200 dark:border-slate-700"><span className="block text-slate-800 dark:text-slate-200 font-bold">{option.carbs}g</span>Carbs</div>
                            <div className="text-center"><span className="block text-slate-800 dark:text-slate-200 font-bold">{option.fats}g</span>Fats</div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ingredients:</p>
                            {option.items.map((item: string, i: number) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <span className="text-neon-cyan mt-1">•</span>{item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guidelines Tab */}
          {activeTab === 'guidelines' && dietPlan.tips && (
            <div className="backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-sm dark:shadow-none">
              <h3 className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-neon-green" /> Success Guidelines
              </h3>

              <div className="space-y-4">
                {dietPlan.tips.map((tip: string, idx: number) => {
                  const [title, details] = tip.split(': ');
                  return (
                    <div key={idx} className="bg-white/60 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <h4 className="font-bold text-neon-fuchsia mb-1">{title}</h4>
                      <p className="text-slate-700 dark:text-slate-300">{details || tip}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DietPlan;
