# 🚀 QUICK FIX: "Failed to fetch" Error

Your frontend is showing **"Failed to fetch"** which means the backend isn't running properly.

---

## ⚡ Quick Fix (30 Seconds)

### Step 1: Check if backend is running
Open a new terminal and try:
```bash
curl http://localhost:5000/api/health
```

### If you see an error like "Connection refused":
- ❌ Backend is NOT running
- **Go to Step 2**

### If you see JSON response with "healthy":
- ✅ Backend IS running  
- **Skip to Step 4: Verify Frontend Data**

---

## Step 2: Start the Backend

### Open a NEW terminal window and run:
```bash
cd backend
python app.py
```

### You should see:
```
🚀 Starting Vibe Fitness Backend API on http://localhost:5000
📚 API Documentation:
   POST /api/diet-plan - Generate 7-day diet plan
   ...
Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### If you see Python errors:
```bash
# Reinstall dependencies
pip install -r requirements.txt

# Try again
python app.py
```

---

## Step 3: Refresh Frontend

With backend now running:

1. Go back to your browser
2. Refresh the page: **F5** or **Ctrl+R**
3. You should now see a **green checkmark** in the Diet Planner section
4. If still yellow/red, click **"🔄 Check Again"** button

---

## Step 4: Verify User Profile Data

Click "Generate Plan" and if it still fails, check:

1. **Did you complete the onboarding form?**
   - All 4 steps must be completed
   - Height, weight, age, goal must all be filled

2. **Check browser console for detailed errors:**
   - Press **F12**
   - Go to **Console** tab
   - Look for red error messages
   - Share the error message if you need help

---

## Automated Test (Windows)

Run this to automatically test everything:
```bash
TEST_BACKEND.bat
```

This will check:
- ✅ Backend is running
- ✅ Python is installed
- ✅ Required packages installed

---

## Still Not Working?

### Check terminal running backend

Does your backend terminal show any red error messages? Copy and share them.

### Common Issues:

**Issue: Port 5000 already in use**
```
Address already in use
ERROR in app running...
```
**Fix:** 
```bash
# Change port in backend/app.py
# Find: app.run(debug=True, host='127.0.0.1', port=5000)
# Change to: app.run(debug=True, host='127.0.0.1', port=5001)
```
And update DietPlan.tsx URLs from 5000 to 5001

**Issue: Python module not found**
```
ModuleNotFoundError: No module named 'flask'
```
**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

**Issue: Port blocked by firewall**
- Add localhost/127.0.0.1:5000 to firewall exceptions
- Or disable firewall temporarily for testing

---

## Complete Checklist

### Backend
- [ ] Terminal shows "Running on http://127.0.0.1:5000"
- [ ] No Python errors
- [ ] `curl http://localhost:5000/api/health` returns OK

### Frontend  
- [ ] Browser shows http://localhost:5173
- [ ] You see green checkmark for backend status
- [ ] "Generate Plan" button is clickable (not grayed out)

### User Data
- [ ] Completed onboarding all 4 steps
- [ ] Height field filled
- [ ] Weight field filled
- [ ] Age field filled
- [ ] Goal selected (bulking/cutting/maintenance)

### Network
- [ ] No CORS errors in console (F12)
- [ ] No "Connection refused" errors
- [ ] Backend terminal shows POST request coming in

---

## Manual Test Command

Try this to test backend directly from command line:

```bash
curl -X POST http://localhost:5000/api/diet-plan ^
  -H "Content-Type: application/json" ^
  -d "{\"height\": 180, \"weight\": 75, \"age\": 25, \"gender\": \"male\", \"activityLevel\": \"moderate\", \"goal\": \"cutting\", \"medicalConditions\": [], \"dietaryRestrictions\": [], \"targetCalories\": 2000}"
```

If this works, the backend is fine - likely user profile data issue.
If this fails, backend isn't responding properly.

---

## Video Walkthrough (What to Do)

1. **Backend not running?**
   - Open new terminal
   - Type: `cd backend && python app.py`
   - Wait for "Running on..." message
   - Keep this terminal open

2. **Frontend still showing error?**
   - Go to browser with http://localhost:5173
   - Press F5 to refresh
   - Wait for green status
   - Try "Generate Plan" again

3. **Still failed?**
   - Open browser F12 console
   - Copy the exact error message
   - Scroll down to "Getting Help" section

---

## Getting Help

When asking for help, provide:

1. Output of `python app.py` (copy full terminal)
2. Output of `curl http://localhost:5000/api/health`
3. Screenshot of browser error (F12 console)
4. Does backend terminal show any errors?
5. What step are you stuck on?

---

## Next Steps (Once Working)

Once you see:
- ✅ Green checkmark for backend
- ✅ "Generate Plan" button clickable
- ✅ Clicking generates meal plan

Then you're done! The AI diet planner will:
- Generate 7-day meal plans
- Show daily meals with calories
- Provide shopping lists
- Give personalized nutrition tips

**Enjoy! 🎉**
