# 🚀 Vibe Fitness - Setup Checklist

Use this checklist to guide you through getting Vibe Fitness up and running.

## ✅ Pre-Setup Requirements

- [ ] Node.js 16+ installed (verify: `node --version`)
- [ ] npm 7+ installed (verify: `npm --version`)
- [ ] Git installed (optional, verify: `git --version`)
- [ ]~500MB free disk space
- [ ] Modern web browser available

## ✅ Installation Phase

### Step 1: Project Setup
- [ ] Navigate to project folder: `cd "d:\vibe fitness"`
- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete (~2-3 minutes)

### Step 2: Verify Installation
- [ ] Check for errors in installation output
- [ ] Verify node_modules folder exists
- [ ] Verify package-lock.json exists

## ✅ Development Phase

### Step 1: Start Development Server
- [ ] Run: `npm run dev`
- [ ] Verify output shows:
  ```
  ➜  Local:   http://localhost:5173/
  ```
- [ ] Wait for "ready in XXXms" message

### Step 2: Open in Browser
- [ ] Browser should auto-open to http://localhost:5173
- [ ] If not, manually navigate to http://localhost:5173
- [ ] Verify you see the Vibe Fitness onboarding screen

### Step 3: Test Onboarding
- [ ] See Step 1: Physical Metrics form
- [ ] Enter test data:
  - Gender: Male
  - Activity Level: Moderate
  - Height: 180cm
  - Weight: 80kg
  - Age: 28
  - Body Fat: 18%
- [ ] Click "Next" to proceed
- [ ] Step 2: Health Constraints - Select a condition (e.g., none)
- [ ] Click "Next" to proceed
- [ ] Step 3: Preferences - Select dietary preferences (e.g., none)
- [ ] Click "Next" to proceed
- [ ] Step 4: Goal - Select "Maintenance"
- [ ] Click "Start" to complete onboarding

### Step 4: Test Dashboard
- [ ] See Daily Overview Card
- [ ] See Daily Goal Card with macros
- [ ] See Daily Quest tasks
- [ ] See Progress Bar
- [ ] See "Level 1" and "0 points"

### Step 5: Test Interactions
- [ ] Click + button on first task (Protein Goal)
- [ ] Verify count increases
- [ ] Click checkbox to complete task
- [ ] Verify task shows as completed
- [ ] Verify 50 points awarded
- [ ] Verify level/points update

### Step 6: Verify Persistence
- [ ] Refresh browser (F5)
- [ ] Verify data is still there
- [ ] Verify tasks remain completed

## ✅ Testing All Features

### Onboarding Variations
- [ ] Test all 4 steps
- [ ] Test with medical conditions selected
- [ ] Test with multiple dietary preferences
- [ ] Test bulking (+300cal) goal
- [ ] Test cutting (-400cal) goal
- [ ] Test different activity levels

### Dashboard Features
- [ ] Complete all 6 tasks
- [ ] Verify progress bar reaches 100%
- [ ] Verify level up animation
- [ ] Click Logout button
- [ ] Verify data cleared
- [ ] Complete onboarding again

### Responsive Testing
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Verify layout adjusts properly
- [ ] Verify buttons are clickable

### Dark Mode Testing
- [ ] Verify dark background
- [ ] Verify neon colors are visible
- [ ] Verify text is readable
- [ ] Verify animations are smooth

## ✅ Browser Compatibility Testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge
- [ ] Mobile browser

## ✅ Developer Tools Testing

### Console Check
- [ ] Press F12 to open developer tools
- [ ] Go to Console tab
- [ ] Verify no red errors
- [ ] Verify no warnings

### Network Check
- [ ] Go to Network tab
- [ ] Reload page
- [ ] Verify no failed requests
- [ ] Verify HTML, CSS, JS load properly

### localStorage Inspection
- [ ] Go to Application tab
- [ ] Expand "Local Storage"
- [ ] Click current domain
- [ ] Verify `vibeFitnessProfile` exists
- [ ] Verify `vibeFitnessState` exists
- [ ] Verify JSON data is visible

### Performance Check
- [ ] Go to Performance tab
- [ ] Record a page load
- [ ] Verify page loads in ~2 seconds
- [ ] Verify no long tasks

## ✅ Code Quality Verification

- [ ] No TypeScript errors (check terminal)
- [ ] No ESLint warnings (if linter installed)
- [ ] Code is readable and commented
- [ ] Component structure is logical
- [ ] No console.logs left in code

## ✅ Documentation Review

- [ ] Read README.md for overview
- [ ] Read GETTING_STARTED.md for beginner guide
- [ ] Read FEATURES.md for feature list
- [ ] Read ARCHITECTURE.md for technical details
- [ ] Read DEPLOYMENT.md to plan deployment

## ✅ Customization (Optional)

### Modify Colors
- [ ] Open tailwind.config.js
- [ ] Find neon colors section
- [ ] Understand color values
- [ ] Note: Don't modify yet, understand first

### Modify Tasks
- [ ] Open src/components/Dashboard.tsx
- [ ] Find initializeDailyTasks() function
- [ ] Understand task structure
- [ ] Note: Don't modify yet, understand first

### Modify Calculations
- [ ] Open src/utils/calculations.ts
- [ ] Understand TDEE calculation
- [ ] Understand macro calculation
- [ ] Note: Don't modify yet, understand first

## ✅ Production Build (Optional)

### Build for Production
- [ ] Run: `npm run build`
- [ ] Verify "build complete" message
- [ ] Verify dist/ folder created
- [ ] Verify dist/index.html exists
- [ ] Verify dist/js/ folder has bundle
- [ ] Verify dist/css/ folder has styles

### Preview Production Build
- [ ] Run: `npm run preview`
- [ ] Open browser to preview URL
- [ ] Verify production build works
- [ ] Verify all features work

## ✅ Deployment Preparation (Optional)

- [ ] Read DEPLOYMENT.md
- [ ] Choose hosting platform:
  - [ ] Vercel (easiest)
  - [ ] Netlify (drag & drop)
  - [ ] GitHub Pages (free)
  - [ ] Other: ___________
- [ ] Prepare deployment
- [ ] Deploy to chosen platform
- [ ] Share link with others

## ✅ Troubleshooting Issues

### Issue: npm command not found
- [ ] Solution: Install Node.js from nodejs.org
- [ ] Restart terminal

### Issue: Port 5173 already in use
- [ ] Solution: Kill other process on port 5173
- [ ] Or restart computer

### Issue: Blank white page
- [ ] Solution: Press Ctrl+Shift+R (hard refresh)
- [ ] Check browser console for errors
- [ ] Restart dev server

### Issue: Calculate buttons not working
- [ ] Solution: Check browser console for errors
- [ ] Clear localStorage and restart
- [ ] Check that Node modules are installed

### Issue: localStorage showing "undefined"
- [ ] Solution: Not in private/incognito mode
- [ ] Switch to normal browsing

## ✅ Post-Setup Tasks

- [ ] Star the repository (if using GitHub)
- [ ] Share with friends
- [ ] Post on social media
- [ ] Add to portfolio
- [ ] Deploy to web
- [ ] Consider contributing improvements

---

## 🎓 What You've Verified

After completing this checklist, you've verified:
✅ Installation works correctly
✅ Development server runs
✅ Application loads in browser
✅ All features function
✅ Data persists correctly
✅ Responsive design works
✅ No errors in browser/terminal
✅ Documentation is complete
✅ Ready for customization/deployment

---

## 🚀 Next Steps After Setup

1. **Explore**: Play with all features
2. **Understand**: Read the code to learn
3. **Customize**: Modify colors, tasks, calculations
4. **Deploy**: Follow DEPLOYMENT.md
5. **Share**: Tell others about Vibe Fitness!

---

**Congratulations! Vibe Fitness is now ready to use! 🎉**

---

Date Started: ___________
Date Completed: ___________
Notes: ________________________________________________________________________________
