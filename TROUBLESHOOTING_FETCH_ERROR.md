# 🐛 TROUBLESHOOTING: "Failed to fetch" Error

## Quick Diagnosis

If you're seeing **"Failed to fetch"** when generating diet plans, follow these steps:

---

## Step 1: Test Backend Connection

### In your terminal, run:
```bash
curl http://localhost:5000/api/health
```

### Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-XX...",
  "service": "Vibe Fitness Backend API",
  "cors": "enabled"
}
```

### If this fails:
- ❌ Backend is NOT running
- **Fix**: Start the backend in a new terminal:
  ```bash
  cd backend
  python app.py
  ```

---

## Step 2: Check Expected Data Format

### See what fields the backend expects:
```bash
curl http://localhost:5000/api/info
```

### You should see:
```json
{
  "service": "Vibe Fitness Backend API",
  "endpoints": {
    "POST /api/diet-plan": {
      "required_fields": ["goal", "weight", "height", "age"],
      "optional_fields": [...],
      "example": {...}
    }
  }
}
```

This shows exactly what data to send.

---

## Step 3: Test with curl

### Try this command to test the backend directly:
```bash
curl -X POST http://localhost:5000/api/diet-plan \
  -H "Content-Type: application/json" \
  -d '{
    "height": 180,
    "weight": 75,
    "age": 25,
    "gender": "male",
    "activityLevel": "moderate",
    "goal": "cutting",
    "medicalConditions": [],
    "dietaryRestrictions": [],
    "targetCalories": 2000
  }'
```

### If it works:
- ✅ Backend is functioning properly
- Issue is in frontend data transmission

### If it fails:
- ❌ Backend has an issue
- Check the terminal running `python app.py` for error messages

---

## Step 4: Check Frontend Console

### Open browser debugging:
1. Press **F12** on your keyboard
2. Go to **Console** tab
3. Click "Generate Plan" button
4. Look for red error messages

### Common frontend errors:

**CORS Error:**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/diet-plan' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```
- **Fix**: Backend CORS is not enabled (restart backend)

**Connection Refused:**
```
Failed to fetch
TypeError: Failed to fetch
```
- **Fix**: Backend not running on port 5000

**Network Error:**
```
TypeError: Failed to fetch
```
- **Fix**: Check firewall, antivirus blocking localhost connections

---

## Step 5: Check Backend Terminal

### When you run `python app.py`, watch for:

### ✅ Good output:
```
🚀 Starting Vibe Fitness Backend API on http://localhost:5000
📚 API Documentation:
   POST /api/diet-plan - Generate 7-day diet plan
   ...
Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### When you click "Generate Plan", you should see:
```
127.0.0.1 - - [DATE] "POST /api/diet-plan HTTP/1.1" 200
```

### ❌ If you see errors in the terminal:
- Read the error message carefully
- Check your Python version: `python --version`
- Reinstall dependencies: `pip install -r requirements.txt`

---

## Complete Troubleshooting Checklist

### Backend Setup
- [ ] Backend terminal shows: `Running on http://127.0.0.1:5000`
- [ ] No Python errors in backend terminal
- [ ] Can access: http://localhost:5000/api/health
- [ ] Can see: http://localhost:5000/api/info

### Frontend Setup
- [ ] Frontend terminal shows: `Local: http://localhost:5173`
- [ ] Can open app at: http://localhost:5173
- [ ] Can complete onboarding form
- [ ] User profile has: height, weight, age, goal

### Network / CORS
- [ ] Both servers running
- [ ] Backend CORS is enabled (in app.py)
- [ ] No firewall blocking localhost:5000
- [ ] No antivirus blocking connections

### Browser
- [ ] Using modern browser (Chrome, Firefox, Safari, Edge)
- [ ] No browser extensions blocking requests
- [ ] Console (F12) shows no red errors
- [ ] Network tab shows requests to localhost:5000

---

## Solution Guide

### Error: "Failed to fetch"

**Cause #1: Backend not running**
```bash
# Check if running
curl http://localhost:5000/api/health

# If it fails, start backend
cd backend
python app.py
```

**Cause #2: Wrong user profile data**
- Ensure all onboarding fields are filled:
  - Height (in cm)
  - Weight (in kg)
  - Age (in years)
  - Gender (male/female)
  - Activity Level
  - Goal (bulking/cutting/maintenance)
- Then try again

**Cause #3: Port conflict**
- Check if port 5000 is in use by something else:
  ```bash
  netstat -ano | findstr :5000
  ```
- If in use, change port in `backend/app.py`:
  ```python
  app.run(debug=True, host='127.0.0.1', port=5001)
  ```

**Cause #4: CORS issue**
- Restart the backend
- Hard refresh browser: **Ctrl+Shift+R**
- Clear browser cache

**Cause #5: Python dependencies**
```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

## Advanced Debugging

### Enable verbose logging in frontend

Add this to browser console (F12 → Console):
```javascript
// See all network requests
fetch.__original = window.fetch;
window.fetch = function(...args) {
  console.log('Fetch request:', args);
  return fetch.__original.apply(this, args).then(r => {
    console.log('Fetch response:', r);
    return r;
  });
};
```

### Check what data frontend is sending

In browser console (F12 → Console), paste:
```javascript
const userProfile = {
  height: 180,
  weight: 75,
  age: 25,
  gender: 'male',
  activityLevel: 'moderate',
  goal: 'cutting',
  medicalConditions: [],
  dietaryRestrictions: [],
  targetCalories: 2000
};

fetch('http://localhost:5000/api/diet-plan', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(userProfile)
})
  .then(r => r.json())
  .then(d => console.log('Response:', d))
  .catch(e => console.error('Error:', e));
```

---

## Getting More Help

### Check these logs:

1. **Backend terminal** - Shows Python/Flask errors
2. **Browser console (F12)** - Shows JavaScript errors
3. **Network tab (F12)** - Shows HTTP requests/responses
4. **Backend /api/info endpoint** - Shows expected format

### Share these when asking for help:

1. Full error message from browser console
2. Full error from backend terminal
3. Output of `curl http://localhost:5000/api/health`
4. Your Internet connection (localhost should work offline)

---

## Still Not Working?

Try a **complete restart**:

```bash
# Terminal 1: Stop frontend (press Ctrl+C)
# Terminal 2: Stop backend (press Ctrl+C)

# Wait 5 seconds

# Terminal 1: Start frontend
npm run dev

# Terminal 2: Start backend (after frontend opens)
cd backend
python app.py

# Browser: Refresh page (Ctrl+R or F5)
```

Then try generating a diet plan again.

---

## Quick Reference Commands

```bash
# Check backend health
curl http://localhost:5000/api/health

# See expected data format
curl http://localhost:5000/api/info

# Test diet plan generation
curl -X POST http://localhost:5000/api/diet-plan \
  -H "Content-Type: application/json" \
  -d '{...}'

# Restart backend
cd backend && python app.py

# Restart frontend (in other terminal)
npm run dev

# Check if ports are in use (Windows PowerShell)
netstat -ano | findstr :5000
netstat -ano | findstr :5173
```

---

**Questions?** Run these commands and share the output for help!
