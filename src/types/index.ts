export interface UserProfile {
  height: number; // cm
  weight: number; // kg
  age: number;
  gender: 'male' | 'female';
  bodyFatPercentage: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goal: 'bulking' | 'cutting' | 'maintenance';
  dietaryRestrictions: string[];
  medicalConditions: string[];
  fitnessExperience?: 'beginner' | 'intermediate' | 'advanced';
}

export interface MacroBreakdown {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface DailyTask {
  id: string;
  title: string;
  goal: number;
  current: number;
  unit: string;
  completed: boolean;
  icon: string;
  emoji: string;
}

export interface UserState {
  profile: UserProfile | null;
  macros: MacroBreakdown | null;
  dailyTasks: DailyTask[];
  currentStep: number;
  currentLevel: number;
  totalPoints: number;
}
