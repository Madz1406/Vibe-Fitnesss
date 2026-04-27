import json
from typing import Dict, List, Any
import random

class DietAIGenerator:
    """Generates 100% Indian-friendly AI-powered personalized diet plans"""
    
    def __init__(self):
        self.meal_database = self._initialize_meal_database()
        
    def _initialize_meal_database(self) -> Dict[str, List[Dict[str, Any]]]:
        return {
            "breakfast": [
                {
                    "name": "Oats and Milk",
                    "items": [
                        {"name": "oats", "amount": 40, "unit": "g"},
                        {"name": "milk", "amount": 200, "unit": "ml"},
                        {"name": "banana", "amount": 1, "unit": " medium"}
                    ],
                    "calories": 320, "protein": 12, "carbs": 55, "fats": 6,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["oats", "milk", "banana"]
                },
                {
                    "name": "Poha with Peanuts",
                    "items": [
                        {"name": "dry poha", "amount": 60, "unit": "g"},
                        {"name": "peanuts", "amount": 15, "unit": "g"},
                        {"name": "mixed vegetables", "amount": 0.5, "unit": " cup"}
                    ],
                    "calories": 340, "protein": 8, "carbs": 52, "fats": 11,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["poha", "peanuts", "vegetables"]
                },
                {
                    "name": "Egg Bhurji",
                    "items": [
                        {"name": "whole eggs", "amount": 3, "unit": ""},
                        {"name": "whole wheat bread slices", "amount": 2, "unit": ""},
                        {"name": "veggies (onion, tomato)", "amount": 0.5, "unit": " cup"}
                    ],
                    "calories": 370, "protein": 23, "carbs": 28, "fats": 17,
                    "suitableFor": ["Non-Vegetarian"],
                    "ingredients": ["eggs", "wheat bread", "vegetables"]
                },
                {
                    "name": "Paneer Paratha",
                    "items": [
                        {"name": "whole wheat parathas", "amount": 2, "unit": " (30g flour each)"},
                        {"name": "paneer filling", "amount": 50, "unit": "g"},
                        {"name": "plain curd", "amount": 50, "unit": "g"}
                    ],
                    "calories": 390, "protein": 16, "carbs": 52, "fats": 14,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["wheat flour", "paneer", "curd"]
                },
                {
                    "name": "Idli Sambar",
                    "items": [
                        {"name": "medium idlis", "amount": 3, "unit": ""},
                        {"name": "sambar", "amount": 150, "unit": "ml"},
                        {"name": "coconut chutney", "amount": 1, "unit": " tbsp"}
                    ],
                    "calories": 310, "protein": 10, "carbs": 54, "fats": 6,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["idli", "dal", "vegetables", "coconut"]
                },
                {
                    "name": "Upma",
                    "items": [
                        {"name": "sooji (dry)", "amount": 50, "unit": "g"},
                        {"name": "vegetables", "amount": 0.5, "unit": " cup"},
                        {"name": "peanuts", "amount": 10, "unit": "g"}
                    ],
                    "calories": 280, "protein": 7, "carbs": 44, "fats": 8,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["sooji", "vegetables", "peanuts"]
                }
            ],
            "mid_morning_snack": [
                {
                    "name": "Roasted Chana",
                    "items": [{"name": "roasted chana", "amount": 30, "unit": "g"}],
                    "calories": 110, "protein": 6, "carbs": 17, "fats": 2,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["chana"]
                },
                {
                    "name": "Fruit Bowl",
                    "items": [{"name": "seasonal fruit (apple/papaya)", "amount": 150, "unit": "g"}],
                    "calories": 80, "protein": 1, "carbs": 20, "fats": 0,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["apple", "papaya", "fruit"]
                },
                {
                    "name": "Buttermilk (Chaas)",
                    "items": [{"name": "buttermilk", "amount": 300, "unit": "ml"}],
                    "calories": 45, "protein": 3, "carbs": 5, "fats": 1,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["curd", "buttermilk"]
                }
            ],
            "lunch": [
                {
                    "name": "Roti, Dal, and Sabzi",
                    "items": [
                        {"name": "whole wheat rotis", "amount": 2, "unit": " (45g flour total)"},
                        {"name": "moong dal", "amount": 200, "unit": "ml"},
                        {"name": "sabzi (vegetables)", "amount": 150, "unit": "g"},
                        {"name": "curd", "amount": 100, "unit": "g"}
                    ],
                    "calories": 450, "protein": 19, "carbs": 65, "fats": 12,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["wheat flour", "dal", "vegetables", "curd"]
                },
                {
                    "name": "Chicken Curry and Rice",
                    "items": [
                        {"name": "cooked chicken breast in curry", "amount": 150, "unit": "g"},
                        {"name": "cooked rice", "amount": 120, "unit": "g"},
                        {"name": "green salad", "amount": 1, "unit": " bowl"}
                    ],
                    "calories": 450, "protein": 40, "carbs": 40, "fats": 14,
                    "suitableFor": ["Non-Vegetarian"],
                    "ingredients": ["chicken", "rice", "vegetables"]
                },
                {
                    "name": "Paneer Sabzi with Roti",
                    "items": [
                        {"name": "paneer in mild gravy", "amount": 100, "unit": "g"},
                        {"name": "whole wheat rotis", "amount": 2, "unit": ""},
                        {"name": "green salad", "amount": 1, "unit": " bowl"}
                    ],
                    "calories": 480, "protein": 22, "carbs": 45, "fats": 24,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["paneer", "wheat flour", "vegetables"]
                },
                {
                    "name": "Soya Chunks Pulao",
                    "items": [
                        {"name": "soya chunks (dry weight)", "amount": 50, "unit": "g"},
                        {"name": "rice (cooked)", "amount": 100, "unit": "g"},
                        {"name": "cucumber raita", "amount": 100, "unit": "g"}
                    ],
                    "calories": 410, "protein": 28, "carbs": 55, "fats": 8,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["soya chunks", "rice", "curd", "cucumber"]
                },
                {
                    "name": "Dal Chawal",
                    "items": [
                        {"name": "cooked rice", "amount": 150, "unit": "g"},
                        {"name": "tur dal", "amount": 200, "unit": "ml"},
                        {"name": "sabzi", "amount": 100, "unit": "g"}
                    ],
                    "calories": 420, "protein": 15, "carbs": 75, "fats": 8,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["rice", "dal", "vegetables"]
                }
            ],
            "evening_snack": [
                {
                    "name": "Mixed Nuts",
                    "items": [
                        {"name": "almonds", "amount": 15, "unit": "g"},
                        {"name": "walnuts", "amount": 10, "unit": "g"}
                    ],
                    "calories": 160, "protein": 5, "carbs": 4, "fats": 14,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["almonds", "walnuts"]
                },
                {
                    "name": "Boiled Eggs",
                    "items": [{"name": "boiled eggs", "amount": 2, "unit": ""}],
                    "calories": 140, "protein": 12, "carbs": 1, "fats": 10,
                    "suitableFor": ["Non-Vegetarian"],
                    "ingredients": ["eggs"]
                },
                {
                    "name": "Roasted Makhana",
                    "items": [{"name": "roasted makhana with minimal ghee", "amount": 25, "unit": "g"}],
                    "calories": 110, "protein": 3, "carbs": 19, "fats": 3,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["makhana", "ghee"]
                }
            ],
            "dinner": [
                {
                    "name": "Light Dal and Salad",
                    "items": [
                        {"name": "yellow moong dal", "amount": 150, "unit": "ml"},
                        {"name": "cooked rice", "amount": 100, "unit": "g"},
                        {"name": "green salad", "amount": 1, "unit": " large bowl"}
                    ],
                    "calories": 320, "protein": 12, "carbs": 55, "fats": 5,
                    "suitableFor": ["Vegetarian", "Vegan"],
                    "ingredients": ["moong dal", "rice", "vegetables"]
                },
                {
                    "name": "Grilled Chicken and Veggies",
                    "items": [
                        {"name": "grilled chicken", "amount": 150, "unit": "g"},
                        {"name": "stir-fried veggies (broccoli, peppers)", "amount": 1.5, "unit": " cups"}
                    ],
                    "calories": 350, "protein": 42, "carbs": 15, "fats": 12,
                    "suitableFor": ["Non-Vegetarian"],
                    "ingredients": ["chicken", "vegetables"]
                },
                {
                    "name": "Oats Khichdi",
                    "items": [
                        {"name": "oats cooked with mixed veggies", "amount": 50, "unit": "g"},
                        {"name": "curd", "amount": 100, "unit": "g"}
                    ],
                    "calories": 310, "protein": 12, "carbs": 45, "fats": 8,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["oats", "vegetables", "curd"]
                },
                {
                    "name": "Paneer Tikka with Salad",
                    "items": [
                        {"name": "grilled paneer", "amount": 120, "unit": "g"},
                        {"name": "green salad", "amount": 1, "unit": " large bowl"}
                    ],
                    "calories": 380, "protein": 22, "carbs": 12, "fats": 26,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["paneer", "vegetables"]
                },
                {
                    "name": "Vegetable Pulao",
                    "items": [
                        {"name": "cooked pulao", "amount": 200, "unit": "g"},
                        {"name": "raita", "amount": 100, "unit": "g"}
                    ],
                    "calories": 350, "protein": 8, "carbs": 60, "fats": 9,
                    "suitableFor": ["Vegetarian"],
                    "ingredients": ["rice", "vegetables", "curd"]
                }
            ]
        }

    def _calculate_bmr_and_macros(self, profile: Dict[str, Any]) -> Dict[str, float]:
        age = int(profile.get("age", 25))
        gender = profile.get("gender", "male").lower()
        height_cm = float(profile.get("height", 170))
        weight_kg = float(profile.get("weight", 70))
        activity_level = profile.get("activityLevel", "moderate").lower()
        goal = profile.get("goal", "maintenance").lower()
        
        # Calculate BMR (Mifflin-St Jeor)
        if gender == "male":
            bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
        else:
            bmr = (10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161
            
        # Activity factor
        activity_factors = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderate": 1.55,
            "heavy": 1.725
        }
        tdee = bmr * activity_factors.get(activity_level, 1.2)
        
        # Target Calories
        target_calories = profile.get("targetCalories")
        if not target_calories:
            if "loss" in goal or "cut" in goal:
                target_calories = tdee - 350
            elif "gain" in goal or "bulk" in goal:
                target_calories = tdee + 275
            else:
                target_calories = tdee
        
        target_calories = float(target_calories)
        
        # Target Macros
        target_protein = profile.get("targetProtein")
        if not target_protein:
            if "loss" in goal or "cut" in goal:
                target_protein = 1.8 * weight_kg
            elif "gain" in goal or "bulk" in goal:
                target_protein = 2.0 * weight_kg
            else:
                target_protein = 1.6 * weight_kg
                
        target_protein = float(target_protein)
        protein_cals = target_protein * 4
        
        fats_cals = target_calories * 0.25 # 20-25%
        target_fats = fats_cals / 9
        
        carbs_cals = target_calories - (protein_cals + fats_cals)
        target_carbs = max(0, carbs_cals / 4)
        
        return {
            "total_calories": round(target_calories),
            "protein_g": round(target_protein),
            "carbs_g": round(target_carbs),
            "fats_g": round(target_fats),
            "protein_pct": round((protein_cals / target_calories) * 100) if target_calories > 0 else 0,
            "carbs_pct": round((carbs_cals / target_calories) * 100) if target_calories > 0 else 0,
            "fats_pct": round((fats_cals / target_calories) * 100) if target_calories > 0 else 0
        }

    def generate_meal_plan(self, user_profile: Dict[str, Any], days: int = 1) -> Dict[str, Any]:
        """Generate a personalized meal plan adhering to exact rules"""
        
        # 1. Calculate BMR and Macros
        macros = self._calculate_bmr_and_macros(user_profile)
        target_calories = macros["total_calories"]
        
        # Calorie split
        cal_splits = {
            "breakfast": target_calories * 0.25,
            "mid_morning_snack": target_calories * 0.10,
            "lunch": target_calories * 0.30,
            "evening_snack": target_calories * 0.10,
            "dinner": target_calories * 0.25
        }
        
        # Preferences & Restrictions
        restrictions = [r.lower() for r in user_profile.get("dietaryRestrictions", [])]
        dislikes = [d.lower() for d in user_profile.get("foodDislikes", [])]
        allergies = [a.lower() for a in user_profile.get("foodAllergies", [])]
        
        preference = user_profile.get("dietaryPreference", "vegetarian").lower()
        if preference == "vegan":
            restrictions.append("vegan")
        elif preference in ["vegetarian", "veg"]:
            restrictions.append("vegetarian")
            
        if "no-eggs" in restrictions or "no eggs" in preference or "no eggs" in restrictions:
            restrictions.append("no eggs")

        plan = {
            "summary": {
                "totalCalories": target_calories,
                "protein": {"grams": macros["protein_g"], "percentage": macros["protein_pct"]},
                "carbs": {"grams": macros["carbs_g"], "percentage": macros["carbs_pct"]},
                "fats": {"grams": macros["fats_g"], "percentage": macros["fats_pct"]},
                "explanation": self._get_explanation(user_profile, target_calories)
            },
            "meals": {
                "breakfast": self._get_meal_options("breakfast", cal_splits["breakfast"], 3, restrictions, dislikes, allergies),
                "mid_morning_snack": self._get_meal_options("mid_morning_snack", cal_splits["mid_morning_snack"], 2, restrictions, dislikes, allergies),
                "lunch": self._get_meal_options("lunch", cal_splits["lunch"], 3, restrictions, dislikes, allergies),
                "evening_snack": self._get_meal_options("evening_snack", cal_splits["evening_snack"], 2, restrictions, dislikes, allergies),
                "dinner": self._get_meal_options("dinner", cal_splits["dinner"], 3, restrictions, dislikes, allergies)
            },
            "waterIntake": self._generate_hydration_plan(user_profile),
            "tips": self._get_consistency_tips()
        }
        
        return plan

    def _get_meal_options(self, meal_type: str, target_calories: float, count: int, 
                          restrictions: List[str], dislikes: List[str], allergies: List[str]) -> List[Dict[str, Any]]:
        suitable_meals = []
        is_veg = "vegetarian" in restrictions or "veg" in restrictions
        is_vegan = "vegan" in restrictions
        no_eggs = "no eggs" in restrictions or "no-eggs" in restrictions
        
        for meal in self.meal_database[meal_type]:
            suitable = True
            meal_suitable_for = [s.lower() for s in meal["suitableFor"]]
            
            if is_vegan and not any("vegan" in s for s in meal_suitable_for):
                suitable = False
            elif is_veg and not any("vegetarian" in s or "vegan" in s for s in meal_suitable_for):
                suitable = False
                
            ingredients = [i.lower() for i in meal.get("ingredients", [])]
            if no_eggs and any("egg" in i for i in ingredients):
                suitable = False
                
            for dislike in dislikes:
                if any(dislike in i for i in ingredients):
                    suitable = False
            for allergy in allergies:
                if any(allergy in i for i in ingredients):
                    suitable = False
                    
            if suitable:
                suitable_meals.append(meal)
                
        # Pick random suitable meals
        selected = random.sample(suitable_meals, min(count, len(suitable_meals)))
        
        # Fill in with suitable meals if not enough selected options were randomized
        if not selected and suitable_meals:
            selected = suitable_meals[:count]
        elif not selected:
            # Fallback to the database directly if filtering results in 0
            selected = self.meal_database[meal_type][:count]
            
        scaled_options = []
        for i, meal in enumerate(selected):
            scaled_options.append(self._scale_meal(meal, target_calories, i + 1))
            
        return scaled_options

    def _scale_meal(self, meal: Dict[str, Any], target_calories: float, index: int) -> Dict[str, Any]:
        scale_factor = target_calories / meal["calories"] if meal["calories"] > 0 else 1.0
        
        # Boundary constraints for realistic portion sizes
        scale_factor = max(0.5, min(2.0, scale_factor))
        
        scaled_meal = {
            "optionNumber": index,
            "name": meal["name"],
            "calories": round(meal["calories"] * scale_factor),
            "protein": round(meal["protein"] * scale_factor),
            "carbs": round(meal["carbs"] * scale_factor),
            "fats": round(meal["fats"] * scale_factor),
            "items": []
        }
        
        for item in meal["items"]:
            scaled_amount = item["amount"] * scale_factor
            if isinstance(scaled_amount, float) and scaled_amount.is_integer():
                scaled_amount = int(scaled_amount)
            elif item["unit"].strip() in ["g", "ml", "tbsp", "cup", "cups", "bowl"]:
                scaled_amount = int(round(scaled_amount))
            elif scaled_amount > 10:
                scaled_amount = int(round(scaled_amount))
            else:
                scaled_amount = round(scaled_amount, 1)
                
            unit_str = item["unit"]
            item_str = f"{scaled_amount}{unit_str} {item['name']}"
            scaled_meal["items"].append(item_str.strip())
            
        return scaled_meal

    def _get_explanation(self, profile: Dict[str, Any], target_calories: float) -> str:
        goal = profile.get("goal", "maintenance").lower()
        if "loss" in goal or "cut" in goal:
            return f"To achieve your fat loss goal, you need to be in a calorie deficit. A target of {round(target_calories)} calories provides a sustainable deficit of approximately 300-400 calories below your maintenance level."
        elif "gain" in goal or "bulk" in goal:
            return f"To build muscle, you need to be in a calorie surplus. A target of {round(target_calories)} calories provides a steady surplus of approximately 200-350 calories above your maintenance level."
        else:
            return f"To maintain your current weight, a target of {round(target_calories)} calories matches your daily energy expenditure (TDEE)."

    def _get_consistency_tips(self) -> List[str]:
        return [
            "Meal Prep: Spend 10-20 minutes daily organizing your ingredients for the next day.",
            "Water Intake: Drink a glass of water before every meal to aid digestion.",
            "Sleep: Ensure 7-8 hours of sleep as recovery is vital for fat loss/muscle gain.",
            "Consistency over Perfection: If you miss a meal limit, just get back on track with the next one."
        ]

    def _generate_hydration_plan(self, profile: Dict[str, Any]) -> str:
        weight_kg = float(profile.get("weight", 70))
        activity_level = profile.get("activityLevel", "moderate").lower()
        
        base_water = weight_kg * 35  # ml per day
        activity_multiplier = {
            "sedentary": 1.0,
            "light": 1.1,
            "moderate": 1.2,
            "heavy": 1.4,
            "active": 1.4
        }.get(activity_level, 1.2)
        
        total_water_liters = (base_water * activity_multiplier) / 1000
        return f"Drink approximately {total_water_liters:.1f} Liters of water daily. Increase if sweating heavily."

# Export the generator
diet_generator = DietAIGenerator()
