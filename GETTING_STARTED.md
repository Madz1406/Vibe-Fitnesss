# Getting Started with Vibe Fitness 🚀

Welcome to **Vibe Fitness** - your personal AI-powered fitness coaching companion! This guide will help you get the application running in minutes.

## Prerequisites

Before you start, make sure you have:
- ✅ Node.js 16+ (Download from [nodejs.org](https://nodejs.org/))
- ✅ npm 7+ (comes with Node.js)
- ✅ A modern web browser (Chrome, Firefox, Safari, or Edge)
- ✅ ~500MB free disk space

## Installation Steps

### Step 1: Install Node.js

Visit [https://nodejs.org/](https://nodejs.org/) and download the **LTS (Long Term Support)** version.

To verify installation:
```bash
node --version  # Should show v16.0.0 or higher
npm --version   # Should show 7.0.0 or higher
```

### Step 2: Navigate to Project Directory

Open your terminal/command prompt and navigate to the Vibe Fitness folder:

```bash
cd "d:\vibe fitness"
```

### Step 3: Install Dependencies

```bash
npm install
```

This downloads and installs all required packages (~400MB).

**Expected output:**
```
added XXX packages in X.XXs
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v4.X.X  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Step 5: Open in Browser

Your browser should automatically open. If not:
1. Open your browser
2. Go to `http://localhost:5173`
3. You should see the Vibe Fitness onboarding screen

## 🎮 First Time Using Vibe Fitness?

### The Onboarding Journey

You'll walk through a 4-step setup process:

#### Step 1️⃣: Physical Metrics
Provide your body measurements:
- **Gender**: Select Male or Female
- **Activity Level**: Choose your daily activity level
- **Height**: Your height in centimeters
- **Weight**: Your weight in kilograms
- **Age**: Your current age
- **Body Fat %**: Estimated percentage (use DEXA scan or online calculator)

#### Step 2️⃣: Health Constraints
Select any medical conditions that apply:
- Diabetes
- Hypertension (High Blood Pressure)
- Heart Disease
- Thyroid Disorder
- Arthritis
- Asthma

💡 This helps us adjust nutritional recommendations safely.

#### Step 3️⃣: Preferences
Pick your dietary choices (can select multiple):
- 🌱 Vegan
- 🥕 Vegetarian
- 🐟 Pescatarian
- 🥑 Keto
- 🥩 Paleo
- 🍚 Gluten-Free
- 🥛 Dairy-Free
- 🫒 Low-FODMAP

#### Step 4️⃣: Goal & Activity
Choose your primary fitness goal:
- **💪 Bulking**: Build muscle mass (+300 calories)
- **🔥 Cutting**: Lose fat (-400 calories)
- **⚖️ Maintenance**: Stay where you are

### The Dashboard

After onboarding, you'll see your personalized dashboard:

#### Daily Overview Card
- Tasks completed today
- Points earned toward next level

#### Daily Goal Card
- Your caloric target
- Protein, carbs, and fats breakdown
- Visual macro distribution

#### Daily Quest
Track 6 gamified tasks:
- Hit Protein Goal 🥩
- Complete Workout 💪
- Drink 3L Water 💧
- Sleep 8 Hours 😴
- Track Meals 🍽️
- Stretch & Mobility 🧘

**How to use:**
1. Click the + button to increment progress
2. Click the - button to decrement
3. Click the checkbox to mark complete
4. Earn 50 points per completed task
5. Level up every 100 points 🎉

#### Daily Progress Bar
- Visual progress indicator
- Milestone markers at 25%, 50%, 75%, 100%
- Congratulations message when complete

## 🎯 Key Features Explained

### TDEE Calculator
We use the **Mifflin-St Jeor equation** (most accurate method) to calculate your Total Daily Energy Expenditure:

1. Calculate your Basal Metabolic Rate (BMR)
2. Apply your activity level multiplier
3. Adjust for your fitness goal
4. Result: Your personalized caloric target

### Smart Macro Calculation
Your macronutrient ratios adjust based on:
- ✅ Medical conditions (e.g., reduced carbs for diabetes)
- ✅ Dietary preferences (e.g., high fat for keto)
- ✅ Fitness goal (bulking needs more calories)

### Progress Tracking
The gamification system motivates you with:
- 🏆 Level progression system
- ⭐ Points for completed tasks
- 🎨 Visual progress bars
- 🎉 Celebratory animations

## 📱 Tips & Tricks

### Accessing Your Data
- All data is saved locally in your browser
- Close and reopen - your data persists!
- No signup required, no cloud sync

### Resetting Progress
Click "Logout" to:
- Clear all daily tasks
- Reset your user profile
- Start from the onboarding form

### Body Fat Percentage Tips
If you don't know yours:
1. **DEXA Scan**: Most accurate (available at gyms/medical facilities)
2. **Calipers**: Used by fitness professionals
3. **Online Calculator**: Use your measurements and gender
4. **Mirror Test**: Visual estimation if in a rush

### Activity Level Guide
- **Sedentary**: Desk job, minimal activity
- **Light**: 1-3 days/week light exercise
- **Moderate**: 3-5 days/week moderate exercise
- **Active**: 6-7 days/week intense exercise
- **Very Active**: Physical job + daily intense training

## ⚙️ Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (what you'll use) |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm install` | Install dependencies |

## 🐛 Troubleshooting

### Problem: `npm` command not found
**Solution**: Node.js not installed or PATH not set
- Reinstall Node.js
- Restart terminal/command prompt
- Verify with `node --version`

### Problem: Blank page or errors in console
**Solution**: Try these in order:
1. Hard refresh: `Ctrl + Shift + R` (or `Cmd + Shift + R` on Mac)
2. Clear browser cache
3. Delete `node_modules` and run `npm install` again

### Problem: Port 5173 already in use
**Solution**: Another app is using that port
- Stop other applications
- Or modify `.env` file (advanced)
- Or restart your computer

### Problem: Changes aren't showing up
**Solution**: Hot Module Refresh (HMR) issue
1. Check terminal for errors
2. Hard refresh browser (`Ctrl + Shift + R`)
3. Restart dev server (`Ctrl + C` then `npm run dev`)

### Problem: localStorage showing "undefined"
**Solution**: 
- Using private/incognito mode (not supported)
- Switch to normal browsing mode
- Or use different browser

## 🚀 Next Steps

### Ready to deploy?
Check [DEPLOYMENT.md](DEPLOYMENT.md) for:
- Vercel (easiest)
- Netlify
- GitHub Pages
- Docker
- Custom servers

### Want to customize?
Edit these files:
- **Colors**: `tailwind.config.js`
- **Tasks**: `src/components/Dashboard.tsx` (initializeDailyTasks function)
- **Calculations**: `src/utils/calculations.ts`

### Want to add features?
1. Create new components in `src/components/`
2. Use existing types from `src/types/index.ts`
3. Test in dev server
4. Share your improvements!

## ⚠️ Important Reminders

🔴 **Medical Disclaimer**
This app provides educational recommendations only. Always consult qualified healthcare professionals before starting any new diet or exercise program, especially if you have medical conditions.

🔒 **Privacy**
All your data stays on your device. No data is sent to any server.

## 📚 Learning Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vite**: https://vitejs.dev/guide/

## 💬 Need Help?

1. Check README.md for technical details
2. Check code comments in TypeScript files
3. Look for "Error" messages in browser console
4. Review browser dev tools (F12 → Console tab)

## 🎉 You're Ready!

Congratulations! You now have Vibe Fitness running locally. Start tracking your fitness goals and level up! 

Remember: **This is a marathon, not a sprint.** Consistency beats intensity every time. 💪

---

**Happy training! Your Vibe Fitness journey starts now.** 🏋️‍♂️
