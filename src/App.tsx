import React, { useState, useEffect } from 'react';
import { UserProfile } from './types';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('vibeFitnessProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
    setLoading(false);
  }, []);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    localStorage.setItem('vibeFitnessProfile', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUserProfile(null);
    localStorage.removeItem('vibeFitnessProfile');
    localStorage.removeItem('vibeFitnessState');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-700 border-t-neon-fuchsia rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neon-fuchsia font-semibold">Loading Vibe Fitness...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {userProfile ? (
        <Dashboard profile={userProfile} onLogout={handleLogout} />
      ) : (
        <OnboardingForm onComplete={handleOnboardingComplete} />
      )}
    </>
  );
}

export default App;
