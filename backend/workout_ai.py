"""
AI-Powered Personalized Workout Plan Generator
Generates workout plans based on user profile, goals, and fitness level
"""

import json
from typing import Dict, List, Any
from datetime import datetime, timedelta

class WorkoutAIGenerator:
    """Generates AI-powered personalized workout plans"""
    
    def __init__(self):
        self.exercise_database = self._initialize_exercise_database()
        self.workout_templates = self._initialize_workout_templates()
    
    def _initialize_exercise_database(self) -> Dict[str, List[Dict[str, Any]]]:
        """Initialize comprehensive exercise database"""
        return {
            "strength": [
                {
                    "name": "Bench Press",
                    "muscle_groups": ["chest", "triceps", "shoulders"],
                    "difficulty": "intermediate",
                    "sets": 4,
                    "reps": "6-8",
                    "rest": "3 mins",
                    "equipment": "barbell",
                    "instructions": "Lie flat on bench, lower bar to chest, press up explosively",
                    "alternatives": ["Dumbbell Press", "Machine Chest Press"]
                },
                {
                    "name": "Squats",
                    "muscle_groups": ["quads", "glutes", "hamstrings"],
                    "difficulty": "intermediate",
                    "sets": 4,
                    "reps": "6-8",
                    "rest": "3 mins",
                    "equipment": "barbell",
                    "instructions": "Feet shoulder-width apart, lower hips back and down, drive through heels",
                    "alternatives": ["Leg Press", "Goblet Squats"]
                },
                {
                    "name": "Deadlifts",
                    "muscle_groups": ["back", "glutes", "hamstrings", "quads"],
                    "difficulty": "advanced",
                    "sets": 3,
                    "reps": "5-6",
                    "rest": "3 mins",
                    "equipment": "barbell",
                    "instructions": "Feet hip-width apart, grip shoulder-width, lift from hips then knees",
                    "alternatives": ["Romanian Deadlifts", "Trap Bar Deadlifts"]
                },
                {
                    "name": "Barbell Rows",
                    "muscle_groups": ["back", "biceps", "traps"],
                    "difficulty": "intermediate",
                    "sets": 4,
                    "reps": "6-8",
                    "rest": "2 mins",
                    "equipment": "barbell",
                    "instructions": "Hinge at hips, pull bar to lower chest, control descent",
                    "alternatives": ["Dumbbell Rows", "Machine Rows"]
                },
                {
                    "name": "Overhead Press",
                    "muscle_groups": ["shoulders", "triceps", "chest"],
                    "difficulty": "intermediate",
                    "sets": 3,
                    "reps": "6-8",
                    "rest": "2 mins",
                    "equipment": "barbell",
                    "instructions": "Press from shoulders to full extension overhead",
                    "alternatives": ["Dumbbell Press", "Machine Press"]
                },
                {
                    "name": "Pull-ups",
                    "muscle_groups": ["back", "biceps", "lats"],
                    "difficulty": "intermediate",
                    "sets": 3,
                    "reps": "8-12",
                    "rest": "2 mins",
                    "equipment": "pull-up bar",
                    "instructions": "Grip bar slightly wider than shoulder-width, pull until chin over bar",
                    "alternatives": ["Assisted Pull-ups", "Lat Pulldown"]
                },
            ],
            "cardio": [
                {
                    "name": "Running",
                    "intensity": "variable",
                    "duration": "20-45 mins",
                    "caloriesBurn": 400,
                    "equipment": "none",
                    "instructions": "Maintain steady pace, breathe rhythmically",
                    "variations": ["HIIT", "Steady State", "Hill Sprints"]
                },
                {
                    "name": "Rowing Machine",
                    "intensity": "high",
                    "duration": "20-30 mins",
                    "caloriesBurn": 350,
                    "equipment": "rower",
                    "instructions": "Drive through legs first, then lean back, pull arms",
                    "variations": ["Steady Pace", "Interval Training"]
                },
                {
                    "name": "Cycling",
                    "intensity": "variable",
                    "duration": "30-60 mins",
                    "caloriesBurn": 350,
                    "equipment": "bike",
                    "instructions": "Maintain cadence of 80-100 RPM, adjust resistance as needed",
                    "variations": ["Steady State", "Sprints", "Climb Intervals"]
                },
                {
                    "name": "Jump Rope",
                    "intensity": "high",
                    "duration": "15-20 mins",
                    "caloriesBurn": 280,
                    "equipment": "jump rope",
                    "instructions": "Keep hands at waist height, jump on balls of feet",
                    "variations": ["Single Leg", "Double Unders", "High Knees"]
                },
                {
                    "name": "Elliptical",
                    "intensity": "moderate",
                    "duration": "25-40 mins",
                    "caloriesBurn": 300,
                    "equipment": "elliptical",
                    "instructions": "Maintain steady pace, use full range of motion",
                    "variations": ["Steady State", "Hill Climb", "Intervals"]
                },
            ],
            "flexibility": [
                {
                    "name": "Yoga",
                    "type": "full-body",
                    "duration": "30-60 mins",
                    "intensity": "low",
                    "benefits": ["flexibility", "balance", "mental_clarity"],
                    "instructions": "Follow instructor or flow, breathe deeply",
                },
                {
                    "name": "Dynamic Stretching",
                    "type": "mobility",
                    "duration": "10-15 mins",
                    "intensity": "low",
                    "benefits": ["flexibility", "mobility", "activation"],
                    "instructions": "Perform controlled movements through full range of motion",
                },
                {
                    "name": "Foam Rolling",
                    "type": "recovery",
                    "duration": "10-20 mins",
                    "intensity": "low",
                    "benefits": ["recovery", "flexibility", "soreness_relief"],
                    "instructions": "Roll slowly along muscle groups, focus on tight areas",
                },
            ],
            "core": [
                {
                    "name": "Planks",
                    "sets": 3,
                    "duration": "30-60 seconds",
                    "rest": "60 seconds",
                    "difficulty": "beginner",
                    "instructions": "Keep body straight line, engage core, breathe steadily",
                },
                {
                    "name": "Ab Wheel Rollouts",
                    "sets": 3,
                    "reps": "8-12",
                    "rest": "90 seconds",
                    "difficulty": "advanced",
                    "instructions": "Roll forward slowly, engage core, return to start",
                },
                {
                    "name": "Hollow Body Holds",
                    "sets": 3,
                    "duration": "20-40 seconds",
                    "rest": "60 seconds",
                    "difficulty": "intermediate",
                    "instructions": "Tuck chin, squeeze glutes, create hollow body position",
                },
            ]
        }
    
    def _initialize_workout_templates(self) -> Dict[str, Dict[str, Any]]:
        """Initialize workout templates for different fitness levels and goals"""
        return {
            "beginner_strength": {
                "weeks": 4,
                "frequency": 3,
                "duration_per_session": "45-60 mins",
                "focus": "Build foundational strength and confidence",
                "days": {
                    "Monday": {
                        "name": "Upper Body",
                        "exercises": [
                            {"name": "Bench Press", "sets": 3, "reps": "8-10"},
                            {"name": "Barbell Rows", "sets": 3, "reps": "8-10"},
                            {"name": "Overhead Press", "sets": 2, "reps": "8-10"},
                        ]
                    },
                    "Wednesday": {
                        "name": "Lower Body",
                        "exercises": [
                            {"name": "Squats", "sets": 3, "reps": "8-10"},
                            {"name": "Leg Press", "sets": 3, "reps": "10-12"},
                        ]
                    },
                    "Friday": {
                        "name": "Full Body",
                        "exercises": [
                            {"name": "Deadlifts", "sets": 2, "reps": "5-6"},
                            {"name": "Pull-ups", "sets": 3, "reps": "5-8"},
                            {"name": "Planks", "sets": 3, "duration": "30-45 secs"},
                        ]
                    },
                }
            },
            "intermediate_strength": {
                "weeks": 6,
                "frequency": 4,
                "duration_per_session": "60-75 mins",
                "focus": "Build muscle and increase strength",
                "days": {
                    "Monday": {
                        "name": "Chest & Triceps",
                        "exercises": [
                            {"name": "Bench Press", "sets": 4, "reps": "6-8"},
                            {"name": "Overhead Press", "sets": 3, "reps": "8-10"},
                        ]
                    },
                    "Tuesday": {
                        "name": "Back & Biceps",
                        "exercises": [
                            {"name": "Barbell Rows", "sets": 4, "reps": "6-8"},
                            {"name": "Pull-ups", "sets": 3, "reps": "8-12"},
                        ]
                    },
                    "Thursday": {
                        "name": "Legs",
                        "exercises": [
                            {"name": "Squats", "sets": 4, "reps": "6-8"},
                            {"name": "Deadlifts", "sets": 3, "reps": "5-6"},
                        ]
                    },
                    "Saturday": {
                        "name": "Accessory & Core",
                        "exercises": [
                            {"name": "Ab Wheel Rollouts", "sets": 3, "reps": "8-12"},
                            {"name": "Planks", "sets": 3, "duration": "45-60 secs"},
                        ]
                    },
                }
            },
            "cardio_endurance": {
                "weeks": 8,
                "frequency": 4,
                "duration_per_session": "30-45 mins",
                "focus": "Build cardiovascular endurance and fat loss",
                "days": {
                    "Monday": {
                        "name": "Steady State Cardio",
                        "exercises": [
                            {"name": "Running", "duration": "30 mins", "intensity": "steady"}
                        ]
                    },
                    "Tuesday": {
                        "name": "Strength & Core",
                        "exercises": [
                            {"name": "Squats", "sets": 3, "reps": "10-12"},
                            {"name": "Planks", "sets": 3, "duration": "45 secs"},
                        ]
                    },
                    "Thursday": {
                        "name": "HIIT Training",
                        "exercises": [
                            {"name": "Jump Rope", "sets": 8, "duration": "30 secs on, 30 secs off"}
                        ]
                    },
                    "Saturday": {
                        "name": "Recovery & Flexibility",
                        "exercises": [
                            {"name": "Yoga", "duration": "45-60 mins"}
                        ]
                    },
                }
            },
        }
    
    def generate_workout_plan(self, user_profile: Dict[str, Any], days: int = 7) -> Dict[str, Any]:
        """Generate personalized workout plan"""
        
        # Determine user fitness level
        fitness_level = self._assess_fitness_level(user_profile)
        goal = user_profile.get('goal', 'balanced')
        
        # Select appropriate template
        template_key = self._select_template(fitness_level, goal)
        template = self.workout_templates.get(template_key, self.workout_templates['beginner_strength'])
        
        # Generate weekly schedule
        workout_schedule = self._generate_schedule(template, user_profile)
        
        # Generate recovery and nutrition tips
        recovery_tips = self._generate_recovery_tips(goal, fitness_level)
        warm_up_cooldown = self._generate_warm_up_cooldown()
        
        return {
            "fitnessLevel": fitness_level,
            "goal": goal,
            "template": template_key,
            "duration": "8 weeks",
            "frequency": template.get('frequency') or 3,
            "durationPerSession": template.get('duration_per_session'),
            "weeklySchedule": workout_schedule,
            "recoveryTips": recovery_tips,
            "warmUpCooldown": warm_up_cooldown,
            "progressionStrategy": self._generate_progression_strategy(goal),
            "medicalConsiderations": self._get_medical_considerations(user_profile),
            "generatedAt": datetime.now().isoformat()
        }
    
    def _assess_fitness_level(self, user_profile: Dict[str, Any]) -> str:
        """Assess user's fitness level"""
        experience = user_profile.get('fitnessExperience', 'beginner')
        return experience
    
    def _select_template(self, fitness_level: str, goal: str) -> str:
        """Select appropriate workout template"""
        goal_map = {
            'muscle_gain': 'intermediate_strength',
            'fat_loss': 'cardio_endurance',
            'cut': 'cardio_endurance',
            'bulk': 'intermediate_strength',
            'balanced': 'intermediate_strength',
            'strength': 'intermediate_strength',
            'endurance': 'cardio_endurance',
        }
        
        if fitness_level == 'beginner':
            return 'beginner_strength'
        else:
            return goal_map.get(goal, 'intermediate_strength')
    
    def _generate_schedule(self, template: Dict[str, Any], user_profile: Dict[str, Any]) -> Dict[str, Any]:
        """Generate weekly workout schedule"""
        days = template.get('days', {})
        
        schedule = {}
        for day_name, day_data in days.items():
            schedule[day_name] = {
                "name": day_data.get('name', day_name),
                "type": day_data.get('type', 'mixed'),
                "duration": day_data.get('duration', "60 mins"),
                "exercises": day_data.get('exercises', []),
                "notes": f"Focus on controlled movements. Rest 2-3 minutes between sets."
            }
        
        return schedule
    
    def _generate_recovery_tips(self, goal: str, fitness_level: str) -> List[str]:
        """Generate personalized recovery tips"""
        tips = [
            "Sleep 7-9 hours every night for optimal recovery",
            "Stay hydrated - drink at least 3-4 liters of water daily",
            "Eat protein with every meal to support muscle repair",
            "Take at least one full rest day per week",
            "Incorporate foam rolling and stretching 2-3 times weekly",
            "Manage stress through meditation or breathing exercises",
        ]
        
        if goal in ['muscle_gain', 'bulk']:
            tips.append("Consume calories in surplus (300-500 above maintenance)")
            tips.append("Prioritize compound lifts for maximum muscle growth")
        elif goal in ['fat_loss', 'cut']:
            tips.append("Maintain a moderate calorie deficit (300-500 below maintenance)")
            tips.append("Include both strength and cardio for best results")
        
        if fitness_level == 'beginner':
            tips.append("Focus on form over weight - quality over quantity")
            tips.append("Don't progress weight too quickly")
        
        return tips
    
    def _generate_warm_up_cooldown(self) -> Dict[str, Any]:
        """Generate warm-up and cool-down routine"""
        return {
            "warmUp": {
                "duration": "5-10 minutes",
                "exercises": [
                    "5 minutes light cardio (walking/light jog)",
                    "5-10 reps of dynamic stretches",
                    "General movement prep (arm circles, leg swings)",
                    "2-3 light sets with target weight"
                ]
            },
            "coolDown": {
                "duration": "5-10 minutes",
                "exercises": [
                    "3-5 minutes easy walking",
                    "Static stretching of worked muscles (30 seconds each)",
                    "Deep breathing exercises",
                    "Foam rolling if available (1-2 minutes)"
                ]
            }
        }
    
    def _generate_progression_strategy(self, goal: str) -> Dict[str, Any]:
        """Generate progression strategy"""
        return {
            "week1to2": "Focus on form and establishing baseline",
            "week3to4": "Increase weight by 5-10% or add 1-2 reps",
            "week5to6": "Deload week - reduce volume by 40%, maintain intensity",
            "week7to8": "Final push - attempt new PRs or add extra volume",
            "tips": [
                "Track your workouts in a notebook or app",
                "Aim for progressive overload each week",
                "If you can't maintain form, reduce weight",
                "Listen to your body and adjust as needed"
            ]
        }
    
    def _get_medical_considerations(self, user_profile: Dict[str, Any]) -> List[str]:
        """Get medical considerations"""
        medical_conditions = user_profile.get('medicalConditions', [])
        considerations = []
        
        condition_advice = {
            'lower_back_pain': "Avoid heavy deadlifts and loaded spinal flexion. Focus on core strengthening. Consult a physical therapist.",
            'knee_problems': "Modify squats to partial range of motion. Avoid deep lunges. Consider cycling over running.",
            'shoulder_injury': "Avoid heavy pressing movements. Focus on rotator cuff exercises. Use machines over free weights.",
            'diabetes': "Stay well-hydrated, monitor energy levels, carry fast-acting carbs during training.",
            'hypertension': "Avoid isometric holds, focus on moderate intensity, include more cardio.",
        }
        
        for condition in medical_conditions:
            if condition.lower() in condition_advice:
                considerations.append(condition_advice[condition.lower()])
        
        if not considerations:
            considerations.append("Consult with a healthcare provider before starting this program.")
        
        return considerations
    
    def get_exercise_alternatives(self, exercise_name: str) -> List[str]:
        """Get alternative exercises"""
        for category, exercises in self.exercise_database.items():
            for ex in exercises:
                if ex.get('name', '').lower() == exercise_name.lower():
                    return ex.get('alternatives', [])
        return []

# Initialize generator
workout_generator = WorkoutAIGenerator()
