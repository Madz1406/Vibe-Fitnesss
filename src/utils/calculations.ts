import { UserProfile, MacroBreakdown } from '../types';

// Activity level multipliers
const ACTIVITY_MULTIPLIERS: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// Goal-based caloric adjustments
const GOAL_CALORIC_ADJUSTMENTS: Record<string, number> = {
  bulking: 300, // +300 calories
  cutting: -400, // -400 calories
  maintenance: 0,
};

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor equation
 */
export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, gender } = profile;

  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const activityMultiplier = ACTIVITY_MULTIPLIERS[profile.activityLevel] || 1.55;
  const tdee = bmr * activityMultiplier;
  return Math.round(tdee);
}

/**
 * Calculate personalized macro breakdown based on goal and medical conditions
 */
export function calculateMacros(profile: UserProfile): MacroBreakdown {
  const tdee = calculateTDEE(profile);
  const goalAdjustment = GOAL_CALORIC_ADJUSTMENTS[profile.goal] || 0;
  const targetCalories = tdee + goalAdjustment;

  // Base macro ratios
  let proteinRatio = 0.3; // 30% of calories
  let carbRatio = 0.45; // 45% of calories
  let fatRatio = 0.25; // 25% of calories

  // Adjust for medical conditions
  if (profile.medicalConditions.includes('Diabetes')) {
    carbRatio = 0.35; // Reduce carbs for diabetes
    proteinRatio = 0.35;
    fatRatio = 0.3;
  }

  if (profile.medicalConditions.includes('Hypertension')) {
    // Balanced approach for hypertension
    proteinRatio = 0.35;
    carbRatio = 0.4;
    fatRatio = 0.25;
  }

  // Adjust for dietary restrictions
  if (profile.dietaryRestrictions.includes('Vegan')) {
    // Ensure adequate plant-based protein
    proteinRatio = 0.35;
    carbRatio = 0.45;
    fatRatio = 0.2;
  }

  if (profile.dietaryRestrictions.includes('Keto')) {
    proteinRatio = 0.25;
    carbRatio = 0.05;
    fatRatio = 0.7;
  }

  // Calculate macros in grams (protein & carbs = 4 cal/g, fat = 9 cal/g)
  const proteinCalories = targetCalories * proteinRatio;
  const carbCalories = targetCalories * carbRatio;
  const fatCalories = targetCalories * fatRatio;

  return {
    calories: Math.round(targetCalories),
    protein: Math.round(proteinCalories / 4),
    carbs: Math.round(carbCalories / 4),
    fats: Math.round(fatCalories / 9),
  };
}

/**
 * Calculate user level based on points
 */
export function calculateLevel(totalPoints: number): number {
  return Math.floor(totalPoints / 100) + 1;
}

/**
 * Get points needed for next level
 */
export function getPointsForNextLevel(totalPoints: number): number {
  const currentLevel = calculateLevel(totalPoints);
  return currentLevel * 100 - totalPoints;
}
