"""
Vibe Fitness Backend API
Provides AI-powered diet planning, workout generation, and personalized recommendations
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from diet_ai import diet_generator
from workout_ai import workout_generator
from datetime import datetime
import logging

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Vibe Fitness Backend API",
        "cors": "enabled"
    }), 200

# API Info endpoint
@app.route('/api/info', methods=['GET'])
def api_info():
    """Show API information and expected request format"""
    return jsonify({
        "service": "Vibe Fitness Backend API",
        "version": "1.0.0",
        "endpoints": {
            "POST /api/diet-plan": {
                "description": "Generate personalized 7-day diet plan",
                "required_fields": ["goal", "weight", "height", "age"],
                "optional_fields": ["gender", "activityLevel", "medicalConditions", "dietaryRestrictions", "targetCalories"],
                "example": {
                    "height": 180,
                    "weight": 75,
                    "age": 25,
                    "gender": "male",
                    "activityLevel": "moderate",
                    "goal": "cutting",
                    "medicalConditions": [],
                    "dietaryRestrictions": [],
                    "targetCalories": 2000
                }
            },
            "POST /api/workout-plan": {
                "description": "Generate personalized 8-week workout plan",
                "required_fields": ["goal", "fitnessExperience"],
                "optional_fields": ["weight", "height", "age", "medicalConditions", "daysAvailable"],
                "example": {
                    "goal": "muscle_gain",
                    "fitnessExperience": "intermediate",
                    "weight": 75,
                    "height": 180,
                    "age": 25,
                    "medicalConditions": [],
                    "daysAvailable": 4
                }
            }
        }
    }), 200


# Diet plan generation endpoint
@app.route('/api/diet-plan', methods=['POST'])
def generate_diet_plan():
    """Generate personalized diet plan"""
    try:
        user_profile = request.json
        logger.info(f"Received diet plan request: {user_profile}")
        
        # Validate required fields
        required_fields = ['goal', 'weight', 'height', 'age']
        missing_fields = [field for field in required_fields if field not in user_profile]
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({
                "error": f"Missing required fields: {', '.join(missing_fields)}",
                "required": required_fields,
                "received": list(user_profile.keys())
            }), 400
        
        # Generate meal plan
        logger.info("Generating meal plan...")
        meal_plan = diet_generator.generate_meal_plan(user_profile, days=7)
        
        logger.info(f"Successfully generated diet plan for user: {user_profile.get('gender', 'unknown')}")
        
        return jsonify({
            "success": True,
            "data": meal_plan,
            "generated_at": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating diet plan: {str(e)}", exc_info=True)
        return jsonify({
            "error": "Failed to generate diet plan",
            "details": str(e)
        }), 500

# Workout plan generation endpoint
@app.route('/api/workout-plan', methods=['POST'])
def generate_workout_plan():
    """Generate personalized workout plan"""
    try:
        user_profile = request.json
        logger.info(f"Received workout plan request: {user_profile}")
        
        # Validate required fields
        required_fields = ['goal', 'fitnessExperience']
        missing_fields = [field for field in required_fields if field not in user_profile]
        if missing_fields:
            logger.error(f"Missing required fields: {missing_fields}")
            return jsonify({
                "error": f"Missing required fields: {', '.join(missing_fields)}",
                "required": required_fields,
                "received": list(user_profile.keys())
            }), 400
        
        # Generate workout plan
        logger.info("Generating workout plan...")
        plan = workout_generator.generate_workout_plan(user_profile)
        
        logger.info(f"Successfully generated workout plan for goal: {user_profile.get('goal', 'unknown')}")
        
        return jsonify({
            "success": True,
            "data": plan,
            "generated_at": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating workout plan: {str(e)}", exc_info=True)
        return jsonify({
            "error": "Failed to generate workout plan",
            "details": str(e)
        }), 500

# AI recommendations endpoint
@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    """Get AI-powered recommendations"""
    try:
        user_profile = request.json
        
        # Generate recommendations
        recommendations = diet_generator.generate_ai_recommendations(user_profile)
        
        logger.info("Generated personalized recommendations")
        
        return jsonify({
            "success": True,
            "data": recommendations,
            "generated_at": datetime.now().isoformat()
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating recommendations: {str(e)}")
        return jsonify({
            "error": "Failed to generate recommendations",
            "details": str(e)
        }), 500

# Meal search endpoint
@app.route('/api/meal-search', methods=['GET'])
def search_meals():
    """Search meals by criteria"""
    try:
        meal_type = request.args.get('type', 'breakfast')
        dietary_restriction = request.args.get('restriction', None)
        
        if meal_type not in diet_generator.meal_database:
            return jsonify({
                "error": "Invalid meal type",
                "valid_types": list(diet_generator.meal_database.keys())
            }), 400
        
        meals = diet_generator.meal_database[meal_type]
        
        # Filter by dietary restriction if provided
        if dietary_restriction:
            meals = [m for m in meals if dietary_restriction in m.get('suitableFor', [])]
        
        return jsonify({
            "success": True,
            "mealType": meal_type,
            "count": len(meals),
            "meals": meals
        }), 200
        
    except Exception as e:
        logger.error(f"Error searching meals: {str(e)}")
        return jsonify({
            "error": "Failed to search meals",
            "details": str(e)
        }), 500

# Nutritional calculation endpoint
@app.route('/api/calculate-nutrition', methods=['POST'])
def calculate_nutrition():
    """Calculate nutrition for multiple meals"""
    try:
        meals = request.json.get('meals', [])
        
        if not meals:
            return jsonify({"error": "No meals provided"}), 400
        
        total_calories = sum(m.get('calories', 0) for m in meals)
        total_protein = sum(m.get('protein', 0) for m in meals)
        total_carbs = sum(m.get('carbs', 0) for m in meals)
        total_fats = sum(m.get('fats', 0) for m in meals)
        
        return jsonify({
            "success": True,
            "mealCount": len(meals),
            "totals": {
                "calories": total_calories,
                "protein": total_protein,
                "carbs": total_carbs,
                "fats": total_fats
            },
            "macroPercentages": {
                "protein": round((total_protein * 4 / total_calories * 100) if total_calories > 0 else 0, 1),
                "carbs": round((total_carbs * 4 / total_calories * 100) if total_calories > 0 else 0, 1),
                "fats": round((total_fats * 9 / total_calories * 100) if total_calories > 0 else 0, 1)
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Error calculating nutrition: {str(e)}")
        return jsonify({
            "error": "Failed to calculate nutrition",
            "details": str(e)
        }), 500

# Shopping list endpoint
@app.route('/api/shopping-list', methods=['POST'])
def get_shopping_list():
    """Generate shopping list from meal plan"""
    try:
        meal_plan = request.json
        shopping_list = diet_generator._generate_shopping_list(meal_plan)
        
        # Group by category (mock categorization)
        categories = {
            "Proteins": ["chicken", "beef", "fish", "turkey", "eggs", "tofu", "tempeh"],
            "Grains": ["rice", "oats", "bread", "pasta", "quinoa"],
            "Vegetables": ["broccoli", "asparagus", "kale", "spinach", "bell pepper", "tomato"],
            "Fruits": ["apple", "banana", "berries", "avocado"],
            "Dairy": ["milk", "yogurt", "cheese"],
            "Other": []
        }
        
        categorized_list = {cat: [] for cat in categories}
        
        for item in shopping_list:
            found = False
            for category, items in categories.items():
                if any(cat_item in item.lower() for cat_item in items):
                    categorized_list[category].append(item)
                    found = True
                    break
            if not found:
                categorized_list["Other"].append(item)
        
        return jsonify({
            "success": True,
            "count": len(shopping_list),
            "items": shopping_list,
            "categorized": categorized_list
        }), 200
        
    except Exception as e:
        logger.error(f"Error generating shopping list: {str(e)}")
        return jsonify({
            "error": "Failed to generate shopping list",
            "details": str(e)
        }), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("🚀 Starting Vibe Fitness Backend API on http://localhost:5000")
    print("📚 API Documentation:")
    print("   GET /api/health - Health check")
    print("   POST /api/diet-plan - Generate 7-day diet plan")
    print("   POST /api/workout-plan - Generate 8-week workout plan")
    print("   POST /api/recommendations - Get AI recommendations")
    print("   GET /api/meal-search - Search meals")
    print("   POST /api/calculate-nutrition - Calculate meal nutrition")
    print("   POST /api/shopping-list - Generate shopping list")
    app.run(debug=True, port=5000)
