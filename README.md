# 🏋️ Vibe Fitness - Your Personal Fitness Coach

A premium, high-performance React web application for personalized fitness goals and nutritional path planning. Built with React, TypeScript, Tailwind CSS, and a sophisticated TDEE calculator engine.

## ✨ Features

### 🎯 Intelligent Onboarding Flow
- **Physical Metrics**: Collect height, weight, age, body composition (Body Fat %)
- **Medical Safety Layer**: Flag health conditions (Diabetes, Hypertension, etc.) to adjust nutritional recommendations
- **Dietary Preferences**: Select from Vegan, Keto, Paleo, Gluten-Free, and more
- **Goal Selection**: Choose between Bulking, Cutting, or Maintenance modes

### 🧮 Advanced Logic Engine
- **TDEE Calculation**: Uses Mifflin-St Jeor equation for accurate BMR and TDEE calculations
- **Condition-Aware Macros**: Automatically adjusts macro ratios based on medical conditions:
  - **Diabetes**: Reduced carbs, increased protein
  - **Hypertension**: Balanced macro distribution with controlled sodium considerations
- **Dietary Restriction Support**: Optimizes macros for Vegan, Keto, Paleo, and other preferences
- **Personalized Targets**: Generates custom caloric targets and macro breakdowns

### 🎮 Gamified Progress Tracking
- **Daily Quest System**: 6 customizable daily tasks including:
  - Hit Protein Goal 🥩
  - Complete Workout 💪
  - Drink 3L Water 💧
  - Sleep 8 Hours 😴
  - Track Meals 🍽️
  - Stretch & Mobility 🧘

- **Real-Time Progress Bar**: Visual feedback with animations
- **Level Up System**: Earn points for completing tasks, unlock levels with celebration animations
- **Persistent State**: All progress saved to localStorage

### 🎨 Premium UI/UX
- **Dark Mode Aesthetic**: Dark gradient backgrounds with premium feel
- **Neon Accents**: Fuchsia (#FF006E) and Electric Green (#39FF14) color scheme
- **Glassmorphism Design**: Modern frosted glass effect cards with blur
- **Smooth Animations**: 
  - Level up celebration animations
  - Pulse and glow effects
  - Smooth transitions and hover states
- **Responsive Design**: Works seamlessly on desktop and tablet

### ⚠️ Medical Safety
- **Persistent Footer Disclaimer**: Medical professional consultation reminder on every view
- **Condition-Based Warnings**: Highlighted adjustments for medical conditions
- **Educational Focus**: Clear messaging that this is educational only

## 🚀 Getting Started

### Prerequisites
- **Node.js 16+** and **npm 7+** (or yarn/pnpm)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will automatically open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
vibe-fitness/
├── src/
│   ├── components/
│   │   ├── OnboardingForm.tsx           # Main onboarding form component
│   │   ├── Dashboard.tsx                 # Main dashboard/home screen
│   │   ├── onboarding/
│   │   │   ├── StepPhysicalMetrics.tsx  # Physical metrics form
│   │   │   ├── StepHealthConstraints.tsx # Medical conditions form
│   │   │   ├── StepPreferences.tsx       # Dietary preferences form
│   │   │   └── StepGoal.tsx              # Goal & activity selection
│   │   └── dashboard/
│   │       ├── DailyTaskList.tsx         # Task tracking component
│   │       ├── ProgressBar.tsx           # Progress visualization
│   │       └── MacroBreakdown.tsx        # Macro display & visualization
│   ├── types/
│   │   └── index.ts                      # TypeScript interfaces
│   ├── utils/
│   │   └── calculations.ts               # TDEE & macro calculations
│   ├── App.tsx                           # Main app component
│   ├── App.css                           # App styles
│   ├── index.css                         # Global styles
│   └── main.tsx                          # Entry point
├── public/                               # Static assets
├── index.html                            # HTML template
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── vite.config.ts                        # Vite config
├── tailwind.config.js                    # Tailwind CSS config
└── README.md                             # This file
```

## 🧮 Calculation Details

### TDEE Calculation (Mifflin-St Jeor Equation)

**Step 1: Calculate BMR (Basal Metabolic Rate)**
- **Male**: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
- **Female**: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161

**Step 2: Calculate TDEE**
- TDEE = BMR × Activity Level Multiplier

Activity multipliers:
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Active: 1.725
- Very Active: 1.9

**Step 3: Apply Goal Adjustment**
- Bulking: +300 calories
- Cutting: -400 calories
- Maintenance: 0 calories

### Macro Calculation

Default ratios:
- Protein: 30% (1.2% carbs disabled due to health)
- Carbs: 45%
- Fats: 25%

**Medical Condition Adjustments:**

**Diabetes:**
- Protein: 35% (higher for satiety)
- Carbs: 35% (reduced glycemic load)
- Fats: 30%

**Hypertension:**
- Protein: 35%
- Carbs: 40%
- Fats: 25%

**Dietary Restrictions:**

**Vegan:**
- Protein: 35% (higher plant-based protein needs)
- Carbs: 45%
- Fats: 20%

**Keto:**
- Protein: 25%
- Carbs: 5% (very low)
- Fats: 70%

## 🎮 Gamification System

### Points System
- 50 points per completed task
- 100 points per level
- Level 1 at 100 points, Level 2 at 200 points, etc.

### Daily Tasks (Customizable)
Each task tracks progress and shows completion percentage

### Animations
- **Level Up**: Celebratory animation when reaching new level
- **Pulse Glow**: Background elements pulse with neon glow
- **Slide In**: Smooth entrance animations for cards

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Neon Fuchsia | #FF006E | Primary accent, buttons |
| Neon Green | #39FF14 | Success, progress completion |
| Neon Cyan | #00D9FF | Secondary accent, highlights |
| Neon Purple | #B500FF | Tertiary accent, alternatives |
| Slate 950 | #0f172a | Dark background |
| Slate 800 | #1e293b | Card backgrounds |

## 💾 Data Persistence

- **User Profile**: Stored in localStorage as `vibeFitnessProfile`
- **Daily Progress**: Stored in localStorage as `vibeFitnessState`
- **Auto-save**: Changes are automatically saved
- **Clear Data**: Click "Logout" to clear all stored data

## 🔧 Dependencies

### Core
- `react` (^18.2.0): UI framework
- `react-dom` (^18.2.0): React DOM renderer

### UI Components
- `lucide-react` (^0.263.1): Beautiful, consistent SVG icons

### Build & Dev
- `vite` (^4.4.5): Lightning-fast build tool
- `tailwindcss` (^3.3.0): Utility-first CSS framework
- `postcss` & `autoprefixer`: CSS processing
- `typescript` (^5.0.2): Type safety

### Dev Tools
- `@vitejs/plugin-react`: React fast refresh for Vite
- `@types/react`: React TypeScript definitions

## 🚀 Performance Optimizations

- **Zero External API Calls**: All calculations run locally
- **Lazy Loading**: Components load when needed
- **Memoization**: React optimizations prevent unnecessary re-renders
- **CSS-in-JS via Tailwind**: Only used CSS is bundled
- **Vite HMR**: Instant hot module replacement during development

## ✅ Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ⚠️ Medical Disclaimer

**IMPORTANT**: This application provides educational recommendations only and should not be used as a substitute for professional medical advice. Always consult with qualified healthcare professionals (doctors, registered dietitians, certified trainers) before starting any new diet or exercise program, especially if you have pre-existing medical conditions.

## 🐛 Known Limitations

- Local storage limited to browser
- No backend/cloud sync (could be added)
- Body fat % must be manually entered (DEXA or estimation)
- Recommendations don't account for medications

## 🚧 Future Enhancements

- [ ] Backend API integration with user authentication
- [ ] Cloud data sync across devices
- [ ] Meal planning & recipe suggestions
- [ ] Workout plan generator
- [ ] Integration with fitness trackers (Fitbit, Apple Health)
- [ ] Social features (friend leaderboards, challenges)
- [ ] Dark/light theme toggle
- [ ] Multi-language support
- [ ] Export data as PDF
- [ ] Nutrition database integration

## 📄 License

This project is provided as-is for educational and personal use.

## 👨‍💻 Author

Built with ❤️ for fitness enthusiasts and health-conscious individuals.

---

**Start your Vibe Fitness journey today! 🚀**

Questions or issues? Feel free to reach out or submit an issue!
