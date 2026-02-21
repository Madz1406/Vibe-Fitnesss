"""
AI-Powered Personalized Diet Plan Generator
Generates meal plans based on user profile, medical conditions, and dietary preferences
"""

import json
from typing import Dict, List, Any
from datetime import datetime, timedelta

class DietAIGenerator:
    """Generates AI-powered personalized diet plans"""
    
    def __init__(self):
        self.meal_database = self._initialize_meal_database()
        self.dietary_swaps = self._initialize_dietary_swaps()
    
    def _initialize_meal_database(self) -> Dict[str, List[Dict[str, Any]]]:
        """Initialize a comprehensive meal database"""
        return {
            "breakfast": [
                {
                    "name": "Oatmeal with Berries",
                    "calories": 350,
                    "protein": 12,
                    "carbs": 55,
                    "fats": 8,
                    "ingredients": ["oats", "berries", "milk", "honey"],
                    "suitableFor": ["vegan_friendly", "gluten_free_alt"],
                    "time": "15 mins"
                },
                {
                    "name": "Scrambled Eggs with Whole Wheat Toast",
                    "calories": 380,
                    "protein": 18,
                    "carbs": 42,
                    "fats": 14,
                    "ingredients": ["eggs", "whole wheat bread", "butter", "spinach"],
                    "suitableFor": ["keto_friendly"],
                    "time": "10 mins"
                },
                {
                    "name": "Greek Yogurt Parfait",
                    "calories": 320,
                    "protein": 20,
                    "carbs": 45,
                    "fats": 6,
                    "ingredients": ["greek yogurt", "granola", "berries", "honey"],
                    "suitableFor": ["high_protein"],
                    "time": "5 mins"
                },
                {
                    "name": "Smoothie Bowl",
                    "calories": 340,
                    "protein": 15,
                    "carbs": 58,
                    "fats": 5,
                    "ingredients": ["banana", "berries", "protein powder", "almond milk"],
                    "suitableFor": ["vegan_friendly", "high_protein"],
                    "time": "8 mins"
                },
                {
                    "name": "Avocado Toast",
                    "calories": 380,
                    "protein": 14,
                    "carbs": 45,
                    "fats": 16,
                    "ingredients": ["whole grain bread", "avocado", "egg", "tomato"],
                    "suitableFor": ["vegan_friendly"],
                    "time": "10 mins"
                },
            ],
            "lunch": [
                {
                    "name": "Grilled Chicken Salad",
                    "calories": 450,
                    "protein": 42,
                    "carbs": 25,
                    "fats": 18,
                    "ingredients": ["chicken breast", "mixed greens", "olive oil", "vegetables"],
                    "suitableFor": ["keto_friendly", "high_protein"],
                    "time": "25 mins"
                },
                {
                    "name": "Quinoa Buddha Bowl",
                    "calories": 420,
                    "protein": 16,
                    "carbs": 52,
                    "fats": 14,
                    "ingredients": ["quinoa", "chickpeas", "vegetables", "tahini"],
                    "suitableFor": ["vegan_friendly", "balanced"],
                    "time": "25 mins"
                },
                {
                    "name": "Salmon with Brown Rice",
                    "calories": 480,
                    "protein": 38,
                    "carbs": 48,
                    "fats": 14,
                    "ingredients": ["salmon fillet", "brown rice", "broccoli", "olive oil"],
                    "suitableFor": ["high_protein", "omega3"],
                    "time": "30 mins"
                },
                {
                    "name": "Vegan Lentil Curry",
                    "calories": 410,
                    "protein": 18,
                    "carbs": 55,
                    "fats": 10,
                    "ingredients": ["red lentils", "coconut milk", "spices", "rice"],
                    "suitableFor": ["vegan_friendly", "diabetes_friendly"],
                    "time": "35 mins"
                },
                {
                    "name": "Turkey Sandwich",
                    "calories": 380,
                    "protein": 28,
                    "carbs": 38,
                    "fats": 12,
                    "ingredients": ["turkey", "whole wheat bread", "vegetables", "mustard"],
                    "suitableFor": ["balanced", "gluten_free_alt"],
                    "time": "10 mins"
                },
            ],
            "dinner": [
                {
                    "name": "Grilled Fish with Vegetables",
                    "calories": 420,
                    "protein": 40,
                    "carbs": 30,
                    "fats": 14,
                    "ingredients": ["white fish", "asparagus", "olive oil", "lemon"],
                    "suitableFor": ["keto_friendly", "heart_healthy"],
                    "time": "25 mins"
                },
                {
                    "name": "Plant-Based Protein Bowl",
                    "calories": 400,
                    "protein": 22,
                    "carbs": 48,
                    "fats": 12,
                    "ingredients": ["tempeh", "sweet potato", "kale", "tahini"],
                    "suitableFor": ["vegan_friendly", "high_protein"],
                    "time": "30 mins"
                },
                {
                    "name": "Lean Beef Stir-Fry",
                    "calories": 440,
                    "protein": 36,
                    "carbs": 42,
                    "fats": 14,
                    "ingredients": ["lean beef", "mixed vegetables", "brown rice", "soy sauce"],
                    "suitableFor": ["balanced", "high_protein"],
                    "time": "25 mins"
                },
                {
                    "name": "Stuffed Bell Pepper",
                    "calories": 380,
                    "protein": 24,
                    "carbs": 38,
                    "fats": 12,
                    "ingredients": ["bell pepper", "ground turkey", "quinoa", "cheese"],
                    "suitableFor": ["balanced", "diabetes_friendly"],
                    "time": "35 mins"
                },
                {
                    "name": "Chickpea Pasta Primavera",
                    "calories": 420,
                    "protein": 16,
                    "carbs": 55,
                    "fats": 12,
                    "ingredients": ["whole wheat pasta", "chickpeas", "seasonal vegetables", "olive oil"],
                    "suitableFor": ["vegan_friendly", "high_fiber"],
                    "time": "20 mins"
                },
            ],
            "snacks": [
                {
                    "name": "Protein Bar",
                    "calories": 200,
                    "protein": 20,
                    "carbs": 20,
                    "fats": 6,
                    "ingredients": ["whey protein", "oats", "nuts"],
                    "suitableFor": ["high_protein", "convenient"],
                    "time": "0 mins"
                },
                {
                    "name": "Greek Yogurt with Nuts",
                    "calories": 180,
                    "protein": 15,
                    "carbs": 12,
                    "fats": 8,
                    "ingredients": ["greek yogurt", "almonds", "honey"],
                    "suitableFor": ["high_protein", "quick"],
                    "time": "2 mins"
                },
                {
                    "name": "Apple with Almond Butter",
                    "calories": 200,
                    "protein": 8,
                    "carbs": 25,
                    "fats": 9,
                    "ingredients": ["apple", "almond butter"],
                    "suitableFor": ["vegan_friendly", "portable"],
                    "time": "2 mins"
                },
                {
                    "name": "Mixed Nuts Trail Mix",
                    "calories": 220,
                    "protein": 7,
                    "carbs": 20,
                    "fats": 14,
                    "ingredients": ["almonds", "cashews", "dried berries", "dark chocolate"],
                    "suitableFor": ["keto_friendly", "portable"],
                    "time": "0 mins"
                },
            ]
        }
    
    def _initialize_dietary_swaps(self) -> Dict[str, str]:
        """Initialize dietary substitutions"""
        return {
            "milk": "almond milk",
            "chicken": "tofu",
            "bread": "gluten-free bread",
            "pasta": "chickpea pasta",
            "rice": "cauliflower rice",
            "butter": "coconut oil",
            "eggs": "flax eggs",
            "cheese": "nutritional yeast",
        }
    
    def generate_meal_plan(self, user_profile: Dict[str, Any], days: int = 7) -> Dict[str, Any]:
        """Generate a personalized 7-day meal plan"""
        
        goal = user_profile.get("goal", "maintenance")
        medical_conditions = user_profile.get("medicalConditions", [])
        dietary_restrictions = user_profile.get("dietaryRestrictions", [])
        target_calories = user_profile.get("targetCalories", 2000)
        
        meal_plan = {
            "generatedAt": datetime.now().isoformat(),
            "duration": f"{days} days",
            "targetCalories": target_calories,
            "goal": goal,
            "medicalConsiderations": self._get_medical_notes(medical_conditions),
            "dietaryNotes": dietary_restrictions,
            "days": {}
        }
        
        # Generate meals for each day
        for day in range(days):
            day_date = (datetime.now() + timedelta(days=day)).strftime("%A, %B %d")
            day_meals = self._generate_daily_meals(
                target_calories,
                goal,
                medical_conditions,
                dietary_restrictions
            )
            meal_plan["days"][f"day_{day + 1}"] = {
                "date": day_date,
                "meals": day_meals,
                "totalCalories": sum(m.get("calories", 0) for m in day_meals),
                "macros": self._calculate_daily_macros(day_meals)
            }
        
        # Add shopping list
        meal_plan["shoppingList"] = self._generate_shopping_list(meal_plan)
        
        # Add meal prep tips
        meal_plan["mealPrepTips"] = self._get_meal_prep_tips(goal, medical_conditions)
        
        return meal_plan
    
    def _generate_daily_meals(
        self,
        target_calories: int,
        goal: str,
        medical_conditions: List[str],
        dietary_restrictions: List[str]
    ) -> List[Dict[str, Any]]:
        """Generate meals for a single day"""
        
        daily_meals = []
        
        # Breakfast (~25% of calories)
        breakfast = self._select_meal(
            self.meal_database["breakfast"],
            target_calories * 0.25,
            medical_conditions,
            dietary_restrictions
        )
        daily_meals.append({"type": "breakfast", **breakfast})
        
        # Lunch (~35% of calories)
        lunch = self._select_meal(
            self.meal_database["lunch"],
            target_calories * 0.35,
            medical_conditions,
            dietary_restrictions
        )
        daily_meals.append({"type": "lunch", **lunch})
        
        # Snack (~10% of calories)
        snack = self._select_meal(
            self.meal_database["snacks"],
            target_calories * 0.10,
            medical_conditions,
            dietary_restrictions
        )
        daily_meals.append({"type": "snack", **snack})
        
        # Dinner (~30% of calories)
        dinner = self._select_meal(
            self.meal_database["dinner"],
            target_calories * 0.30,
            medical_conditions,
            dietary_restrictions
        )
        daily_meals.append({"type": "dinner", **dinner})
        
        return daily_meals
    
    def _select_meal(
        self,
        meals: List[Dict[str, Any]],
        target_calories: float,
        medical_conditions: List[str],
        dietary_restrictions: List[str]
    ) -> Dict[str, Any]:
        """Select a meal based on caloric target and restrictions"""
        
        # Filter suitable meals
        suitable_meals = []
        for meal in meals:
            compatible = True
            
            # Check dietary restrictions
            if "Vegan" in dietary_restrictions and "vegan_friendly" not in meal["suitableFor"]:
                compatible = False
            if "Keto" in dietary_restrictions and "keto_friendly" not in meal["suitableFor"]:
                compatible = False
            
            # Check medical conditions
            if "Diabetes" in medical_conditions and "diabetes_friendly" not in meal["suitableFor"]:
                if meal["carbs"] > 50:  # High carbs problematic for diabetics
                    compatible = False
            
            if compatible:
                suitable_meals.append(meal)
        
        # If no suitable meals, use original list
        if not suitable_meals:
            suitable_meals = meals
        
        # Return meal closest to target calories
        return min(suitable_meals, key=lambda x: abs(x["calories"] - target_calories))
    
    def _calculate_daily_macros(self, meals: List[Dict[str, Any]]) -> Dict[str, float]:
        """Calculate daily macro totals"""
        return {
            "protein": sum(m.get("protein", 0) for m in meals),
            "carbs": sum(m.get("carbs", 0) for m in meals),
            "fats": sum(m.get("fats", 0) for m in meals),
            "calories": sum(m.get("calories", 0) for m in meals)
        }
    
    def _generate_shopping_list(self, meal_plan: Dict[str, Any]) -> List[str]:
        """Generate shopping list from meal plan"""
        ingredients = set()
        
        for day_data in meal_plan["days"].values():
            for meal in day_data["meals"]:
                if "ingredients" in meal:
                    for ingredient in meal["ingredients"]:
                        ingredients.add(ingredient)
        
        return sorted(list(ingredients))
    
    def _get_medical_notes(self, conditions: List[str]) -> List[str]:
        """Get medical notes based on conditions"""
        notes = []
        
        if "Diabetes" in conditions:
            notes.append("⚠️ Diabetes: Focus on complex carbs and fiber to manage blood sugar")
        if "Hypertension" in conditions:
            notes.append("⚠️ Hypertension: Reduced sodium, increased potassium from vegetables")
        if "Heart Disease" in conditions:
            notes.append("⚠️ Heart Disease: Lean proteins, healthy fats, reduced saturated fats")
        if "Arthritis" in conditions:
            notes.append("⚠️ Arthritis: Anti-inflammatory foods, omega-3 rich options")
        
        return notes
    
    def _get_meal_prep_tips(self, goal: str, conditions: List[str]) -> List[str]:
        """Get meal prep tips"""
        tips = [
            "🥗 Prep vegetables on Sunday for the week",
            "🍗 Cook proteins in bulk and portion into containers",
            "❄️ Use freezer for pre-portioned meals",
            "📦 Invest in glass containers for meal storage",
            "⏰ Set reminders for snack times to stay on track",
        ]
        
        if goal == "bulking":
            tips.append("💪 Include calorie-dense snacks between meals")
        elif goal == "cutting":
            tips.append("🔥 Prep low-calorie, high-volume options")
        
        return tips
    
    def generate_ai_recommendations(self, user_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Generate AI-powered personalized recommendations"""
        
        return {
            "personalizedTips": self._generate_personalized_tips(user_profile),
            "hydrationPlan": self._generate_hydration_plan(user_profile),
            "supplementRecommendations": self._get_supplement_recommendations(user_profile),
            "trainingFoodPairing": self._get_training_food_pairing(user_profile),
        }
    
    def _generate_personalized_tips(self, profile: Dict[str, Any]) -> List[str]:
        """Generate personalized dietary tips"""
        tips = []
        goal = profile.get("goal", "maintenance")
        
        if goal == "bulking":
            tips = [
                "Eat 300-500 calories in surplus daily",
                "Prioritize protein (1.6-2.2g per kg body weight)",
                "Include calorie-dense foods like nuts, seeds, and oils",
                "Don't neglect vegetables for micronutrients",
                "Eat every 3-4 hours to maintain caloric surplus"
            ]
        elif goal == "cutting":
            tips = [
                "Create a 300-500 calorie deficit daily",
                "Prioritize high-protein foods for satiety",
                "Load up on vegetables (low calorie, high volume)",
                "Stay hydrated to reduce false hunger signals",
                "Schedule cheat meals 1x per week for adherence"
            ]
        else:  # Maintenance
            tips = [
                "Balance all three macronutrients",
                "Eat intuitively when hungry, stop when satisfied",
                "Include variety to ensure micronutrient coverage",
                "Practice mindful eating",
                "Adjust calories if body composition changes"
            ]
        
        return tips
    
    def _generate_hydration_plan(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        """Generate hydration recommendations"""
        weight_kg = profile.get("weight", 70)
        activity_level = profile.get("activityLevel", "moderate")
        
        base_water = weight_kg * 35  # ml per day
        activity_multiplier = {
            "sedentary": 1.0,
            "light": 1.1,
            "moderate": 1.2,
            "active": 1.3,
            "very_active": 1.4
        }.get(activity_level, 1.2)
        
        total_water = base_water * activity_multiplier
        
        return {
            "dailyTarget": f"{total_water/1000:.1f}L",
            "schedule": [
                "💧 Morning: 500ml with breakfast",
                "💧 Mid-morning: 250ml with snack",
                "💧 Lunch: 500ml",
                "💧 Afternoon: 250ml with snack",
                "💧 Dinner: 500ml",
                "💧 Evening: 250ml"
            ],
            "tips": [
                "Drink water before meals to aid digestion",
                "Add electrolytes on workout days",
                "Monitor urine color (should be light yellow)"
            ]
        }
    
    def _get_supplement_recommendations(self, profile: Dict[str, Any]) -> List[Dict[str, str]]:
        """Get supplement recommendations"""
        dietary_restrictions = profile.get("dietaryRestrictions", [])
        recommendations = []
        
        # Universal recommendations
        recommendations.append({
            "supplement": "Vitamin D",
            "dosage": "1000-2000 IU",
            "reason": "Essential for bone health and immunity"
        })
        
        recommendations.append({
            "supplement": "Omega-3 Fish Oil",
            "dosage": "1-2g EPA+DHA",
            "reason": "Anti-inflammatory, heart health"
        })
        
        # Condition-specific
        if "Vegan" in dietary_restrictions:
            recommendations.append({
                "supplement": "Vitamin B12",
                "dosage": "1000-2000 mcg weekly",
                "reason": "Not naturally found in plant-based foods"
            })
            recommendations.append({
                "supplement": "Iron",
                "dosage": "18mg",
                "reason": "Plant-based iron has lower bioavailability"
            })
        
        return recommendations
    
    def _get_training_food_pairing(self, profile: Dict[str, Any]) -> Dict[str, List[str]]:
        """Get optimal food timing around workouts"""
        return {
            "preWorkout": [
                "30-60 min before: Banana with almond butter",
                "30-60 min before: Rice cakes with honey",
                "Choose easily digestible carbs + small protein"
            ],
            "postWorkout": [
                "Within 30 min: Protein shake with fruit",
                "Within 2 hours: Full meal with protein + carbs",
                "Example: Chicken with rice and vegetables"
            ],
            "timing": "These windows optimize recovery and performance"
        }


# Export the generator
diet_generator = DietAIGenerator()
