export interface UserProfile {
  name: string;
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
  email?: string;
  dietPreference?: string;
  foodDislikes?: string[];
  foodAllergies?: string[];
  targetCalories?: number;
  targetProtein?: number;
  workoutDaysPerWeek?: number;
}

export interface WeightEntry {
  date: string;
  weight: number;
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
  weightHistory: WeightEntry[];
  streak_days: number;
  last_active_date: string;
}

export interface DietPlan {
  dailyCalories: number;
  meals: Array<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    foods: Array<{
      name: string;
      amount: string;
      calories: number;
    }>;
  }>;
}

export interface WorkoutPlan {
  level: string;
  intensity: string;
  days: Array<{
    dayName: string;
    type: string;
    focus?: string;
    exercises?: Array<{
      name: string;
      sets: number | string;
      reps: string;
      rest: string;
    }>;
  }>;
}
