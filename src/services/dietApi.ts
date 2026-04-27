import { UserProfile } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

interface DietPlanRequest {
  height: number;
  weight: number;
  age: number;
  gender: string;
  bodyFatPercentage: number;
  activityLevel: string;
  goal: string;
  medicalConditions: string[];
  dietaryRestrictions: string[];
  targetCalories: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export const dietApi = {
  // Generate a personalized diet plan
  async generateDietPlan(
    userProfile: UserProfile,
    targetCalories: number
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/diet-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: userProfile.height,
          weight: userProfile.weight,
          age: userProfile.age,
          gender: userProfile.gender,
          bodyFatPercentage: userProfile.bodyFatPercentage || 0,
          activityLevel: userProfile.activityLevel,
          goal: userProfile.goal,
          medicalConditions: userProfile.medicalConditions || [],
          dietaryRestrictions: userProfile.dietaryRestrictions || [],
          targetCalories,
        } as DietPlanRequest),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate diet plan: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  },

  // Get AI personalized recommendations
  async getRecommendations(userProfile: UserProfile): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: userProfile.height,
          weight: userProfile.weight,
          age: userProfile.age,
          gender: userProfile.gender,
          activityLevel: userProfile.activityLevel,
          goal: userProfile.goal,
          medicalConditions: userProfile.medicalConditions || [],
          dietaryRestrictions: userProfile.dietaryRestrictions || [],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to get recommendations: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },

  // Search meals by type and dietary restrictions
  async searchMeals(
    mealType: string,
    dietaryRestrictions?: string[]
  ): Promise<ApiResponse<any>> {
    try {
      const params = new URLSearchParams({
        type: mealType,
        ...(dietaryRestrictions && { restrictions: dietaryRestrictions.join(',') }),
      });

      const response = await fetch(`${API_BASE_URL}/meal-search?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search meals: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching meals:', error);
      throw error;
    }
  },

  // Calculate nutrition for multiple meals
  async calculateNutrition(meals: any[]): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/calculate-nutrition`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meals }),
      });

      if (!response.ok) {
        throw new Error(`Failed to calculate nutrition: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error calculating nutrition:', error);
      throw error;
    }
  },

  // Generate shopping list
  async generateShoppingList(mealPlan: any): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/shopping-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mealPlan }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate shopping list: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating shopping list:', error);
      throw error;
    }
  },

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },
};
