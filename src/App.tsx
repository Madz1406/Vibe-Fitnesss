import { useState, useEffect } from 'react';
import { UserProfile } from './types';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import Auth from './components/Auth';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import { supabase, getUserProfile, saveUserProfile } from './services/supabase';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    checkUser();

    // Listen to Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        loadProfile();
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    if (session) {
      await loadProfile();
    } else {
      setLoading(false);
    }
  };

  const loadProfile = async () => {
    setLoading(true);
    try {
      const profile = await getUserProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Failed to load user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (profile: UserProfile) => {
    setLoading(true);
    try {
      await saveUserProfile(profile);
      setUserProfile(profile);
      // Optional: keep local storage copy for immediate fallback
      localStorage.setItem('vibeFitnessProfile', JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to save profile. Make sure you are authenticated.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vibeFitnessProfile');
    localStorage.removeItem('vibeFitnessState');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-neon-fuchsia rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neon-fuchsia font-semibold">Loading Vibe Fitness...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-body text-slate-900 dark:text-slate-100">
      <div aria-hidden="true" className="pointer-events-none fixed -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full animate-blob-drift z-0" style={{ background: 'radial-gradient(circle, rgba(255,45,155,0.08) 0%, transparent 70%)' }} />
      <div aria-hidden="true" className="pointer-events-none fixed -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full animate-blob-drift-r z-0" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />
      <div className="noise-overlay z-0" aria-hidden="true" />

      {/* Old Header removed - Moved to Dashboard / TopNavbar */}
      {/* When not authenticated, standard theme toggle float */}
      {!isAuthenticated && (
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6 pb-20">
        <AnimatePresence mode="wait">
          {!isAuthenticated && !showAuth ? (
            <motion.div key="landing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
              <LandingPage onStart={() => setShowAuth(true)} />
            </motion.div>
          ) : !isAuthenticated && showAuth ? (
            <motion.div key="auth" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <Auth onAuthSuccess={loadProfile} />
            </motion.div>
          ) : userProfile ? (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="w-full">
              <Routes>
                <Route path="/" element={<Dashboard profile={userProfile} onLogout={handleLogout} />} />
                <Route path="/profile" element={<Profile profile={userProfile} onUpdateProfile={handleOnboardingComplete} onLogout={handleLogout} />} />
              </Routes>
            </motion.div>
          ) : (
            <motion.div key="onboarding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <OnboardingForm onComplete={handleOnboardingComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
