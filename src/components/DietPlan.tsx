import React, { useState, useEffect } from 'react';
import { ChefHat, Download, ShoppingCart, Lightbulb, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface DietPlanProps {
  userProfile: any;
}

const DietPlan: React.FC<DietPlanProps> = ({ userProfile }) => {
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'daily' | 'shopping'>('overview');
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
        targetCalories: 2000, // Replace with actual TDEE from calculations
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
        const recData = await recResponse.json();
        setRecommendations(recData.data);
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
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ChefHat size={32} className="text-neon-fuchsia" />
            <div>
              <h2 className="text-2xl font-bold text-white">AI Diet Planner</h2>
              <p className="text-slate-400">Personalized meal plans powered by AI</p>
            </div>
          </div>
          <button
            onClick={generateDietPlan}
            disabled={loading || backendHealthy === false}
            title={backendHealthy === false ? "Backend is not running. Please start it with: python backend/app.py" : ""}
            className="px-6 py-3 bg-gradient-to-r from-neon-fuchsia to-neon-purple hover:shadow-lg hover:shadow-neon-fuchsia/50 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate Plan'}
          </button>
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

      {/* Diet Plan Content */}
      {dietPlan && (
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-700">
            {(['overview', 'daily', 'shopping'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-semibold transition-all ${
                  activeTab === tab
                    ? 'text-neon-fuchsia border-b-2 border-neon-fuchsia'
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
              {/* Medical Considerations */}
              {dietPlan.medicalConsiderations && dietPlan.medicalConsiderations.length > 0 && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-neon-cyan mb-4">Medical Considerations</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {dietPlan.medicalConsiderations.map((note: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-neon-yellow">→</span> {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Plan Summary */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
                <h3 className="text-lg font-bold text-neon-green mb-4">Plan Summary</h3>
                <div className="space-y-2 text-sm">
                  <p>📅 <strong>Duration:</strong> {dietPlan.duration}</p>
                  <p>🔥 <strong>Daily Calories:</strong> {dietPlan.targetCalories}</p>
                  <p>🎯 <strong>Goal:</strong> {dietPlan.goal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Daily Meals Tab */}
          {activeTab === 'daily' && (
            <div className="space-y-4">
              {Object.entries(dietPlan.days).map(([dayKey, dayData]: [string, any]) => (
                <div key={dayKey} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-neon-cyan mb-3">{dayData.date}</h3>
                  <div className="space-y-3">
                    {dayData.meals.map((meal: any, idx: number) => (
                      <div key={idx} className="bg-slate-900/50 rounded p-3 border border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-white capitalize">{meal.type}: {meal.name}</h4>
                          <span className="text-neon-green text-sm">{meal.calories} kcal</span>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">⏱️ {meal.time}</p>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {meal.ingredients.map((ing: string, i: number) => (
                            <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                              {ing}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                          <div>🥩 Protein: {meal.protein}g</div>
                          <div>🍚 Carbs: {meal.carbs}g</div>
                          <div>🥑 Fats: {meal.fats}g</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center">
                    <span className="text-neon-green font-bold">Daily Total: {dayData.totalCalories} kcal</span>
                    <div className="flex gap-4 text-xs text-slate-300">
                      <span>{dayData.macros.protein}g Protein</span>
                      <span>{dayData.macros.carbs}g Carbs</span>
                      <span>{dayData.macros.fats}g Fats</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shopping List Tab */}
          {activeTab === 'shopping' && (
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart size={24} className="text-neon-cyan" />
                <h3 className="text-xl font-bold text-white">Shopping List</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dietPlan.shoppingList.map((item: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-900/50 p-2 rounded">
                    <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full px-4 py-2 bg-neon-green text-slate-900 font-semibold rounded-lg hover:bg-neon-green/90 transition-all flex items-center justify-center gap-2">
                <Download size={18} /> Download List
              </button>
            </div>
          )}


        </div>
      )}
    </div>
  );
};

export default DietPlan;
