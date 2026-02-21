import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
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
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    index <= currentStep
                      ? 'bg-neon-fuchsia text-white shadow-lg shadow-neon-fuchsia/50'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 bg-gradient-to-r ${
                      index < currentStep
                        ? 'from-neon-fuchsia to-neon-cyan'
                        : 'from-slate-700 to-slate-700'
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-slate-400">{steps[currentStep].subtitle}</p>
        </div>

        {/* Form card with glassmorphism */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
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
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:border-neon-cyan hover:text-neon-cyan transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-fuchsia to-neon-purple hover:shadow-lg hover:shadow-neon-fuchsia/50 text-white font-semibold transition-all hover:scale-105"
            >
              {currentStep === steps.length - 1 ? 'Start' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Progress text */}
        <div className="text-center mt-6 text-slate-400">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
