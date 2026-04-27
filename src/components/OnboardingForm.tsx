import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { triggerRipple } from '../utils/ripple';
import { UserProfile } from '../types';
import StepPhysicalMetrics from './onboarding/StepPhysicalMetrics';
import StepHealthConstraints from './onboarding/StepHealthConstraints';
import StepPreferences from './onboarding/StepPreferences';
import StepGoal from './onboarding/StepGoal';
import StepFitnessExperience from './onboarding/StepFitnessExperience';

interface OnboardingFormProps {
  onComplete: (profile: UserProfile) => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    dietaryRestrictions: [],
    medicalConditions: [],
  });

  const steps = [
    { title: 'Physical Metrics', subtitle: 'Tell us about your body' },
    { title: 'Health Constraints', subtitle: 'Important medical information' },
    { title: 'Preferences', subtitle: 'Dietary and lifestyle choices' },
    { title: 'Goal & Activity', subtitle: 'Your fitness objectives' },
    { title: 'Fitness Experience', subtitle: 'Your training background' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      console.log('Profile:', profile);
      console.log('Complete:', isProfileComplete(profile));
      if (isProfileComplete(profile)) {
        onComplete(profile as UserProfile);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isProfileComplete = (p: Partial<UserProfile>): boolean => {
    return !!(
      p.name &&
      p.name.trim().length > 0 &&
      p.height &&
      p.weight &&
      p.age &&
      p.gender &&
      p.bodyFatPercentage !== undefined &&
      p.activityLevel &&
      p.goal &&
      p.fitnessExperience
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Animated background blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-fuchsia rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-glow"></div>

      <div className="relative w-full max-w-2xl">
        {/* Step indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${index <= currentStep
                    ? 'bg-neon-fuchsia text-white shadow-lg shadow-neon-fuchsia/50'
                    : 'bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-none'
                    }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 bg-gradient-to-r ${index < currentStep
                      ? 'from-neon-fuchsia to-neon-cyan'
                      : 'from-slate-200 dark:from-slate-700 to-slate-200 dark:to-slate-700'
                      }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{steps[currentStep].subtitle}</p>
        </div>

        <div className="backdrop-blur-xl bg-white/40 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-2xl p-8 shadow-2xl bg-brand-card-bg backdrop-blur-2xl border-brand-card-border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 dark:bg-white/[0.04] dark:border-white/[0.08]">
          {currentStep === 0 && (
            <StepPhysicalMetrics
              profile={profile}
              onUpdate={(data) => setProfile({ ...profile, ...data })}
            />
          )}
          {currentStep === 1 && (
            <StepHealthConstraints
              profile={profile}
              onUpdate={(data) => setProfile({ ...profile, ...data })}
            />
          )}
          {currentStep === 2 && (
            <StepPreferences
              profile={profile}
              onUpdate={(data) => setProfile({ ...profile, ...data })}
            />
          )}
          {currentStep === 3 && (
            <StepGoal
              profile={profile}
              onUpdate={(data) => setProfile({ ...profile, ...data })}
            />
          )}
          {currentStep === 4 && (
            <StepFitnessExperience
              profile={profile}
              onUpdate={(data) => setProfile({ ...profile, ...data })}
            />
          )}

          {/* Navigation buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-neon-cyan hover:text-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white/50 dark:bg-transparent"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button
              onClick={(e) => { triggerRipple(e); handleNext(); }}
              className="flex-1 flex items-center justify-center gap-2 relative overflow-hidden bg-gradient-brand text-white font-display font-semibold px-6 py-3 rounded-xl shadow-glow-pink hover:shadow-btn-hover hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {currentStep === steps.length - 1 ? 'Start' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Progress text */}
        <div className="text-center mt-6 text-slate-600 dark:text-slate-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
