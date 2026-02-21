# Technical Architecture - Vibe Fitness

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    VIBE FITNESS                              │
│                  React + TypeScript + Vite                   │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
    ┌────────┐       ┌────────┐       ┌────────┐
    │ React  │       │  Vite  │       │Tailwind│
    │ DOM    │       │ HMR    │       │ CSS    │
    └────────┘       └────────┘       └────────┘
        │
        ├─ OnboardingForm
        │   ├─ StepPhysicalMetrics
        │   ├─ StepHealthConstraints
        │   ├─ StepPreferences
        │   └─ StepGoal
        │
        └─ Dashboard
            ├─ MacroBreakdown
            ├─ DailyTaskList
            └─ ProgressBar
```

## File Structure

```
vibe-fitness/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies & scripts
│   ├── vite.config.ts            # Vite build config
│   ├── tsconfig.json             # TypeScript config
│   ├── tsconfig.node.json        # Node TypeScript config
│   ├── tailwind.config.js        # Tailwind CSS theme
│   ├── postcss.config.js         # PostCSS plugins
│   └── .env.example              # Environment template
│
├── 📁 Source Code (src/)
│   ├── 📄 App.tsx                # Main app component
│   ├── 📄 App.css                # App-specific styles
│   ├── 📄 index.css              # Global styles
│   ├── 📄 main.tsx               # React entry point
│   │
│   ├── 📁 components/            # React components
│   │   ├── 📄 OnboardingForm.tsx       # Onboarding container
│   │   ├── 📄 Dashboard.tsx            # Dashboard container
│   │   ├── 📁 onboarding/              # Onboarding steps
│   │   │   ├── StepPhysicalMetrics.tsx
│   │   │   ├── StepHealthConstraints.tsx
│   │   │   ├── StepPreferences.tsx
│   │   │   └── StepGoal.tsx
│   │   └── 📁 dashboard/               # Dashboard components
│   │       ├── DailyTaskList.tsx
│   │       ├── MacroBreakdown.tsx
│   │       └── ProgressBar.tsx
│   │
│   ├── 📁 types/                 # TypeScript definitions
│   │   └── 📄 index.ts           # All interfaces
│   │
│   └── 📁 utils/                 # Utility functions
│       └── 📄 calculations.ts    # TDEE & macro logic
│
├── 📁 Public Assets (public/)
│   └── (empty - for future images/icons)
│
├── 📄 index.html                 # HTML template
├── 📄 README.md                  # Full documentation
├── 📄 FEATURES.md                # Feature showcase
├── 📄 GETTING_STARTED.md         # Quick start guide
├── 📄 DEPLOYMENT.md              # Deploy guide
├── 📄 .gitignore                 # Git ignore rules
└── 📁 .github/
    └── 📄 copilot-instructions.md # Copilot config

```

## Component Hierarchy

```
App
├── [onboarding = false]
│   └── OnboardingForm
│       ├── StepPhysicalMetrics
│       ├── StepHealthConstraints
│       ├── StepPreferences
│       └── StepGoal
│       └── Navigation (Previous/Next/Start)
│
└── [onboarding = true]
    └── Dashboard
        ├── Header
        │   ├── Title
        │   ├── Level/Points Display
        │   └── Logout Button
        ├── Main Content (3 sections)
        │   ├── Overview Cards
        │   │   ├── Daily Overview
        │   │   └── Daily Goal
        │   │       └── MacroBreakdown
        │   ├── Daily Quest
        │   │   └── DailyTaskList
        │   │       ├── TaskItem (x6)
        │   │       ├── Progress Bars
        │   │       └── Controls
        │   └── Progress Tracking
        │       └── ProgressBar
        ├── Level Up Animation (conditional)
        └── Footer
            └── Medical Disclaimer
```

## Data Flow Diagram

```
User Input
    │
    ▼
OnboardingForm (4 Steps)
    │
    └─→ Validates Profile
        │
        ▼
    localStorage.setItem('vibeFitnessProfile')
        │
        ▼
    Dashboard Component Loads
        │
        ├─→ localStorage.getItem('vibeFitnessProfile')
        │   │
        │   └─→ calculateTDEE() [calculations.ts]
        │       │
        │       ├─→ calculateBMR()
        │       └─→ apply activityLevel multiplier
        │           └─→ apply goal adjustment
        │
        ├─→ calculateMacros() [calculations.ts]
        │   │
        │   ├─→ Adjust for medical conditions
        │   ├─→ Adjust for dietary restrictions
        │   └─→ Convert to grams
        │
        ├─→ initializeDailyTasks()
        │   │
        │   └─→ Create 6 default tasks
        │
        └─→ Render UI Components
            │
            ├─→ MacroBreakdown (displays TDEE & macros)
            ├─→ DailyTaskList (task UI)
            └─→ ProgressBar (progress display)
                │
                ▼
            User Interactions
                │
                ├─→ Toggle Task Complete
                ├─→ Update Task Progress
                └─→ Logout
                    │
                    └─→ localStorage.clear()
```

## State Management Architecture

```
App Component
├── userProfile: UserProfile | null
│   ├── height, weight, age, gender
│   ├── bodyFatPercentage
│   ├── activityLevel
│   ├── goal
│   ├── dietaryRestrictions[]
│   └── medicalConditions[]
│
Dashboard Component
└── state: UserState
    ├── profile: UserProfile
    ├── macros: MacroBreakdown
    │   ├── calories
    │   ├── protein (grams)
    │   ├── carbs (grams)
    │   └── fats (grams)
    ├── dailyTasks: DailyTask[]
    │   └── [6 tasks, each with]
    │       ├── id, title, goal, current, unit
    │       ├── completed, icon, emoji
    │       └── progress calculation
    ├── currentLevel
    └── totalPoints

useState Calls: 2
useEffect Calls: 2
```

## Type System

```typescript
UserProfile
├── height: number (cm)
├── weight: number (kg)
├── age: number
├── gender: 'male' | 'female'
├── bodyFatPercentage: number (%)
├── activityLevel: ActivityLevel
│   └── 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
├── goal: Goal
│   └── 'bulking' | 'cutting' | 'maintenance'
├── dietaryRestrictions: string[]
└── medicalConditions: string[]

MacroBreakdown
├── calories: number (kcal)
├── protein: number (grams)
├── carbs: number (grams)
└── fats: number (grams)

DailyTask
├── id: string (unique)
├── title: string
├── goal: number (target value)
├── current: number (progress)
├── unit: string ('g', 'ml', 'hours', etc)
├── completed: boolean
├── icon: string (icon name)
└── emoji: string (visual emoji)

UserState
├── profile: UserProfile | null
├── macros: MacroBreakdown | null
├── dailyTasks: DailyTask[]
├── currentStep: number
├── currentLevel: number
└── totalPoints: number
```

## Calculation Pipeline

```
Input: UserProfile
  │
  ├─ Step 1: Calculate BMR
  │   Using Mifflin-St Jeor equation
  │   Formula varies by gender
  │   Output: BMR (kcal/day)
  │
  ├─ Step 2: Apply Activity Multiplier
  │   Multiplier selected from activityLevel
  │   Output: TDEE (kcal/day)
  │
  ├─ Step 3: Apply Goal Adjustment
  │   +300 for bulking
  │   -400 for cutting
  │   0 for maintenance
  │   Output: Target Calories
  │
  ├─ Step 4: Determine Base Macro Ratios
  │   Protein: 30%, Carbs: 45%, Fats: 25%
  │
  ├─ Step 5: Adjust for Medical Conditions
  │   Diabetes: Higher protein, lower carbs
  │   Hypertension: Balanced macros
  │
  ├─ Step 6: Adjust for Dietary Restrictions
  │   Vegan: Higher plant-based protein
  │   Keto: High fat, very low carbs
  │
  ├─ Step 7: Convert to Grams
  │   Protein/Carbs: 4 kcal/gram
  │   Fats: 9 kcal/gram
  │
  └─ Output: MacroBreakdown
     {
       calories: number,
       protein: number (grams),
       carbs: number (grams),
       fats: number (grams)
     }
```

## Build Process

```
Source Code
    │
    ├─(TypeScript Compilation)
    │   └─ tsc (type checking only)
    │
    ├─(Vite Bundling)
    │   ├─ ES6 module resolution
    │   ├─ Tree shaking (unused code removal)
    │   └─ Code splitting
    │
    ├─(Tailwind CSS Processing)
    │   ├─ Scans HTML/JSX for class names
    │   ├─ Generates only used CSS
    │   └─ Autoprefixer adds vendor prefixes
    │
    ├─(Minification)
    │   ├─ JavaScript minified
    │   ├─ CSS minified
    │   └─ HTML minified
    │
    └─Output: dist/
       ├─ index.html (~2KB)
       ├─ js/
       │   └─ bundle.js (~200KB)
       └─ css/
           └─ style.css (~30KB)
```

## Development Workflow

```
npm run dev
    │
    ├─ Vite Dev Server starts on localhost:5173
    │   │
    │   └─ Hot Module Replacement (HMR)
    │       ├─ File change detected
    │       ├─ TypeScript compiled
    │       ├─ Module replaced in browser
    │       └─ Page updated (no refresh needed)
    │
    └─ Browser opens with dev tools
        ├─ Network tab: See API calls (none in this app)
        ├─ Console: See errors/logs
        ├─ Application: See localStorage
        └─ Elements: Inspect components
```

## Performance Considerations

### Bundle Optimization
- **React 18.2.0**: ~42KB (gzipped)
- **Tailwind CSS**: ~15KB (only used utilities)
- **Lucide Icons**: ~20KB (tree-shakeable)
- **Application Code**: ~30KB
- **Total**: ~230KB (gzipped)

### Runtime Optimization
- No external API calls
- localStorage is instant
- Calculations are lightweight
- React.memo could optimize child components
- Virtual scrolling not needed (only 6 tasks)

### Memory Usage
- Minimal state objects
- No memory leaks (proper cleanup)
- localStorage limited to ~5-10MB per domain

## Accessibility Compliance

### WCAG 2.1 Level A
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Semantic HTML
- ✅ ARIA labels

### Could Improve
- ⚠️ Motion preferences (prefers-reduced-motion)
- ⚠️ Screen reader testing
- ⚠️ Keyboard shortcut documentation

## Testing Strategy (Future)

```
Unit Tests
├─ calculations.ts functions
│   ├─ calculateBMR()
│   ├─ calculateTDEE()
│   ├─ calculateMacros()
│   └─ calculateLevel()
└─ Utility functions

Integration Tests
├─ Components render correctly
├─ State updates properly
├─ localStorage persistence
└─ Data flow end-to-end

E2E Tests
├─ Onboarding flow
├─ Dashboard interactions
├─ Task completion
└─ Logout functionality

Test Framework: Vitest + React Testing Library
```

---

## Technology Decisions

| Choice | Why | Alternative |
|--------|-----|-------------|
| React 18 | Modern, hooks-based, large ecosystem | Vue, Svelte |
| TypeScript | Type safety, better DX | JavaScript |
| Vite | Fast builds, HMR, modern | Webpack, Parcel |
| Tailwind CSS | Utility-first, customizable | Styled-components, Bootstrap |
| Lucide Icons | Consistent, tree-shakeable | Font Awesome, Material |
| localStorage | Simple persistence, no backend | IndexedDB, SQLite |

---

This architecture is **scalable**, **maintainable**, and **performant** for a client-side fitness application. 🚀
